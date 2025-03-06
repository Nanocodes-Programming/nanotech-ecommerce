import { createSlice } from '@reduxjs/toolkit';
import {
  deleteCartItem,
  flattenCartItems,
  reduceCartItems,
} from '../actions/customer_actions';

export const dashboardSlice = createSlice({
  name: 'customer_dashboard',
  initialState: {
    page: 'dashboard',
    dashboardModal: null,
    cartItems: [],
    itemToRemove: {},
    userDetails: {},
    deliveryId: null,
  },

  reducers: {
    setDashboardPage: (state, action) => {
      state.page = action.payload;
    },
    setDashboardModal: (state, action) => {
      state.page = action.payload;
    },
    setCartItems: (state, action) => {
      const updatedCartItems = flattenCartItems(
        state.cartItems,
        action.payload
      );
      // console.log(state.updatedCartItems);

      state.cartItems = updatedCartItems;
    },
    setReduceCartItem: (state, action) => {
      const updatedCartItems = reduceCartItems(state.cartItems, action.payload);

      state.cartItems = updatedCartItems;
    },
    setItemToRemove: (state, action) => {
      state.itemToRemove = action.payload;
    },
    removeCartItem: (state, action) => {
      const updatedCartItems = deleteCartItem(state.cartItems, action.payload);

      state.cartItems = updatedCartItems;
    },
    resetCartItems: (state, action) => {
      state.cartItems = [];
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setDeliveryId: (state, action) => {
      state.deliveryId = action.payload;
    },
  },
});

export const {
  setDashboardPage,
  setDashboardModal,
  setCartItems,
  setReduceCartItem,
  setItemToRemove,
  removeCartItem,
  resetCartItems,
  setUserDetails,
  setDeliveryId,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
