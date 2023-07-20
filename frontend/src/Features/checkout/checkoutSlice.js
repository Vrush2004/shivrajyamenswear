import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    buyNowItem: [],
    deliveryCharges:40,
    paymentMode:"UPI",
    shippingInfo:null
}

export const buyNowAsync = createAsyncThunk(
    'buyNowThunk',
    async (item) => {
        try {
            let selectedBuyNow = JSON.parse(localStorage.getItem("buyNow")) || [];
            selectedBuyNow.push(item);
            localStorage.setItem("buyNow", JSON.stringify(selectedBuyNow));
            return item;
        } catch (error) {
            // Handle any error that may occur during the process
            console.error('Error occurred while adding to buy now:', error);
            throw error;
        }
    }
)

const checkoutSlice = createSlice({
    name: 'buyNow',
    initialState,
    reducers: {
        buyNowProduct: (state, action) => {
            state.buyNowItem = action.payload;
        },
        deliveryCharges:(state,action)=>{
            state.deliveryCharges = action.payload
        },
        orderPaymentMode:(state,action)=>{
            state.paymentMode = action.payload
        }
    },
})

export const { buyNowProduct,deliveryCharges,orderPaymentMode } = checkoutSlice.actions;

export const selectBuyNowProduct = (state) => state.checkout.buyNowItem;
export const selectDeliveryCharges = (state) => state.checkout.deliveryCharges;
export const selectPaymentMode = (state) => state.checkout.paymentMode;


export default checkoutSlice.reducer;