import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchProductsByFilters } from './productApi';

const initialState = {
    products: [],
    status: 'idle',
    selectedProduct:"All Products"
}

export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async () => {
        const response = await fetchAllProducts();
        return response.data;
    }
)
export const fetchProductsByFiltersAsync = createAsyncThunk(
    'product/fetchProductsByFilters',
    async (filter) => {
        const response = await fetchProductsByFilters(filter);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productCategory: (state,action) => {
            state.selectedProduct = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProductsByFiltersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            });
    }
})

export const { productCategory } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectedProductCategory = (state) => state.product.selectedProduct;

export default productSlice.reducer;