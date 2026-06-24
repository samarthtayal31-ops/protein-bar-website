'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products, getProductsByFlavor } from '@/app/lib/products';
import ProductCard from '@/app/components/ProductCard';

export default function Home() {
  const [flavorTab, setFlavorTab] = useState('choc');
  const [nutritionSize, setNutritionSize] = useState('40g');

  const selectedProducts = getProductsByFlavor(flavorTab);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="pill-badge" style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700 }}>
            <span style={{ width: 8, height: 8, background: '#6fcf72', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #6fcf72' }}></span>
            25% Whey Protein · No Added Sugar · Pan-India Delivery
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 1, letterSpacing: '1px', marginBottom: '1rem', textShadow: '0 0 40px rgba(192, 120, 53, 0.4)' }}>
            FUEL YOUR <br />
            <span className="text-gold">EVERY GAIN</span>
          </h1>
          <p style={{ maxWidth: '600px', fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Premium 25% Whey protein bars sweetened naturally with Jaggery, Dates, and Honey. Absolutely no added sugar, no soya, and incredible taste.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#products" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Shop Protein Bars</a>
            <a href="#nutrition" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>View Nutrition</a>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)', padding: '1rem 0', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text)' }}>
          <span>💪 25% WHEY PROTEIN</span>
          <span>🚫 0g ADDED SUGAR</span>
          <span>🍪 3 FLAVORS</span>
          <span>🏷️ FROM ₹60</span>
          <span>🇮🇳 PAN-INDIA DELIVERY</span>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <section id="products" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="text-gold" style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>CHOOSE YOUR FUEL</span>
            <h2 className="heading-lg" style={{ marginTop: '0.5rem' }}>THREE FLAVORS. THREE SIZES.</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <button
              className={`btn-outline ${flavorTab === 'choc' ? 'active' : ''}`}
              onClick={() => setFlavorTab('choc')}
              style={flavorTab === 'choc' ? { background: 'var(--hazel)', color: '#fff', borderColor: 'var(--hazel)' } : {}}
            >
              🍫 Choc Hazelnut
            </button>
            <button
              className={`btn-outline ${flavorTab === 'dates' ? 'active' : ''}`}
              onClick={() => setFlavorTab('dates')}
              style={flavorTab === 'dates' ? { background: 'var(--hazel)', color: '#fff', borderColor: 'var(--hazel)' } : {}}
            >
              🍯 Dates Delight
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {selectedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SUGAR FREE BANNER */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-card)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚫</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-bebas)', letterSpacing: '1px' }}>Zero Added Sugar</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Sweetened only with natural Jaggery, Dates, and Honey.</p>
          </div>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥛</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-bebas)', letterSpacing: '1px' }}>100% Complete Whey</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>We use premium whey protein concentrate. No cheap soy fillers.</p>
          </div>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-bebas)', letterSpacing: '1px' }}>Diabetic Friendly</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Low GI ingredients make it safe in limited portions.</p>
          </div>
        </div>
      </section>

      {/* NUTRITION SECTION */}
      <section id="nutrition" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="text-gold" style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>TRANSPARENCY FIRST</span>
            <h2 className="heading-lg" style={{ marginTop: '0.5rem' }}>NUTRITION FACTS</h2>
          </div>

          <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
              {['40g', '60g', '90g'].map(size => (
                <button
                  key={size}
                  onClick={() => setNutritionSize(size)}
                  style={{ flex: 1, padding: '1rem', background: nutritionSize === size ? 'var(--bg-dark)' : 'transparent', border: 'none', color: nutritionSize === size ? 'var(--text)' : 'var(--muted)', fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', letterSpacing: '1px' }}
                >
                  {size === '40g' ? 'SPARK (40g)' : size === '60g' ? 'POWER (60g)' : 'BEAST (90g)'}
                </button>
              ))}
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid var(--text)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.5rem' }}>Amount Per Serving</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
                <span style={{ fontWeight: 800 }}>Calories</span>
                <span style={{ fontWeight: 800 }}>{nutritionSize === '40g' ? 150 : nutritionSize === '60g' ? 220 : 280} kcal</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
                <span style={{ fontWeight: 800 }}>Protein</span>
                <span style={{ fontWeight: 800 }}>{nutritionSize === '40g' ? '10g' : nutritionSize === '60g' ? '15g' : '22.5g'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
                <span>Total Fat</span>
                <span>{nutritionSize === '40g' ? '5g' : nutritionSize === '60g' ? '7g' : '9g'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
                <span style={{ paddingLeft: '1rem', color: 'var(--muted)' }}>Saturated Fat</span>
                <span>{nutritionSize === '40g' ? '2g' : nutritionSize === '60g' ? '3g' : '4g'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
                <span style={{ paddingLeft: '1rem', color: 'var(--muted)' }}>Trans Fat</span>
                <span>0g</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
                <span style={{ fontWeight: 800 }}>Total Carbohydrates</span>
                <span>{nutritionSize === '40g' ? '16g' : nutritionSize === '60g' ? '24g' : '32g'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
                <span style={{ paddingLeft: '1rem', color: 'var(--muted)' }}>Sugars (Natural)</span>
                <span>{nutritionSize === '40g' ? '6g' : nutritionSize === '60g' ? '9g' : '12g'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
                <span style={{ paddingLeft: '1rem', color: 'var(--muted)' }}>Added Sugars</span>
                <span>0g</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
                <span style={{ paddingLeft: '1rem', color: 'var(--muted)' }}>Dietary Fiber</span>
                <span>{nutritionSize === '40g' ? '2g' : nutritionSize === '60g' ? '3g' : '4g'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
                <span style={{ fontWeight: 800 }}>Sodium</span>
                <span>{nutritionSize === '40g' ? '80mg' : nutritionSize === '60g' ? '120mg' : '160mg'}</span>
              </div>
              
              <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center', fontStyle: 'italic' }}>
                *Diabetic friendly in limited portions. Consult your doctor.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INGREDIENTS SECTION */}
      <section id="ingredients" style={{ padding: '6rem 0', background: 'var(--bg-card)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="text-gold" style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>REAL FOOD ONLY</span>
            <h2 className="heading-lg" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>NO JUNK.<br />JUST FUEL.</h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              We believe in transparency. If you can't pronounce it, we don't put it in our bars. Our ingredients are sourced locally and blended to perfection.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Whey Protein', 'Rolled Oats', 'Jaggery', 'Dates', 'Honey', 'Almonds', 'Hazelnuts', 'Cocoa'].map(ing => (
                <span key={ing} style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 700 }}>
                  {ing}
                </span>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, rgba(192,120,53,0.1) 0%, transparent 70%)' }}>
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'var(--hazel)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px rgba(192, 120, 53, 0.3)' }}>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', letterSpacing: '2px' }}>100% REAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="delivery" style={{ padding: '8rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100%', background: 'radial-gradient(ellipse at center, rgba(192,120,53,0.15) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>READY TO FUEL UP?</h2>
          <p style={{ maxWidth: '500px', margin: '0 auto 2.5rem', color: 'var(--muted)', fontSize: '1.1rem' }}>
            Mix and match your favorite flavors and sizes. Get free pan-India delivery on all orders over ₹500.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#products" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>Shop Now</a>
            <a href="https://wa.me/916263099627" target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
