import { useDrag } from "react-dnd";
import { ItemTypes } from "../../Var";
import { IconType } from "react-icons";
interface ActionItemProps {
  title: string;
  icon: JSX.Element;
}
const ActionItem = ({ title, icon }: ActionItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { title,icon },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        
      }}
    >
      <div className="flex gap-1 px-3 py-2 border-2 border-blue-500 text-blue-500 border-solid rounded-2xl cursor-pointer ">
        <div className="self-center">{icon}</div>
        <span className="">{title}</span>
      </div>
      
    </div>
  );
};
export default ActionItem;
