import React, { useState } from 'react';
import { DollarSign, Tag, TrendingUp, Users, Calendar, Trash2, Check, X, ShieldAlert } from 'lucide-react';
import { carsData } from '../data/cars';

export default function DealerDashboard({ localCars, onDeleteCar }) {
  const [bids, setBids] = useState([
    { id: 'bid-1', name: 'Marcus Sterling', email: 'msterl@gmail.com', car: 'Tesla Model S Plaid', offer: 88500, time: '20 mins ago', status: 'pending' },
    { id: 'bid-2', name: 'Dr. Diana Prince', email: 'prince.d@metro.org', car: 'Porsche Taycan Turbo S', offer: 191000, time: '2 hours ago', status: 'pending' },
    { id: 'bid-3', name: 'Kenji Kamado', email: 'kenj@toyota.jp', car: 'Ferrari SF90 Stradale', offer: 519000, time: '1 day ago', status: 'pending' }
  ]);
  const [alertMsg, setAlertMsg] = useState(null);

  const handleBidAction = (bidId, action, name) => {
    setBids(prev => prev.map(b => b.id === bidId ? { ...b, status: action } : b));
    triggerAlert(`Offer from ${name} has been ${action === 'accepted' ? 'ACCEPTED' : 'REJECTED'}.`);
  };

  const triggerAlert = (message) => {
    setAlertMsg(message);
    setTimeout(() => setAlertMsg(null), 3000);
  };

  // SVG Chart path parameters
  const chartPoints = "10,90 40,75 70,82 100,50 130,42 160,25 190,30 220,10";

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Title */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-luxury font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-wider">
          Dealer Command Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor incoming offers, catalog conversions, and active inventories.
        </p>
      </div>

      {/* Alert Toast */}
      {alertMsg && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl glassmorphism border border-accent-cyan text-accent-cyan shadow-cyan-glow font-luxury font-semibold text-xs uppercase tracking-wider backdrop-blur-md animate-fade-in">
          {alertMsg}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Platform Sales', val: '$1,294,800', change: '+14.2% MoM', icon: DollarSign, color: 'text-accent-green bg-accent-green/10' },
          { label: 'Active Fleet', val: localCars.length.toString(), change: 'Live listings', icon: Tag, color: 'text-accent-cyan bg-accent-cyan/10' },
          { label: 'Unresolved Bids', val: bids.filter(b => b.status === 'pending').length.toString(), change: 'Action required', icon: TrendingUp, color: 'text-accent-purple bg-accent-purple/10' },
          { label: 'Unique Visitors', val: '12,408', change: '+2.1% hourly', icon: Users, color: 'text-accent-neon bg-accent-neon/10' }
        ].map((met, i) => {
          const Icon = met.icon;
          return (
            <div key={i} className="glassmorphism-card p-5 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-medium block">{met.label}</span>
                <div className={`p-2 rounded-xl border border-white/5 ${met.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white font-mono block leading-tight">{met.val}</span>
                <span className="text-[10px] text-gray-400 font-medium font-mono">{met.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Lead Pipeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SVG Sales Trend Chart */}
        <div className="lg:col-span-1 glassmorphism p-6 rounded-3xl border border-white/5 space-y-4">
          <div>
            <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider">Earnings Velocity</h3>
            <p className="text-[10px] text-gray-500">Weekly platform valuation payouts</p>
          </div>
          
          <div className="h-44 w-full bg-white/2 rounded-2xl border border-white/5 relative flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 230 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00ffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00ffff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="230" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="230" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              <line x1="0" y1="75" x2="230" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              {/* Shading area */}
              <path
                d={`M 10 100 L ${chartPoints} L 220 100 Z`}
                fill="url(#chartGrad)"
                className="transition-all duration-700"
              />
              {/* Line path */}
              <polyline
                fill="none"
                stroke="#00ffff"
                strokeWidth="2.5"
                points={chartPoints}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
          </div>

          <div className="flex justify-between font-mono text-[10px] text-gray-500">
            <span>WEEK 1</span>
            <span>WEEK 2</span>
            <span>WEEK 3</span>
            <span>WEEK 4</span>
          </div>
        </div>

        {/* Lead Bid Pipeline */}
        <div className="lg:col-span-2 glassmorphism p-6 rounded-3xl border border-white/5 space-y-4">
          <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider">Active Bidding Pipeline</h3>
          
          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/40">
            <table className="w-full text-left font-mono text-xs text-gray-300">
              <thead className="bg-white/5 border-b border-white/10 text-white uppercase tracking-wider text-[9px]">
                <tr>
                  <th className="p-3">Buyer</th>
                  <th className="p-3">Model</th>
                  <th className="p-3">Offer Price</th>
                  <th className="p-3">Odometer Timestamp</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bids.map((bid) => (
                  <tr key={bid.id}>
                    <td className="p-3">
                      <span className="font-bold text-white block leading-tight">{bid.name}</span>
                      <span className="text-[10px] text-gray-500">{bid.email}</span>
                    </td>
                    <td className="p-3 text-gray-300">{bid.car}</td>
                    <td className="p-3 text-accent-green font-bold">${bid.offer.toLocaleString()}</td>
                    <td className="p-3 text-gray-500 text-[10px]">{bid.time}</td>
                    <td className="p-3 text-right">
                      {bid.status === 'pending' ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleBidAction(bid.id, 'accepted', bid.name)}
                            className="p-1.5 rounded bg-accent-green/10 border border-accent-green/20 text-accent-green hover:bg-accent-green hover:text-black transition-luxury"
                            title="Accept"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleBidAction(bid.id, 'rejected', bid.name)}
                            className="p-1.5 rounded bg-accent-neon/10 border border-accent-neon/20 text-accent-neon hover:bg-accent-neon hover:text-black transition-luxury"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          bid.status === 'accepted' ? 'bg-accent-green/15 text-accent-green' : 'bg-accent-neon/15 text-accent-neon'
                        }`}>
                          {bid.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inventory Manager List */}
      <div className="glassmorphism p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
        <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider border-b border-white/5 pb-4">
          Dealer Inventory Manager
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localCars.map((car) => (
            <div 
              key={car.id} 
              className="p-4 bg-white/2 rounded-2xl border border-white/5 flex gap-4 items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={car.images.main} 
                  alt={car.model} 
                  className="w-16 h-12 object-cover rounded-xl bg-black/40 border border-white/5"
                />
                <div>
                  <span className="font-luxury font-bold text-sm text-white block leading-tight">{car.make} {car.model}</span>
                  <span className="text-[10px] text-gray-500 font-mono">${car.price.toLocaleString()} • {car.year}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onDeleteCar(car.id);
                  triggerAlert(`Listing ${car.make} ${car.model} deleted.`);
                }}
                className="p-2 rounded-xl bg-white/3 hover:bg-accent-neon/10 hover:text-accent-neon border border-transparent hover:border-accent-neon/20 text-gray-500 transition-luxury"
                title="Delete Listing"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
