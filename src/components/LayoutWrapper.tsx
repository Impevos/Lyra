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
      <div className={!isAdmin ? 'pt-24 lg:pt-28' : ''}>
        {children}
      </div>
      {!isAdmin && <Footer />}
    </>
  );
}
