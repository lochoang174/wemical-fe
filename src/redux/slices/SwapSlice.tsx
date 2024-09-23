import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InputType, IToken } from '../../types';

interface SwapState {
  openSelectToken: boolean;
  inputList: InputType[];
  idInputSelected: string
}

interface ISetAmount {
  id: string;
  newAmount: number;
}


const initialState: SwapState = {
  openSelectToken: false,
  inputList: [],
  idInputSelected:""
};

const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setInputList: (state, action: PayloadAction<InputType[]>) => {
      state.inputList = action.payload;
    },
    addInputItem: (state, action: PayloadAction<InputType>) => {
      state.inputList = [...state.inputList, action.payload];
    },
    setAmountInput: (state, action: PayloadAction<ISetAmount>) => {
      const { id, newAmount } = action.payload;
      const input = state.inputList.find((item) => item.id === id); // Search by id
      if (input) {
        input.amount = newAmount; // Assuming 'amount' exists in InputType
      }
    },
    setTokenInput: (state, action: PayloadAction<IToken>) => {
      const newToken = action.payload;
      const input = state.inputList.find((item) => item.id === state.idInputSelected); // Search by id
      if (input) {
        input.token = newToken; // Assuming 'token' exists in InputType
      }
      state.openSelectToken = false;

    },
    handleCloseSelectToken: (state) => {
      state.openSelectToken = false;
    },
    handlOpenSelectToken: (state,action: PayloadAction<string>) => {
      state.idInputSelected=action.payload
      state.openSelectToken = true;
    },
  },
});

export const { setInputList, handleCloseSelectToken, handlOpenSelectToken, addInputItem, setAmountInput, setTokenInput } = swapSlice.actions;

export default swapSlice.reducer;
