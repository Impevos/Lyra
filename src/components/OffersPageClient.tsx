'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getProducts, ProductItem, defaultProducts } from '@/data/defaults';
import ProductCard from '@/components/ProductCard';

interface OffersPageClientProps {
  filterType: 'all' | 'paid' | 'free';
}

export default function OffersPageClient({ filterType }: OffersPageClientProps) {
  const [products, setProducts] = useState<ProductItem[]>(defaultProducts);

  useEffect(() => {
    const loadData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    loadData();
  }, []);

  // Filter products based on page type
  let filteredProducts = products;
  if (filterType === 'paid') {
    filteredProducts = products.filter((p) => p.priceType !== 'free');
  } else if (filterType === 'free') {
    filteredProducts = products.filter((p) => p.priceType === 'free');
  } else {
    // 'all' - already sorted by getProducts() so paid are first, free are last.
    filteredProducts = products;
  }

  // Page titles and description
  const titles = {
    all: {
      title: 'TÜM TEKLİFLER',
      subtitle: 'Bilinç evrelerinde uyanış ve enerjisel hizalanma için hazırlanan tüm rehber, eğitim ve seanslar.',
    },
    paid: {
      title: 'ÜCRETLİ PROGRAMLAR',
      subtitle: 'Bireysel dönüşüm, derinlikli eğitimler ve kuantum sıçrama odaklı premium seanslar.',
    },
    free: {
      title: 'ÜCRETSİZ KAYNAKLAR',
      subtitle: 'Ruhsal yolculuğunuzun ilk adımlarında size eşlik edecek ücretsiz rehber ve pratikler.',
    },
  };

  const { title, subtitle } = titles[filterType];

  return (
    <main className="min-h-screen bg-ivory flex flex-col items-center relative py-12">
      {/* Background Texture & Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-gold/[0.03] to-transparent rounded-full blur-[140px]" />
        
        {/* Sacred Geometry / Linear Vector Feel (Sharp lines) */}
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#B8956A_1px,transparent_1px),linear-gradient(to_bottom,#B8956A_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-wine/25 bg-white/70 shadow-xs mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-ping" />
            <span className="font-cinzel text-[0.65rem] font-bold text-burgundy tracking-[0.35em] uppercase">
              LYRA ON EARTH • SİMYA KATALOĞU
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-wine font-light tracking-[0.05em] uppercase mb-4">
            {title}
          </h1>
          <div className="w-16 h-0.5 bg-burgundy mb-5" />
          <p className="text-xs sm:text-sm text-taupe/80 leading-relaxed font-normal max-w-lg">
            {subtitle}
          </p>
        </div>

        {/* Navigation Tabs (Sharp & high contrast) */}
        <div className="flex justify-center border-b-2 border-wine/15 mb-14 max-w-md mx-auto">
          <Link
            href="/offers"
            className={`pb-3.5 px-6 text-[0.68rem] tracking-[0.25em] uppercase font-bold transition-all border-b-2 -mb-[2px] ${
              filterType === 'all' 
                ? 'border-wine text-wine font-cinzel' 
                : 'border-transparent text-taupe/50 hover:text-wine'
            }`}
          >
            TÜMÜ
          </Link>
          <Link
            href="/offers/paid"
            className={`pb-3.5 px-6 text-[0.68rem] tracking-[0.25em] uppercase font-bold transition-all border-b-2 -mb-[2px] ${
              filterType === 'paid' 
                ? 'border-wine text-wine font-cinzel' 
                : 'border-transparent text-taupe/50 hover:text-wine'
            }`}
          >
            ÜCRETLİ
          </Link>
          <Link
            href="/offers/free"
            className={`pb-3.5 px-6 text-[0.68rem] tracking-[0.25em] uppercase font-bold transition-all border-b-2 -mb-[2px] ${
              filterType === 'free' 
                ? 'border-wine text-wine font-cinzel' 
                : 'border-transparent text-taupe/50 hover:text-wine'
            }`}
          >
            ÜCRETSİZ
          </Link>
        </div>

        {/* Offers Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id || `offer-${index}`}
                product={product}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-gold/20 bg-white/30">
            <p className="text-taupe/50 text-sm font-medium">
              Bu kategoride henüz bir çalışma bulunmamaktadır.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
