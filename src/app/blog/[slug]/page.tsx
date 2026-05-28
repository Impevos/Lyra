'use client';

import { useState, useEffect } from 'react';
import { defaultPosts, getBlogPosts } from '@/data/defaults';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { HiOutlineArrowLeft, HiOutlineClock } from 'react-icons/hi';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allPosts = getBlogPosts();
    
    const found = allPosts.find(p => p.slug === slug);
    setPost(found);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-cream pt-32 pb-16 flex justify-center items-center"><div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" /></div>;
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] bg-cream pt-32 pb-16 flex flex-col justify-center items-center text-center">
        <h1 className="font-serif text-4xl text-wine mb-4">Yazı Bulunamadı</h1>
        <p className="text-taupe/60 mb-8">Aradığınız blog yazısı mevcut değil veya silinmiş olabilir.</p>
        <Link href="/blog" className="btn-primary">Blog'a Dön</Link>
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24 bg-cream">
        {post.image && (
          <div className="absolute inset-0 z-0">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-20 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-cream/90 via-ivory/95 to-ivory" />
          </div>
        )}
        <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] orb orb-pink opacity-12" />
        <div className="absolute bottom-[30%] left-[15%] w-[350px] h-[350px] orb orb-gold opacity-8" />

        <div className="relative z-10 px-6 max-w-4xl mx-auto w-full text-center">
          <AnimatedSection>
            <Link href="/blog" className="inline-flex items-center gap-2 text-gold hover:text-burgundy text-[0.7rem] uppercase tracking-widest font-bold mb-8 transition-colors">
              <HiOutlineArrowLeft className="text-sm" /> Blog'a Dön
            </Link>
            <div className="flex justify-center mb-6">
              <span className="text-[0.65rem] uppercase tracking-[0.18em] bg-ivory/85 backdrop-blur-md text-burgundy px-4 py-2 rounded-full font-semibold border border-gold/[0.06] shadow-sm">
                {post.category}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-5 text-[0.75rem] text-taupe/60 font-medium">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-gold/30" />
              <span className="flex items-center gap-1.5">
                <HiOutlineClock className="text-sm" />
                {post.readTime}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 pb-32 overflow-hidden bg-ivory">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimatedSection delay={0.2}>
            {post.image && (
              <div className="w-full aspect-[21/9] md:aspect-[2/1] rounded-3xl overflow-hidden mb-12 shadow-xl shadow-gold/5 relative">
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-wine prose-p:text-taupe/80 prose-p:leading-relaxed max-w-none whitespace-pre-wrap">
              {post.content}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
