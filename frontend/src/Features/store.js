import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import productReducer from './product/productSlice';
import wishlistReducer from './Wishlist/wishlistSlice';
import checkoutReducer from './checkout/checkoutSlice';
import orderReducer from './orders/orderSlice';

import authReducer from '../Admin/Features/Login/authSlice';

export const store = configureStore({
  reducer: {
    product:productReducer,
    wishlist:wishlistReducer,
    checkout:checkoutReducer,
    orders:orderReducer,
    auth:authReducer
  },
  middleware: getDefaultMiddleware({
    immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
  }),
})