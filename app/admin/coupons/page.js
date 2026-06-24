'use client';

import { useState } from 'react';

const MOCK_COUPONS = [
  { id: 1, code: 'FIRST10', type: 'percent', value: 10, minOrder: 200, used: 18, limit: 100, active: true, expiry: '31 Dec 2026' },
  { id: 2, code: 'SUMMER20', type: 'percent', value: 20, minOrder: 500, used: 42, limit: 50, active: true, expiry: '31 Aug 2026' },
  { id: 3, code: 'FLAT50', type: 'flat', value: 50, minOrder: 300, used: 50, limit: 50, active: false, expiry: '15 Jun 2026' },
];

const EMPTY_FORM = {
  code: '',
  type: 'percent',
  value: '',
  minOrder: '',
  maxUses: '',
  expiry: '',
};

export default function AdminCoupons() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Creating coupon:', form);
    setForm(EMPTY_FORM);
    setModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="heading-md">Coupons</h1>
        <button className="btn-primary btn-sm" onClick={() => { setForm(EMPTY_FORM); setModalOpen(true); }}>
          + Create Coupon
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Min Order</th>
              <th>Usage / Limit</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_COUPONS.map((coupon) => (
              <tr key={coupon.id}>
                <td>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.1rem',
                      color: 'var(--amber)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {coupon.code}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      background: coupon.type === 'percent' ? 'rgba(33,150,243,0.12)' : 'rgba(232,168,48,0.12)',
                      color: coupon.type === 'percent' ? '#64B5F6' : 'var(--amber)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {coupon.type === 'percent' ? 'Percentage' : 'Flat'}
                  </span>
                </td>
                <td style={{ fontWeight: 800, fontSize: '1rem' }}>
                  {coupon.type === 'percent' ? `${coupon.value}%` : `₹${coupon.value}`}
                </td>
                <td style={{ color: 'var(--muted)' }}>₹{coupon.minOrder}</td>
                <td>
                  <span style={{ fontWeight: 700 }}>{coupon.used}</span>
                  <span style={{ color: 'var(--muted)' }}> / {coupon.limit}</span>
                </td>
                <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{coupon.expiry}</td>
                <td>
                  {coupon.active ? (
                    <span
                      style={{
                        background: 'rgba(76,175,80,0.15)',
                        color: '#6fcf72',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '0.25rem 0.7rem',
                        borderRadius: '1rem',
                      }}
                    >
                      Active
                    </span>
                  ) : (
                    <span
                      style={{
                        background: 'var(--red-dim)',
                        color: '#EF9A9A',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '0.25rem 0.7rem',
                        borderRadius: '1rem',
                      }}
                    >
                      Expired
                    </span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-outline btn-sm" onClick={() => console.log('Edit coupon:', coupon.code)}>
                      Edit
                    </button>
                    <button className="btn-danger btn-sm" onClick={() => console.log('Delete coupon:', coupon.code)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Coupon Modal */}
      <div className={`modal-overlay${modalOpen ? ' open' : ''}`} onClick={() => setModalOpen(false)}>
        <div className="modal" style={{ maxWidth: '500px', textAlign: 'left' }} onClick={(e) => e.stopPropagation()}>
          <button className="modal__close" onClick={() => setModalOpen(false)}>✕</button>
          <h3 style={{ textAlign: 'center', marginBottom: '1.2rem' }}>Create Coupon</h3>

          <form onSubmit={handleSave}>
            {/* Code */}
            <div className="checkout__form-group">
              <label className="checkout__label">Coupon Code</label>
              <input
                className="checkout__input"
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="e.g. WELCOME15"
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>

            {/* Type + Value */}
            <div className="checkout__row">
              <div className="checkout__form-group">
                <label className="checkout__label">Type</label>
                <select className="checkout__input" name="type" value={form.type} onChange={handleChange}>
                  <option value="percent">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>
              <div className="checkout__form-group">
                <label className="checkout__label">
                  Value {form.type === 'percent' ? '(%)' : '(₹)'}
                </label>
                <input
                  className="checkout__input"
                  name="value"
                  type="number"
                  value={form.value}
                  onChange={handleChange}
                  placeholder={form.type === 'percent' ? '15' : '50'}
                  required
                />
              </div>
            </div>

            {/* Min Order + Max Uses */}
            <div className="checkout__row">
              <div className="checkout__form-group">
                <label className="checkout__label">Min Order Amount (₹)</label>
                <input
                  className="checkout__input"
                  name="minOrder"
                  type="number"
                  value={form.minOrder}
                  onChange={handleChange}
                  placeholder="200"
                />
              </div>
              <div className="checkout__form-group">
                <label className="checkout__label">Max Uses</label>
                <input
                  className="checkout__input"
                  name="maxUses"
                  type="number"
                  value={form.maxUses}
                  onChange={handleChange}
                  placeholder="100"
                />
              </div>
            </div>

            {/* Expiry */}
            <div className="checkout__form-group">
              <label className="checkout__label">Expiry Date</label>
              <input
                className="checkout__input"
                name="expiry"
                type="date"
                value={form.expiry}
                onChange={handleChange}
                required
              />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-outline btn-sm" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary btn-sm">
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
