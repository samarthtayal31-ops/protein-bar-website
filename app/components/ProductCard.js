'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const router = useRouter();
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [metersAnimated, setMetersAnimated] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { cart, addToCart, updateQuantity } = useCart();
  const { showToast } = useToast();

  // IntersectionObserver for fade-up and meter fill animations
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Slight delay for meter fill animation
          setTimeout(() => setMetersAnimated(true), 300);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = useCallback(() => {
    setIsNavigating(true);
    addToCart({
      id: product.id,
      name: product.name,
      flavor: product.flavor,
      size: product.size,
      price: product.price,
      image: product.image || null,
    });
    
    // Slight delay to ensure cart state flushes to localStorage before page unmount
    setTimeout(() => {
      router.push('/checkout');
    }, 400);
  }, [addToCart, router, product]);

  // Energy and protein percentages (for meter fill bars)
  const energyPercent = product.energyPercent || Math.min((product.energy || 200) / 5, 100);
  const proteinPercent = product.proteinPercent || Math.min(((product.protein || 25) / 50) * 100, 100);

  // Check if item is already in cart
  const cartItem = cart.find((item) => item.product.id === product.id);

  return (
    <div
      ref={cardRef}
      className={`pcard fade-up${isVisible ? ' visible' : ''}${
        product.featured ? ' pcard--featured' : ''
      }`}
    >
      {/* Badge */}
      {product.badge && <div className="pcard__badge">{product.badge}</div>}

      {/* Visual / SVG Bar */}
      <div className="pcard__visual">
        {product.barSvg ? (
          <svg
            width="220"
            height="80"
            viewBox="0 0 140 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <rect
              x={product.barSvg.x || 0}
              y={product.barSvg.y || 5}
              width={product.barSvg.width || 140}
              height={product.barSvg.height || 38}
              rx={product.barSvg.rx || 8}
              fill={product.barSvg.fill || 'var(--hazel)'}
            />
            {/* Chunks / segments */}
            {product.barSvg.segments &&
              product.barSvg.segments.map((seg, i) => (
                <rect
                  key={i}
                  x={seg.x}
                  y={seg.y}
                  width={seg.width}
                  height={seg.height}
                  rx={seg.rx || 3}
                  fill={seg.fill || 'var(--surface)'}
                />
              ))}
            {/* Label on bar */}
            {product.barSvg.label && (
              <text
                x={product.barSvg.labelX || 70}
                y={product.barSvg.labelY || 30}
                textAnchor="middle"
                fill={product.barSvg.labelColor || 'var(--bg)'}
                fontSize={product.barSvg.labelSize || 11}
                fontWeight="800"
                fontFamily="'Bebas Neue', sans-serif"
                letterSpacing="0.08em"
              >
                {product.barSvg.label}
              </text>
            )}
          </svg>
        ) : (
          /* Fallback: generic bar illustration */
          <svg
            width="220"
            height="80"
            viewBox="0 0 140 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <rect x="0" y="8" width="140" height="34" rx="8" fill="var(--hazel)" />
            <rect x="8" y="12" width="20" height="10" rx="3" fill="var(--surface)" opacity="0.3" />
            <rect x="8" y="26" width="20" height="10" rx="3" fill="var(--surface)" opacity="0.3" />
            <text
              x="70"
              y="30"
              textAnchor="middle"
              fill="var(--bg)"
              fontSize="10"
              fontWeight="800"
              fontFamily="'Bebas Neue', sans-serif"
              letterSpacing="0.1em"
            >
              FUELBAR
            </text>
          </svg>
        )}
      </div>

      {/* Body */}
      <div className="pcard__body">
        {/* Size tag */}
        {product.size && (
          <span className="pcard__size-tag">{product.size}</span>
        )}

        {/* Name */}
        <h3 className="pcard__name">{product.name}</h3>

        {/* Flavor */}
        {product.flavor && (
          <p className="pcard__flavor">
            {product.flavorEmoji || '🍫'} {product.flavor}
          </p>
        )}

        {/* Protein chip */}
        {product.protein && (
          <div className="pcard__protein-chip">
            <span>💪</span>
            {product.protein}g Protein
          </div>
        )}

        {/* No sugar note */}
        {product.noSugar !== false && (
          <p className="pcard__nosug">✓ No Added Sugar</p>
        )}

        {/* Energy Meter */}
        <div className="meter">
          <div className="meter__row">
            <span className="meter__label">Energy</span>
            <span className="meter__val">
              {product.energy || '200'} kcal
            </span>
          </div>
          <div className="meter__track">
            <div
              className="meter__fill"
              style={{
                width: metersAnimated ? `${energyPercent}%` : '0%',
              }}
            />
          </div>
        </div>

        {/* Protein Meter */}
        <div className="meter">
          <div className="meter__row">
            <span className="meter__label">Protein</span>
            <span className="meter__val" style={{ color: '#6fcf72' }}>
              {product.protein || '25'}g
            </span>
          </div>
          <div className="meter__track">
            <div
              className="meter__fill"
              style={{
                width: metersAnimated ? `${proteinPercent}%` : '0%',
                background: 'linear-gradient(90deg, #388E3C, #6fcf72)',
              }}
            />
          </div>
        </div>

        {/* Price */}
        <div className="pcard__price">
          <span className="pcard__currency">₹</span>
          <span className="pcard__amount">{product.price}</span>
        </div>

        {/* Add to Cart or Quantity Selector */}
        {cartItem ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)', marginTop: 'auto' }}>
            <button 
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
              style={{ padding: '0.8rem 1.2rem', background: 'var(--surface)', border: 'none', color: 'var(--text)', fontWeight: 800, cursor: 'pointer', fontSize: '1.2rem', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.target.style.background = 'var(--border)'}
              onMouseOut={(e) => e.target.style.background = 'var(--surface)'}
            >-</button>
            <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>{cartItem.quantity} in cart</span>
            <button 
              onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
              style={{ padding: '0.8rem 1.2rem', background: 'var(--surface)', border: 'none', color: 'var(--text)', fontWeight: 800, cursor: 'pointer', fontSize: '1.2rem', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.target.style.background = 'var(--border)'}
              onMouseOut={(e) => e.target.style.background = 'var(--surface)'}
            >+</button>
          </div>
        ) : (
          <button 
            className="pcard__btn" 
            onClick={handleAddToCart}
            disabled={isNavigating}
            style={isNavigating ? { opacity: 0.7, cursor: 'wait' } : {}}
          >
            {isNavigating ? "PROCESSING..." : "Order Now"}
          </button>
        )}
      </div>
    </div>
  );
}
