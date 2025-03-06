import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth_reducer from './reducers/auth_reducer';
import dashboard_reducer from './reducers/dashboard_reducer';
import main_reducer from './reducers/main_reducer';
import payment_reducer from './reducers/payment_reducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'dashboard', 'payment'],
};

const reducers = combineReducers({
  auth: auth_reducer,
  dashboard: dashboard_reducer,
  main: main_reducer,
  payment: payment_reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export let persistor = persistStore(store);
