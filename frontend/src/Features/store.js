import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import productReducer from './product/productSlice';
import wishlistReducer from './Wishlist/wishlistSlice';
import checkoutReducer from './checkout/checkoutSlice';

export const store = configureStore({
  reducer: {
    product:productReducer,
    wishlist:wishlistReducer,
    checkout:checkoutReducer
  },
  middleware: getDefaultMiddleware({
    immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
  }),
})