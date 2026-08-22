'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlineArrowLeft, HiOutlineShieldCheck, HiOutlineMail } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { getProducts, ProductItem, defaultProducts, saveAppointment } from '@/data/defaults';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const products = getProducts();
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      // Fallback
      router.push('/');
    }
  }, [id, router]);

  if (!product) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-gold/20 border-t-gold animate-spin" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    // Save details as appointment/registration
    const now = new Date();
    const dateStr = now.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    saveAppointment({
      productId: product.id,
      productTitle: product.title,
      name: name,
      email: email,
      phone: '',
      instagram: '',
      date: dateStr,
      time: timeStr,
    });

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-ivory flex flex-col items-center py-8">
      {/* Subtle background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gold/[0.03] to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto px-5">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[0.8rem] font-bold text-wine/60 hover:text-wine uppercase tracking-widest mb-6 transition-colors group"
        >
          <HiOutlineArrowLeft className="text-base transition-transform group-hover:-translate-x-1" />
          Geri Dön
        </Link>

        {/* Product Detail Card */}
        <div className="bg-white/80 border border-gold/15 rounded-none overflow-hidden shadow-2xl shadow-gold/3 backdrop-blur-md relative p-1">
          {/* Inner double border frame */}
          <div className="absolute inset-2 border border-gold/5 pointer-events-none" />

          {/* Main Image */}
          <div className="relative w-full aspect-video border border-gold/10">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            
            {product.price && (
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-gold/20 px-4 py-1.5 rounded-none text-xs font-bold tracking-widest text-wine uppercase shadow-md z-10">
                {product.price}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 relative z-10">
            <h1 className="font-serif text-2xl sm:text-3xl text-wine font-light tracking-[0.1em] uppercase mb-3">
              {product.title}
            </h1>
            
            <p className="text-[0.8rem] text-gold-dark font-semibold tracking-widest uppercase mb-5">
              {product.tagline}
            </p>

            <div className="w-full h-px bg-gold/15 mb-5" />

            <p className="text-[0.9rem] text-taupe/75 leading-relaxed font-medium mb-8 whitespace-pre-line">
              {product.description}
            </p>

            {/* Form */}
            <div className="bg-cream/45 border border-gold/10 rounded-none p-6 relative">
              <div className="absolute inset-1 border border-gold/5 pointer-events-none" />
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                  <h3 className="font-serif text-base text-wine font-semibold uppercase tracking-widest text-center mb-1">
                    Hemen Başlayın
                  </h3>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ad Soyad"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-[0.85rem] text-wine font-medium transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">
                      E-posta Adresiniz
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eposta@adresiniz.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-[0.85rem] text-wine font-medium transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-none bg-wine hover:bg-wine/90 text-white text-[0.75rem] font-bold uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-wine/10 hover:scale-[1.01] active:scale-98 transition-all duration-300 cursor-pointer mt-2"
                  >
                    {product.buttonText}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[0.65rem] text-taupe/40 font-semibold mt-1">
                    <HiOutlineShieldCheck className="text-sm" />
                    Bilgileriniz güvenle saklanır.
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-4 relative z-10"
                >
                  <div className="w-14 h-14 rounded-none bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-4">
                    <HiOutlineMail className="text-2xl" />
                  </div>
                  <h3 className="font-serif text-lg text-wine font-bold uppercase tracking-widest mb-2">
                    Talebiniz Alındı!
                  </h3>
                  <p className="text-[0.85rem] text-taupe/65 leading-relaxed max-w-xs font-medium">
                    Teşekkürler <strong>{name}</strong>. Başvuru veya satın alım detaylarınız <strong>{email}</strong> adresine gönderildi. En kısa sürede sizinle iletişime geçeceğiz.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
