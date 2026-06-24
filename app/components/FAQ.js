'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What is the shelf life of the bars?",
    answer: "Our protein bars have an expiry of 6 months from the date of manufacturing. We produce in small batches to ensure you always get fresh fuel."
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes! We offer Cash on Delivery (COD) on all our orders so you can pay conveniently when your bars arrive."
  },
  {
    question: "Are there any artificial sweeteners or sugar alcohols?",
    answer: "Absolutely not. We sweeten our bars 100% naturally using only Jaggery, Dates, and Honey. No maltitol, no sucralose, and no hidden junk."
  },
  {
    question: "Are these bars safe for diabetics?",
    answer: "Our bars use low GI (Glycemic Index) natural sweeteners and high fiber ingredients, making them diabetic-friendly in limited, controlled portions. However, we always recommend consulting your doctor first."
  },
  {
    question: "How long does shipping take?",
    answer: "We offer pan-India shipping. Orders are usually dispatched within 24 hours and take about 3-5 business days to reach your doorstep depending on your location."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" style={{ padding: '6rem 0', background: 'var(--bg)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="text-gold" style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>GOT QUESTIONS?</span>
          <h2 className="heading-lg" style={{ marginTop: '0.5rem' }}>FREQUENTLY ASKED</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                style={{ 
                  background: 'var(--surface)', 
                  border: `1px solid ${isOpen ? 'var(--hazel)' : 'var(--border)'}`, 
                  borderRadius: '1rem', 
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '1.5rem', 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--text)', 
                    fontSize: '1.1rem', 
                    fontWeight: 700, 
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {faq.question}
                  <span style={{ 
                    color: isOpen ? 'var(--gold)' : 'var(--muted)', 
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s ease',
                    fontSize: '1.5rem',
                    lineHeight: 1
                  }}>
                    +
                  </span>
                </button>
                
                <div style={{ 
                  maxHeight: isOpen ? '200px' : '0', 
                  opacity: isOpen ? 1 : 0, 
                  transition: 'all 0.3s ease',
                  padding: isOpen ? '0 1.5rem 1.5rem' : '0 1.5rem',
                }}>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
