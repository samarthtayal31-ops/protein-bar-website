'use client';

const features = [
  {
    title: "100% REAL INGREDIENTS",
    description: "Dates, nuts, premium whey, and honey. We only use ingredients you can actually pronounce and recognize.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ) // A clean leaf/natural icon or checkmark. Let's use a leaf-like SVG.
  },
  {
    title: "ZERO PRESERVATIVES",
    description: "No artificial sweeteners, no hidden junk, no seed oils, and absolutely no maltitol. Clean fuel only.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ) // Block icon
  },
  {
    title: "SUSTAINED ENERGY",
    description: "Engineered with the perfect ratio of protein, healthy fats, and complex carbs to keep you fueled for hours.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ) // Lightning bolt
  },
  {
    title: "HANDCRAFTED FRESH",
    description: "Produced in small, strictly controlled batches to guarantee maximum freshness and an unparalleled taste.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ) // Shield / Quality
  }
];

export default function WhyFuelbar() {
  return (
    <section id="why" style={{ padding: '8rem 0', background: 'var(--bg)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="text-gold" style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>THE DIFFERENCE</span>
          <h2 className="heading-lg" style={{ marginTop: '0.5rem' }}>WHY FUELBAR?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto 0', lineHeight: 1.6 }}>
            Most protein bars are glorified candy bars full of chemicals. We built FuelBar from the ground up to be the cleanest, highest-performing fuel on the market.
          </p>
        </div>

        {/* Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="fade-up"
              style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border)', 
                borderRadius: '1.5rem', 
                padding: '2.5rem 2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'default'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon Container */}
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '1rem', 
                background: 'linear-gradient(135deg, rgba(192,120,53,0.2), rgba(245,190,80,0.1))',
                color: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                border: '1px solid rgba(192,120,53,0.3)'
              }}>
                {feature.icon}
              </div>

              {/* Text */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.5px' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
