import React, { useState } from 'react';
import { Menu, X, Car, User } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage, userState, onOpenAuth }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', id: 'home' },
    { label: 'Browse Fleet', id: 'listings' },
    { label: 'AI Advisor', id: 'ai-recommendation' },
    { label: 'Compare', id: 'compare' },
    { label: 'Sell Car', id: 'sell' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  const handleAccountClick = () => {
    if (userState.isLoggedIn) {
      handleNavClick('user-profile');
    } else {
      onOpenAuth();
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 glassmorphism transition-luxury border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative p-2 rounded-xl bg-gradient-to-tr from-accent-cyan to-accent-green group-hover:shadow-cyan-glow transition-luxury">
              <Car className="w-6 h-6 text-black" />
            </div>
            <span className="font-luxury font-bold text-2xl tracking-wider bg-gradient-to-r from-white via-white to-accent-cyan bg-clip-text text-transparent group-hover:text-glow-cyan transition-luxury">
              SSP CARS
            </span>
            <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 rounded border border-accent-green/20 bg-accent-green/10 text-accent-green font-mono uppercase tracking-widest font-semibold">
              AI Powered
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium tracking-wide font-luxury transition-luxury ${
                  currentPage === item.id 
                    ? 'text-accent-cyan bg-white/5 shadow-glass-glow' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent-cyan rounded-full shadow-cyan-glow" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Dashboards Toggle */}
            <div className="flex gap-2">
              <button 
                onClick={() => handleNavClick('dealer-dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide border transition-luxury ${
                  currentPage === 'dealer-dashboard'
                    ? 'border-accent-purple bg-accent-purple/10 text-accent-purple'
                    : 'border-white/10 hover:border-white/20 text-gray-400 hover:text-white bg-white/5'
                }`}
              >
                Dealer
              </button>
              
              <button 
                onClick={handleAccountClick}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide border transition-luxury ${
                  currentPage === 'user-profile' && userState.isLoggedIn
                    ? 'border-accent-cyan bg-accent-cyan/15 text-accent-cyan shadow-cyan-glow'
                    : 'border-white/10 hover:border-white/20 text-gray-400 hover:text-white bg-white/5'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                {userState.isLoggedIn ? `Hi, ${userState.name}` : 'Login / Sign In'}
              </button>
            </div>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glassmorphism border-t border-white/5 px-4 pt-4 pb-6 space-y-2 animate-fade-in">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium font-luxury transition-luxury ${
                currentPage === item.id 
                  ? 'text-accent-cyan bg-white/5 border border-white/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
            <button 
              onClick={() => handleNavClick('dealer-dashboard')}
              className="w-full py-2.5 rounded-xl border border-white/10 text-center text-sm font-medium text-gray-400 hover:text-white bg-white/5"
            >
              Dealer Dashboard
            </button>
            <button 
              onClick={handleAccountClick}
              className={`w-full py-2.5 rounded-xl border border-accent-cyan/20 text-center text-sm font-medium transition-luxury ${
                userState.isLoggedIn ? 'text-accent-cyan bg-accent-cyan/5' : 'text-gray-400 bg-white/5'
              }`}
            >
              {userState.isLoggedIn ? `Hi, ${userState.name}` : 'Login / Sign In'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

