import React, { useEffect } from 'react';
import { Heart, CreditCard, Phone, Mail } from 'lucide-react';

const Footer = () => {
  useEffect(() => {
    // Footer animation
    gsap.fromTo('.footer-content',
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
      ease: 'power1.inOut'
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section relative py-16 mt-20">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="footer-particle absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="footer-content max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <button
            onClick={scrollToTop}
            className="text-4xl font-bold gradient-text hover:scale-105 transition-transform duration-300 mb-4 block mx-auto"
          >
            GIFT
          </button>
          <p className="text-muted-foreground font-light max-w-md mx-auto">
            Experience the future of gift card gifting with our premium, secure platform.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          {/* Navigation Links */}
          <div className="flex space-x-8 mb-8 md:mb-0">
            {['Home', 'About', 'Gift', 'Donate'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  const element = document.getElementById(item === 'Gift' ? 'redeem' : item.toLowerCase());
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-light"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Stripe Transaction Info */}
          <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-6 py-3 transition-colors duration-300">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-light">
              Secure payments by Stripe
            </span>
          </div>
        </div>

        {/* Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center transition-colors duration-300">
            <Phone className="w-6 h-6 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Phone Support</h3>
            <p className="text-muted-foreground font-light mb-2">Call us for immediate assistance</p>
            <a href="tel:+1-555-0123" className="text-primary hover:text-primary/80 transition-colors font-medium">
              +1 (555) 012-3456
            </a>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center transition-colors duration-300">
            <Mail className="w-6 h-6 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Email Support</h3>
            <p className="text-muted-foreground font-light mb-2">Send us your questions anytime</p>
            <a href="mailto:support@gift.com" className="text-primary hover:text-primary/80 transition-colors font-medium">
              support@gift.com
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground font-light flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>for the future</span>
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            © 2024 Gift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
