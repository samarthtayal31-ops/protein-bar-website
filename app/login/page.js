'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useToast } from '@/app/context/ToastContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();
  const { showToast } = useToast();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/account');
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
      showToast('Successfully signed in!', 'success');
      router.push('/account');
    } catch (error) {
      console.error(error);
      showToast('Failed to sign in. Please try again.', 'error');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
      <div style={{ background: 'var(--bg-card)', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 className="heading-md" style={{ marginBottom: '0.5rem' }}>WELCOME BACK</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Sign in to track orders and manage your account
        </p>

        <button 
          className="btn-outline" 
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.8rem', fontSize: '1rem' }}
        >
          {isLoggingIn ? 'Signing in...' : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
          By signing in, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
