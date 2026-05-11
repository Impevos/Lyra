import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ürünler',
  description: 'Spiritüel rehberler, yayın kayıtları ve eğitim materyalleri. Lyra On Earth özel içerik mağazası.',
};

export default function UrunlerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
