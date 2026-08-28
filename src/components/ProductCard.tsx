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

  return (
    <Link href={product.link || '#'} className="product-card group block w-full">
      <motion.div
        className={`relative flex flex-col ${
          isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
        } gap-6 p-5 rounded-none bg-white/45 backdrop-blur-md border border-gold/15 hover:border-gold/45 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:shadow-gold/3 group-hover:-translate-y-0.5 w-full overflow-hidden linear-scan`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1 + index * 0.08,
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {/* Inner geometric double frame for premium aesthetic */}
        <div className="absolute inset-1 border border-gold/5 pointer-events-none group-hover:border-gold/15 transition-colors duration-500" />

        {/* Hover gold radial glow layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/[0.03] via-transparent to-burgundy/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Product Image (Square proportioned: 1:1, sized relative to card on desktop) */}
        <div className="relative w-full sm:w-44 sm:h-44 aspect-square shrink-0 rounded-none overflow-hidden border border-gold/10 z-10">
          <Image
            src={product.image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400'}
            alt={product.title || 'Ürün Görseli'}
            fill
            sizes="(max-width: 640px) 100vw, 176px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-wine/15 via-transparent to-transparent" />
          
          {product.price && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md border border-gold/20 px-3 py-1 rounded-none text-[0.6rem] font-bold tracking-widest text-wine uppercase shadow-sm">
              {product.price}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-grow min-w-0 z-10 justify-between py-1">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[0.55rem] font-bold tracking-[0.3em] text-gold-dark uppercase">
                {product.badgeText || (product.priceType === 'free' ? 'ÜCRETSİZ KAYNAK' : 'ÖZEL EĞİTİM & SEANS')}
              </span>
            </div>
            
            <h3 className="font-serif text-[1.2rem] text-wine font-semibold leading-snug group-hover:text-wine/90 uppercase tracking-wide transition-colors">
              {product.title}
            </h3>
            <p className="text-[0.8rem] text-taupe/70 leading-relaxed font-medium line-clamp-3 sm:line-clamp-4">
              {product.description || product.tagline}
            </p>
          </div>

          {/* Action CTA Button - full-width outlined style similar to Rishani */}
          <div className="pt-4 mt-4 border-t border-gold/10 sm:border-t-0 sm:pt-0 sm:mt-0">
            <div className="w-full py-3 px-5 rounded-none border border-gold/25 text-center transition-all duration-300 group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-white flex items-center justify-center gap-2">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold-dark group-hover:text-white transition-colors">
                {product.buttonText}
              </span>
              <HiOutlineArrowRight className="text-[0.7rem] text-gold-dark group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

