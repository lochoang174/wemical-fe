import { DropResult } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { addSwap, addStake, addWithdraw, setActionList } from '../redux/slices/TransactionSlice';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../redux/hooks';

export const useDragDropHandler = () => {
  const dispatch = useDispatch();
  const { actions } = useAppSelector((state) => state.transaction);

  const handleDrop = (item: any) => {
    const id = uuidv4();
    if (item.title === "Convert") {
      dispatch(addSwap(id));
    } else if (item.title === "Stake") {
      dispatch(addStake(id));
    } else if (item.title === "Withdraw") {
      dispatch(addWithdraw(id));
    }
  };

  const handleSwap = (sourceIndex: number, destinationIndex: number) => {
    const updatedItems = [...actions]; 
    const [removed] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(destinationIndex, 0, removed);
    dispatch(setActionList(updatedItems)); 
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    handleSwap(source.index, destination.index);
  };

  return {
    handleDrop,
    onDragEnd,
  };
};
