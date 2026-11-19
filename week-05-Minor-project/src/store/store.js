import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
});
