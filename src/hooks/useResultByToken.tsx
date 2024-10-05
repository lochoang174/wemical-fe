import React from 'react'
import { useAppSelector } from '../redux/hooks';
import { IToken } from '../types';
import { selectResultByToken } from '../redux/slices/TransactionSlice';

const useResultByToken = (token: IToken) => {
    const result = useAppSelector((state: RootState) => 
      selectResultByToken(state.transaction, token)
    );
    return result;
  };

export default useResultByToken
