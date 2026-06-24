'use client';

const STATS = [
  { icon: '💰', value: '₹24,500', label: 'Total Revenue' },
  { icon: '📦', value: '48', label: 'Total Orders' },
  { icon: '👥', value: '32', label: 'Customers' },
  { icon: '📊', value: '₹510', label: 'Avg. Order Value' },
];

const RECENT_ORDERS = [
  { id: 'FB-1048', customer: 'Arjun Mehta', items: '2× POWER BAR Choc', total: '₹180', status: 'placed', date: '22 Jun 2026' },
  { id: 'FB-1047', customer: 'Priya Sharma', items: '1× BEAST BAR Choc, 1× SPARK BAR Dates', total: '₹185', status: 'confirmed', date: '22 Jun 2026' },
  { id: 'FB-1046', customer: 'Rohan Verma', items: '3× SPARK BAR Choc', total: '₹180', status: 'shipped', date: '21 Jun 2026' },
  { id: 'FB-1045', customer: 'Aisha Khan', items: '1× POWER BAR Dates', total: '₹95', status: 'delivered', date: '20 Jun 2026' },
  { id: 'FB-1044', customer: 'Vikram Singh', items: '2× BEAST BAR Dates', total: '₹250', status: 'cancelled', date: '19 Jun 2026' },
];

const TOP_PRODUCTS = [
  { name: 'POWER BAR Choc', units: 156, percent: 65 },
  { name: 'BEAST BAR Choc', units: 108, percent: 45 },
  { name: 'SPARK BAR Dates', units: 72, percent: 30 },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="heading-md" style={{ marginBottom: '1.5rem' }}>
        Dashboard
      </h1>

      {/* ── Stat Cards ── */}
      <div className="admin-stat-grid">
        {STATS.map((stat) => (
          <div key={stat.label} className="admin-stat">
            <div className="admin-stat__icon">{stat.icon}</div>
            <div className="admin-stat__value">{stat.value}</div>
            <div className="admin-stat__label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Recent Orders ── */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="heading-sm" style={{ marginBottom: '1rem' }}>Recent Orders</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id}>
                  <td style={{ color: 'var(--amber)', fontWeight: 800 }}>{order.id}</td>
                  <td>{order.customer}</td>
                  <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{order.items}</td>
                  <td style={{ fontWeight: 800 }}>{order.total}</td>
                  <td>
                    <span className={`order-card__status order-card__status--${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Top Products ── */}
      <div>
        <h2 className="heading-sm" style={{ marginBottom: '1rem' }}>Top Products</h2>
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
          }}
        >
          {TOP_PRODUCTS.map((product) => (
            <div key={product.name} style={{ marginBottom: '1.2rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                }}
              >
                <span>{product.name}</span>
                <span style={{ color: 'var(--muted)' }}>{product.units} units</span>
              </div>
              <div
                style={{
                  background: 'var(--bg)',
                  height: '10px',
                  borderRadius: '5px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${product.percent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--hazel), var(--amber))',
                    borderRadius: '5px',
                    transition: 'width 1s cubic-bezier(.4,0,.2,1)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
