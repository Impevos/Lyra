'use client';

import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { HiOutlineArrowRight, HiOutlineBookOpen, HiOutlinePlay, HiOutlineDocumentText } from 'react-icons/hi';
import { defaultProducts } from '@/data/defaults';

const categories = ['Tümü', 'PDF Rehberler', 'Video Eğitimler', 'Yayın Kayıtları'];

const iconMap: { [key: string]: any } = {
  HiOutlineDocumentText: HiOutlineDocumentText,
  HiOutlinePlay: HiOutlinePlay,
  HiOutlineBookOpen: HiOutlineBookOpen,
};

const mappedDefaults = defaultProducts.map((item: any) => ({
  ...item,
  icon: iconMap[item.icon] || HiOutlineDocumentText,
}));

export default function UrunlerPage() {
  const [products, setProducts] = useState(mappedDefaults);

  useEffect(() => {
    const saved = localStorage.getItem('custom_products');
    if (saved) {
      const custom = JSON.parse(saved);
      const mappedCustom = custom.map((item: any) => ({
        ...item,
        icon: iconMap[item.icon] || HiOutlineDocumentText,
      }));
      setProducts(mappedCustom);
    }
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-ivory" />
        <div className="absolute top-[25%] left-[20%] w-[400px] h-[400px] orb orb-gold opacity-10" />
        <div className="absolute bottom-[25%] right-[15%] w-[450px] h-[450px] orb orb-pink opacity-10" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <AnimatedSection>
            <span className="label-line justify-center mb-8">Mağaza</span>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <h1 className="heading-display mb-7">
              Spiritüel
              <br />
              <span className="gradient-text italic">İçerikler</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="body-lg text-center text-taupe/70 max-w-2xl mx-auto">
              Özenle hazırlanmış rehberler, eğitim videoları ve yayın kayıtlarıyla
              istediğiniz zaman spiritüel gelişiminizi destekleyin.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-full text-[0.78rem] font-medium transition-all duration-400 ${
                  i === 0
                    ? 'bg-gradient-to-r from-burgundy to-wine text-ivory shadow-md'
                    : 'bg-beige/50 text-charcoal/50 hover:bg-beige hover:text-burgundy border border-gold/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {products.map((product, index) => (
              <AnimatedSection key={product.title} delay={index * 0.08}>
                <div className="premium-card overflow-hidden group cursor-pointer h-full flex flex-col">
                  {/* Image area */}
                  <div className="relative h-48 overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.iconGrad} flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:shadow-xl`}>
                        <product.icon className="text-2xl text-ivory" />
                      </div>
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 right-4">
                        <span className={`text-[0.58rem] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full font-semibold border ${
                          product.badge === 'Yeni'
                            ? 'bg-gold/15 text-gold-dark border-gold/15'
                            : 'bg-burgundy/15 text-burgundy border-burgundy/10'
                        }`}>
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Category */}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[0.6rem] uppercase tracking-[0.16em] bg-ivory/85 backdrop-blur-md text-charcoal/60 px-3 py-1.5 rounded-full font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-[1.1rem] text-wine leading-[1.35] mb-2.5 group-hover:text-burgundy transition-colors duration-400 text-left">
                      {product.title}
                    </h3>
                    <p className="text-[0.82rem] text-taupe/60 leading-relaxed mb-5 flex-grow text-left">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/[0.06]">
                      <span className="font-serif text-xl text-wine font-medium">{product.price}</span>
                      <span className="text-[0.78rem] font-medium text-gold group-hover:text-burgundy transition-colors duration-400 flex items-center gap-1.5">
                        Satın Al
                        <HiOutlineArrowRight className="text-xs transition-transform duration-400 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="premium-card p-12 md:p-16">
              <span className="label-line justify-center mb-6">Özel İçerikler</span>
              <h2 className="heading-md mb-5 text-center">
                Aradığınızı bulamadınız mı?
              </h2>
              <p className="body-md text-center max-w-md mx-auto mb-8">
                Size özel içerik talepleriniz için bizimle iletişime geçin.
              </p>
              <Link href="/iletisim" className="btn-primary mx-auto">
                <span>İletişime Geç</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
