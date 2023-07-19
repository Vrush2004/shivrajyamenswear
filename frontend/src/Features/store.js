import { configureStore } from '@reduxjs/toolkit'
import productReducer from './product/productSlice';
import wishlistReducer from './Wishlist/wishlistSlice';

export const store = configureStore({
  reducer: {
    product:productReducer,
    wishlist:wishlistReducer
  },
})