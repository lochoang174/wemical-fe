import React from "react";
import { InputType } from "../../types";
import InputValue from "./InputValue";
import { useAppSelector } from "../../redux/hooks";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  inputList: InputType[];
}

const InputList = React.memo(
  ({ inputList }: Props) => {
    if (inputList.length === 0) {
      return <span className="text-gray-300 text-xl m-auto">No items</span>;
    }
    return (
      <div className=" flex flex-col gap-1 w-[100%]">
        {inputList.map((input, index) => (
          <Draggable key={input.id} draggableId={input.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <InputValue input={input} key={input.id} index={index} />
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
