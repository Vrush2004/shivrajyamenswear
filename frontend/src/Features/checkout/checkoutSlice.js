import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    buyNowItem: [],
    paymentMode:"UPI",
}

const checkoutSlice = createSlice({
    name: 'buyNow',
    initialState,
    reducers: {
        buyNowProduct: (state, action) => {
            state.buyNowItem = action.payload;
        },
        orderPaymentMode:(state,action)=>{
            state.paymentMode = action.payload
        }
    },
})

export const { buyNowProduct,orderPaymentMode } = checkoutSlice.actions;

export const selectBuyNowProduct = (state) => state.checkout.buyNowItem;
export const selectPaymentMode = (state) => state.checkout.paymentMode;


export default checkoutSlice.reducer;