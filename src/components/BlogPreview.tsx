'use client';

import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import AnimatedSection from './AnimatedSection';
import { useState, useEffect } from 'react';
import { defaultPosts } from '@/data/defaults';

export default function BlogPreview() {
  const [posts, setPosts] = useState(defaultPosts);

  useEffect(() => {
    const saved = localStorage.getItem('custom_blog_posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);
  return (
    <section id="blog" className="py-40 bg-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-gold font-bold tracking-[0.5em] text-[0.65rem] uppercase mb-6">Kütüphane</span>
          <h2 className="font-serif text-5xl md:text-7xl text-wine mb-8">
            Spiritüel <span className="italic font-light">Yazılar</span>
          </h2>
          <p className="body-md text-taupe/50 max-w-xl mx-auto leading-loose">
            Ruhsal gelişiminize ışık tutacak, derin farkındalıklar barındıran haftalık makalelerimiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <AnimatedSection key={post.title} delay={index * 0.15}>
              <Link href="/blog" className="group block">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 shadow-2xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-wine/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="inline-block py-1 px-4 bg-gold/20 backdrop-blur-md border border-gold/30 text-gold text-[0.6rem] font-bold tracking-widest uppercase rounded-full mb-4">
                      {post.category}
                    </span>
                    <h3 className="font-serif text-2xl text-ivory leading-tight group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>
                
                <div className="px-4">
                  <p className="text-taupe/60 text-sm leading-relaxed mb-6 line-clamp-2 italic">
                    "{post.excerpt}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] font-bold text-gold/60 uppercase tracking-widest">{post.date}</span>
                    <span className="flex items-center gap-2 text-[0.7rem] font-bold text-wine uppercase tracking-widest group-hover:gap-4 transition-all">
                      OKU <HiOutlineArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <Link href="/blog" className="btn-secondary !border-gold/10 !px-16 !py-5">
            TÜM ARŞİVİ GÖR
          </Link>
        </div>
      </div>
    </section>
  );
}
