'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const navLinks = [
    { label: 'Products', href: '/#products' },
    { label: 'Nutrition', href: '/#nutrition' },
    { label: 'Ingredients', href: '/#ingredients' },
    { label: 'Delivery', href: '/#delivery' },
  ];

  const handleOrderNow = () => {
    router.push('/checkout');
  };

  return (
    <>
      <nav className="nav">
        {/* Logo */}
        <Link href="/" className="nav__logo">
          FUEL<span>BAR</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}

          {/* Cart Button */}
          <li>
            <button className="nav__cart" onClick={toggleCart} aria-label="Open cart">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              CART
              {cartCount > 0 && (
                <span className="nav__cart-count">{cartCount}</span>
              )}
            </button>
          </li>

          {/* User Avatar / Login */}
          <li>
            {isAuthenticated ? (
              <Link
                href="/account"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--hazel), var(--gold))',
                  color: 'var(--bg)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.04em',
                }}
                aria-label="Account"
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Link>
            ) : (
              <Link href="/login" style={{ fontSize: '0.83rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', transition: 'color 0.2s' }}>
                Login
              </Link>
            )}
          </li>

          {/* Order Now CTA */}
          <li>
            <button className="nav__cta" onClick={handleOrderNow}>
              Order Now
            </button>
          </li>
        </ul>

        {/* Mobile: Cart + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="nav__cart nav__ham"
            onClick={toggleCart}
            aria-label="Open cart"
            style={{ display: 'none' }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="nav__cart-count">{cartCount}</span>
            )}
          </button>
          <button
            className="nav__ham"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nav__drawer${drawerOpen ? ' open' : ''}`}>
        <button
          className="nav__drawer-close"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setDrawerOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        {isAuthenticated ? (
          <Link href="/account" onClick={() => setDrawerOpen(false)}>
            My Account
          </Link>
        ) : (
          <Link href="/login" onClick={() => setDrawerOpen(false)}>
            Login
          </Link>
        )}

        <button
          className="btn-primary"
          onClick={() => {
            setDrawerOpen(false);
            handleOrderNow();
          }}
        >
          Order Now
        </button>
      </div>
    </>
  );
}
