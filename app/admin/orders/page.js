'use client';

import { useState } from 'react';

const STATUSES = ['All', 'Placed', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

const MOCK_ORDERS = [
  { id: 'FB-1048', customer: 'Arjun Mehta', email: 'arjun@email.com', phone: '+91 98765 43210', items: [{ name: 'POWER BAR Choc', qty: 2, price: 90 }], total: 180, payment: 'COD', status: 'placed', date: '22 Jun 2026', address: '12, MG Road, Bengaluru 560001' },
  { id: 'FB-1047', customer: 'Priya Sharma', email: 'priya@email.com', phone: '+91 87654 32109', items: [{ name: 'BEAST BAR Choc', qty: 1, price: 120 }, { name: 'SPARK BAR Dates', qty: 1, price: 65 }], total: 185, payment: 'UPI', status: 'confirmed', date: '22 Jun 2026', address: '45, Linking Road, Mumbai 400050' },
  { id: 'FB-1046', customer: 'Rohan Verma', email: 'rohan@email.com', phone: '+91 76543 21098', items: [{ name: 'SPARK BAR Choc', qty: 3, price: 60 }], total: 180, payment: 'UPI', status: 'shipped', date: '21 Jun 2026', address: '78, Civil Lines, Delhi 110054' },
  { id: 'FB-1045', customer: 'Aisha Khan', email: 'aisha@email.com', phone: '+91 65432 10987', items: [{ name: 'POWER BAR Dates', qty: 1, price: 95 }], total: 95, payment: 'COD', status: 'delivered', date: '20 Jun 2026', address: '23, Park Street, Kolkata 700016' },
  { id: 'FB-1044', customer: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 54321 09876', items: [{ name: 'BEAST BAR Dates', qty: 2, price: 125 }], total: 250, payment: 'UPI', status: 'cancelled', date: '19 Jun 2026', address: '56, Jubilee Hills, Hyderabad 500033' },
  { id: 'FB-1043', customer: 'Sneha Patel', email: 'sneha@email.com', phone: '+91 43210 98765', items: [{ name: 'POWER BAR Choc', qty: 1, price: 90 }, { name: 'POWER BAR Dates', qty: 1, price: 95 }], total: 185, payment: 'COD', status: 'placed', date: '18 Jun 2026', address: '89, SG Highway, Ahmedabad 380015' },
  { id: 'FB-1042', customer: 'Karthik Rajan', email: 'karthik@email.com', phone: '+91 32109 87654', items: [{ name: 'BEAST BAR Choc', qty: 3, price: 120 }], total: 360, payment: 'UPI', status: 'shipped', date: '17 Jun 2026', address: '34, Anna Nagar, Chennai 600040' },
  { id: 'FB-1041', customer: 'Neha Gupta', email: 'neha@email.com', phone: '+91 21098 76543', items: [{ name: 'SPARK BAR Dates', qty: 5, price: 65 }], total: 325, payment: 'COD', status: 'delivered', date: '16 Jun 2026', address: '67, Arera Colony, Bhopal 462016' },
];

export default function AdminOrders() {
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = filter === 'All'
    ? orders
    : orders.filter((o) => o.status === filter.toLowerCase());

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="heading-md">Orders</h1>
        <select
          className="checkout__input"
          style={{ width: 'auto', minWidth: '160px' }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id}>
                <td style={{ color: 'var(--amber)', fontWeight: 800 }}>{order.id}</td>
                <td>{order.customer}</td>
                <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                  {order.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
                </td>
                <td style={{ fontWeight: 800 }}>₹{order.total}</td>
                <td>
                  <span
                    style={{
                      background: order.payment === 'UPI' ? 'rgba(33,150,243,0.12)' : 'rgba(232,168,48,0.12)',
                      color: order.payment === 'UPI' ? '#64B5F6' : 'var(--amber)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {order.payment}
                  </span>
                </td>
                <td>
                  <select
                    className="checkout__input"
                    style={{
                      width: 'auto',
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      minWidth: '120px',
                    }}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{order.date}</td>
                <td>
                  <button className="btn-outline btn-sm" onClick={() => setSelectedOrder(order)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
          No orders found for &ldquo;{filter}&rdquo; status.
        </div>
      )}

      {/* Order Detail Modal */}
      <div className={`modal-overlay${selectedOrder ? ' open' : ''}`} onClick={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <div className="modal" style={{ maxWidth: '560px', textAlign: 'left' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setSelectedOrder(null)}>✕</button>
            <h3 style={{ textAlign: 'center', marginBottom: '0.3rem' }}>Order {selectedOrder.id}</h3>
            <p style={{ textAlign: 'center' }}>
              <span className={`order-card__status order-card__status--${selectedOrder.status}`}>
                {selectedOrder.status}
              </span>
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                  Customer
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{selectedOrder.customer}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{selectedOrder.email}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{selectedOrder.phone}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                  Delivery
                </div>
                <div style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{selectedOrder.address}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              Items
            </div>
            <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-sm)', padding: '0.8rem 1rem', marginBottom: '1rem' }}>
              {selectedOrder.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0',
                    borderBottom: i < selectedOrder.items.length - 1 ? '1px solid var(--border)' : 'none',
                    fontSize: '0.88rem',
                  }}
                >
                  <span>{item.qty}× {item.name}</span>
                  <span style={{ color: 'var(--amber)', fontWeight: 700 }}>₹{item.qty * item.price}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Payment: </span>
                <span style={{ fontWeight: 700 }}>{selectedOrder.payment}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Total: </span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: 'var(--amber)' }}>₹{selectedOrder.total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
