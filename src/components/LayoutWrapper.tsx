'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import Header from './Header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <div className={!isAdmin ? 'pt-28 lg:pt-36' : ''}>
        {children}
      </div>
      {!isAdmin && <Footer />}
    </>
  );
}
