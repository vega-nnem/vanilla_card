
import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // GSAP Loading Animation
    const loadingTimeline = gsap.timeline();
    
    // Animate loading text appearance
    loadingTimeline.fromTo('.loading-text', 
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
    );

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);

    // Clean up and complete loading
    const completeLoading = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      // Animate progress bar to 100%
      gsap.to(".progress-bar", {
        width: "100%",
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Fade out preloader
          gsap.to(".preloader", {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              onComplete();
            }
          });
        }
      });
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeLoading);
    };
  }, [onComplete]);

  useEffect(() => {
    // Update progress bar width
    gsap.to(".progress-bar", {
      width: `${progress}%`,
      duration: 0.3,
      ease: "power2.out"
    });
  }, [progress]);

  return (
    <div className="preloader">
      <div className="loading-text">
        REDEEM
      </div>
      
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
      
      <div className="progress-percentage">
        {Math.round(progress)}%
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;
