'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1000);
  };
  return (
    <footer style={{ background: '#050302', borderTop: '1px solid var(--border)', paddingTop: '6rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          
          {/* Brand Col */}
          <div>
            <Link href="/" style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em', color: '#fff', display: 'inline-block', marginBottom: '1.5rem' }}>
              FUEL<span className="text-gold">BAR</span>
            </Link>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '300px' }}>
              Premium, clean-ingredient protein bars engineered for high performance. 100% natural, 0% junk.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Social Icons (Dummy) */}
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '1px' }}>QUICK LINKS</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link href="/#products" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Shop All</Link></li>
              <li><Link href="/#ingredients" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Ingredients</Link></li>
              <li><Link href="/#reviews" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Reviews</Link></li>
              <li><Link href="/#faq" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}>FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '1px' }}>CONTACT</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ color: 'var(--muted)' }}>hello@fuelbar.in</li>
              <li style={{ color: 'var(--muted)' }}>+91 6263 099 627</li>
              <li style={{ color: 'var(--muted)' }}>Mumbai, Maharashtra</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '1px' }}>JOIN THE CLUB</h4>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Subscribe for exclusive drops, fitness tips, and 10% off your first order.</p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--surface)', color: '#fff', outline: 'none' }}
              />
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                style={{ 
                  padding: '0.8rem 1.5rem', 
                  borderRadius: '0.5rem', 
                  background: status === 'success' ? '#6fcf72' : 'var(--gold)', 
                  color: 'var(--bg)', 
                  fontWeight: 800, 
                  border: 'none', 
                  cursor: status === 'loading' ? 'wait' : 'pointer', 
                  transition: 'all 0.2s',
                  opacity: status === 'loading' ? 0.7 : 1
                }}
              >
                {status === 'loading' ? '...' : status === 'success' ? 'Joined ✓' : 'Join'}
              </button>
            </form>
          </div>

        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>&copy; {new Date().getFullYear()} FuelBar India. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <Link href="#" style={{ color: 'var(--muted)' }}>Privacy Policy</Link>
            <Link href="#" style={{ color: 'var(--muted)' }}>Terms of Service</Link>
            <Link href="#" style={{ color: 'var(--muted)' }}>Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
