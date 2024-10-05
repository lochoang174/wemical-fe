import React, { useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "../Var";
import DropContainer from "./Action/DropContainer";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import InputList from "./swap/InputList";
import ActionList from "./Action/ActionList";
import {
  IToken,
  ResultType,
  StakeType,
  SwapType,
  WithdrawType,
} from "../types";
import { useAlert } from "../contexts/AlerProvider";
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
  updateSwapAmount,
} from "../redux/slices/TransactionSlice";
import { RootState } from "../redux/store";
import { useTransactionHandler } from "../hooks/useTransactionHandler";
import { useDragDropHandler } from "../hooks/useDragDropHandler";

const SwapToken = () => {
  // const { actions, resultList } = useAppSelector((state) => state.transaction);
  // // const  = useAppSelector((state) => state.transaction.resultList);
  // // const resultList = useAppSelector((state) => state.transaction.resultList); // Call useSelector in the component body

  // const state = useAppSelector((state) => state.transaction);
  // const resultRef = useRef(resultList); // Sử dụng useRef để lưu giá trị actions mới nhất

  // const { signAndSubmitTransaction } = useWallet();
  // const { setAlert } = useAlert();
  // const dispatch = useAppDispatch();
  // const swapActions = useAppSelector((state: RootState) =>
  //   selectSwapActions(state)
  // );
  // const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  // const aptos = new Aptos(aptosConfig);

  // useEffect(() => {
  //   resultRef.current = resultList;
  // }, [resultList]);
  // const handleDrop = (item: any) => {
  //   const id = uuidv4();

  //   if (item.title === "Convert") {
  //     dispatch(addSwap(id));
  //   } else if (item.title === "Stake") {
  //     dispatch(addStake(id));
  //   } else if (item.title === "Withdraw") {
  //     dispatch(addWithdraw(id));
  //   }
  //   console.log(actions);
  // };

  // const onDragEnd = (result: DropResult) => {
  //   const { destination, source } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }
  //   handleSwap(source.index, destination.index);
  // };
  // const handleSwap = (sourceIndex: number, destinationIndex: number) => {
  //   const updatedItems = [...actions]; // Create a shallow copy of the array
  //   const [removed] = updatedItems.splice(sourceIndex, 1);
  //   updatedItems.splice(destinationIndex, 0, removed);
  //   dispatch(setActionList(updatedItems)); // Dispatch the updated list to Redux store
  // };
  // const addResultElementSync = (
  //   action: ActionType,
  //   amount: number,
  //   token: IToken
  // ) => {
  //   dispatch(addResultElement({ action, amount, token }));
  // };
  // const handleTransactionSwap = async () => {
  //   let prevResult = 0;

  //   for (let i = 0; i < swapActions.length - 1; i++) {
  //     try {
  //       prevResult = calculateInitialAmount(i, prevResult);

  //       // execute transaction and wait for response
  //       const response = await performSwapTransaction(i, prevResult);
  //       const committedTransaction = await aptos.waitForTransaction({
  //         transactionHash: response.hash,
  //       });

  //       prevResult = getSwapResult(committedTransaction);

  //       // update amount token after transaction
  //       const formattedAmount = formatSwapAmount(i + 1, prevResult);
  //       dispatch(
  //         updateSwapAmount({
  //           id: swapActions[i + 1].payload.id,
  //           amount: formattedAmount,
  //         })
  //       );

  //       // show successful transaction
  //       showTransactionAlert(committedTransaction);
  //     } catch (error) {
  //       console.error(`Transaction ${i + 1} failed:`, error);
  //       break;
  //     }
  //   }
  //   const lastElement = swapActions[swapActions.length - 1].payload as SwapType;
  //   if (lastElement) {
  //     addResultElementSync(ActionType.SWAP, prevResult, lastElement.token);
  //   }

  //   console.log("All transactions completed");
  // };

  // const calculateInitialAmount = (index: number, prevResult: number) => {
  //   if (index === 0) {
  //     const ele = swapActions[index].payload as SwapType;

  //     const result1 = findResultByToken(ele.token);
  //     if (result1) {
  //       return result1.amount;
  //     }
  //     return ele.token.name === "USDC"
  //       ? ele.amount * 1000000
  //       : ele.amount * 100000000;
  //   }
  //   return prevResult;
  // };

  // const performSwapTransaction = async (index: number, prevResult: number) => {
  //   return await signAndSubmitTransaction({
  //     data: {
  //       function: `${MODULE_ADDRESS}::scripts_v3::swap`,
  //       typeArguments: [
  //         swapActions[index].payload.token.type, // coin to swap
  //         swapActions[index + 1].payload.token.type, // coin to swap to
  //         "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated", // curve (static)
  //       ],
  //       functionArguments: [
  //         prevResult, // amount to swap
  //         10000, // minimum amount to swap
  //       ],
  //     },
  //   });
  // };

  // const getSwapResult = (transaction: any) => {
  //   const swapEvent = transaction.events[3];
  //   return Number(swapEvent.data.x_in) !== 0
  //     ? swapEvent.data.y_out
  //     : swapEvent.data.x_out;
  // };

  // const formatSwapAmount = (index: number, amount: number) => {
  //   return swapActions[index].payload.token.name === "USDC"
  //     ? amount / 1000000
  //     : amount / 100000000;
  // };

  // const handleExecute = async () => {
  //   let completedSwap = false;
  //   console.log(actions);

  //   for (let i = 0; i < actions.length; i++) {
  //     console.log(resultList);

  //     if (actions[i].type === ActionType.SWAP && completedSwap === false) {
  //       await handleTransactionSwap();
  //       completedSwap = true;
  //     } else if (actions[i].type === ActionType.WITHDRAW) {
  //       await handleWithdraw(actions[i].payload as WithdrawType);
  //     } else if (actions[i].type === ActionType.STAKE) {
  //       await handleStake(actions[i].payload as StakeType);
  //     }
  //   }
  // };
  // const findResultByToken = (token: IToken): ResultType | null => {
  //   console.log(resultRef.current);

  //   if (resultRef.current.length === 0) {
  //     console.log("Result list is empty, waiting for data.");
  //     return null;
  //   }

  //   return (
  //     resultRef.current.find((result) => result.token.name === token.name) ||
  //     null
  //   );
  // };
  // function calculateAmount(
  //   tokenName: string,
  //   amount: number | undefined
  // ): number {
  //   const multiplier = tokenName === "USDC" ? 1000000 : 1000000000;
  //   return amount ? amount * multiplier : 0;
  // }
  // const handleStake = async (payload: StakeType) => {
  //   let amount1 = calculateAmount(
  //     payload.pool?.token1.name ?? "",
  //     payload.amountToken1 ?? 0
  //   );
  //   let amount2 = calculateAmount(
  //     payload.pool?.token2.name ?? "",
  //     payload.amountToken2 ?? 0
  //   );

  //   const result1 = findResultByToken(payload.pool?.token1);
  //   console.log(result1);

  //   const result2 = findResultByToken(payload.pool?.token2);
  //   if (result1) {
  //     amount1 = result1.amount;
  //   }
  //   if (result2) {
  //     amount2 = result2.amount;
  //   }
  //   const response = await signAndSubmitTransaction({
  //     data: {
  //       function: `${MODULE_ADDRESS}::scripts_v3::add_liquidity`,
  //       typeArguments: [
  //         `0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::${payload.pool?.token1.name}`,

  //         `0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::${payload.pool?.token2.name}`,
  //         "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated",
  //       ],
  //       functionArguments: [
  //         amount1, //100000000 amount coin x to stake
  //         1111, // minimum amount of coin x to  add as liquidity (slippage). [tham so nay cu de la 1111]
  //         amount2, //10000000 amount coin y to stake
  //         1111, //minimum amount of coin x to  add as liquidity (slippage). [tham so nay cu de la 1111]
  //       ],
  //     },
  //   });
  //   const committedTransaction = await aptos.waitForTransaction({
  //     transactionHash: response.hash,
  //   });
  //   dispatch(
  //     updateLiquidStake({
  //       id: payload.id,
  //       liquidity: committedTransaction.events[3].data.lp_tokens_received,
  //     })
  //   );
  //   showTransactionAlert(committedTransaction);
  // };
  // const handleWithdraw = async (payload: WithdrawType) => {
  //   const response = await signAndSubmitTransaction({
  //     data: {
  //       function: `${MODULE_ADDRESS}::scripts_v3::remove_liquidity`,
  //       typeArguments: [
  //         `0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::${payload.pool?.token1.name}`,

  //         `0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::${payload.pool?.token2.name}`,
  //         "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated", //curves (static)
  //       ],
  //       functionArguments: [
  //         payload.liquidity, // amount of coin(LiquidLP) to withdraw
  //         111111, // minimum amount of coin x to widthdraw
  //         111111, // minimum amount of coin y to widthdraw
  //       ],
  //     },
  //   });
  //   const committedTransaction = await aptos.waitForTransaction({
  //     transactionHash: response.hash,
  //   });
  //   dispatch(
  //     updateAmountWithdraw({
  //       id: payload.id,
  //       amount1: committedTransaction.events[2].data.returned_x_val,
  //       amount2: committedTransaction.events[2].data.returned_y_val,
  //     })
  //   );

  //   showTransactionAlert(committedTransaction);
  // };
  // const showTransactionAlert = (transaction: any) => {
  //   const alertContent = (
  //     <>
  //       Transaction:{" "}
  //       <a
  //         href={`https://explorer.aptoslabs.com/txn/${transaction.hash}?network=testnet`}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         {transaction.hash}
  //       </a>
  //     </>
  //   );
  //   setAlert(alertContent, "success");
  // };
  const { handleTransactionSwap,handleStake,handleWithdraw} = useTransactionHandler();
  const { handleDrop, onDragEnd } = useDragDropHandler();
  const dispatch = useAppDispatch();
  const actions = useAppSelector((state) => state.transaction.actions);

  const handleExecute = async () => {
    let completedSwap = false;

    for (let i = 0; i < actions.length; i++) {
      if (actions[i].type === ActionType.SWAP && !completedSwap) {
        await handleTransactionSwap();
        completedSwap = true;
      } else if (actions[i].type === ActionType.WITHDRAW) {
        await handleWithdraw(actions[i].payload as WithdrawType);
      } else if (actions[i].type === ActionType.STAKE) {
        await handleStake(actions[i].payload as StakeType);
      }
    }
    
  };
  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-5 ">
      <ActionList></ActionList>
      <div className="rounded-3xl w-[810px] h-[540px] flex flex-col gap-4 items-center relative ">
        <DropContainer
          onDrop={(item) => {
            handleDrop(item);
          }}
        ></DropContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col overflow-auto  flex-grow w-full"
              >
                <InputList inputList={actions}></InputList>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {actions.length !== 0 && (
          <>
            <div className="flex justify-between w-[100%]">
              <div
                className="p-3 bg-[transparent] text-white border-white border-solid border-[1px] rounded-full w-[100px] text-center cursor-pointer self-end"
                onClick={() => {
                  dispatch(setActionList([]));
                }}
              >
                Reset
              </div>

              <div
                className="p-3 bg-white text-black rounded-full w-[100px] text-center cursor-pointer self-end"
                onClick={() => handleExecute()}
              >
                Execute
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SwapToken;
