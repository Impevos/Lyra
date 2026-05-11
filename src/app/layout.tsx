import type { Metadata } from "next";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";
import SmoothScroll from "@/components/SmoothScroll";
import AmbientGlow from "@/components/AmbientGlow";
import LayoutWrapper from "@/components/LayoutWrapper";

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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className="antialiased" data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col bg-ivory text-charcoal">
        <SmoothScroll>
          <AmbientGlow />
          <div className="noise-overlay" />
          <LayoutWrapper>
            <main className="flex-grow">{children}</main>
          </LayoutWrapper>
          <FloatingContact />
        </SmoothScroll>
      </body>
    </html>
  );
}
