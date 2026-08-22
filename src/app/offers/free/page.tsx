import OffersPageClient from '@/components/OffersPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ücretsiz Kaynaklar',
  description: 'Lyra On Earth uyanış ve arınma ritüelleri, ücretsiz meditasyonlar ve dijital kitapçıklar.',
};

export default function FreeOffersPage() {
  return <OffersPageClient filterType="free" />;
}
