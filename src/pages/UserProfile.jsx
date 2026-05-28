import React from 'react';
import { User, Heart, ShieldCheck, DollarSign, ChevronRight, AlertCircle, FileText } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { carsData } from '../data/cars';

export default function UserProfile({ setCurrentPage, setSelectedCarId }) {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteCars = carsData.filter(c => favorites.includes(c.id));

  const applications = [
    { model: 'Porsche Taycan Turbo S', type: 'Finance (60 Months)', amount: 194900, status: 'approved', ref: 'SSP-902-1A' },
    { model: 'Tesla Model S Plaid', type: 'Lease (36 Months)', amount: 89990, status: 'reviewing', ref: 'SSP-881-2B' }
  ];

  const handleCarClick = (carId) => {
    setSelectedCarId(carId);
    setCurrentPage('details');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Bio Header */}
      <div className="glassmorphism p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-cyan to-accent-green p-0.5 flex items-center justify-center border border-white/10 shadow-cyan-glow">
            <div className="w-full h-full bg-obsidian-light rounded-[14px] flex items-center justify-center text-white font-luxury font-bold text-2xl">
              AS
            </div>
          </div>
          <div>
            <h2 className="font-luxury font-bold text-xl text-white">Alexander Sterling</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-4 h-4 text-accent-cyan" />
              <span className="text-xs text-gray-400 font-mono">Platinum Buyer Account</span>
            </div>
          </div>
        </div>

        {/* Finance pre-approvals limit */}
        <div className="p-4 bg-white/3 rounded-2xl border border-white/5 text-center sm:text-right min-w-[200px]">
          <span className="text-[10px] text-gray-500 block uppercase font-mono tracking-wider">Pre-Approved Capital Limit</span>
          <span className="font-mono text-xl font-bold text-accent-green text-glow-green mt-0.5 block">
            $350,000 USD
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Wishlist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent-neon fill-accent-neon" />
              Saved Saved Vehicles ({favoriteCars.length})
            </h3>
          </div>

          {favoriteCars.length === 0 ? (
            <div className="glassmorphism p-12 rounded-3xl border border-white/5 text-center space-y-3">
              <p className="text-gray-500 text-xs font-semibold">Your bookmarked wishlist is currently empty.</p>
              <button
                onClick={() => setCurrentPage('listings')}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-luxury uppercase tracking-wider"
              >
                Explore Inventory
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favoriteCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => handleCarClick(car.id)}
                  className="group cursor-pointer rounded-2xl glassmorphism-card border border-white/5 hover:border-accent-cyan/15 overflow-hidden transition-all duration-300"
                >
                  <div className="relative h-32 overflow-hidden bg-black/40">
                    <img
                      src={car.images.main}
                      alt={car.model}
                      className="w-full h-full object-cover group-hover:scale-105 transition-luxury duration-500"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(car.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 border border-white/10 text-accent-neon hover:bg-accent-neon/15 transition-luxury"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="font-luxury font-bold text-sm text-white block leading-tight group-hover:text-accent-cyan transition-luxury">
                      {car.make} {car.model}
                    </span>
                    <div className="flex justify-between items-center text-xs font-mono pt-1">
                      <span className="text-accent-green font-bold">${car.price.toLocaleString()}</span>
                      <span className="text-gray-500">{car.specs.power}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Escrow/Credit statuses */}
        <div className="lg:col-span-1 glassmorphism p-6 rounded-3xl border border-white/5 space-y-6 h-fit">
          <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider border-b border-white/5 pb-4">
            Underwritten Applications
          </h3>

          <div className="space-y-4">
            {applications.map((app, i) => (
              <div key={i} className="p-4 bg-white/2 rounded-2xl border border-white/5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-luxury font-bold text-sm text-white block leading-tight">{app.model}</span>
                    <span className="text-[10px] text-gray-500 font-mono block mt-0.5">{app.type}</span>
                  </div>
                  <span className={`text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                    app.status === 'approved' 
                      ? 'bg-accent-green/15 text-accent-green' 
                      : 'bg-accent-cyan/15 text-accent-cyan animate-pulse'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[10px] font-mono text-gray-500">
                  <span>REF: {app.ref}</span>
                  <span className="text-white font-bold">${app.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-500 leading-normal">
              Platform transactions utilize Stripe smart escrow locks. Funds are only liquidated to dealer nodes upon secure title registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
