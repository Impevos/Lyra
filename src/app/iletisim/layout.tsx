import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Lyra On Earth ile iletişime geçin. Randevu, danışmanlık ve işbirliği talepleri için bize ulaşın.',
};

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
