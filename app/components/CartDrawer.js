'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart: items,
    isCartOpen,
    toggleCart,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  const deliveryFee = cartTotal >= 500 ? 0 : 50;
  const orderTotal = cartTotal + deliveryFee;

  // Build WhatsApp order message
  const buildWhatsAppMessage = () => {
    if (items.length === 0) return '';
    let msg = '🔥 *FuelBar Order*\n\n';
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name}`;
      if (item.flavor) msg += ` (${item.flavor})`;
      if (item.size) msg += ` — ${item.size}`;
      msg += ` × ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    msg += `\n*Total: ₹${cartTotal}*`;
    if (deliveryFee > 0) msg += `\nDelivery: ₹${deliveryFee}`;
    else msg += `\n✅ Free Delivery`;
    msg += `\n*Grand Total: ₹${orderTotal}*`;
    return encodeURIComponent(msg);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isCartOpen ? ' open' : ''}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`cart-drawer${isCartOpen ? ' open' : ''}`}>
        {/* Header */}
        <div className="cart-drawer__header">
          <span className="cart-drawer__title">YOUR CART</span>
          <button
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <p style={{ marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Your cart is empty
              </p>
              <button className="btn-primary btn-sm" onClick={closeCart}>
                Shop Now
              </button>
            </div>
          ) : (
            items.map((item) => {
              const key = `${item.id}-${item.flavor}-${item.size}`;
              return (
                <div className="cart-item" key={key}>
                  <div className="cart-item__info">
                    <div className="cart-item__name">{item.name}</div>
                    <div className="cart-item__meta">
                      {item.flavor && <span>{item.flavor}</span>}
                      {item.flavor && item.size && <span> · </span>}
                      {item.size && <span>{item.size}</span>}
                    </div>
                    <div className="cart-item__qty">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.flavor, item.size, -1)
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.flavor, item.size, 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-item__remove"
                      onClick={() =>
                        removeFromCart(item.id, item.flavor, item.size)
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <div className="cart-item__price">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer (only when items exist) */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span className="cart-drawer__total-label">Subtotal</span>
              <span className="cart-drawer__total-amount">₹{cartTotal}</span>
            </div>
            <div className="cart-drawer__delivery">
              {cartTotal >= 500
                ? '✅ Free delivery!'
                : `Add ₹${500 - cartTotal} more for free delivery`}
            </div>
            <Link
              href="/checkout"
              className="btn-primary cart-drawer__checkout"
              onClick={closeCart}
            >
              Proceed to Checkout
            </Link>
            <a
              href={`https://wa.me/916263099627?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
              style={{ width: '100%', marginTop: '0.7rem' }}
              onClick={closeCart}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Or Order via WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
