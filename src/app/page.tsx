import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturedContent from '@/components/FeaturedContent';
import TestimonialSection from '@/components/TestimonialSection';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-ivory">
      {/* ✦ Ethereal Fire Wings Background ✦ */}
      <div className="absolute top-0 left-0 w-full h-[140vh] pointer-events-none z-0 overflow-hidden">
        
        {/* The Wings — Pushed down slightly to frame the bottom, scaled for impact */}
        <div className="relative w-full h-full flex items-center justify-center animate-float translate-y-[15vh]">
          <div className="relative w-full max-w-[2400px] h-full flex items-center justify-center">
            <img
              src="/wings_golden_fire.png"
              alt="Ethereal Wings"
              className="w-full h-full object-contain scale-[1.6] mix-blend-screen opacity-[0.85]"
              style={{
                maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 80%)'
              }}
            />
          </div>
        </div>

        {/* Professional Blend Gradients */}
        {/* Strong top-down gradient ensures the text area is clean and readable */}
        <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-ivory via-ivory/95 to-transparent" />
        
        {/* Bottom fade into the next section */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-ivory via-ivory/80 to-transparent" />
        
        {/* Subtle side fades */}
        <div className="absolute top-0 left-0 w-[15%] h-full bg-gradient-to-r from-ivory to-transparent" />
        <div className="absolute top-0 right-0 w-[15%] h-full bg-gradient-to-l from-ivory to-transparent" />

        {/* Deep background ambient glow to enrich the ivory behind the text */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#C8943A]/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <div className="relative">
          {/* Feather/Cloud Overlay between sections */}
          <div className="absolute -top-48 left-0 w-full h-96 bg-gradient-to-b from-transparent via-ivory to-ivory pointer-events-none" />
          <ServicesSection />
          <FeaturedContent />
          <TestimonialSection />
          <BlogPreview />
          <CTASection />
        </div>
      </div>
    </main>
  );
}
