import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Spiritüel gelişim, enerji çalışmaları, meditasyon ve farkındalık üzerine yazılar. Lyra On Earth blog.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
