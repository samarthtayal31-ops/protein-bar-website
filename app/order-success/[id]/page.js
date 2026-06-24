'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function OrderSuccessPage({ params }) {
  const orderId = params?.id || 'Unknown';

  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
      <h1 className="heading-md" style={{ marginBottom: '1rem' }}>Order Confirmed!</h1>
      <p className="text-muted" style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
        Thank you for your order. We are getting it ready for you!
      </p>
      <div style={{ background: 'var(--surface)', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', margin: '1.5rem 0', display: 'inline-block' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Order ID</p>
        <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--amber)' }}>{orderId}</p>
      </div>
      <p className="text-muted" style={{ marginBottom: '2rem', maxWidth: '400px' }}>
        You will receive an email confirmation shortly with your order details and tracking information once it ships.
      </p>
      <Link href="/" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
}
