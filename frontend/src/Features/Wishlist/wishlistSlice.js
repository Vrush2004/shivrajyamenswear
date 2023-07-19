import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToWishlist, deleteItemFromWishlist, fetchWishlistItems, updateWishlist } from './WishlistApi';

const initialState = {
    status: 'idle',
    items: [],
};

export const addToWishlistAsync = createAsyncThunk(
    'wishlist/addToWishlist',
    async (item) => {
        const response = await addToWishlist(item);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchWishlistItemsAsync = createAsyncThunk(
    'wishlist/fetchWishlistItems',
    async () => {
        const response = await fetchWishlistItems();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const updateWishlistAsync = createAsyncThunk(
    'wishlist/updateWishlist',
    async (update) => {
        const response = await updateWishlist(update);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const deleteItemFromWishlistAsync = createAsyncThunk(
    'wishlist/deleteItemFromWishlist',
    async (itemId) => {
        const response = await deleteItemFromWishlist(itemId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // ** add to wishlist **
            .addCase(addToWishlistAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToWishlistAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items.push(action.payload);
            })
            // ** fetch wishlist **
            .addCase(fetchWishlistItemsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlistItemsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            // ** update wishlist **
            .addCase(updateWishlistAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateWishlistAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                state.items[index] = action.payload;
            })
            // ** delete wishlist item **
            .addCase(deleteItemFromWishlistAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItemFromWishlistAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                state.items.splice(index, 1);
            });
    },
});

export const { increment } = wishlistSlice.actions;

export const selectItems = (state) => state.wishlist.items;

export default wishlistSlice.reducer;
