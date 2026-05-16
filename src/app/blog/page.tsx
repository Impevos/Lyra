'use client';

import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { HiOutlineArrowRight, HiOutlineClock } from 'react-icons/hi';

const defaultBlogPosts = [
  {
    category: 'Spiritüel Gelişim',
    title: 'Bilinç Dönüşümü: İçsel Yolculuğun 5 Evresi',
    excerpt: 'Spiritüel uyanış sürecinde bilinç nasıl dönüşür? Farkındalık seviyenizi derinleştirmek için bilmeniz gereken beş temel evre ve her bir evrede yaşanabilecek deneyimler.',
    date: '5 Mayıs 2026',
    readTime: '8 dk',
    gradient: 'from-burgundy/8 to-pink/15',
    featured: true,
  },
  {
    category: 'Enerji Çalışmaları',
    title: 'Günlük Enerji Temizliği Ritüelleri',
    excerpt: 'Her gün uygulayabileceğiniz basit ama etkili enerji temizliği teknikleri. Auranızı güçlendirin ve negatif enerjilerden arının.',
    date: '1 Mayıs 2026',
    readTime: '6 dk',
    gradient: 'from-gold/8 to-beige/20',
    featured: false,
  },
  {
    category: 'Meditasyon',
    title: 'Yeni Başlayanlar İçin Farkındalık Meditasyonu',
    excerpt: 'Meditasyona yeni başlıyorsanız, bu rehber tam size göre. Adım adım farkındalık meditasyonu pratiği ve ipuçları.',
    date: '28 Nisan 2026',
    readTime: '5 dk',
    gradient: 'from-pink/10 to-rose/8',
    featured: false,
  },
  {
    category: 'Kristaller',
    title: 'Şifa Taşları: Ametist ve Roze Kuvars',
    excerpt: 'İki güçlü şifa taşının enerjik özellikleri, kullanım alanları ve günlük yaşamda nasıl faydalanabileceğiniz.',
    date: '22 Nisan 2026',
    readTime: '7 dk',
    gradient: 'from-plum/6 to-pink/10',
    featured: false,
  },
  {
    category: 'Astroloji',
    title: 'Yükselen Burcunuz ve Yaşam Amacınız',
    excerpt: 'Doğum haritanızdaki yükselen burcun spiritüel anlamı ve yaşam yolculuğunuza etkisi hakkında derinlemesine bir bakış.',
    date: '18 Nisan 2026',
    readTime: '9 dk',
    gradient: 'from-gold/6 to-beige/15',
    featured: false,
  },
  {
    category: 'Nefes Çalışmaları',
    title: 'Pranayama: Bilinçli Nefes Sanatı',
    excerpt: 'Kadim nefes tekniklerinin modern yaşamda uygulanması. Stresi azaltın, enerjinizi yükseltin.',
    date: '12 Nisan 2026',
    readTime: '6 dk',
    gradient: 'from-burgundy/5 to-pink/10',
    featured: false,
  },
];

const categories = ['Tümü', 'Spiritüel Gelişim', 'Enerji Çalışmaları', 'Meditasyon', 'Kristaller', 'Astroloji'];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState(defaultBlogPosts);

  useEffect(() => {
    const saved = localStorage.getItem('custom_blog_posts');
    if (saved) {
      const custom = JSON.parse(saved);
      setBlogPosts([...defaultBlogPosts, ...custom]);
    }
  }, []);

  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-ivory" />
        <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] orb orb-pink opacity-12" />
        <div className="absolute bottom-[30%] left-[15%] w-[350px] h-[350px] orb orb-gold opacity-8" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <AnimatedSection>
            <span className="label-line justify-center mb-8">Blog</span>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <h1 className="heading-display mb-7">
              Spiritüel
              <br />
              <span className="gradient-text">Yazılar</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="body-lg text-center text-taupe/70 max-w-2xl mx-auto">
              Spiritüel gelişim, enerji çalışmaları, meditasyon ve bilinç dönüşümü 
              üzerine derinlemesine içerikler.
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

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection>
              <Link href="/blog" className="block">
                <div className="premium-card overflow-hidden group cursor-pointer">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image */}
                    <div className={`relative h-64 lg:h-auto lg:min-h-[380px] bg-gradient-to-br ${featuredPost.gradient}`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full bg-ivory/30 backdrop-blur-sm flex items-center justify-center animate-float-slow">
                            <span className="font-serif text-3xl text-gold/40">L</span>
                          </div>
                          <div className="absolute -inset-6 rounded-full border border-gold/[0.06] animate-breathe" />
                        </div>
                      </div>
                      <div className="absolute top-5 left-5">
                        <span className="text-[0.6rem] uppercase tracking-[0.16em] bg-ivory/85 backdrop-blur-md text-burgundy px-3 py-1.5 rounded-full font-semibold border border-gold/[0.06]">
                          Öne Çıkan
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-gold font-semibold mb-4">
                        {featuredPost.category}
                      </span>
                      <h2 className="heading-md mb-4 group-hover:text-burgundy transition-colors duration-400 text-left">
                        {featuredPost.title}
                      </h2>
                      <p className="body-md mb-6 text-left">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-5 text-[0.75rem] text-taupe/45">
                        <span>{featuredPost.date}</span>
                        <span className="flex items-center gap-1.5">
                          <HiOutlineClock className="text-sm" />
                          {featuredPost.readTime} okuma
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-16 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {regularPosts.map((post, index) => (
              <AnimatedSection key={post.title} delay={index * 0.08}>
                <Link href="/blog" className="block h-full">
                  <article className="premium-card overflow-hidden group cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    <div className={`relative h-48 bg-gradient-to-br ${post.gradient}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-ivory/80 via-ivory/10 to-transparent z-10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-ivory/25 backdrop-blur-sm flex items-center justify-center animate-float-slow">
                          <span className="font-serif text-xl text-gold/35">L</span>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 z-20">
                        <span className="text-[0.6rem] uppercase tracking-[0.16em] bg-ivory/85 backdrop-blur-md text-burgundy px-3 py-1.5 rounded-full font-semibold border border-gold/[0.06]">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-serif text-[1.1rem] text-wine leading-[1.35] mb-3 group-hover:text-burgundy transition-colors duration-400 text-left line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[0.82rem] text-taupe/60 leading-relaxed mb-4 flex-grow text-left line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-[0.72rem] text-taupe/40 mt-auto pt-4 border-t border-gold/[0.06]">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1.5 text-gold group-hover:text-burgundy transition-colors font-medium">
                          {post.readTime}
                          <HiOutlineArrowRight className="text-[0.65rem] transition-transform duration-400 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-32 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="premium-card p-12 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] orb orb-pink opacity-10" />
              <div className="absolute bottom-0 left-0 w-[250px] h-[250px] orb orb-gold opacity-8" />
              
              <div className="relative z-10">
                <span className="label-line justify-center mb-6">Bülten</span>
                <h2 className="heading-md mb-4 text-center">
                  Spiritüel İçeriklerden <span className="gradient-text">Haberdar Olun</span>
                </h2>
                <p className="body-md text-center max-w-md mx-auto mb-8">
                  Yeni yazılar, etkinlikler ve özel içeriklerden ilk siz haberdar olun.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="flex-grow w-full sm:w-auto px-5 py-3 bg-ivory/80 border border-gold/15 rounded-lg text-[0.85rem] text-wine placeholder:text-taupe/35 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/10 transition-all"
                  />
                  <button className="btn-primary !py-3 w-full sm:w-auto whitespace-nowrap">
                    <span>Abone Ol</span>
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
