'use client';

import { Provider } from 'react-redux';
import { store } from '@/store'; // Update this path to match your store location

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}