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
  StakeType,
  WithdrawType,
} from "../types";
import {
  ActionType,

  resetResultList,

  setActionList,

} from "../redux/slices/TransactionSlice";
import { useTransactionHandler } from "../hooks/useTransactionHandler";
import { useDragDropHandler } from "../hooks/useDragDropHandler";

const SwapToken = () => {

  const { handleTransactionSwap,handleStake,handleWithdraw} = useTransactionHandler();
  const { handleDrop, onDragEnd } = useDragDropHandler();
  const dispatch = useAppDispatch();
  const actions = useAppSelector((state) => state.transaction.actions);

  const handleExecute = async () => {
    let completedSwap = false;

    for (let i = 0; i < actions.length; i++) {
      try {
        if (actions[i].type === ActionType.SWAP && !completedSwap) {
          await handleTransactionSwap();
          completedSwap = true;
        } else if (actions[i].type === ActionType.WITHDRAW) {
          await handleWithdraw(actions[i].payload as WithdrawType);
        } else if (actions[i].type === ActionType.STAKE) {
          await handleStake(actions[i].payload as StakeType);
        }
      } catch (error) {
        break;
      }

    }
    dispatch(resetResultList())
    
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
