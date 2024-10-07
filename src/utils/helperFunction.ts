import { IToken, PoolDisplay } from "../types";
import { poolList } from "./PoolList";

export const checkExistPool = (token1: IToken, token2: IToken):PoolDisplay|null => {
    const pool = poolList.find(
      (pool2) =>
        pool2.tokens.includes(token1.name) &&
        pool2.tokens.includes(token2.name ?? "")
    );

    return pool ? pool : null; // Return empty string if no image is found
  };
  export  const displayAmount =(tooken:IToken,amount:number):number=>{
    if(tooken.name==="USDC"){
      return amount/100000000
    }
    return amount/1000000
  }
  export  const handleInputAmountToken =(tooken:IToken,amount:number):number=>{
    if(tooken.name==="USDC"){
      return amount*100000000
    }
    return amount*1000000
  }