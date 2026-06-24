'use client';

const reviews = [
  {
    name: "Rahul M.",
    role: "CrossFit Athlete",
    text: "Finally, a protein bar that doesn't taste like chalk. The Choc-Hazelnut is literally better than most desserts I've had. 10/10.",
    rating: 5
  },
  {
    name: "Sneha P.",
    role: "Yoga Instructor",
    text: "I love that I can actually pronounce every single ingredient. It gives me clean energy before my morning classes without the sugar crash.",
    rating: 5
  },
  {
    name: "Vikram S.",
    role: "Marathon Runner",
    text: "Been eating these during my long runs. They are easy to digest, taste amazing, and give a solid sustained energy boost. Highly recommended.",
    rating: 5
  },
  {
    name: "Aanya D.",
    role: "Working Professional",
    text: "My go-to 4 PM snack at the office. The Dates Delight flavor is incredible. It completely stops my junk food cravings.",
    rating: 5
  },
  {
    name: "Karan T.",
    role: "Fitness Coach",
    text: "As a coach, I'm extremely strict about macros and ingredients. FuelBar nails both. It's the only bar I recommend to my clients.",
    rating: 5
  }
];

export default function Reviews() {
  // Duplicate reviews to create a seamless infinite marquee effect
  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" style={{ padding: '6rem 0', background: 'var(--bg-card)', overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="text-gold" style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>WALL OF LOVE</span>
        <h2 className="heading-lg" style={{ marginTop: '0.5rem' }}>WHAT ATHLETES SAY</h2>
      </div>

      {/* Marquee Container */}
      <div className="marquee-container" style={{ position: 'relative', width: '100%', display: 'flex', overflow: 'hidden' }}>
        {/* Left/Right Fade Overlays */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '10vw', height: '100%', background: 'linear-gradient(to right, var(--bg-card), transparent)', zIndex: 2 }}></div>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '10vw', height: '100%', background: 'linear-gradient(to left, var(--bg-card), transparent)', zIndex: 2 }}></div>

        <div className="marquee-track" style={{ display: 'flex', gap: '2rem', paddingLeft: '2rem', width: 'max-content' }}>
          {marqueeReviews.map((review, idx) => (
            <div 
              key={idx} 
              style={{ 
                width: '350px', 
                background: 'var(--surface)', 
                padding: '2rem', 
                borderRadius: '1.5rem', 
                border: '1px solid var(--border)',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.3rem', color: 'var(--gold)' }}>
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              
              <p style={{ color: 'var(--text)', fontSize: '1.05rem', lineHeight: 1.6, fontStyle: 'italic', flexGrow: 1 }}>
                "{review.text}"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--hazel)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{review.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.2rem' }}>{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
