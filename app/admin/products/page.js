'use client';

import { useState } from 'react';
import { products } from '@/app/lib/products';

const INITIAL_STOCK = {
  'spark-choc': 85,
  'power-choc': 142,
  'beast-choc': 63,
  'spark-dates': 97,
  'power-dates': 118,
  'beast-dates': 54,
};

const EMPTY_FORM = {
  name: '',
  flavor: 'Chocolate Hazelnut',
  size: '',
  weight: '',
  price: '',
  protein: '',
  calories: '',
  stock: '',
};

export default function AdminProducts() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openAdd = () => {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      flavor: product.flavor,
      size: product.sizeLabel,
      weight: product.size,
      price: String(product.price),
      protein: product.protein,
      calories: String(product.calories),
      stock: String(INITIAL_STOCK[product.id] || 0),
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(editingProduct ? 'Updating product:' : 'Adding product:', form);
    setModalOpen(false);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Delete ${product.name} — ${product.flavor}?`)) {
      console.log('Deleting product:', product.id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="heading-md">Products</h1>
        <button className="btn-primary btn-sm" onClick={openAdd}>+ Add Product</button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Flavor</th>
              <th>Size</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 800 }}>{p.name}</td>
                <td style={{ color: 'var(--muted)' }}>{p.flavorEmoji} {p.flavor}</td>
                <td>
                  <span
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--hazel)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '0.5rem',
                    }}
                  >
                    {p.sizeLabel} · {p.size}
                  </span>
                </td>
                <td style={{ color: 'var(--amber)', fontWeight: 800 }}>₹{p.price}</td>
                <td>{INITIAL_STOCK[p.id]}</td>
                <td>
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
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-outline btn-sm" onClick={() => openEdit(p)}>Edit</button>
                    <button className="btn-danger btn-sm" onClick={() => handleDelete(p)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      <div className={`modal-overlay${modalOpen ? ' open' : ''}`} onClick={() => setModalOpen(false)}>
        <div className="modal" style={{ maxWidth: '560px', textAlign: 'left' }} onClick={(e) => e.stopPropagation()}>
          <button className="modal__close" onClick={() => setModalOpen(false)}>✕</button>
          <h3 style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </h3>

          <form onSubmit={handleSave}>
            {/* Name */}
            <div className="checkout__form-group">
              <label className="checkout__label">Product Name</label>
              <input
                className="checkout__input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. POWER BAR"
                required
              />
            </div>

            {/* Flavor dropdown */}
            <div className="checkout__form-group">
              <label className="checkout__label">Flavor</label>
              <select
                className="checkout__input"
                name="flavor"
                value={form.flavor}
                onChange={handleChange}
              >
                <option>Chocolate Hazelnut</option>
                <option>Dates &amp; Walnut</option>
              </select>
            </div>

            {/* Size + Weight row */}
            <div className="checkout__row">
              <div className="checkout__form-group">
                <label className="checkout__label">Size Label</label>
                <input
                  className="checkout__input"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  placeholder="e.g. Regular"
                />
              </div>
              <div className="checkout__form-group">
                <label className="checkout__label">Weight</label>
                <input
                  className="checkout__input"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="e.g. 55g"
                />
              </div>
            </div>

            {/* Price + Stock row */}
            <div className="checkout__row">
              <div className="checkout__form-group">
                <label className="checkout__label">Price (₹)</label>
                <input
                  className="checkout__input"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="90"
                  required
                />
              </div>
              <div className="checkout__form-group">
                <label className="checkout__label">Stock</label>
                <input
                  className="checkout__input"
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="100"
                />
              </div>
            </div>

            {/* Protein + Calories row */}
            <div className="checkout__row">
              <div className="checkout__form-group">
                <label className="checkout__label">Protein</label>
                <input
                  className="checkout__input"
                  name="protein"
                  value={form.protein}
                  onChange={handleChange}
                  placeholder="e.g. 15g"
                />
              </div>
              <div className="checkout__form-group">
                <label className="checkout__label">Calories</label>
                <input
                  className="checkout__input"
                  name="calories"
                  type="number"
                  value={form.calories}
                  onChange={handleChange}
                  placeholder="220"
                />
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-outline btn-sm" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary btn-sm">
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
