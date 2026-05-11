import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Lyra On Earth hakkında. Kurucumuz Deniz Bayraktar\'ın spiritüel yolculuğu, marka vizyonumuz ve değerlerimiz.',
};

export default function HakkimizdaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
