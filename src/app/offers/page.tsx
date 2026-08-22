import OffersPageClient from '@/components/OffersPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teklifler',
  description: 'Lyra On Earth spiritüel çalışmalar, birebir seanslar, rehberler ve eğitim programları.',
};

export default function OffersPage() {
  return <OffersPageClient filterType="all" />;
}
