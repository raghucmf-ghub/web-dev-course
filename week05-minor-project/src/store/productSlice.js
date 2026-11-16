import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProducts } from '../services/productService';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const data = await fetchAllProducts();
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'All',
    sortBy: 'default', // 'default', 'low-to-high', 'high-to-low'
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setSearchQuery, setSelectedCategory, setSortBy } = productSlice.actions;
export default productSlice.reducer;
