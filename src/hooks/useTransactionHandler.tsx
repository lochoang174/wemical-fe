import { useRef, useEffect } from "react";

import {
  ActionType,
  addResultElement,
  addStake,
  addSwap,
  addWithdraw,
  selectSwapActions,
  setActionList,
  updateAmountWithdraw,
  updateLiquidStake,
  updateStakeAmount,
  updateSwapAmount,
} from "../redux/slices/TransactionSlice";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import {
  IToken,
  ResultType,
  StakeType,
  SwapType,
  WithdrawType,
} from "../types";
import { MODULE_ADDRESS } from "../Var";
import { useAlert } from "../contexts/AlerProvider";
import { displayAmount } from "../utils/helperFunction";

export const useTransactionHandler = () => {
  const { actions, resultList } = useAppSelector((state) => state.transaction);
  const swapActions = useAppSelector((state: RootState) =>
    selectSwapActions(state)
  );
  const { setAlert } = useAlert();
  const resultRef = useRef(resultList);
  const dispatch = useAppDispatch();
  const { signAndSubmitTransaction } = useWallet();
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);

  useEffect(() => {
    resultRef.current = resultList;
  }, [resultList]);

  const handleTransactionSwap = async () => {
    let prevResult = 0;
    for (let i = 0; i < swapActions.length - 1; i++) {
      try {
        prevResult = calculateInitialAmount(i, prevResult);
        const response = await performSwapTransaction(i, prevResult);
        const committedTransaction = await aptos.waitForTransaction({
          transactionHash: response.hash,
        });
        prevResult = getSwapResult(committedTransaction);
        const formattedAmount = formatSwapAmount(i + 1, prevResult);

        dispatch(
          updateSwapAmount({
            id: swapActions[i + 1].payload.id,
            amount: formattedAmount,
          })
        );
        showTransactionAlert(committedTransaction);
      } catch (error) {
        console.error(`Transaction ${i + 1} failed:`, error);
        break;
      }
    }
    const lastElement = swapActions[swapActions.length - 1].payload as SwapType;
    if (lastElement) {
      dispatch(
        addResultElement({
          action: ActionType.SWAP,
          amount: prevResult,
          token: lastElement.token,
        })
      );
    }
  };
  const findResultByToken = (token: IToken): ResultType | null => {
    if (resultRef.current.length === 0) {
      console.log("Result list is empty, waiting for data.");
      return null;
    }

    return (
      resultRef.current.find((result) => result.token.name === token.name) ||
      null
    );
  };
  const calculateInitialAmount = (index: number, prevResult: number) => {
    if (index === 0) {
      const ele = swapActions[index].payload as SwapType;

      const result1 = findResultByToken(ele.token);
      if (result1) {
        const formattedAmount = formatSwapAmount(0, result1.amount);
        dispatch(
          updateSwapAmount({
            id: swapActions[0].payload.id,
            amount: formattedAmount,
          })
        );
        return result1.amount;
      }
      return ele.token.name === "USDC"
        ? ele.amount * 1000000
        : ele.amount * 100000000;
    }
    return prevResult;
  };

  const performSwapTransaction = async (index: number, prevResult: number) => {
    return await signAndSubmitTransaction({
      data: {
        function: `${MODULE_ADDRESS}::scripts_v3::swap`,
        typeArguments: [
          swapActions[index].payload.token.type,
          swapActions[index + 1].payload.token.type,
          "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated",
        ],
        functionArguments: [prevResult, 10000],
      },
    });
  };

  const getSwapResult = (transaction: any) => {
    const swapEvent = transaction.events[3];
    return Number(swapEvent.data.x_in) !== 0
      ? swapEvent.data.y_out
      : swapEvent.data.x_out;
  };

  const formatSwapAmount = (index: number, amount: number) => {
    return swapActions[index].payload.token.name === "USDC"
      ? amount / 1000000
      : amount / 100000000;
  };

  const showTransactionAlert = (transaction: any) => {
    const alertContent = (
      <>
        Transaction:{" "}
        <a
          href={`https://explorer.aptoslabs.com/txn/${transaction.hash}?network=testnet`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {transaction.hash}
        </a>
      </>
    );
    setAlert(alertContent, "success");
  };
  const handleWithdraw = async (payload: WithdrawType) => {
    const response = await signAndSubmitTransaction({
      data: {
        function: `${MODULE_ADDRESS}::scripts_v3::remove_liquidity`,
        typeArguments: [
          `0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::${payload.pool?.token1.name}`,

          `0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::${payload.pool?.token2.name}`,
          "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated", //curves (static)
        ],
        functionArguments: [
          payload.liquidity, // amount of coin(LiquidLP) to withdraw
          111111, // minimum amount of coin x to widthdraw
          111111, // minimum amount of coin y to widthdraw
        ],
      },
    });
    const committedTransaction = await aptos.waitForTransaction({
      transactionHash: response.hash,
    });
    dispatch(
      updateAmountWithdraw({
        id: payload.id,
        amount1: committedTransaction.events[2].data.returned_x_val,
        amount2: committedTransaction.events[2].data.returned_y_val,
      })
    );

    showTransactionAlert(committedTransaction);
  };
  function calculateAmount(
    tokenName: string,
    amount: number | undefined
  ): number {
    const multiplier = tokenName === "USDC" ? 1000000 : 1000000000;
    return amount ? amount * multiplier : 0;
  }
  const handleStake = async (payload: StakeType) => {
    let amount1 = calculateAmount(
      payload.pool?.token1.name ?? "",
      payload.amountToken1 ?? 0
    );
    let amount2 = calculateAmount(
      payload.pool?.token2.name ?? "",
      payload.amountToken2 ?? 0
    );

    const result1 = findResultByToken(payload.pool?.token1);

    const result2 = findResultByToken(payload.pool?.token2);
    if (result1) {
      let e = displayAmount(payload.pool?.token1, result1.amount);
      dispatch(
        updateStakeAmount({
          amountIndex: "amount1",
          amountValue: e,
          id: payload.id,
        })
      );
      amount1 = result1.amount;
    }
    if (result2) {
      let e = displayAmount(payload.pool?.token2, result2.amount);

      dispatch(
        updateStakeAmount({
          amountIndex: "amount2",
          amountValue: e,
          id: payload.id,
        })
      );

      amount2 = result2.amount;
    }
    const response = await signAndSubmitTransaction({
      data: {
        function: `${MODULE_ADDRESS}::scripts_v3::add_liquidity`,
        typeArguments: [
          `0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::${payload.pool?.token1.name}`,

          `0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::${payload.pool?.token2.name}`,
          "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated",
        ],
        functionArguments: [
          amount1, //100000000 amount coin x to stake
          1111, // minimum amount of coin x to  add as liquidity (slippage). [tham so nay cu de la 1111]
          amount2, //10000000 amount coin y to stake
          1111, //minimum amount of coin x to  add as liquidity (slippage). [tham so nay cu de la 1111]
        ],
      },
    });
    const committedTransaction = await aptos.waitForTransaction({
      transactionHash: response.hash,
    });
    dispatch(
      updateLiquidStake({
        id: payload.id,
        liquidity: committedTransaction.events[3].data.lp_tokens_received,
      })
    );
    showTransactionAlert(committedTransaction);
  };
  return {
    handleTransactionSwap,
    handleWithdraw,
    handleStake,
  };
};
