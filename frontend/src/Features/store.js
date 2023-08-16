import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import productReducer from './product/productSlice';
import wishlistReducer from './Wishlist/wishlistSlice';
import checkoutReducer from './checkout/checkoutSlice';
import orderReducer from './orders/orderSlice';
import filterOrderReducer from '../Admin/Features/orders/filterOrderSlice';
import trackOrderReducer from './trackOrder/trackOrderSlice';
import { adminOrdersApi } from '../Admin/Features/orders/adminOrdersApi';
import { trackOrderApi } from './trackOrder/trackOrderApi';

import authReducer from '../Admin/Features/Login/authSlice';

export const store = configureStore({
  reducer: {
    [adminOrdersApi.reducerPath]: adminOrdersApi.reducer,
    [trackOrderApi.reducerPath]:trackOrderApi.reducer,
    filterOrders:filterOrderReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    auth: authReducer,
    trackOrder:trackOrderReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminOrdersApi.middleware,trackOrderApi.middleware),
})