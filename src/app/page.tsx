'use client';

import ProfileHeader from '@/components/ProfileHeader';
import ProductCard from '@/components/ProductCard';
import SectionDivider from '@/components/SectionDivider';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProducts, ProductItem, defaultProducts, getVideos, FeaturedVideoItem } from '@/data/defaults';

export default function HomePage() {
  const [products, setProducts] = useState<ProductItem[]>(defaultProducts);
  const [videos, setVideos] = useState<FeaturedVideoItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setProducts(await getProducts());
      setVideos(getVideos());
    };
    loadData();
  }, []);

  const eyeAmNova = products.find(p => p.id === 'eye-am-nova');
  const mastersoul = products.find(p => p.id === 'mastersoul');
  const freeProducts = products.filter(p => p.priceType === 'free');

  return (
    <main className="min-h-[100dvh] bg-ivory flex flex-col items-center">
      {/* Subtle background texture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gold/[0.03] to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gradient-to-t from-burgundy/[0.02] to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pb-16 pt-4 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
        
        {/* Sol Sütun: Profil, Fotoğraf ve Biyografi */}
        <div className="lg:col-span-5 lg:sticky lg:top-12 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
          <ProfileHeader />
        </div>

        {/* Sağ Sütun: Eğitimler, Videolar ve Hizmetler */}
        <div id="products" className="lg:col-span-7 space-y-4 mt-4 lg:mt-0">
          
          {/* EYE AM NOVA - Featured Training */}
          {eyeAmNova && (
            <div>
              <SectionDivider title="EYE AM NOVA" />
              <ProductCard product={eyeAmNova} index={0} />
            </div>
          )}

          {/* MASTERSOUL - Featured Training */}
          {mastersoul && (
            <div>
              <SectionDivider title="MASTERSOUL" />
              <ProductCard product={mastersoul} index={1} />
            </div>
          )}

          {/* Ücretsiz Kaynaklar */}
          {freeProducts.length > 0 && (
            <div>
              <SectionDivider title="Ücretsiz Kaynaklar" />
              <div className="grid grid-cols-1 gap-5">
                {freeProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id || `free-${index}`} 
                    product={product} 
                    index={index + 2} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* YouTube Videos Section */}
          {videos.length > 0 && (
            <div id="videos">
              <SectionDivider title="Öne Çıkan Videolar" />
              <div className="grid grid-cols-1 gap-4">
                {videos.map((video, index) => (
                  <a
                    key={video.id || `video-${index}`}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-none bg-white/70 border border-gold/15 hover:border-gold/45 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:shadow-gold/3 hover:-translate-y-0.5 linear-scan"
                  >
                    <div className="flex gap-4 p-4 items-center relative">
                      {/* Inner border for aesthetic alignment */}
                      <div className="absolute inset-1 border border-gold/5 pointer-events-none group-hover:border-gold/15 transition-colors" />
                      
                      {/* Video Thumbnail */}
                      <div className="relative w-28 h-20 min-w-[7rem] rounded-none overflow-hidden border border-gold/10 bg-charcoal z-10">
                        <Image
                          src={video.thumbnail || 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=400'}
                          alt={video.title}
                          fill
                          sizes="112px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Play overlay button */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                          <div className="w-9 h-9 rounded-none border border-wine/25 bg-white/95 flex items-center justify-center text-wine shadow-md transition-transform duration-300 group-hover:scale-110">
                            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        {/* Duration Tag */}
                        {video.duration && (
                          <div className="absolute bottom-1 right-1 bg-black/75 px-1.5 py-0.5 rounded-none text-[0.6rem] text-white font-bold tracking-wide">
                            {video.duration}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-grow min-w-0 z-10">
                        <span className="text-[0.65rem] font-bold text-gold tracking-widest uppercase block mb-1">
                          YOUTUBE BÖLÜMÜ
                        </span>
                        <h3 className="font-serif text-[0.95rem] text-wine font-semibold leading-snug mb-1 line-clamp-2 uppercase">
                          {video.title}
                        </h3>
                        <p className="text-[0.7rem] text-taupe/40 font-bold tracking-[0.1em] uppercase flex items-center gap-1 group-hover:text-wine transition-colors">
                          ŞİMDİ İZLE
                          <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
