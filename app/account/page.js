'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useToast } from '@/app/context/ToastContext';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      showToast('Signed out successfully', 'success');
      router.push('/');
    } catch (error) {
      showToast('Failed to sign out', 'error');
    }
  };

  if (loading || !user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="heading-md" style={{ marginBottom: '2rem' }}>MY ACCOUNT</h1>
      
      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{user.displayName || 'FuelBar Customer'}</h2>
          <p style={{ color: 'var(--muted)' }}>{user.email || user.phoneNumber}</p>
        </div>
        <button className="btn-outline btn-sm" onClick={handleSignOut}>Sign Out</button>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Order History</h3>
        
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <p style={{ color: 'var(--muted)' }}>You haven't placed any orders yet.</p>
        </div>
      </div>
    </div>
  );
}
