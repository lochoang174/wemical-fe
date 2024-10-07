import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SwapType, IToken, StakeType, WithdrawType, ResultType } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { CryptoList } from "../../utils/CryptoList";
import { PoolType } from "../../components/DropdownPool/DropDownPool";
import { RootState } from "../store";
export enum ActionType {
  SWAP = "swap",
  STAKE = "stake",
  WITHDRAW = "withdraw",
}

// Union type cho các action payload
export type ActionPayload = SwapType | StakeType | WithdrawType;

// State structure
interface TransactionState {
  actions: { type: ActionType; payload: ActionPayload }[];
  resultList:ResultType[]
}

const initialState: TransactionState = {
  actions: [],
  resultList:[]
};

interface amountWithdrawPros {
  id: string;
  amount1: number;
  amount2: number;
}

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addSwap: (state, action: PayloadAction<string>) => {
      const item: SwapType = {
        amount: 0,
        id: action.payload,
        token: CryptoList[0],
      };
      state.actions.push({ type: ActionType.SWAP, payload: item });
      
    },
    addStake: (state, action: PayloadAction<string>) => {
      const item: StakeType = {
        id: action.payload,
        pool: null,
        amountToken1: null,
        amountToken2: null,
        liquidity: null,
      };
      state.actions.push({ type: ActionType.STAKE, payload: item });
    },
    addWithdraw: (state, action: PayloadAction<string>) => {
      const item: WithdrawType = {
        id: action.payload,
        pool: null,
        amountToken1: null,
        amountToken2: null,
        liquidity: null,
      };
      state.actions.push({ type: ActionType.WITHDRAW, payload: item });
    },

    updatePool: (
      state,
      action: PayloadAction<{
        id: string;
        pool: PoolType;
        actionSelect: ActionType;
      }>
    ) => {
      const { id, pool, actionSelect } = action.payload;

      const withdrawIndex = state.actions.findIndex(
        (action) => action.type === actionSelect && action.payload.id === id
      );
      if (withdrawIndex !== -1) {
        const withdrawAction = state.actions[withdrawIndex]
          .payload as WithdrawType;
        withdrawAction.pool = pool; // Cập nhật pool
      }
    },

    updateWithdrawLiquidity: (
      state,
      action: PayloadAction<{ id: string; liquidity: number }>
    ) => {
      const { id, liquidity } = action.payload;
      const withdrawIndex = state.actions.findIndex(
        (action) =>
          action.type === ActionType.WITHDRAW && action.payload.id === id
      );
      if (withdrawIndex !== -1) {
        const withdrawAction = state.actions[withdrawIndex]
          .payload as WithdrawType;
        withdrawAction.liquidity = liquidity; // Cập nhật liquidity
      }
    },
    updateAmountWithdraw: (
      state,
      action: PayloadAction<amountWithdrawPros>
    ) => {
      const { id, amount1, amount2 } = action.payload;

      const withdrawIndex = state.actions.findIndex(
        (action) =>
          action.type === ActionType.WITHDRAW && action.payload.id === id
      );
      if (withdrawIndex !== -1) {
        const withdrawAction = state.actions[withdrawIndex]
          .payload as WithdrawType;
        withdrawAction.amountToken1 = amount1;
        withdrawAction.amountToken2 = amount2;
        state.resultList.push({
          action: ActionType.WITHDRAW,
          amount : amount1,
          token :withdrawAction.pool?.token1
        })
        state.resultList.push({
          action: ActionType.WITHDRAW,
          amount : amount2,
          token :withdrawAction.pool?.token2
        })
      }
    },
    updateStakeAmount: (
      state,
      action: PayloadAction<{
        id: string;
        amountIndex: string;
        amountValue: number;
      }>
    ) => {
      const { id, amountIndex, amountValue } = action.payload;

      const stakeIndex = state.actions.findIndex(
        (action) => action.type === ActionType.STAKE && action.payload.id === id
      );
      if (stakeIndex !== -1) {
        const stakeAction = state.actions[stakeIndex].payload as StakeType;
        if (amountIndex === "amount1") {
          stakeAction.amountToken1 = amountValue;
        } else {
          stakeAction.amountToken2 = amountValue;
        }
      }
    },
    updateLiquidStake: (
      state,
      action: PayloadAction<{ id: string; liquidity: number }>
    ) => {
      const { id, liquidity } = action.payload;

      const stakeIndex = state.actions.findIndex(
        (action) => action.type === ActionType.STAKE && action.payload.id === id
      );
      if (stakeIndex !== -1) {
        const stakeAction = state.actions[stakeIndex].payload as StakeType;
        stakeAction.liquidity = liquidity;
      }
    },
    updateSwapToken: (
      state,
      action: PayloadAction<{id:string,token:IToken}>
    ) => {
      const { id, token } = action.payload;
      const swapIndex = state.actions.findIndex(
        (action) => action.type === ActionType.SWAP && action.payload.id === id
      );
      if (swapIndex !== -1) {
        const swapAction = state.actions[swapIndex].payload as SwapType;
        swapAction.token = token;
      }
    },

    updateSwapAmount: (
      state,
      action: PayloadAction<{id:string,amount:number}>
    ) => {
      const { id, amount } = action.payload;
      const swapIndex = state.actions.findIndex(
        (action) => action.type === ActionType.SWAP && action.payload.id === id
      );
      if (swapIndex !== -1) {
        const swapAction = state.actions[swapIndex].payload as SwapType;
        swapAction.amount = amount;
      }
   
    },
    setActionList: (
      state,
      action: PayloadAction<{ type: ActionType; payload: ActionPayload }[]>
    ) => {
      // Replace the current actions list with the new one from the payload
      if(action.payload.length===0){
        state.resultList=[]
      }
      state.actions = action.payload;
    },
    deleteAction: (state, action: PayloadAction<string>) => {
      // Filter out the action with the matching id from the actions list
      state.actions = state.actions.filter(
        (a) => a.payload.id !== action.payload
      );
    },
    
    addResultElement: (state, action: PayloadAction<ResultType>) => {
      // Push the new result element into the resultList
      state.resultList.push(action.payload);
    },
    resetResultList: (state, action: PayloadAction<void>) => {
      state.resultList=[]
    },
   
  },

});
export const selectSwapActions = createSelector(
  (state: RootState) => state.transaction.actions, // Input selector: gets actions from state
  (actions) => actions.filter(action => action.type === ActionType.SWAP) // Output selector: filters swap actions
);
// export const selectResultByToken = (state: TransactionState, token: IToken): ResultType | undefined => {
//   return state.resultList.find(result => result.token.name === token.name);
// };

export const {
  addSwap,
  addStake,
  addWithdraw,
  updateAmountWithdraw,
  updatePool,
  updateWithdrawLiquidity,
  updateStakeAmount,
  updateLiquidStake,
  updateSwapAmount,
  updateSwapToken,
  setActionList,
  addResultElement,
  deleteAction,
  resetResultList
} = transactionSlice.actions;

export default transactionSlice.reducer;
