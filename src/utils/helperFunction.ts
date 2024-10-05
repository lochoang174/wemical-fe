import { IToken } from "../types";
import { poolList } from "./PoolList";

export const checkExistPool = (token1: IToken, token2: IToken): string => {
    const pool = poolList.find(
      (pool2) =>
        pool2.tokens.includes(token1.name) &&
        pool2.tokens.includes(token2.name ?? "")
    );

    return pool ? pool.image : ""; // Return empty string if no image is found
  };