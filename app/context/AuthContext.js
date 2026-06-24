'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

const AuthContext = createContext(undefined);

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }, []);

  const signInWithPhone = useCallback(async (phoneNumber, recaptchaContainerId = 'recaptcha-container') => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
        size: 'invisible',
      });
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      return confirmationResult;
    } catch (error) {
      console.error('Phone sign-in error:', error);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      signInWithGoogle,
      signInWithPhone,
      signOut,
    }),
    [user, loading, signInWithGoogle, signInWithPhone, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
