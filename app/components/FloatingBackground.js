'use client';

import { useEffect, useRef } from 'react';

// Simple SVG Icons for the background
// Detailed, creative SVG Icons for the background
const ICONS = [
  // 3D Chocolate Cube
  <svg width="32" height="32" viewBox="0 0 28 28" fill="none" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))', opacity: 0.4 }}>
    <path d="M14 2 L26 8 L26 20 L14 26 L2 20 L2 8 Z" fill="#2A160C" />
    <path d="M14 2 L26 8 L14 14 L2 8 Z" fill="#4A2E1B" />
    <path d="M26 8 L26 20 L14 26 L14 14 Z" fill="#3D2314" />
    <path d="M7 6 L14 9.5 L21 6" stroke="#6C452C" strokeWidth="1" strokeLinecap="round" />
  </svg>,
  // Bitten Protein Bar
  <svg width="46" height="28" viewBox="0 0 40 24" fill="none" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))', opacity: 0.4 }}>
    <rect x="2" y="4" width="36" height="16" rx="3" fill="#3D2314" />
    <rect x="2" y="4" width="36" height="8" rx="3" fill="#4A2E1B" />
    <rect x="2" y="10" width="36" height="2" fill="#D49A44" /> {/* Caramel layer */}
    {/* Bite mark cutouts */}
    <circle cx="36" cy="12" r="4" fill="#050302" />
    <circle cx="32" cy="16" r="4" fill="#050302" />
    <circle cx="32" cy="8" r="4" fill="#050302" />
  </svg>,
  // Golden Hazelnut
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))', opacity: 0.4 }}>
    <circle cx="12" cy="14" r="8" fill="#A86F28" />
    <path d="M12 6 C8 6, 4 10, 4 14 C4 16, 6 18, 8 19 C9 16, 11 14, 12 14 C13 14, 15 16, 16 19 C18 18, 20 16, 20 14 C20 10, 16 6, 12 6 Z" fill="#D49A44" />
    <path d="M12 2 C14.5 2, 16 4, 16 6.5 C16 8, 14 10, 12 10 C10 10, 8 8, 8 6.5 C8 4, 9.5 2, 12 2 Z" fill="#6FCF72" opacity="0.9" />
  </svg>,
  // Wrinkled Date
  <svg width="24" height="32" viewBox="0 0 20 26" fill="none" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))', opacity: 0.4 }}>
    <ellipse cx="10" cy="13" rx="8" ry="12" fill="#522C1A" />
    <path d="M6 7 Q10 13 6 19 M10 5 Q14 13 10 21 M14 7 Q18 13 14 19" stroke="#3D2314" strokeWidth="1.5" strokeLinecap="round" />
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

    // Touch tracking for mobile
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    
    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

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
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
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
