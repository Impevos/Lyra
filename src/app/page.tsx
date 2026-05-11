import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturedContent from '@/components/FeaturedContent';
import TestimonialSection from '@/components/TestimonialSection';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-ivory">
      {/* Ethereal Golden Wings - Spread and Blended */}
      <div className="absolute top-0 left-0 w-full h-[120vh] pointer-events-none z-0 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center animate-float opacity-[0.4]">
          <div className="relative w-full max-w-[2000px] h-full flex items-center justify-center">
            <img 
              src="/ethereal_wings.png" 
              alt="Ethereal Angel Wings" 
              className="w-full h-full object-contain scale-150 blur-[2px]"
              style={{
                maskImage: 'radial-gradient(circle, black 40%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 85%)'
              }}
            />
          </div>
          {/* Central Radiance Glow */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/15 rounded-full blur-[120px] animate-pulse-glow" />
        </div>
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
