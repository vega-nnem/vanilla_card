
import React, { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import RedeemSection from '@/components/RedeemSection';
import DonateSection from '@/components/DonateSection';
import Footer from '@/components/Footer';
import FloatingOrbs from '@/components/FloatingOrbs';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize smooth scrolling after loading
    const initializeScroll = () => {
      console.log('Initializing smooth scroll and animations');
      
      // GSAP ScrollTrigger initialization
      if (typeof gsap !== 'undefined' && gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Refresh ScrollTrigger after all content is loaded
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 1000);
      }
    };

    if (!loading) {
      initializeScroll();
    }
  }, [loading]);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden transition-colors duration-300">
      {loading && <Preloader onComplete={handleLoadingComplete} />}
      
      <FloatingOrbs />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <RedeemSection />
        <DonateSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
