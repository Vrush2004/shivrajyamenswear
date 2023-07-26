import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAdmin } from './authApi';

const initialState = {
  loggedInAdmin: null,
  status: 'idle',
  error: null
};

export const checkAdminAsync = createAsyncThunk(
  'admin/checkAdmin',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkAdmin(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error)
    }
  }
);

export const authSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAdminAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAdminAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInAdmin = action.payload;
      })
      .addCase(checkAdminAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
  },
});

export const selectLoggedInAdmin = (state) => state.auth.loggedInAdmin;
export const selectError = (state) => state.auth.error;

export const { increment } = authSlice.actions;


export default authSlice.reducer;