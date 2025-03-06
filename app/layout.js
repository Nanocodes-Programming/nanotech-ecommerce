import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer';
import Providers from './providers';
import "./globals.css";

// Import all modals - these will need the 'use client' directive in their files
import LoginModal from '@/components/auth/login';
import SignupModal from '@/components/auth/signup';
import OrderModal from '@/components/Dashboard/NewOrder';
import PaymentModal from '@/components/Dashboard/Payment';
import RemoveCartItemModal from '@/components/utils/cards/RemoveCartItem';
import DeliveryModal from '@/components/Dashboard/NewDelivery';
import ProductCardModal from '@/components/ProductCardModal';
import PasswordResetModal from '@/components/auth/password-reset';
import ChangePasswordModal from '@/components/auth/change-password';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nanotech mordern store",
  description: "Your e-commerce solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginModal />
            <SignupModal />
            <OrderModal />
            <PaymentModal />
            <RemoveCartItemModal />
            <DeliveryModal />
            <ProductCardModal />
            <PasswordResetModal />
            <ChangePasswordModal />
          </Suspense>
          <ToastContainer />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}