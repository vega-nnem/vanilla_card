
import React, { useEffect } from 'react';

const FloatingOrbs = () => {
  useEffect(() => {
    // Animate floating orbs
    gsap.set('.floating-orb', { 
      opacity: 0.6,
      scale: gsap.utils.random(0.5, 1.5, 0.1)
    });
    
    gsap.to('.floating-orb', {
      y: (i) => gsap.utils.random(-30, -80),
      x: (i) => gsap.utils.random(-20, 20),
      duration: (i) => gsap.utils.random(4, 8),
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.5,
        from: 'random'
      }
    });

    // Rotation animation
    gsap.to('.floating-orb', {
      rotation: 360,
      duration: (i) => gsap.utils.random(10, 20),
      repeat: -1,
      ease: 'none',
      stagger: {
        each: 1,
        from: 'random'
      }
    });
  }, []);

  const orbs = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    color: ['from-blue-400/20', 'from-purple-400/20', 'from-cyan-400/20'][Math.floor(Math.random() * 3)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className={`floating-orb absolute bg-gradient-radial ${orb.color} to-transparent rounded-full blur-sm`}
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
