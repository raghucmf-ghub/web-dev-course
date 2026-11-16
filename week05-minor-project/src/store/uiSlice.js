import { createSlice } from '@reduxjs/toolkit';

const loadWishlist = () => {
  try {
    const saved = localStorage.getItem('shopzone_wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    wishlist: loadWishlist(),
    darkMode: false,
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.wishlist.find((item) => item.id === product.id);
      if (exists) {
        state.wishlist = state.wishlist.filter((item) => item.id !== product.id);
      } else {
        state.wishlist.push(product);
      }
      localStorage.setItem('shopzone_wishlist', JSON.stringify(state.wishlist));
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleWishlist, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
