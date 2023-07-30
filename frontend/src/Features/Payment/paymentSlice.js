import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handlePayment, initPayment } from './paymentApi';

const initialState = {
    status: 'idle',
    paymentdata: null,
    orderId: "",
    paymentSuccess: false
};

export const handlePaymentAsync = createAsyncThunk(
    'payment/handlePayment',
    async (orderDetails, { rejectWithValue }) => {
        try {
            const response = await handlePayment(orderDetails);
            // The value we return becomes the `fulfilled` action payload
            console.log("handle payment:", response);
            return response; // Return the response directly
        } catch (error) {
            // If there's an error, reject the promise with the error message and paymentSuccess flag
            return rejectWithValue({ message: error.message, paymentSuccess: false });
        }
    }
);

export const initPaymentAsync = createAsyncThunk(
    'payment/initPayment',
    async (data, orderdetails, { rejectWithValue }) => {
        try {
            const response = await initPayment(data, orderdetails);
            console.log("init payment fun: ", response);
            return response;
        } catch (error) {
            return rejectWithValue({ message: error.message, paymentSuccess: false });
        }
    }
);

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        orderId: (state,action) => {
            state.orderId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(handlePaymentAsync.pending, (state, action) => {
                state.status = 'loading handlePayment';
            })
            .addCase(handlePaymentAsync.fulfilled, (state, action) => {
                state.status = 'idle handlePayment';
                console.log(action.payload);
                state.paymentdata = action.payload;
            })
            .addCase(handlePaymentAsync.rejected, (state, action) => {
                state.status = 'error';
                // state.error = action.payload.message;
                // Payment failed, set paymentSuccess to false
                state.paymentdata = null;
            })
            // create order - for user
            .addCase(initPaymentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(initPaymentAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                // state.orderId = action.payload.order_id;
                // Check if paymentSuccess is true in the action.payload from the backend
                state.paymentSuccess = action.payload.paymentSuccess === true;
            })
            .addCase(initPaymentAsync.rejected, (state, action) => {
                state.status = 'idle';
                // state.error = action.payload.message;
                // Payment failed, set paymentSuccess to false
                state.paymentSuccess = action.payload.paymentSuccess === false;
            });
    },
});

export const { orderId } = paymentSlice.actions;

export const selectOrderId = (state) => state.payment.orderId

export default paymentSlice.reducer;
