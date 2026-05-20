'use client';

import { useEffect, useRef } from 'react';

export default function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip rAF entirely on mobile/tablet — the element is hidden via CSS anyway
    const mq = window.matchMedia('(min-width: 768px)');
    if (!mq.matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let rafId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isIdle = true;
    let idleTimer: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Restart loop if idle
      if (isIdle) {
        isIdle = false;
        rafId = requestAnimationFrame(updatePosition);
      }

      // Reset idle timer
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isIdle = true;
      }, 2000);
    };

    const updatePosition = () => {
      if (isIdle) return; // Stop loop when mouse is idle

      // Smooth interpolation (lerp) for premium organic lag feel
      const ease = 0.08;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      if (glow) {
        glow.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle responsive changes
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        cancelAnimationFrame(rafId);
        clearTimeout(idleTimer);
        isIdle = true;
      }
    };
    mq.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mq.removeEventListener('change', handleMediaChange);
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="ambient-glow hidden md:block"
    />
  );
}
