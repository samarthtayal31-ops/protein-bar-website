'use client';

import { useEffect, useRef } from 'react';

// Simple SVG Icons for the background
const ICONS = [
  // Chocolate chunk
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(192,120,53,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="4" width="14" height="16" rx="2" />
    <line x1="5" y1="12" x2="19" y2="12" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>,
  // Protein Bar
  <svg width="32" height="16" viewBox="0 0 32 16" fill="none" stroke="rgba(245,190,80,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="28" height="12" rx="3" />
    <line x1="10" y1="2" x2="10" y2="14" />
    <line x1="22" y1="2" x2="22" y2="14" />
  </svg>,
  // Nut / Seed
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(192,120,53,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
  </svg>
];

const NUM_PARTICLES = 25;
const SCATTER_RADIUS = 150;
const SCATTER_FORCE = 8;
const MAX_SPEED = 2;
const DRIFT_SPEED = 0.5;

export default function FloatingBackground() {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Initialize particles
    particlesRef.current = Array.from({ length: NUM_PARTICLES }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * DRIFT_SPEED,
        vy: Math.sin(angle) * DRIFT_SPEED,
        baseVx: Math.cos(angle) * DRIFT_SPEED,
        baseVy: Math.sin(angle) * DRIFT_SPEED,
        rotation: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 2,
        iconIdx: Math.floor(Math.random() * ICONS.length),
        scale: 0.6 + Math.random() * 0.8
      };
    });

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    // It's possible the mouse leaves the window
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    // Animation Loop
    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const nodes = containerRef.current?.children;
      if (!nodes) return;

      particlesRef.current.forEach((p, idx) => {
        // Physics: scatter from mouse
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;

        if (distSq < SCATTER_RADIUS * SCATTER_RADIUS) {
          const dist = Math.sqrt(distSq);
          // Normalize and apply force inversely proportional to distance
          const force = (SCATTER_RADIUS - dist) / SCATTER_RADIUS;
          p.vx += (dx / dist) * force * SCATTER_FORCE * 0.1;
          p.vy += (dy / dist) * force * SCATTER_FORCE * 0.1;
          p.vrot += (Math.random() - 0.5) * force * 5;
        }

        // Physics: Friction towards base drift
        p.vx = p.vx * 0.95 + p.baseVx * 0.05;
        p.vy = p.vy * 0.95 + p.baseVy * 0.05;
        p.vrot = p.vrot * 0.98 + ((Math.random() - 0.5) * 0.5) * 0.02;

        // Cap max speed so they don't fly off too crazy
        const speedSq = p.vx * p.vx + p.vy * p.vy;
        if (speedSq > MAX_SPEED * MAX_SPEED) {
          const speed = Math.sqrt(speedSq);
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vrot;

        // Bounce off walls (wrap around looks cooler for zero gravity, but bounce is safer)
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        // Update DOM node
        const node = nodes[idx];
        if (node) {
          node.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg) scale(${p.scale})`;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1, // Keep it strictly behind everything
        overflow: 'hidden'
      }}
    >
      {Array.from({ length: NUM_PARTICLES }).map((_, i) => (
        <div 
          key={i} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            willChange: 'transform',
            // Default off-screen before JS kicks in
            transform: 'translate3d(-100px, -100px, 0)'
          }}
        >
          {ICONS[i % ICONS.length]}
        </div>
      ))}
    </div>
  );
}
