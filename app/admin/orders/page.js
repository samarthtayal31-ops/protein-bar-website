'use client';

import { useState, useEffect } from 'react';

const STATUSES = ['All', 'Placed', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrders() {
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) {
          // Map backend format to UI format
          const mappedOrders = data.orders.map(o => {
            const dateObj = new Date(o.createdAt);
            const dateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            const addressObj = o.customer.address || {};
            const addressStr = typeof addressObj === 'object' 
              ? `${addressObj.line1 || ''}, ${addressObj.line2 || ''}, ${addressObj.city || ''} ${addressObj.pinCode || ''}`.replace(/, ,/g, ',').trim()
              : String(addressObj);

            return {
              id: o.orderId,
              customer: o.customer.name,
              email: o.customer.email,
              phone: o.customer.phone,
              items: o.items.map(i => ({ name: `${i.name} ${i.flavor || ''}`.trim(), qty: i.quantity, price: i.price })),
              total: o.totalAmount,
              payment: o.paymentMethod === 'cod' ? 'COD' : 'ONLINE',
              status: o.status,
              date: dateStr,
              address: addressStr.replace(/, $/, ''),
            };
          });
          setOrders(mappedOrders);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

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

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text)' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem', width: '24px', height: '24px' }}></div>
          Loading orders...
        </div>
      )}

      {!loading && filtered.length === 0 && (
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
