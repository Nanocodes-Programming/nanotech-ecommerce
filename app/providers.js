'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SWRConfig } from 'swr';
import axios from 'axios';
import store, { persistor } from '@/store';

const fetcher = async (...args) => {
  const res = await axios(...args);
  return res.data;
};

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig value={{ fetcher }}>
          {children}
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
}