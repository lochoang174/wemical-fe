import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToken } from '../../types';
import { CryptoList } from '../../utils/CryptoList';

interface SwapState {
  tokenFrom: IToken | null;
  tokenTo: IToken | null;
  amountFrom: number;
  amountTo: number;
  openSelectToken: boolean;
  isSelectingFromToken: boolean;
}

const initialState: SwapState = {
  tokenFrom: CryptoList[0],
  tokenTo: CryptoList[1],
  amountFrom: 0,
  amountTo: 0,
  openSelectToken: false,
  isSelectingFromToken: false,
};

const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setTokenFrom: (state, action: PayloadAction<IToken>) => {
      state.tokenFrom = action.payload;
    },
    setTokenTo: (state, action: PayloadAction<IToken>) => {
      state.tokenTo = action.payload;
    },
    setAmountFrom: (state, action: PayloadAction<number>) => {
      state.amountFrom = action.payload;
    },
    setAmountTo: (state, action: PayloadAction<number>) => {
      state.amountTo = action.payload;
    },
    swapTokens: (state) => {
      const tempToken = state.tokenFrom;
      state.tokenFrom = state.tokenTo;
      state.tokenTo = tempToken;
      const tempAmount = state.amountFrom;
      state.amountFrom = state.amountTo;
      state.amountTo = tempAmount;
    },
    handleCloseSelectToken: (state) => {
      state.openSelectToken = false;
    },
    handlOpenSelectToken: (state, action: PayloadAction<boolean>) => {
      state.openSelectToken = true;
      state.isSelectingFromToken = action.payload;
    },
  },
});

export const { setTokenFrom, setTokenTo, setAmountFrom, setAmountTo, swapTokens, handleCloseSelectToken, handlOpenSelectToken } = swapSlice.actions;

export default swapSlice.reducer;

