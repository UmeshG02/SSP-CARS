import React from 'react';
import { Car, Send, Globe, Link2, Shield } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="relative bg-transparent border-t border-white/5 py-16 overflow-hidden z-10">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-gradient-to-b from-accent-cyan/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div 
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="p-2 rounded-xl bg-gradient-to-tr from-accent-cyan to-accent-green">
                <Car className="w-5 h-5 text-black" />
              </div>
              <span className="font-luxury font-bold text-xl tracking-wider text-white">
                SSP CARS
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Experience the next evolution of luxury auto marketplaces. Driven by neural vector search and smart contract workflows.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-accent-cyan hover:border-accent-cyan/20 transition-luxury">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-accent-cyan hover:border-accent-cyan/20 transition-luxury">
                <Link2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-accent-cyan hover:border-accent-cyan/20 transition-luxury">
                <Shield className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-luxury text-sm font-semibold uppercase tracking-wider text-white mb-4">Marketplace</h4>
            <ul className="space-y-2.5">
              {['listings', 'ai-recommendation', 'compare', 'sell'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className="text-sm text-gray-400 hover:text-accent-cyan transition-luxury capitalize"
                  >
                    {page.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Channels */}
          <div>
            <h4 className="font-luxury text-sm font-semibold uppercase tracking-wider text-white mb-4">SSP Network</h4>
            <ul className="space-y-2.5">
              {['blog', 'contact', 'dealer-dashboard', 'user-profile'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className="text-sm text-gray-400 hover:text-accent-cyan transition-luxury capitalize"
                  >
                    {page.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-luxury text-sm font-semibold uppercase tracking-wider text-white mb-4">Stay Configured</h4>
            <p className="text-sm text-gray-500">
              Get notified of limited vehicle drops and smart pricing reductions.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-2.5 rounded-xl text-sm font-medium glassmorphism-input text-white"
              />
              <button className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black transition-luxury">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} SSP CARS Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-luxury">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-luxury">Terms of Service</a>
            <a href="#" className="hover:text-white transition-luxury">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
