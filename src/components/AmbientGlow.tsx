'use client';

import { useEffect, useState } from 'react';

export default function AmbientGlow() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="ambient-glow hidden md:block"
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
}
