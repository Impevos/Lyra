'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { ProductItem } from '@/data/defaults';

interface ProductCardProps {
  product: ProductItem;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const isEven = index % 2 === 0;

  const href = product.type === 'external' && product.link 
    ? product.link 
    : `/p/${product.id}`;

  const isFree = product.priceType === 'free';

  return (
    <Link href={href} className="product-card group block w-full">
      <motion.div
        className={`sharp-card-light relative flex flex-col ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        } gap-6 p-6 sm:p-7 w-full overflow-hidden`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          delay: 0.08 * (index % 4),
          duration: 0.6,
          ease: [0.2, 0.8, 0.2, 1],
        }}
      >
        {/* Subtle corner crosshairs */}
        <span className="absolute top-2 left-2 text-[0.65rem] text-gold/40 font-mono pointer-events-none font-bold">+</span>
        <span className="absolute top-2 right-2 text-[0.65rem] text-gold/40 font-mono pointer-events-none font-bold">+</span>
        <span className="absolute bottom-2 left-2 text-[0.65rem] text-gold/40 font-mono pointer-events-none font-bold">+</span>
        <span className="absolute bottom-2 right-2 text-[0.65rem] text-gold/40 font-mono pointer-events-none font-bold">+</span>

        {/* Product Image */}
        <div className="relative w-full md:w-56 md:h-56 aspect-square shrink-0 overflow-hidden border-2 border-wine/25 z-10 bg-ivory">
          <Image
            src={product.image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600'}
            alt={product.title || 'Ürün Görseli'}
            fill
            sizes="(max-width: 768px) 100vw, 224px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-wine/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Price or Access Badge */}
          {product.price && (
            <div className={`absolute bottom-3 right-3 backdrop-blur-md border px-3 py-1 text-[0.62rem] font-bold tracking-[0.2em] uppercase shadow-md ${
              isFree 
                ? 'bg-ivory/95 border-gold/40 text-wine' 
                : 'bg-wine text-white border-wine'
            }`}>
              {product.price}
            </div>
          )}

          {/* Roman numeral / Index stamp */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-0.5 text-[0.58rem] font-cinzel text-ivory tracking-widest uppercase font-bold">
            № 0{index + 1}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-grow min-w-0 z-10 justify-between py-1">
          <div className="space-y-2.5">
            {/* Metadata Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-cinzel text-[0.65rem] font-bold tracking-[0.3em] text-burgundy uppercase">
                {product.badgeText || (isFree ? 'ÜCRETSİZ DİJİTAL REHBER' : 'DÖNÜŞÜM PORTALI')}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-burgundy" />
              <span className="text-[0.6rem] tracking-[0.2em] text-taupe/50 uppercase font-mono font-bold">
                LYRA · 2026
              </span>
            </div>
            
            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-3xl text-wine font-bold leading-snug tracking-[0.03em] group-hover:text-burgundy uppercase transition-colors">
              {product.title}
            </h3>

            {/* Tagline / Description */}
            <p className="text-[0.85rem] text-taupe/80 leading-relaxed font-normal line-clamp-3 sm:line-clamp-4">
              {product.tagline || product.description}
            </p>
          </div>

          {/* Action CTA Button */}
          <div className="pt-5 mt-4 border-t-2 border-wine/10">
            <div className="w-full py-3.5 px-6 border-2 border-wine/25 text-center transition-all duration-300 group-hover:border-wine group-hover:bg-wine group-hover:text-white flex items-center justify-center gap-3 bg-white/70 shadow-xs">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-wine group-hover:text-white transition-colors">
                {product.buttonText || (isFree ? 'REHBERİ İNDİR' : 'PORTALA KATIL')}
              </span>
              <HiOutlineArrowRight className="text-[0.8rem] text-wine group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
