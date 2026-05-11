import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetler',
  description: 'Lyra On Earth hizmetleri: Birebir yayınlar, grup yayınları, spiritüel danışmanlık ve Mastersoul eğitim programları.',
};

export default function HizmetlerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
