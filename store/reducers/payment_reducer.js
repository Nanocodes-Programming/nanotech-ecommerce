import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    lastPaymentDetails: {},
    payments: [],
    orderID: null,
    ordersArray: [],
  },

  reducers: {
    setLastPaymentDetails: (state, action) => {
      state.lastPaymentDetails = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = state.payments?.unshift(action.payload);
    },
    setOrderID: (state, action) => {
      state.orderID = action.payload;
    },
    setOrdersArray: (state, action) => {
      state.ordersArray = state.ordersArray?.unshift(action.payload);
    },
  },
});

export const {
  setLastPaymentDetails,
  setPayments,
  setOrderID,
  setOrdersArray,
} = paymentSlice.actions;

export default paymentSlice.reducer;
