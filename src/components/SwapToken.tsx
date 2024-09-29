import React, { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { CryptoList } from "../utils/CryptoList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addInputItem,
  handleCloseSelectToken,
  setAmountInput,
  setInputList,
} from "../redux/slices/SwapSlice";
import SelectToken from "./Input/SelectToken";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "../Var";
import DropContainer from "./Action/DropContainer";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import InputList from "./Input/InputList";
import ActionList from "./Action/ActionList";
import { ActionType } from "../types";
import { useAlert } from "../contexts/AlerProvider";

const SwapToken = () => {
  const { inputList } = useAppSelector((state) => state.swap);
  const { openSelectToken } = useAppSelector((state) => state.swap);
  const { signAndSubmitTransaction } = useWallet();
  const { setAlert } = useAlert();
  const dispatch = useAppDispatch();
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);

  const handleClose = useCallback(() => {
    dispatch(handleCloseSelectToken());
  }, []);

  const handleDrop = (item: ActionType) => {
    const id = uuidv4();
    dispatch(
      addInputItem({
        amount: 0,
        action: item,
        id,
        token: CryptoList[0],
      })
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    handleSwap(source.index, destination.index);
  };
  const handleSwap = (sourceIndex: number, destinationIndex: number) => {
    const updatedItems = [...inputList]; // Create a shallow copy of the array
    const [removed] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(destinationIndex, 0, removed);
    dispatch(setInputList(updatedItems)); // Dispatch the updated list to Redux store
  };
 
  const handleTransactionSwap = async () => {
   
      let prevResult = 0;
  
      for (let i = 0; i < inputList.length - 1; i++) {
        try {
          prevResult = calculateInitialAmount(i, prevResult);
  
          // execute transaction and wait for response
          const response = await performSwapTransaction(i, prevResult);
          const committedTransaction = await aptos.waitForTransaction({
            transactionHash: response.hash,
          });
  
          prevResult = getSwapResult(committedTransaction);
  
          // update amount token after transaction
          const formattedAmount = formatSwapAmount(i + 1, prevResult);
          dispatch(setAmountInput({ id: inputList[i + 1].id, newAmount: formattedAmount }));
  
          // show successful transaction
          showTransactionAlert(committedTransaction);
  
        } catch (error) {
          console.error(`Transaction ${i + 1} failed:`, error);
          break;
        }
      }
  
      console.log("All transactions completed");
    
  };
  
  const calculateInitialAmount = (index:number, prevResult:number) => {
    if (index === 0) {
      return inputList[index].token.name === "USDC" 
        ? inputList[index].amount * 1000000 
        : inputList[index].amount * 100000000;
    }
    return prevResult;
  };
  
  const performSwapTransaction = async (index:number, prevResult:number) => {
    return await signAndSubmitTransaction({
      data: {
        function: `${MODULE_ADDRESS}::scripts_v3::swap`,
        typeArguments: [
          inputList[index].token.type,      // coin to swap
          inputList[index + 1].token.type,  // coin to swap to
          "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated", // curve (static)
        ],
        functionArguments: [
          prevResult,  // amount to swap
          10000,       // minimum amount to swap
        ],
      },
    });
  };
  
  const getSwapResult = (transaction:any) => {
    const swapEvent = transaction.events[3];
    return Number(swapEvent.data.x_in) !== 0 
      ? swapEvent.data.y_out 
      : swapEvent.data.x_out;
  };
  
  const formatSwapAmount = (index:number, amount:number) => {
    return inputList[index].token.name === "USDC" 
      ? amount / 1000000 
      : amount / 100000000;
  };
  
  const showTransactionAlert = (transaction:any) => {
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
  
  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-5 ">
      <ActionList></ActionList>
      <div className="rounded-3xl w-[810px] h-[540px] flex flex-col gap-4 items-center relative ">
        <DropContainer onDrop={handleDrop}></DropContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col overflow-auto  flex-grow w-full"
              >
                <InputList inputList={inputList}></InputList>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {inputList.length !== 0 && (
          <>
            <div className="flex justify-between w-[100%]">
              <div
                className="p-3 bg-[transparent] text-white border-white border-solid border-[1px] rounded-full w-[100px] text-center cursor-pointer self-end"
                onClick={() => {
                  dispatch(setInputList([]));
                }}
              >
                Reset
              </div>
              <div
                className="p-3 bg-white text-black rounded-full w-[100px] text-center cursor-pointer self-end"
                onClick={() => {
                  // transaction1(transaction2);
                  handleTransactionSwap();
                }}
              >
                Swap
              </div>
            </div>
          </>
        )}
      </div>
      <SelectToken
        handleClose={handleClose}
        open={openSelectToken}
      ></SelectToken>
    </div>
  );
};

export default SwapToken;
