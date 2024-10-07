import { useDrop } from "react-dnd";
import { ItemTypes } from "../../Var";
interface Pros {
  onDrop: (item: any) => void;
}
const DropContainer = ({ onDrop }: Pros) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item: any) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        height: "50px",
        width: "100%",
        border: `2px dashed ${isOver ?"white":"#C4C4C4"}`,
        backgroundColor:"transparent",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: isOver ?"white":"#C4C4C4",
        borderRadius:"16px"
      }}
    >
      Drag and drop, change the actions in the box
    </div>
  );
};
export default DropContainer;
