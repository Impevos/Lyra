'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingContact() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-7 right-7 z-50">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
          >
            <div className="glass-dark rounded-xl px-4 py-2.5 text-[0.78rem] text-ivory/90 font-medium shadow-xl">
              Hemen Yaz →
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/905000000000"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-[58px] h-[58px] rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transition-all duration-500 hover:scale-105"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="text-[1.65rem]" />
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" style={{ animationDuration: '3s' }} />
      </a>
    </div>
  );
}
