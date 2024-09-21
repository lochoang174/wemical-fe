import { configureStore } from '@reduxjs/toolkit'
import SwapSlice from './slices/SwapSlice'


export const store = configureStore({
  reducer: {
    swap: SwapSlice,

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch