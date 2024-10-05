import { configureStore } from '@reduxjs/toolkit'
import SwapSlice from './slices/SwapSlice'
import TransactionSlice from './slices/TransactionSlice'


export const store = configureStore({
  reducer: {
    swap: SwapSlice,
    transaction:TransactionSlice

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch