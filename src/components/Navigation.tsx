
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import AdminLogin from './AdminLogin';
import ThemeToggle from './ThemeToggle';
import { useAdmin } from '@/hooks/useAdmin';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { isAdmin, login, logout } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // GSAP animations for navigation
    if (typeof gsap !== 'undefined') {
      gsap.fromTo('.nav-container',
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: 'power2.out' }
      );
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implement search functionality with backend
  };

  return (
    <nav className={`nav-container fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-morphic backdrop-blur-xl' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold gradient-text">GIFT</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="flex items-baseline space-x-8">
              {['Home', 'About', 'Gift', 'Donate'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === 'Gift' ? 'redeem' : item.toLowerCase())}
                  className="text-foreground/80 hover:text-foreground dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              isExpanded={isSearchExpanded}
              onToggle={() => setIsSearchExpanded(!isSearchExpanded)}
            />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Admin Login */}
            <AdminLogin
              isAdmin={isAdmin}
              onLogin={login}
              onLogout={logout}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <SearchBar
              onSearch={handleSearch}
              isExpanded={isSearchExpanded}
              onToggle={() => setIsSearchExpanded(!isSearchExpanded)}
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/80 hover:text-foreground dark:text-gray-300 dark:hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-morphic backdrop-blur-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Home', 'About', 'Gift', 'Donate'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === 'Gift' ? 'redeem' : item.toLowerCase())}
                className="text-foreground/80 hover:text-foreground dark:text-gray-300 dark:hover:text-white block px-3 py-2 text-base font-medium w-full text-left"
              >
                {item}
              </button>
            ))}
            
            {/* Mobile Controls */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-white/10 mt-4">
              <ThemeToggle />
              <AdminLogin
                isAdmin={isAdmin}
                onLogin={login}
                onLogout={logout}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
