
import React, { useEffect } from 'react';

const AboutSection = () => {
  useEffect(() => {
    // ScrollTrigger animation for about section
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo('.about-content',
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Staggered icon animations
    gsap.fromTo('.payment-icon',
      { opacity: 0, scale: 0.5, rotateY: 180 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.icons-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="about" className="about-section py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="about-content text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Premium Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Our cutting-edge platform combines security, speed, and elegance to deliver 
            the ultimate gift card redemption experience. Powered by advanced technology 
            and designed for the modern user.
          </p>
        </div>

        <div className="icons-grid grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { icon: 'i-ph-credit-card', label: 'Stripe Integration', color: 'neon-blue' },
            { icon: 'i-ph-gift', label: 'Vanilla Gift Cards', color: 'neon-purple' },
            { icon: 'i-ph-shield-check', label: 'Secure Processing', color: 'neon-cyan' },
            { icon: 'i-ph-lightning', label: 'Instant Redemption', color: 'neon-blue' }
          ].map((item, index) => (
            <div key={index} className="payment-icon text-center group">
              <div className="glass-morphic rounded-2xl p-8 hover:scale-105 transition-all duration-300 neon-glow hover:neon-purple-glow">
                <i className={`${item.icon} text-4xl text-${item.color} mb-4 block group-hover:animate-pulse`}></i>
                <p className="text-sm font-medium text-gray-300">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
