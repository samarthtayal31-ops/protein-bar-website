'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getProductsByFlavor } from '../../lib/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../../components/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const product = getProductBySlug(params.slug);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeNutrition, setActiveNutrition] = useState('overview');

  useEffect(() => {
    // Animate meters on load
    setTimeout(() => {
      document.querySelectorAll('.meter__fill').forEach(bar => {
        bar.style.width = bar.dataset.fill + '%';
      });
    }, 300);
  }, []);

  if (!product) {
    return (
      <div className="loading-page" style={{ minHeight: '80vh' }}>
        <h2 className="heading-sm text-gold">Product Not Found</h2>
        <p className="text-muted">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/#products" className="btn-primary" style={{ marginTop: '1rem' }}>Browse Products</Link>
      </div>
    );
  }

  const relatedProducts = getProductsByFlavor(product.flavorId).filter(p => p.id !== product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast(`${quantity}x ${product.name} added to cart!`, 'success');
  };

  const nutritionData = {
    overview: [
      { label: 'Calories', value: `${product.calories} kcal`, highlight: true },
      { label: 'Protein', value: product.protein, green: true },
      { label: 'Total Fat', value: product.size === '40g' ? '5g' : product.size === '60g' ? '7g' : '9g' },
      { label: 'Saturated Fat', value: product.size === '40g' ? '2g' : product.size === '60g' ? '3g' : '4g' },
      { label: 'Trans Fat', value: '0g', green: true },
      { label: 'Carbohydrates', value: product.size === '40g' ? '16g' : product.size === '60g' ? '24g' : '32g' },
      { label: 'Sugars', value: product.size === '40g' ? '6g' : product.size === '60g' ? '9g' : '12g' },
      { label: 'Added Sugars', value: '0g', green: true },
      { label: 'Dietary Fiber', value: product.size === '40g' ? '2g' : product.size === '60g' ? '3g' : '4g' },
    ],
    minerals: [
      { label: 'Sodium', value: product.size === '40g' ? '80mg' : product.size === '60g' ? '120mg' : '160mg' },
      { label: 'Calcium', value: product.size === '40g' ? '45mg' : product.size === '60g' ? '65mg' : '85mg' },
      { label: 'Iron', value: product.size === '40g' ? '1.2mg' : product.size === '60g' ? '1.8mg' : '2.4mg' },
    ]
  };

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Product Hero */}
      <section style={{ padding: '3rem 6%', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Visual */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '350px', background: 'linear-gradient(160deg, var(--surface2), var(--bg))', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, var(--glow), transparent 65%)' }} />
            <svg width={product.barSvg.width * 2} height={product.barSvg.height * 2} viewBox={`0 0 ${product.barSvg.width} ${product.barSvg.height}`} xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 1 }}>
              <defs>
                <linearGradient id="pdpG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={product.barSvg.colors[0]} />
                  <stop offset="100%" stopColor={product.barSvg.colors[1]} />
                </linearGradient>
                <linearGradient id="pdpS" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <rect x="4" y="4" width={product.barSvg.width - 8} height={product.barSvg.height - 8} rx={product.barSvg.rx} fill="url(#pdpG)" />
              <rect x="4" y="4" width={product.barSvg.width - 8} height={(product.barSvg.height - 8) / 2} rx={product.barSvg.rx} fill="url(#pdpS)" />
              <text x={product.barSvg.width / 2} y={product.barSvg.height / 2 + 5} textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="18" fill="rgba(245,190,80,0.9)" letterSpacing="3">{product.barSvg.text}</text>
            </svg>
          </div>

          {/* Info */}
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="pcard__size-tag">{product.size} · {product.sizeLabel}</span>
              {product.badge && <span className="pcard__badge" style={{ position: 'static' }}>{product.badge}</span>}
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: '0.5rem' }}>
              {product.name}
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
              {product.flavorEmoji} {product.flavor} + Dry Fruits
            </p>

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span className="pcard__protein-chip">💪 {product.protein} Whey Protein (25%)</span>
              <span className="hbadge hbadge--green">✅ {product.noSugar}</span>
            </div>

            {/* Meters */}
            <div className="meter" style={{ maxWidth: '350px' }}>
              <div className="meter__row"><span className="meter__label">Energy</span><span className="meter__val">{product.calories} kcal</span></div>
              <div className="meter__track"><div className="meter__fill" data-fill={product.caloriesFill} /></div>
            </div>
            <div className="meter" style={{ maxWidth: '350px' }}>
              <div className="meter__row"><span className="meter__label">Protein</span><span className="meter__val">{product.protein}</span></div>
              <div className="meter__track"><div className="meter__fill" data-fill={product.proteinFill} style={{ background: 'linear-gradient(90deg, #4CAF50, #6fcf72)' }} /></div>
            </div>

            {/* Price */}
            <div className="pcard__price" style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
              <span className="pcard__currency">₹</span>
              <span className="pcard__amount">{product.price}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)', marginLeft: '0.5rem' }}>per bar</span>
            </div>

            {/* Quantity + Add to Cart */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="cart-item__qty">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="btn-primary" onClick={handleAddToCart} style={{ flex: 1, maxWidth: '300px' }}>
                Add to Cart — ₹{product.price * quantity}
              </button>
            </div>

            {/* WhatsApp fallback */}
            <a
              href={`https://wa.me/916263099627?text=${encodeURIComponent(`Hi! I want to order ${quantity}x ${product.name} (${product.flavor}, ${product.size}). Total: ₹${product.price * quantity}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa btn-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Or order via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Nutrition Details */}
      <section style={{ padding: '4rem 6%' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="sec-head">
            <div className="sec-tag">Nutrition Facts</div>
            <h2 className="sec-title">{product.name} — {product.size}</h2>
          </div>

          <div className="ntabs" style={{ marginBottom: '2rem' }}>
            <button className={`ntab ${activeNutrition === 'overview' ? 'active' : ''}`} onClick={() => setActiveNutrition('overview')}>Overview</button>
            <button className={`ntab ${activeNutrition === 'minerals' ? 'active' : ''}`} onClick={() => setActiveNutrition('minerals')}>Minerals</button>
          </div>

          <table className="ntable">
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>Per {product.size} bar</th>
              </tr>
            </thead>
            <tbody>
              {nutritionData[activeNutrition].map((row, i) => (
                <tr key={i}>
                  <td>{row.label}</td>
                  <td className={row.green ? 'green' : row.highlight ? 'highlight' : ''}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Diabetic note */}
          <div className="diabetic-note" style={{ marginTop: '2rem' }}>
            <div className="diabetic-note__icon">🩺</div>
            <div className="diabetic-note__title">Diabetic-Friendly*</div>
            <div className="diabetic-note__text">
              With <strong>0g added sugar</strong> and natural sweeteners only, FuelBar is a smarter choice for those managing blood sugar. 
              <strong> Always consult your doctor</strong> for personalized dietary advice.
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: '4rem 6%', background: 'var(--bg2)' }}>
          <div className="sec-head">
            <div className="sec-tag">You Might Also Like</div>
            <h2 className="sec-title">MORE {product.flavor.toUpperCase()} BARS</h2>
          </div>
          <div className="products__grid" style={{ maxWidth: '800px', gridTemplateColumns: `repeat(${relatedProducts.length}, 1fr)` }}>
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
