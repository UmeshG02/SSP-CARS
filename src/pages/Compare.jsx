import React from 'react';
import { X, Scale, Plus, Star, BarChart2 } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';

export default function Compare({ setCurrentPage, setSelectedCarId }) {
  const { compareList, removeFromCompare, clearCompare } = useComparison();

  const handleCarClick = (carId) => {
    setSelectedCarId(carId);
    setCurrentPage('details');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="font-luxury font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-wider flex items-center gap-3">
            <Scale className="w-8 h-8 text-accent-cyan" />
            Vehicle Comparison
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Analyze telemetry parameters and mechanical dimensions side-by-side.
          </p>
        </div>
        {compareList.length > 0 && (
          <button
            onClick={clearCompare}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-accent-neon/20 hover:text-accent-neon transition-luxury font-mono text-[10px] font-bold uppercase tracking-wider"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Compare table */}
      {compareList.length === 0 ? (
        <div className="glassmorphism p-16 rounded-3xl text-center border border-white/5 max-w-2xl mx-auto space-y-4">
          <div className="p-4 rounded-full bg-white/5 w-16 h-16 flex items-center justify-center mx-auto border border-white/10">
            <BarChart2 className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <h3 className="font-luxury font-bold text-lg text-white uppercase tracking-wider">Comparison List is Empty</h3>
            <p className="text-xs text-gray-500 mt-1">Add up to 3 cars from the inventory page to start comparing specs.</p>
          </div>
          <button
            onClick={() => setCurrentPage('listings')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black font-bold text-xs uppercase tracking-wider transition-luxury"
          >
            Go to Listings
          </button>
        </div>
      ) : (
        <div className="glassmorphism rounded-3xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/1">
                  <th className="p-6 text-xs font-mono font-bold uppercase tracking-wider text-gray-500 w-[200px]">Telemetry Metrics</th>
                  
                  {/* Selected Cars Columns Headers */}
                  {compareList.map((car) => (
                    <th key={car.id} className="p-6 min-w-[240px] relative group border-l border-white/5">
                      <button
                        onClick={() => removeFromCompare(car.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/60 border border-white/10 text-gray-500 hover:text-accent-neon hover:border-accent-neon/20 transition-luxury"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div 
                        onClick={() => handleCarClick(car.id)}
                        className="cursor-pointer space-y-3 pt-4"
                      >
                        <img 
                          src={car.images.main} 
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-32 object-cover rounded-xl bg-black/40 border border-white/5"
                        />
                        <div>
                          <span className="font-luxury font-bold text-base text-white block leading-tight group-hover:text-accent-cyan transition-luxury">
                            {car.make}
                          </span>
                          <span className="text-xs text-gray-400 font-semibold">{car.model} ({car.year})</span>
                        </div>
                        <div className="font-mono text-base font-bold text-accent-green">
                          ${car.price.toLocaleString()}
                        </div>
                      </div>
                    </th>
                  ))}

                  {/* Add Placeholder if less than 3 */}
                  {compareList.length < 3 && (
                    <th className="p-6 min-w-[240px] text-center border-l border-white/5">
                      <div 
                        onClick={() => setCurrentPage('listings')}
                        className="border border-dashed border-white/10 rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer hover:border-accent-cyan/35 group transition-luxury bg-white/1"
                      >
                        <Plus className="w-6 h-6 text-gray-600 group-hover:text-accent-cyan group-hover:scale-110 transition-luxury" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 group-hover:text-white mt-2">Add Vehicle</span>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 font-mono text-xs text-gray-300">
                {/* Engine Power Row */}
                <tr>
                  <td className="p-5 font-luxury font-semibold text-white uppercase text-[10px] tracking-wider bg-white/1">Engine Power Output</td>
                  {compareList.map(c => <td key={c.id} className="p-5 border-l border-white/5 text-sm font-bold">{c.specs.power}</td>)}
                  {compareList.length < 3 && <td className="p-5 border-l border-white/5 text-gray-600">—</td>}
                </tr>
                {/* 0-60 MPH Acceleration Row */}
                <tr>
                  <td className="p-5 font-luxury font-semibold text-white uppercase text-[10px] tracking-wider bg-white/1">0-60 mph Sprint</td>
                  {compareList.map(c => <td key={c.id} className="p-5 border-l border-white/5 text-sm font-bold text-accent-cyan text-glow-cyan">{c.specs.zeroToSixty}</td>)}
                  {compareList.length < 3 && <td className="p-5 border-l border-white/5 text-gray-600">—</td>}
                </tr>
                {/* Max Top Speed Row */}
                <tr>
                  <td className="p-5 font-luxury font-semibold text-white uppercase text-[10px] tracking-wider bg-white/1">Max Top Velocity</td>
                  {compareList.map(c => <td key={c.id} className="p-5 border-l border-white/5 text-sm font-bold">{c.specs.topSpeed}</td>)}
                  {compareList.length < 3 && <td className="p-5 border-l border-white/5 text-gray-600">—</td>}
                </tr>
                {/* Range Capacity Row */}
                <tr>
                  <td className="p-5 font-luxury font-semibold text-white uppercase text-[10px] tracking-wider bg-white/1">EPA Driving Range</td>
                  {compareList.map(c => <td key={c.id} className="p-5 border-l border-white/5 text-sm font-bold text-accent-green">{c.specs.range}</td>)}
                  {compareList.length < 3 && <td className="p-5 border-l border-white/5 text-gray-600">—</td>}
                </tr>
                {/* Battery Size Row */}
                <tr>
                  <td className="p-5 font-luxury font-semibold text-white uppercase text-[10px] tracking-wider bg-white/1">Battery/Engine Spec</td>
                  {compareList.map(c => <td key={c.id} className="p-5 border-l border-white/5 text-sm font-semibold">{c.specs.battery}</td>)}
                  {compareList.length < 3 && <td className="p-5 border-l border-white/5 text-gray-600">—</td>}
                </tr>
                {/* Curb Weight Row */}
                <tr>
                  <td className="p-5 font-luxury font-semibold text-white uppercase text-[10px] tracking-wider bg-white/1">Gross Curb Weight</td>
                  {compareList.map(c => <td key={c.id} className="p-5 border-l border-white/5 text-sm">{c.specs.weight}</td>)}
                  {compareList.length < 3 && <td className="p-5 border-l border-white/5 text-gray-600">—</td>}
                </tr>
                {/* Dealer Rating Row */}
                <tr>
                  <td className="p-5 font-luxury font-semibold text-white uppercase text-[10px] tracking-wider bg-white/1">SSP Platform Rating</td>
                  {compareList.map(c => (
                    <td key={c.id} className="p-5 border-l border-white/5 text-sm">
                      <div className="flex items-center gap-1 font-bold text-white">
                        <Star className="w-3.5 h-3.5 text-accent-cyan fill-accent-cyan" />
                        {c.rating}
                      </div>
                    </td>
                  ))}
                  {compareList.length < 3 && <td className="p-5 border-l border-white/5 text-gray-600">—</td>}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
