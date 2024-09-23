import { useDrop } from "react-dnd";
import { ItemTypes } from "../../Var";
interface Pros {
  onDrop: (item: string) => void;
}
const DropContainer = ({ onDrop }: Pros) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item: string) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        height: "50px",
        width: "90%",
        border: "2px dashed blue",
        backgroundColor: isOver ? "lightblue" : "white",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "blue",
      }}
    >
      Drop here
    </div>
  );
};
export default DropContainer;
