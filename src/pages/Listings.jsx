import React, { useState } from 'react';
import { Search, SlidersHorizontal, Heart, RefreshCw, BarChart2, Star } from 'lucide-react';
import { carsData } from '../data/cars';
import { useFavorites } from '../context/FavoritesContext';
import { useComparison } from '../context/ComparisonContext';

export default function Listings({ setCurrentPage, setSelectedCarId }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCompare, removeFromCompare, isInCompare } = useComparison();
  
  const [search, setSearch] = useState('');
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [maxPrice, setMaxPrice] = useState(650000);
  const [compareAlert, setCompareAlert] = useState(null);

  // Constants
  const makes = ['All', 'Tesla', 'Porsche', 'Rivian', 'Lucid', 'Ferrari', 'Audi'];
  const fuels = ['All', 'Electric', 'Petrol', 'Hybrid'];

  const filteredCars = carsData.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(search.toLowerCase()) || 
                          car.model.toLowerCase().includes(search.toLowerCase());
    const matchesMake = selectedMake === 'All' || car.make === selectedMake;
    const matchesFuel = selectedFuel === 'All' || car.fuelType === selectedFuel;
    const matchesPrice = car.price <= maxPrice;
    return matchesSearch && matchesMake && matchesFuel && matchesPrice;
  });

  const handleCompareClick = (e, car) => {
    e.stopPropagation();
    if (isInCompare(car.id)) {
      removeFromCompare(car.id);
      triggerAlert(`Removed ${car.make} ${car.model} from comparison.`);
    } else {
      const res = addToCompare(car);
      triggerAlert(res.message, !res.success);
    }
  };

  const triggerAlert = (message, isError = false) => {
    setCompareAlert({ message, isError });
    setTimeout(() => setCompareAlert(null), 3000);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedMake('All');
    setSelectedFuel('All');
    setMaxPrice(650000);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Title */}
      <div>
        <h1 className="font-luxury font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-wider">
          Browse the Elite Fleet
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Apply advanced telemetry filters to select your high-performance vehicle.
        </p>
      </div>

      {/* Compare Alert Message Toast */}
      {compareAlert && (
        <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl shadow-glass-glow font-luxury font-semibold text-xs uppercase tracking-wider backdrop-blur-md animate-fade-in border ${
          compareAlert.isError 
            ? 'bg-accent-neon/10 border-accent-neon text-accent-neon shadow-neon-glow' 
            : 'bg-accent-cyan/10 border-accent-cyan text-accent-cyan shadow-cyan-glow'
        }`}>
          {compareAlert.message}
        </div>
      )}

      {/* Advanced Filter Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="glassmorphism p-6 rounded-3xl space-y-6 h-fit border border-white/5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <span className="font-luxury font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-accent-cyan" />
              Filters
            </span>
            <button 
              onClick={resetFilters}
              className="text-[10px] font-mono text-gray-500 hover:text-white transition-luxury flex items-center gap-1 uppercase font-semibold"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Search bar */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-medium">Keywords</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search models..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-xs focus:border-accent-cyan outline-none"
              />
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Make select */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-medium">Manufacturer</label>
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-xs focus:border-accent-cyan outline-none appearance-none cursor-pointer"
            >
              {makes.map(m => (
                <option key={m} value={m} className="bg-obsidian-light">{m}</option>
              ))}
            </select>
          </div>

          {/* Fuel select */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-medium">Propulsion</label>
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-xs focus:border-accent-cyan outline-none appearance-none cursor-pointer"
            >
              {fuels.map(f => (
                <option key={f} value={f} className="bg-obsidian-light">{f}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="text-gray-400">Max Budget</label>
              <span className="font-mono text-accent-cyan font-bold">${maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={30000}
              max={650000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Listings Grid */}
        <div className="lg:col-span-3">
          {filteredCars.length === 0 ? (
            <div className="glassmorphism p-12 rounded-3xl text-center border border-white/5">
              <p className="text-gray-500 text-sm font-medium">No vehicles matching your criteria were discovered.</p>
              <button 
                onClick={resetFilters}
                className="mt-4 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-luxury uppercase tracking-wider"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCars.map((car) => (
                <div 
                  key={car.id}
                  onClick={() => {
                    setSelectedCarId(car.id);
                    setCurrentPage('details');
                  }}
                  className="group cursor-pointer rounded-3xl glassmorphism-card overflow-hidden hover:-translate-y-1.5 border border-white/5 hover:border-accent-cyan/20 transition-luxury flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Cover */}
                    <div className="relative h-[200px] overflow-hidden bg-black/40">
                      <img 
                        src={car.images.main} 
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-luxury duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                        <span className="text-[9px] font-bold tracking-widest font-mono uppercase bg-black/60 border border-white/10 text-white px-2 py-0.5 rounded backdrop-blur-md">
                          {car.fuelType}
                        </span>
                        
                        <div className="flex gap-2 pointer-events-auto">
                          {/* Favorite Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(car.id);
                            }}
                            className={`p-2 rounded-lg backdrop-blur-md transition-luxury border ${
                              isFavorite(car.id)
                                ? 'bg-accent-neon/15 border-accent-neon text-accent-neon shadow-neon-glow'
                                : 'bg-black/60 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFavorite(car.id) ? 'fill-accent-neon' : ''}`} />
                          </button>
                          
                          {/* Compare Button */}
                          <button
                            onClick={(e) => handleCompareClick(e, car)}
                            className={`p-2 rounded-lg backdrop-blur-md transition-luxury border ${
                              isInCompare(car.id)
                                ? 'bg-accent-cyan/15 border-accent-cyan text-accent-cyan shadow-cyan-glow'
                                : 'bg-black/60 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            <BarChart2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Brand Info Title */}
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end pointer-events-none">
                        <div>
                          <span className="font-luxury font-bold text-base text-white block leading-tight">{car.make}</span>
                          <span className="text-gray-300 text-xs font-semibold">{car.model}</span>
                        </div>
                        <span className="font-mono font-bold text-sm text-accent-green text-glow-green">
                          ${car.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Specifications list */}
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-1.5 text-center py-2 bg-white/2 rounded-xl border border-white/5 text-gray-400">
                        <div className="space-y-0.5">
                          <span className="text-[9px] block uppercase font-mono tracking-wider">0-60</span>
                          <span className="text-xs font-bold text-white font-mono">{car.specs.zeroToSixty}</span>
                        </div>
                        <div className="space-y-0.5 border-x border-white/5">
                          <span className="text-[9px] block uppercase font-mono tracking-wider">Power</span>
                          <span className="text-xs font-bold text-white font-mono">{car.specs.power}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[9px] block uppercase font-mono tracking-wider">Range</span>
                          <span className="text-xs font-bold text-white font-mono">{car.specs.range}</span>
                        </div>
                      </div>

                      {/* AI generated Summary Snip */}
                      <div className="p-2.5 bg-white/1 border border-white/5 rounded-xl space-y-0.5">
                        <span className="flex items-center gap-1 text-[9px] font-bold tracking-widest font-mono text-accent-cyan uppercase">
                          <Star className="w-2.5 h-2.5 text-accent-cyan fill-accent-cyan/20" />
                          AI Smart Verdict
                        </span>
                        <p className="text-[10px] text-gray-500 leading-normal line-clamp-2">
                          {car.aiSummary.replace(/\*/g, '')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom */}
                  <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                    <span className="font-mono">{car.dealer.city}</span>
                    <span className="flex items-center gap-0.5 text-white font-semibold">
                      <Star className="w-3 h-3 text-accent-cyan fill-accent-cyan" />
                      {car.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
