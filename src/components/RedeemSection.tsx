import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, CheckCircle, Loader, User, Mail } from 'lucide-react';

const RedeemSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: ''
  });
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  useEffect(() => {
    // ScrollTrigger animations
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo('.redeem-form',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.redeem-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.form-input',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.redeem-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormData({ name: '', email: '', cardNumber: '', expiryDate: '', cvv: '', amount: '' });
      }, 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="redeem" className="redeem-section py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Gift Your Card
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Enter your details and gift card information below for instant, secure gifting
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="redeem-form glass-morphic rounded-3xl p-8 neon-glow">
            <div className="space-y-6">
              <div className="form-input">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="glass-input w-full px-4 py-3 pl-12 rounded-xl glass-morphic border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                </div>
              </div>

              <div className="form-input">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="glass-input w-full px-4 py-3 pl-12 rounded-xl glass-morphic border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                </div>
              </div>

              <div className="form-input">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="glass-input w-full px-4 py-3 pl-12 rounded-xl glass-morphic border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                  <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                </div>
              </div>

              <div className="form-input grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="glass-input w-full px-4 py-3 rounded-xl glass-morphic border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    CVV
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="glass-input w-full px-4 py-3 pl-10 rounded-xl glass-morphic border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      maxLength={3}
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="form-input">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  className="glass-input w-full px-4 py-3 rounded-xl glass-morphic border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  min="1"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'pending'}
                className="w-full premium-button py-4 px-6 rounded-xl glass-morphic neon-glow bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 border border-primary/20"
              >
                {status === 'pending' && <Loader className="animate-spin w-5 h-5" />}
                {status === 'success' && <CheckCircle className="w-5 h-5" />}
                <span>
                  {status === 'pending' && 'Processing...'}
                  {status === 'success' && 'Success!'}
                  {status === 'idle' && 'Gift Now'}
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

export default RedeemSection;
