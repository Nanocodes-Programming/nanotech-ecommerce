import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    authenticated: false,
    authModal: null,
    token: cookies.get('token'),
    currentUser: null,
    isLoginLoading: false,
    isSignupLoading: false,
    isPasswordResetLoading: false,
    isChangePasswordLoading: false,
    signupStep: 0,
    passwordResetStep: 0,
    encryptedPass: null,
  },

  reducers: {
    setAuthState: (state, action) => {
      state.authenticated = action.payload;
    },
    setAuthModal: (state, action) => {
      state.authModal = action.payload;
    },
    setLoginLoading: (state, action) => {
      state.isLoginLoading = action.payload;
    },
    setSignupLoading: (state, action) => {
      state.isSignupLoading = action.payload;
    },
    setPasswordResetLoading: (state, action) => {
      state.isPasswordResetLoading = action.payload;
    },
    setChangePasswordLoading: (state, action) => {
      state.isChangePasswordLoading = action.payload;
    },
    setSignupStep: (state, action) => {
      state.signupStep = action.payload;
    },
    setPasswordResetStep: (state, action) => {
      state.passwordResetStep = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setEncryptedPass: (state, action) => {
      state.encryptedPass = action.payload;
    },
  },
});

export const {
  setAuthState,
  setAuthModal,
  setLoginLoading,
  setSignupLoading,
  setPasswordResetLoading,
  setChangePasswordLoading,
  setSignupStep,
  setPasswordResetStep,
  setUser,
  setToken,
  setEncryptedPass,
} = userSlice.actions;

export default userSlice.reducer;
