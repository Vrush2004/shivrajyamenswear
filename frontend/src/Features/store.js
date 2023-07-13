import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../Features/product/productSlice';

export const store = configureStore({
  reducer: {
    product:productReducer
  },
})