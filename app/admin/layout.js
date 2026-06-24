'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

const ADMIN_EMAILS = [
  'admin@fuelbar.in',
  'samarth@fuelbar.in',
  'samarthtayal@gmail.com',
];

const NAV_ITEMS = [
  { href: '/admin', icon: '📊', label: 'Dashboard' },
  { href: '/admin/products', icon: '📦', label: 'Products' },
  { href: '/admin/orders', icon: '🛒', label: 'Orders' },
  { href: '/admin/customers', icon: '👥', label: 'Customers' },
  { href: '/admin/coupons', icon: '🏷️', label: 'Coupons' },
  { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
];

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner spinner-lg" />
        <p>Loading…</p>
      </div>
    );
  }

  // Safely allow rendering during build prerender if running on server-side or if loading is true
  const isServer = typeof window === 'undefined';
  if (!isServer && (!user || !ADMIN_EMAILS.includes(user.email))) {
    return (
      <div className="loading-page">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h2 className="heading-sm" style={{ marginBottom: '0.5rem' }}>Access Denied</h2>
          <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
            You don&apos;t have permission to access the admin dashboard.
          </p>
          <Link href="/" className="btn-primary btn-sm">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar__item${isActive ? ' active' : ''}`}
            >
              <span className="admin-sidebar__icon">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
