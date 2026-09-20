'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface SectionDividerProps {
  title: string;
}

export default function SectionDivider({ title }: SectionDividerProps) {
  return (
    <motion.div
      className="flex items-center gap-4 py-8 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#A39B94]/30 to-[#A39B94]/40" />
      
      <div className="flex items-center gap-2 bg-ivory px-2">
        <div className="relative w-5 h-5 opacity-60">
          <Image
            src="/Lyra-Logo.png"
            alt="Lyra symbol"
            fill
            sizes="20px"
            className="object-contain"
          />
        </div>
        <span className="text-[0.7rem] font-bold tracking-[0.35em] text-[#A39B94] uppercase whitespace-nowrap">
          {title}
        </span>
      </div>

      <div className="flex-grow h-px bg-gradient-to-l from-transparent via-[#A39B94]/30 to-[#A39B94]/40" />
    </motion.div>
  );
}
