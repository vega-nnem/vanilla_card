
import React, { useState, useEffect } from 'react';
import { Heart, DollarSign, CheckCircle, Loader } from 'lucide-react';

const DonateSection = () => {
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  useEffect(() => {
    // ScrollTrigger animations
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo('.donate-form',
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.donate-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.donate-input',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.donate-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('pending');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setStatus('idle');
        setFormData({ amount: '', name: '', email: '', message: '' });
      }, 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const quickAmounts = [10, 25, 50, 100];

  return (
    <section id="donate" className="donate-section py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Make a Donation
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Support our mission with a secure donation through our premium platform
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="donate-form glass-morphic rounded-3xl p-8 neon-purple-glow">
            <div className="space-y-6">
              {/* Quick Amount Selection */}
              <div className="donate-input">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Select Amount
                </label>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                      className={`py-2 px-4 rounded-lg transition-all duration-300 ${
                        formData.amount === amount.toString()
                          ? 'neon-glow bg-blue-600/20 text-blue-400'
                          : 'glass-morphic hover:scale-105'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Custom amount"
                    className="glass-input w-full px-4 py-3 pl-12 rounded-xl glass-morphic border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    min="1"
                    required
                  />
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <div className="donate-input">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="glass-input w-full px-4 py-3 rounded-xl glass-morphic border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  required
                />
              </div>

              <div className="donate-input">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="glass-input w-full px-4 py-3 rounded-xl glass-morphic border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  required
                />
              </div>

              <div className="donate-input">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Leave a message..."
                  rows={3}
                  className="glass-input w-full px-4 py-3 rounded-xl glass-morphic border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'pending'}
                className="w-full premium-button py-4 px-6 rounded-xl glass-morphic neon-purple-glow text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {status === 'pending' && <Loader className="animate-spin w-5 h-5" />}
                {status === 'success' && <CheckCircle className="w-5 h-5" />}
                {(status === 'idle' || status === 'error') && <Heart className="w-5 h-5" />}
                <span>
                  {status === 'pending' && 'Processing...'}
                  {status === 'success' && 'Thank You!'}
                  {status === 'idle' && 'Donate Now'}
                  {status === 'error' && 'Try Again'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
