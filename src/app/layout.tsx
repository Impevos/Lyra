import type { Metadata } from "next";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";
import LayoutWrapper from "@/components/LayoutWrapper";
import SmoothScroll from "@/components/SmoothScroll";
import AmbientAura from "@/components/AmbientAura";
import { Cormorant_Garamond, Inter, Cinzel } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-cinzel",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Lyra On Earth — Spiritüel Farkındalık & Kişisel Dönüşüm",
    template: "%s | Lyra On Earth",
  },
  description:
    "Spiritüel danışmanlık, birebir seanslar, grup yayınları ve eğitimlerle içsel dönüşümünüzü destekliyoruz. Ruhsal farkındalık yolculuğunuzda size rehberlik ediyoruz.",
  keywords: [
    "spiritüel gelişim", "spiritüel farkındalık", "enerji çalışmaları",
    "aydınlanma", "bilinç dönüşümü", "meditasyon", "kişisel gelişim",
    "spiritüel danışmanlık", "Lyra On Earth", "Deniz Bayraktar",
  ],
  authors: [{ name: "Lyra On Earth" }],
  creator: "Lyra On Earth",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://lyraonearth.com",
    siteName: "Lyra On Earth",
    title: "Lyra On Earth — Spiritüel Farkındalık & Kişisel Dönüşüm",
    description: "Spiritüel danışmanlık, birebir seanslar, grup yayınları ve eğitimlerle içsel dönüşümünüzü destekliyoruz.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyra On Earth — Spiritüel Farkındalık & Kişisel Dönüşüm",
    description: "Spiritüel danışmanlık, birebir seanslar, grup yayınları ve eğitimlerle içsel dönüşümünüzü destekliyoruz.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/Lyra-Logo-White.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${cinzel.variable} ${inter.variable} antialiased`}>
      <body className="min-h-[100dvh] flex flex-col bg-ivory text-charcoal selection:bg-gold/20 selection:text-wine">
        <SmoothScroll>
          <AmbientAura />
          <LayoutWrapper>
            <main className="flex-grow relative z-10">{children}</main>
          </LayoutWrapper>
          <FloatingContact />
        </SmoothScroll>
      </body>
    </html>
  );
}
