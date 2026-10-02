'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  dark?: boolean;
  title?: string;
  targetDate?: string;
}

export default function CountdownTimer({ 
  dark = false,
  title = 'KAYITLARIN KAPANMASINA KALAN SÜRE',
  targetDate
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 32,
    seconds: 48,
  });

  useEffect(() => {
    let targetTime: number;

    if (targetDate) {
      const parsed = new Date(targetDate).getTime();
      if (!isNaN(parsed) && parsed > Date.now()) {
        targetTime = parsed;
      } else {
        targetTime = Date.now() + (4 * 24 * 60 * 60 + 14 * 60 * 60 + 32 * 60) * 1000;
      }
    } else {
      const savedTarget = localStorage.getItem('lyra_masterclass_target');
      if (savedTarget) {
        targetTime = parseInt(savedTarget, 10);
        if (isNaN(targetTime) || targetTime <= Date.now()) {
          targetTime = Date.now() + (4 * 24 * 60 * 60 + 14 * 60 * 60 + 32 * 60) * 1000;
          localStorage.setItem('lyra_masterclass_target', targetTime.toString());
        }
      } else {
        targetTime = Date.now() + (4 * 24 * 60 * 60 + 14 * 60 * 60 + 32 * 60) * 1000;
        localStorage.setItem('lyra_masterclass_target', targetTime.toString());
      }
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'GÜN', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'SAAT', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'DAKİKA', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SANİYE', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Live Badge */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-burgundy opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-burgundy"></span>
        </span>
        <span
          className={`text-[0.68rem] tracking-[0.28em] uppercase font-bold ${
            dark ? 'text-gold-light' : 'text-burgundy'
          }`}
        >
          {title}
        </span>
      </div>

      {/* Grid of countdown boxes */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {timeBlocks.map((block, idx) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`flex flex-col items-center justify-center py-3 px-2 sm:py-4 sm:px-3 border-2 transition-all duration-300 ${
              dark
                ? 'border-gold/30 bg-wine/90 shadow-lg shadow-black/30'
                : 'border-wine/20 bg-white/95 shadow-sm hover:border-wine/60'
            }`}
          >
            <span
              className={`font-serif text-2xl sm:text-4xl font-bold tracking-tight ${
                dark ? 'text-ivory' : 'text-wine'
              }`}
            >
              {block.value}
            </span>
            <span
              className={`text-[0.6rem] sm:text-[0.68rem] font-bold tracking-[0.2em] uppercase mt-1 ${
                dark ? 'text-gold' : 'text-taupe/70'
              }`}
            >
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
