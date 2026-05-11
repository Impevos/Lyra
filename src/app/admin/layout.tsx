'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { HiOutlineDocumentText, HiOutlineSparkles, HiOutlineShoppingBag, HiOutlineLogout, HiOutlineViewGrid } from 'react-icons/hi';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/admin/login');
  };

  // Login sayfasında sidebar gösterme
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-white/40 backdrop-blur-3xl border-b lg:border-r border-gold/10 p-6 lg:pt-2 lg:px-6 lg:pb-8 flex flex-col lg:fixed h-auto lg:h-full z-20">
        <div className="flex flex-col items-center mb-6 text-center w-full">
          <div className="w-64 h-64 transition-transform duration-500 hover:scale-110 mb-0">
            <img 
              src="/Lyra-Logo.png" 
              alt="Lyra Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col items-center -mt-6">
            <span className="font-serif text-2xl tracking-[0.1em] text-wine font-bold leading-tight">LYRA</span>
            <span className="text-[0.6rem] tracking-[0.4em] text-gold font-bold -mt-0.5 uppercase">YÖNETİM PANELİ</span>
          </div>
        </div>

        <nav className="space-y-4 flex-grow">
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all text-sm tracking-widest ${
              pathname === '/admin/dashboard' ? 'bg-gold/5 text-burgundy font-bold' : 'text-taupe/60 hover:bg-gold/5 font-medium'
            }`}
          >
            <HiOutlineViewGrid className="text-xl" /> DASHBOARD
          </Link>
          <Link 
            href="/admin/hizmetler" 
            className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all text-sm tracking-widest ${
              pathname === '/admin/hizmetler' ? 'bg-gold/5 text-burgundy font-bold' : 'text-taupe/60 hover:bg-gold/5 font-medium'
            }`}
          >
            <HiOutlineSparkles className="text-xl" /> HİZMETLER
          </Link>
          <Link 
            href="/admin/urunler" 
            className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all text-sm tracking-widest ${
              pathname === '/admin/urunler' ? 'bg-gold/5 text-burgundy font-bold' : 'text-taupe/60 hover:bg-gold/5 font-medium'
            }`}
          >
            <HiOutlineShoppingBag className="text-xl" /> ÜRÜNLER
          </Link>
          <Link 
            href="/admin/blog" 
            className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all text-sm tracking-widest ${
              pathname === '/admin/blog' ? 'bg-gold/5 text-burgundy font-bold' : 'text-taupe/60 hover:bg-gold/5 font-medium'
            }`}
          >
            <HiOutlineDocumentText className="text-xl" /> BLOG
          </Link>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 w-full p-4 rounded-2xl text-burgundy/60 hover:bg-burgundy/5 transition-all text-sm tracking-widest font-bold mt-auto"
        >
          <HiOutlineLogout className="text-xl" /> ÇIKIŞ YAP
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 p-6 lg:p-12">
        {children}
      </main>
    </div>
  );
}
