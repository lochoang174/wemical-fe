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
  let prevResult = 0;
  const handleTransactionSwap = async () => {
    try {
      // Duyệt qua từng transaction trong mảng với for await
      for (let i = 0; i < inputList.length - 1; i++) {
        try {
          if (i === 0) {
            if (inputList[i].token.name === "USDC") {
              prevResult = inputList[i].amount * 1000000;
            } else {
              prevResult = inputList[i].amount * 100000000;
              console.log(prevResult)
            }
          }
          // Thực hiện từng transaction
          const response = await signAndSubmitTransaction({
            data: {
              function: `${MODULE_ADDRESS}::scripts_v3::swap`,
              typeArguments: [
                inputList[i].token.type, // coin to swap
                inputList[i + 1].token.type, // coin to swap to
                "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated", // curves (static)
              ],
              functionArguments: [
                prevResult, // amount of coin to swap
                10000, // minimum amount of coin to swap to
              ],
            },
          });

          // Chờ giao dịch hoàn tất
          const committedTransaction = await aptos.waitForTransaction({
            transactionHash: response.hash,
          });
          // @ts-ignore
          // receive_value = x_in!=0? y_out: x_out 
                    // @ts-ignore
                    console.log(committedTransaction.events[3].data)
                    // @ts-ignore

          prevResult = Number(committedTransaction.events[3].data.x_in)!==0? committedTransaction.events[3].data.y_out:committedTransaction.events[3].data.x_out;
          // @ts-ignore
          let show = prevResult;
          // console.log(committedTransaction.events[3].data)
          // if (inputList[i+1].token.name === "USDC") {
          //   prevResult = prevResult * 1000000;
          // } else {
          //   prevResult = prevResult * 100000000;
          //   console.log(prevResult)

          // }

          if (inputList[i + 1].token.name === "USDC") {
            show = show / 1000000;
          } else {
            show = show / 100000000;
          }
          dispatch(
            setAmountInput({ id: inputList[i + 1].id, newAmount: show })
          );
          const alertContent = (
            <>
              Transaction:{" "}
              <a
                href={`https://explorer.aptoslabs.com/txn/${committedTransaction.hash}?network=testnet`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {committedTransaction.hash}
              </a>
            </>
          );

          setAlert(alertContent, "success");
        } catch (error) {
          console.error(`Transaction ${i + 1} failed:`, error);
        }
      }

      console.log("All transactions completed");
    } catch (error) {
      console.error("Error during transactions:", error);
    }
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
