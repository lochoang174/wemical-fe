import React from "react";
import { SwapType } from "../../types";
import InputValue from "./InputValue";
import { useAppSelector } from "../../redux/hooks";
import { Draggable } from "@hello-pangea/dnd";
import { ActionPayload, ActionType } from "../../redux/slices/TransactionSlice";
import StakeInput from "../stake/StakeInput";
import WithdrawInput from "../withdraw/WithdrawInput";

interface Props {
  inputList: { type: ActionType; payload: ActionPayload }[];
}

const InputList = React.memo(
  ({ inputList }: Props) => {
    if (inputList.length === 0) {
      return (
        <span className="text-gray-300 text-xl mx-auto mt-10">No items</span>
      );
    }
    return (
      <div className=" flex flex-col gap-1 w-[100%]">
        {inputList.map((inputEle, index) => (
          <Draggable
            key={inputEle.payload.id}
            draggableId={inputEle.payload.id}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {inputEle.type === ActionType.SWAP ? (
                  <InputValue
                    swapEle={inputEle.payload}
                    key={inputEle.payload.id}
                    index={index}
                  />
                ) : inputEle.type === ActionType.STAKE ? (
                  <StakeInput
                    stakeEle={inputEle.payload}
                    key={inputEle.payload.id}
                  />
                ) : inputEle.type === ActionType.WITHDRAW ? (
                  <WithdrawInput
                    key={inputEle.payload.id}
                    withdrawEle={inputEle.payload}
                  />
                ) : null}
              </div>
            )}
          </Draggable>
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.inputList) ===
      JSON.stringify(nextProps.inputList)
    );
  }
);

export default InputList;
