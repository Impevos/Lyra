'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { 
  HiOutlineViewGrid, 
  HiOutlineLogout,
  HiOutlineShoppingBag,
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineVideoCamera,
  HiOutlineUser 
} from 'react-icons/hi';
import { useEffect, Suspense } from 'react';

function AdminNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const menuItems = [
    {
      tab: 'overview',
      label: 'GENEL BAKIŞ',
      href: '/admin/dashboard?tab=overview',
      icon: HiOutlineViewGrid,
    },
    {
      tab: 'products',
      label: 'ÇALIŞMALAR & ÜRÜNLER',
      href: '/admin/dashboard?tab=products',
      icon: HiOutlineShoppingBag,
    },
    {
      tab: 'appointments',
      label: 'GÖRÜŞME BAŞVURULARI',
      href: '/admin/dashboard?tab=appointments',
      icon: HiOutlineCalendar,
    },
    {
      tab: 'emails',
      label: 'E-POSTA & OTOMASYON',
      href: '/admin/dashboard?tab=emails',
      icon: HiOutlineMail,
    },
    {
      tab: 'videos',
      label: 'YOUTUBE VİDEOLARI',
      href: '/admin/dashboard?tab=videos',
      icon: HiOutlineVideoCamera,
    },
    {
      tab: 'profile',
      label: 'PROFİL AYARLARI',
      href: '/admin/dashboard?tab=profile',
      icon: HiOutlineUser,
    },
    {
      tab: 'purchases',
      label: 'SATIN ALIMLAR',
      href: '/admin/dashboard?tab=purchases',
      icon: HiOutlineShoppingBag,
    },
  ];

  return (
    <nav className="space-y-1 flex-grow">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === '/admin/dashboard' && activeTab === item.tab;
        return (
          <Link
            key={item.tab}
            href={item.href}
            className={`flex items-center gap-4 w-full p-3.5 rounded-2xl transition-all text-xs tracking-widest ${
              isActive
                ? 'bg-gold/10 text-burgundy font-bold shadow-sm border border-gold/10'
                : 'text-taupe/60 hover:bg-gold/5 font-medium border border-transparent'
            }`}
          >
            <Icon className="text-lg" /> {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

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

        <Suspense fallback={<div className="animate-pulse h-40 bg-gold/5 rounded-2xl" />}>
          <AdminNav />
        </Suspense>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 w-full p-4 rounded-2xl text-burgundy/60 hover:bg-burgundy/5 transition-all text-sm tracking-widest font-bold mt-auto"
        >
          <HiOutlineLogout className="text-xl" /> ÇIKIŞ YAP
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 p-6 lg:p-12 w-full lg:max-w-[calc(100%-18rem)] min-w-0">
        {children}
      </main>
    </div>
  );
}
