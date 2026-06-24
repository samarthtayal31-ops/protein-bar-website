'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useToast } from '@/app/context/ToastContext';

const WHATSAPP_NUMBER = '916263099627';
const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 50;
const COD_FEE = 40;



export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Computed values
  const subtotal = cartTotal;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const codFee = paymentMethod === 'cod' ? COD_FEE : 0;
  const discount = couponApplied ? couponApplied.discount : 0;
  const total = subtotal + deliveryFee + codFee - discount;

  // Redirect if cart empty (after hydration)
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Enter a valid 10-digit number';
    if (!address1.trim()) newErrors.address1 = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!state.trim()) newErrors.state = 'State is required';
    if (!pinCode.trim()) newErrors.pinCode = 'PIN code is required';
    else if (!/^\d{6}$/.test(pinCode)) newErrors.pinCode = 'Enter a valid 6-digit PIN code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'FUEL10') {
      const discountAmt = Math.round(subtotal * 0.10);
      setCouponApplied({ code, discount: discountAmt, label: '10% off' });
      showToast('Coupon FUEL10 applied! 10% off', 'success');
    } else if (code === 'FIRST50') {
      setCouponApplied({ code, discount: 50, label: '₹50 off' });
      showToast('Coupon FIRST50 applied! ₹50 off', 'success');
    } else {
      setCouponApplied(null);
      showToast('Invalid coupon code', 'error');
    }
  };

  const buildOrderData = () => ({
    customer: {
      name: name.trim(),
      email: email.trim(),
      phone: `+91${phone.trim()}`,
      address: {
        line1: address1.trim(),
        line2: address2.trim(),
        city: city.trim(),
        state: state.trim(),
        pinCode: pinCode.trim(),
      },
    },
    items: cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      size: item.product.size || '',
      flavor: item.product.flavor || '',
      price: item.product.price,
      quantity: item.quantity,
    })),
    subtotal,
    deliveryFee,
    codFee,
    discount,
    couponCode: couponApplied?.code || null,
    totalAmount: total,
    paymentMethod,
  });



  const handleCODOrder = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildOrderData()),
      });

      if (!res.ok) {
        throw new Error('Failed to place order');
      }

      const { orderId } = await res.json();
      clearCart();
      showToast('Order placed successfully! 🎉', 'success');
      router.push(`/order-success/${orderId}`);
    } catch (error) {
      console.error('Order error:', error);
      showToast('Failed to place order. Please try again.', 'error');
    }
    setIsProcessing(false);
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      showToast('Please fill all required fields correctly.', 'error');
      return;
    }

    handleCODOrder();
  };

  const handleWhatsAppOrder = () => {
    const itemLines = cart
      .map(
        (item) =>
          `• ${item.product.name}${item.product.size ? ` (${item.product.size})` : ''}${item.product.flavor ? ` - ${item.product.flavor}` : ''} × ${item.quantity} = ₹${item.product.price * item.quantity}`
      )
      .join('\n');

    const message = `Hi! I'd like to place an order:\n\n${itemLines}\n\nSubtotal: ₹${subtotal}\nDelivery: ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\nTotal: ₹${total}\n\nName: ${name || '(not filled)'}\nPhone: ${phone ? `+91 ${phone}` : '(not filled)'}\nAddress: ${address1 || '(not filled)'}${address2 ? `, ${address2}` : ''}, ${city || ''}, ${state || ''} - ${pinCode || ''}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Show empty cart message
  if (hydrated && cart.length === 0) {
    return (
      <div className="checkout" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <span style={{ fontSize: '4rem' }}>🛒</span>
        <h2 className="heading-md">Your Cart is Empty</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '400px' }}>
          Looks like you haven&apos;t added any protein bars yet. Browse our products and fuel up!
        </p>
        <Link href="/" className="btn-primary" style={{ marginTop: '0.5rem' }}>
          Shop Now
        </Link>
      </div>
    );
  }

  // Loading state before hydration
  if (!hydrated) {
    return (
      <div className="loading-page">
        <div className="spinner spinner-lg"></div>
        <p>Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1 className="heading-md" style={{ marginBottom: '2rem' }}>
        Checkout <span className="text-gold">.</span>
      </h1>

      <div className="checkout__grid">
        {/* ── Left Column: Forms ── */}
        <div>
          {/* Contact Info */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span>👤</span> Contact Information
            </h2>

            <div className="checkout__form-group">
              <label className="checkout__label" htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                className="checkout__input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && <span style={{ color: 'var(--red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
            </div>

            <div className="checkout__form-group">
              <label className="checkout__label" htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                className="checkout__input"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <span style={{ color: 'var(--red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
            </div>

            <div className="checkout__form-group">
              <label className="checkout__label" htmlFor="phone">Phone Number *</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.75rem 0.8rem',
                    color: 'var(--muted)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  +91
                </span>
                <input
                  id="phone"
                  type="tel"
                  className="checkout__input"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  required
                />
              </div>
              {errors.phone && <span style={{ color: 'var(--red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span>📍</span> Delivery Address
            </h2>

            <div className="checkout__form-group">
              <label className="checkout__label" htmlFor="address1">Address Line 1 *</label>
              <input
                id="address1"
                type="text"
                className="checkout__input"
                placeholder="House/Flat No., Building, Street"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />
              {errors.address1 && <span style={{ color: 'var(--red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.address1}</span>}
            </div>

            <div className="checkout__form-group">
              <label className="checkout__label" htmlFor="address2">Address Line 2</label>
              <input
                id="address2"
                type="text"
                className="checkout__input"
                placeholder="Landmark, Colony (optional)"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>

            <div className="checkout__row">
              <div className="checkout__form-group">
                <label className="checkout__label" htmlFor="city">City *</label>
                <input
                  id="city"
                  type="text"
                  className="checkout__input"
                  placeholder="Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                {errors.city && <span style={{ color: 'var(--red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.city}</span>}
              </div>

              <div className="checkout__form-group">
                <label className="checkout__label" htmlFor="state">State *</label>
                <input
                  id="state"
                  type="text"
                  className="checkout__input"
                  placeholder="Maharashtra"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
                {errors.state && <span style={{ color: 'var(--red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.state}</span>}
              </div>
            </div>

            <div className="checkout__form-group">
              <label className="checkout__label" htmlFor="pinCode">PIN Code *</label>
              <input
                id="pinCode"
                type="text"
                className="checkout__input"
                placeholder="400001"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                required
                style={{ maxWidth: '200px' }}
              />
              {errors.pinCode && <span style={{ color: 'var(--red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.pinCode}</span>}
            </div>
          </div>

          {/* Payment Method */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span>💳</span> Payment Method
            </h2>

            <div className="checkout__payment-options">


              <label
                className={`checkout__payment-option${paymentMethod === 'cod' ? ' selected' : ''}`}
                htmlFor="pay-cod"
              >
                <input
                  type="radio"
                  id="pay-cod"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Cash on Delivery (+₹{COD_FEE})</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                    Pay when your order arrives
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* ── Right Column: Order Summary ── */}
        <div>
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span>📦</span> Order Summary
            </h2>

            {/* Cart Items */}
            {cart.map((item) => (
              <div className="checkout__summary-item" key={item.product.id}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{item.product.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                    {item.product.size && <span>{item.product.size}</span>}
                    {item.product.flavor && <span> • {item.product.flavor}</span>}
                    <span> • Qty: {item.quantity}</span>
                  </div>
                </div>
                <span style={{ fontWeight: 800, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}

            {/* Subtotal */}
            <div className="checkout__summary-item" style={{ borderBottom: 'none' }}>
              <span style={{ color: 'var(--muted)' }}>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            {/* Delivery */}
            <div className="checkout__summary-item" style={{ borderBottom: 'none', paddingTop: '0.2rem' }}>
              <span style={{ color: 'var(--muted)' }}>Delivery</span>
              <span style={{ color: deliveryFee === 0 ? '#6fcf72' : 'var(--text)', fontWeight: 700 }}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>

            {deliveryFee > 0 && (
              <div style={{ fontSize: '0.72rem', color: 'var(--hazel)', fontWeight: 700, marginBottom: '0.5rem', paddingLeft: '0.1rem' }}>
                Add ₹{FREE_DELIVERY_THRESHOLD - subtotal} more for free delivery
              </div>
            )}

            {/* COD Fee */}
            {paymentMethod === 'cod' && (
              <div className="checkout__summary-item" style={{ borderBottom: 'none', paddingTop: '0.2rem' }}>
                <span style={{ color: 'var(--muted)' }}>COD Fee</span>
                <span>+₹{COD_FEE}</span>
              </div>
            )}

            {/* Discount */}
            {couponApplied && (
              <div className="checkout__summary-item" style={{ borderBottom: 'none', paddingTop: '0.2rem' }}>
                <span style={{ color: '#6fcf72' }}>Discount ({couponApplied.label})</span>
                <span style={{ color: '#6fcf72', fontWeight: 700 }}>-₹{couponApplied.discount}</span>
              </div>
            )}

            {/* Coupon Code Input */}
            <div className="checkout__coupon" style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                className="checkout__input"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{ textTransform: 'uppercase' }}
              />
              <button
                className="btn-outline btn-sm"
                onClick={handleApplyCoupon}
                type="button"
                style={{ whiteSpace: 'nowrap' }}
              >
                Apply
              </button>
            </div>

            {/* Total */}
            <div className="checkout__summary-total">
              <span>TOTAL</span>
              <span>₹{total}</span>
            </div>

            {/* Place Order Button */}
            <button
              className="btn-primary"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {isProcessing ? (
                <>
                  <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
                  Processing…
                </>
              ) : (
                `Place Order — ₹${total}`
              )}
            </button>

            {/* WhatsApp Order */}
            <button
              className="btn-wa"
              onClick={handleWhatsAppOrder}
              style={{ width: '100%', marginTop: '0.75rem' }}
              type="button"
            >
              <span>💬</span> Or Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
