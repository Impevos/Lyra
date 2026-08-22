import OffersPageClient from '@/components/OffersPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ücretli Programlar',
  description: 'Lyra On Earth spiritüel danışmanlık, VIP dönüşüm kampları ve derinlemesine eğitim programları.',
};

export default function PaidOffersPage() {
  return <OffersPageClient filterType="paid" />;
}
