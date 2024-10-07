import { PoolType } from "../components/DropdownPool/DropDownPool";
import { ActionType } from "../redux/slices/TransactionSlice";

export interface IToken {
  name: string;
  subname: string;
  icon: string;
  type: string;
}
export interface SwapType {
  id: string;
  // action:ActionType,
  token: IToken;
  amount: number;
}
// export interface TransactionOrder{
//   list: (SwapType[] | StakeType | WithdrawpType)[];
// }
export interface ResultType{
  action:ActionType
  token:IToken,
  amount:number
}

export interface PoolDisplay{
  tokens:string[],
  name:string,
  image:string
}
export interface StakeType {
  id: string;
  pool: PoolType | null;
  amountToken1: number | null;
  amountToken2: number | null;
  liquidity: number | null;
}
export interface WithdrawType {
  id: string;
  pool: PoolType | null;
  amountToken1: number | null;
  amountToken2: number | null;
  liquidity: number | null;
}
