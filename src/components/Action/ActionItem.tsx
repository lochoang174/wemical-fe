import { useDrag, useDragLayer } from "react-dnd";
import { ItemTypes } from "../../Var";
import { useEffect, useRef } from "react";

interface ActionItemProps {
  title: string;
  icon: JSX.Element;
}

const ActionItem = ({ title, icon }: ActionItemProps) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { title, icon },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  return (
    <div
      ref={drag}
      className="flex gap-1 px-3 py-2 border-2 border-white text-white border-solid rounded-2xl cursor-pointer"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="self-center">{icon}</div>
      <span>{title}</span>
    </div>
  );
};

export default ActionItem;
