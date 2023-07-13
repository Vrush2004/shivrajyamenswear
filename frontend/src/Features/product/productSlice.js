import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchAllProducts,
    fetchProductsByFilters,
    fetchAllCategories,
    fetchAllLabels,
    fetchAllColors,
    fetchAllSizes
} from './productApi';

const initialState = {
    products: [],
    status: 'idle',
    selectedProduct: "All Products",
    categories: [],
    labels: [],
    colors: [],
    sizes: []
}

export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async () => {
        const response = await fetchAllProducts();
        return response.data;
    }
)
export const fetchAllCategoriesAsync = createAsyncThunk(
    'product/fetchAllCategories',
    async () => {
        const response = await fetchAllCategories();
        return response.data;
    }
)
export const fetchAllLabelsAsync = createAsyncThunk(
    'product/fetchAllLabels',
    async () => {
        const response = await fetchAllLabels();
        return response.data;
    }
)
export const fetchAllColorsAsync = createAsyncThunk(
    'product/fetchAllColors',
    async () => {
        const response = await fetchAllColors();
        return response.data;
    }
)
export const fetchAllSizesAsync = createAsyncThunk(
    'product/fetchAllSizes',
    async () => {
        const response = await fetchAllSizes();
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

// ---------- main slice ------------
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productCategory: (state, action) => {
            state.selectedProduct = action.payload
        }
    },
    // --------- extra reducers -----------
    extraReducers: (builder) => {
        builder
            // products
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })

            // filters
            .addCase(fetchProductsByFiltersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })

            // categories
            .addCase(fetchAllCategoriesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.categories = action.payload;
            })

            // labels
            .addCase(fetchAllLabelsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllLabelsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.labels = action.payload;
            })

            // colors
            .addCase(fetchAllColorsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllColorsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.colors = action.payload;
            })

            // sizes
            .addCase(fetchAllSizesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllSizesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.sizes = action.payload;
            });
    }
})

export const { productCategory } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllLabels = (state) => state.product.labels;
export const selectAllColors = (state) => state.product.colors;
export const selectAllSizes = (state) => state.product.sizes;

export const selectedProductCategory = (state) => state.product.selectedProduct;

export default productSlice.reducer;