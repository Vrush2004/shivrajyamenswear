import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    trackedOrderData: null,
    trackedOrderError: null
};

export const trackOrderSlice = createSlice({
    name: 'trackOrder',
    initialState,
    reducers: {
        trackedOrderData: (state, action) => {
            state.trackedOrderData = action.payload
        },
        trackedOrderError: (state, action) => {
            state.trackedOrderError = action.payload
        }
    }
});


export const { trackedOrderData, trackedOrderError } = trackOrderSlice.actions;

export const selectTrackedOrderData = (state)=>state.trackOrder.trackedOrderData;
export const selectTrackedOrderError = (state)=>state.trackOrder.trackedOrderError;

export default trackOrderSlice.reducer;