import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    mobileSearch: false,
    mobileSideDrawer: false,
    searchItems: [],
    productDetails: null,
  },

  reducers: {
    setMobileSearch: (state, action) => {
      state.mobileSearch = action.payload;
    },
    setMobileSideDrawer: (state, action) => {
      state.mobileSideDrawer = action.payload;
    },
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
  },
});

export const {
  setMobileSearch,
  setMobileSideDrawer,
  setSearchItems,
  setProductDetails,
} = mainSlice.actions;

export default mainSlice.reducer;
