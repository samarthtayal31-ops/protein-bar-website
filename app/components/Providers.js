'use client';

import { CartProvider } from '@/app/context/CartContext';
import { AuthProvider } from '@/app/context/AuthContext';
import { ToastProvider } from '@/app/context/ToastContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}
