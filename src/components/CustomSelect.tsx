'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface Option {
  name: string;
  value: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: (string | Option)[];
  placeholder?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: Option[] = options.map((opt) => 
    typeof opt === 'string' ? { name: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine flex items-center justify-between hover:bg-white/70"
      >
        <span className={selectedOption ? 'text-wine' : 'text-taupe/40'}>
          {selectedOption ? selectedOption.name : placeholder || 'Seçiniz'}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <HiOutlineChevronDown className="text-gold text-lg" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute z-50 mt-2 w-full bg-white/95 backdrop-blur-xl border border-gold/10 rounded-2xl shadow-2xl shadow-gold/5 overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto py-2">
              {normalizedOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-6 py-3 text-sm transition-colors flex items-center justify-between ${
                    value === option.value
                      ? 'bg-gold/10 text-wine font-medium'
                      : 'text-taupe/70 hover:bg-gold/5 hover:text-wine'
                  }`}
                >
                  <span>{option.name}</span>
                  {value === option.value && (
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
