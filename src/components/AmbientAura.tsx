'use client';

import { useEffect, useState } from 'react';

export default function AmbientAura() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    let rafId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Smooth interpolation for luxury buttery fluid motion
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMousePos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dynamic Mouse Aura (Desktop only) */}
      {!isTouch && (
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-[140px] transition-opacity duration-1000 opacity-60"
          style={{
            transform: `translate3d(${mousePos.x - 350}px, ${mousePos.y - 350}px, 0)`,
            background: 'radial-gradient(circle, rgba(163, 155, 148, 0.12) 0%, rgba(110, 21, 37, 0.04) 50%, transparent 70%)',
            willChange: 'transform',
          }}
        />
      )}

      {/* Ambient Top Glow (Warm Beige / Soft Gold) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-b from-[#A39B94]/[0.06] via-[#F5F1E9]/[0.1] to-transparent rounded-full blur-[130px]" />

      {/* Ambient Mid-Lower Glow (Deep Wine / Burgundy warmth) */}
      <div className="absolute top-[35%] -right-[15%] w-[600px] h-[600px] bg-gradient-to-bl from-[#6E1525]/[0.03] to-transparent rounded-full blur-[140px]" />
      <div className="absolute top-[65%] -left-[15%] w-[650px] h-[650px] bg-gradient-to-tr from-[#3E0A16]/[0.025] to-transparent rounded-full blur-[150px]" />

      {/* Subtle Sacred Geometry Grid Lines (Very faint high-luxury architectural grid) */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#A39B94_1px,transparent_1px),linear-gradient(to_bottom,#A39B94_1px,transparent_1px)] bg-[size:5rem_5rem]" />
    </div>
  );
}
