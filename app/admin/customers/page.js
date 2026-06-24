'use client';

import { useState } from 'react';

const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: 'Arjun Mehta',
    email: 'arjun@email.com',
    phone: '+91 98765 43210',
    orders: 5,
    totalSpent: 1420,
    joined: '12 Mar 2026',
    orderHistory: [
      { id: 'FB-1048', items: '2× POWER BAR Choc', total: '₹180', status: 'placed', date: '22 Jun 2026' },
      { id: 'FB-1035', items: '1× BEAST BAR Choc', total: '₹120', status: 'delivered', date: '10 Jun 2026' },
    ],
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@email.com',
    phone: '+91 87654 32109',
    orders: 3,
    totalSpent: 560,
    joined: '28 Mar 2026',
    orderHistory: [
      { id: 'FB-1047', items: '1× BEAST BAR Choc, 1× SPARK BAR Dates', total: '₹185', status: 'confirmed', date: '22 Jun 2026' },
    ],
  },
  {
    id: 3,
    name: 'Rohan Verma',
    email: 'rohan@email.com',
    phone: '+91 76543 21098',
    orders: 8,
    totalSpent: 2340,
    joined: '05 Feb 2026',
    orderHistory: [
      { id: 'FB-1046', items: '3× SPARK BAR Choc', total: '₹180', status: 'shipped', date: '21 Jun 2026' },
      { id: 'FB-1030', items: '2× POWER BAR Dates', total: '₹190', status: 'delivered', date: '05 Jun 2026' },
    ],
  },
  {
    id: 4,
    name: 'Aisha Khan',
    email: 'aisha@email.com',
    phone: '+91 65432 10987',
    orders: 2,
    totalSpent: 285,
    joined: '15 Apr 2026',
    orderHistory: [
      { id: 'FB-1045', items: '1× POWER BAR Dates', total: '₹95', status: 'delivered', date: '20 Jun 2026' },
    ],
  },
  {
    id: 5,
    name: 'Vikram Singh',
    email: 'vikram@email.com',
    phone: '+91 54321 09876',
    orders: 4,
    totalSpent: 890,
    joined: '22 Jan 2026',
    orderHistory: [
      { id: 'FB-1044', items: '2× BEAST BAR Dates', total: '₹250', status: 'cancelled', date: '19 Jun 2026' },
      { id: 'FB-1028', items: '1× POWER BAR Choc', total: '₹90', status: 'delivered', date: '01 Jun 2026' },
    ],
  },
  {
    id: 6,
    name: 'Sneha Patel',
    email: 'sneha@email.com',
    phone: '+91 43210 98765',
    orders: 6,
    totalSpent: 1650,
    joined: '10 Jan 2026',
    orderHistory: [
      { id: 'FB-1043', items: '1× POWER BAR Choc, 1× POWER BAR Dates', total: '₹185', status: 'placed', date: '18 Jun 2026' },
      { id: 'FB-1025', items: '3× SPARK BAR Dates', total: '₹195', status: 'delivered', date: '25 May 2026' },
    ],
  },
];

export default function AdminCustomers() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <h1 className="heading-md" style={{ marginBottom: '1.5rem' }}>Customers</h1>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CUSTOMERS.map((c) => (
              <tr
                key={c.id}
                onClick={() => toggleExpand(c.id)}
                style={{ cursor: 'pointer' }}
              >
                <td style={{ fontSize: '0.8rem', width: '30px' }}>
                  {expandedId === c.id ? '▼' : '▶'}
                </td>
                <td style={{ fontWeight: 800 }}>{c.name}</td>
                <td style={{ color: 'var(--muted)' }}>{c.email}</td>
                <td style={{ color: 'var(--muted)' }}>{c.phone}</td>
                <td>
                  <span
                    style={{
                      background: 'rgba(232,168,48,0.12)',
                      color: 'var(--amber)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '1rem',
                    }}
                  >
                    {c.orders}
                  </span>
                </td>
                <td style={{ color: 'var(--amber)', fontWeight: 800 }}>₹{c.totalSpent.toLocaleString('en-IN')}</td>
                <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{c.joined}</td>
              </tr>
            ))}
            {MOCK_CUSTOMERS.filter(c => expandedId === c.id).map(c => (
              <tr key={`${c.id}-detail`}>
                <td colSpan={7} style={{ padding: 0 }}>
                  <div
                    style={{
                      background: 'var(--bg)',
                      padding: '1rem 1.5rem',
                      borderTop: '1px solid var(--border)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--muted)',
                        textTransform: 'uppercase',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        marginBottom: '0.6rem',
                      }}
                    >
                      Order History
                    </div>
                    {c.orderHistory.map((o) => (
                      <div
                        key={o.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.5rem 0',
                          borderBottom: '1px solid var(--border)',
                          fontSize: '0.85rem',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ color: 'var(--amber)', fontWeight: 800, minWidth: '70px' }}>{o.id}</span>
                        <span style={{ flex: 1, color: 'var(--muted)', minWidth: '150px' }}>{o.items}</span>
                        <span style={{ fontWeight: 700, minWidth: '60px' }}>{o.total}</span>
                        <span className={`order-card__status order-card__status--${o.status}`}>{o.status}</span>
                        <span style={{ color: 'var(--dim)', fontSize: '0.78rem', minWidth: '90px' }}>{o.date}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
