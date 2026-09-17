import Link from 'next/link';

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/50 border border-red-500/30 p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-red-500/5 blur-3xl -z-10" />
        
        <div className="w-16 h-16 mx-auto bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6 border border-red-500/50">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-light text-red-500 mb-4 tracking-wider uppercase">Ödeme Başarısız</h1>
        <p className="text-gray-300 mb-8 font-light leading-relaxed">
          İşleminiz gerçekleştirilemedi. Kart limitinizi veya bilgilerinizi kontrol edip tekrar deneyebilirsiniz.
        </p>
        
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-red-500 text-black font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
