import React, { useState } from 'react';
import { ArrowRight, Star, RefreshCw, Layers, Cpu } from 'lucide-react';
import { carsData } from '../data/cars';

export default function AIRecommendation({ setCurrentPage, setSelectedCarId }) {
  const [budget, setBudget] = useState(250000);
  const [familySize, setFamilySize] = useState(5);
  const [habit, setHabit] = useState('performance'); // 'commute', 'roadtrip', 'performance', 'offroad'
  const [fuel, setFuel] = useState('Electric'); // 'All', 'Electric', 'Hybrid', 'Petrol'
  const [results, setResults] = useState([]);
  const [computed, setComputed] = useState(false);

  const calculateMatches = () => {
    const scores = carsData.map(car => {
      let score = 0;

      // Price match (Max 30 pts)
      if (car.price <= budget) {
        score += 30;
      } else {
        const diff = car.price - budget;
        const penalty = Math.min(30, (diff / budget) * 30);
        score += Math.max(0, 30 - penalty);
      }

      // Seating/Size Match (Max 25 pts)
      const seats = car.bodyType === 'SUV' ? 7 : (car.bodyType === 'Sedan' ? 5 : 2);
      if (seats >= familySize) {
        score += 25;
      } else {
        score += 10; // seat mismatch penalty
      }

      // Habits/Purpose Match (Max 25 pts)
      if (habit === 'performance') {
        if (car.model.includes('GT3') || car.model.includes('Sapphire') || car.model.includes('Plaid') || car.model.includes('SF90')) score += 25;
        else if (car.bodyType === 'Coupe') score += 20;
        else score += 10;
      } else if (habit === 'offroad') {
        if (car.make === 'Rivian') score += 25;
        else if (car.bodyType === 'SUV') score += 18;
        else score += 5;
      } else if (habit === 'commute') {
        if (car.fuelType === 'Electric' && car.bodyType === 'Sedan') score += 25;
        else if (car.fuelType === 'Electric') score += 20;
        else score += 8;
      } else if (habit === 'roadtrip') {
        if (car.specs.range && parseInt(car.specs.range) > 300) score += 25;
        else score += 12;
      }

      // Fuel type match (Max 20 pts)
      if (fuel === 'All' || car.fuelType === fuel) {
        score += 20;
      } else {
        score += 5;
      }

      return {
        ...car,
        matchScore: Math.round(score)
      };
    });

    // Sort by score descending
    const sorted = scores.sort((a, b) => b.matchScore - a.matchScore);
    setResults(sorted);
    setComputed(true);
  };

  const handleCardClick = (carId) => {
    setSelectedCarId(carId);
    setCurrentPage('details');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-accent-cyan uppercase">SSP Neural Advisor</span>
        </div>
        <h1 className="font-luxury font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-wider">
          AI recommendation engine
        </h1>
        <p className="text-sm text-gray-500">
          Model recommendations calculated instantly by running vector matching across body dimensions, battery ranges, and pricing categories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Parameters selector panel */}
        <div className="lg:col-span-1 glassmorphism p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6 h-fit">
          <h3 className="font-luxury font-bold text-base text-white uppercase tracking-wider border-b border-white/5 pb-4">
            Preferences Config
          </h3>

          {/* Budget */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="text-gray-400 font-medium">Budget Threshold</label>
              <span className="font-mono text-accent-cyan font-bold">${budget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={40000}
              max={650000}
              step={5000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Seating */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-medium block">Occupants Required</label>
            <div className="grid grid-cols-3 gap-2">
              {[2, 5, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFamilySize(num)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    familySize === num
                      ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                      : 'border-white/10 hover:border-white/20 text-gray-400'
                  }`}
                >
                  {num === 2 ? '2 (Sport)' : num === 5 ? '5 (Daily)' : '7 (Family)'}
                </button>
              ))}
            </div>
          </div>

          {/* Habits */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-medium block">Primary Usage</label>
            <div className="grid grid-cols-2 gap-2 text-center">
              {[
                { id: 'commute', label: 'Commute' },
                { id: 'roadtrip', label: 'Road Trips' },
                { id: 'performance', label: 'Track Performance' },
                { id: 'offroad', label: 'Offroad' }
              ].map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setHabit(h.id)}
                  className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                    habit === h.id
                      ? 'border-accent-cyan bg-accent-cyan/15 text-accent-cyan font-semibold'
                      : 'border-white/10 hover:border-white/20 text-gray-400'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel selection */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-medium block">Preferred Propulsion</label>
            <div className="grid grid-cols-2 gap-2 text-center font-mono text-[10px]">
              {[
                { id: 'All', label: 'ALL TYPES' },
                { id: 'Electric', label: '100% EV' },
                { id: 'Hybrid', label: 'HYBRID' },
                { id: 'Petrol', label: 'PETROL/GAS' }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFuel(f.id)}
                  className={`py-2 rounded-xl border transition-all ${
                    fuel === f.id
                      ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan font-bold'
                      : 'border-white/10 hover:border-white/20 text-gray-500'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calculateMatches}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan via-accent-green to-accent-cyan hover:shadow-cyan-glow text-black font-bold text-xs uppercase tracking-wider transition-luxury flex items-center justify-center gap-2"
          >
            Compute Vector Matches
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Results layout */}
        <div className="lg:col-span-2 space-y-6">
          {!computed ? (
            <div className="glassmorphism p-16 rounded-3xl border border-white/5 h-full flex flex-col items-center justify-center text-center space-y-3">
              <Cpu className="w-10 h-10 text-gray-600 animate-pulse-slow" />
              <span className="font-luxury font-bold text-base text-white uppercase tracking-wider">Awaiting Vector Parameters</span>
              <p className="text-xs text-gray-500 max-w-sm">
                Adjust the sliding constraints and preferences on the left sidebar, then click run to query recommendation matrices.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Query Results — Sorted by Vector Score
                </span>
                <button 
                  onClick={() => setComputed(false)}
                  className="text-[10px] font-mono text-accent-neon font-bold uppercase hover:text-white flex items-center gap-1 transition-luxury"
                >
                  <RefreshCw className="w-3 h-3" />
                  Clear Results
                </button>
              </div>

              <div className="space-y-4">
                {results.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => handleCardClick(car.id)}
                    className="group cursor-pointer rounded-3xl glassmorphism-card border border-white/5 hover:border-accent-cyan/20 p-5 transition-luxury flex flex-col sm:flex-row gap-5 items-center"
                  >
                    {/* Visual Cover */}
                    <div className="w-full sm:w-[180px] h-[120px] rounded-2xl overflow-hidden shrink-0 bg-black/40 border border-white/5">
                      <img 
                        src={car.images.main} 
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-luxury duration-500"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-luxury font-bold text-base text-white block leading-tight group-hover:text-accent-cyan transition-luxury">
                            {car.make} {car.model}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono uppercase">{car.year} • {car.bodyType} • {car.fuelType}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-sm text-accent-green block">${car.price.toLocaleString()}</span>
                          <span className="text-[10px] text-gray-500 font-mono">{car.mileage.toLocaleString()} mi.</span>
                        </div>
                      </div>

                      {/* Vector Match Badge */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                          <span className="text-[10px] text-gray-500 font-mono">{car.dealer.name}</span>
                        </div>

                        {/* score glow circle indicator */}
                        <div className="flex items-center gap-1.5 text-[11px] font-bold font-mono tracking-wide text-glow-cyan text-accent-cyan uppercase">
                          <Cpu className="w-3.5 h-3.5" />
                          {car.matchScore}% Vector Match
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
