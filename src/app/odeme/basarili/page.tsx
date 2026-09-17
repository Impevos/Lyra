import Link from 'next/link';
import Image from 'next/image';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-4 relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-b from-gold/[0.04] to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-md w-full bg-white/70 backdrop-blur-md border border-gold/20 p-8 text-center shadow-xl overflow-hidden">
        {/* Double border frame */}
        <div className="absolute inset-1.5 border border-gold/8 pointer-events-none" />
        
        {/* Logo */}
        <div className="relative w-12 h-12 mx-auto mb-6">
          <Image
            src="/Lyra-Logo.png"
            alt="Lyra On Earth"
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>

        {/* Success checkmark */}
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold/15 to-burgundy/5 border border-gold/25 flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0.5 border border-gold/10 pointer-events-none" />
          <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="font-serif text-2xl text-wine font-bold mb-2 tracking-wider uppercase">Teşekkür Ederiz ✨</h1>
        <p className="text-[0.65rem] text-gold font-bold uppercase tracking-[0.25em] mb-6">ÖDEMENİZ BAŞARIYLA TAMAMLANDI</p>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent mb-6" />

        {/* Check email notice */}
        <div className="bg-gradient-to-br from-wine/[0.03] to-gold/[0.05] border border-gold/15 p-5 mb-6 text-left relative">
          <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-9 h-9 rounded-none bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div className="space-y-1.5">
              <p className="text-[0.7rem] text-wine font-bold uppercase tracking-wider">
                Lütfen E-postanızı Kontrol Edin
              </p>
              <p className="text-[0.68rem] text-taupe/60 leading-relaxed font-medium">
                Kayıt bilgileriniz ve eğitim/hizmet detaylarınız e-posta adresinize gönderildi. Spam/gereksiz klasörünü de kontrol etmeyi unutmayın.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-taupe/50 font-medium leading-relaxed mb-6">
          Bu yolculuğa adım attığınız için çok mutluyuz.<br />
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>

        <p className="text-[0.7rem] text-taupe/35 font-semibold italic mb-6">
          Işığınız yolunuzu aydınlatsın. — Lyra On Earth
        </p>
        
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-wine hover:bg-wine/90 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-wine hover:shadow-lg hover:shadow-wine/10"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
