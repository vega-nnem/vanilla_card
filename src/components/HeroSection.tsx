
import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  useEffect(() => {
    // Hero section animations
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({ delay: 4 });
      
      tl.fromTo('.hero-headline',
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' }
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo('.hero-cta',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo('.spline-container',
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
        '-=1'
      );

      // CTA button hover animation
      const ctaButton = document.querySelector('.hero-cta');
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
          gsap.to(ctaButton, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        
        ctaButton.addEventListener('mouseleave', () => {
          gsap.to(ctaButton, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      }
    }
  }, []);

  const scrollToGift = () => {
    const giftSection = document.getElementById('redeem');
    if (giftSection) {
      giftSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Spline Background - Positioned much higher and further left */}
      <div className="spline-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-40 -ml-16 w-80 h-80 lg:w-96 lg:h-96 md:w-72 md:h-72 sm:w-64 sm:h-64">
        <iframe 
          src="https://my.spline.design/chips-abfLHoL3WRlm3UxAd7tRrfPU/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full"
          title="3D Chips Animation"
          style={{ 
            pointerEvents: 'none',
            background: 'transparent'
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center md:justify-start">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center md:text-left max-w-2xl mr-auto">
            <h1 className="hero-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text leading-tight">
              Gift Your Card
            </h1>
            
            <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 font-light">
              Experience the future of gift card gifting with our premium, secure platform
            </p>
            
            <button
              onClick={scrollToGift}
              className="hero-cta premium-button inline-flex items-center px-8 py-4 text-lg font-semibold bg-primary text-primary-foreground dark:text-white glass-morphic neon-glow rounded-2xl transition-all duration-300 hover:shadow-2xl group border border-primary/20"
            >
              Gift Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
