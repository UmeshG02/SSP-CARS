import React, { useState } from 'react';
import { DollarSign, CheckCircle2, TrendingUp, Scale } from 'lucide-react';

export default function Sell({ onAddCar, setCurrentPage }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: 2022,
    mileage: '',
    condition: 'Excellent',
    fuelType: 'Electric',
    bodyType: 'Sedan',
    price: '',
    description: ''
  });

  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState(null);
  const [published, setPublished] = useState(false);

  const handleValuation = (e) => {
    e.preventDefault();
    if (!formData.make || !formData.model || !formData.mileage) return;

    setAnalyzing(true);
    setTimeout(() => {
      // Simple mockup pricing model valuation
      const baseVal = 70000;
      const agePenalty = (2026 - formData.year) * 4000;
      const milePenalty = (Number(formData.mileage) * 0.25);
      const estPrice = Math.max(15000, baseVal - agePenalty - milePenalty);

      setAiReport({
        estimatedMSRP: Math.round(estPrice),
        fairRangeMin: Math.round(estPrice * 0.95),
        fairRangeMax: Math.round(estPrice * 1.05),
        instantCashOffer: Math.round(estPrice * 0.85),
        demandScore: Math.round(75 + Math.random() * 20), // Demand 75% to 95%
      });
      setAnalyzing(false);
    }, 1500);
  };

  const handlePublish = () => {
    if (!aiReport) return;
    
    // Prepare car listing
    const newCar = {
      id: `car-${Date.now()}`,
      make: formData.make,
      model: formData.model,
      year: Number(formData.year),
      price: Number(formData.price) || aiReport.estimatedMSRP,
      mileage: Number(formData.mileage),
      bodyType: formData.bodyType,
      fuelType: formData.fuelType,
      transmission: "Automatic",
      rating: 4.5,
      description: formData.description || `A premium ${formData.condition} condition ${formData.make} ${formData.model}.`,
      aiSummary: `AI Generated Summary: This ${formData.year} ${formData.make} ${formData.model} was registered with ${formData.mileage} miles. SSP Algorithms indicate a solid market demand score of ${aiReport.demandScore}%. Ideal for everyday urban commutes and luxury driving enthusiasts.`,
      pricingInsight: "Fair Market Value — Pre-evaluated by SSP smart contracts.",
      colors: [
        { name: "Stealth Grey", hex: "#525456" },
        { name: "Pearl White", hex: "#eaeaea" }
      ],
      specs: {
        zeroToSixty: "3.5s",
        topSpeed: "140 mph",
        power: "420 hp",
        range: "280 mi",
        battery: "85 kWh",
        weight: "4,600 lbs"
      },
      dealer: {
        name: "Private Seller (SSP Verified)",
        city: "Los Angeles, CA",
        rating: 4.8,
        verified: true,
        phone: "+1 (555) 018-9201"
      },
      images: {
        main: "/assets/cars/tesla_plaid_main.png", // fallback image
        gallery: ["/assets/cars/tesla_plaid_main.png"]
      },
      trending: false
    };

    onAddCar(newCar);
    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      setAiReport(null);
      setFormData({
        make: '',
        model: '',
        year: 2022,
        mileage: '',
        condition: 'Excellent',
        fuelType: 'Electric',
        bodyType: 'Sedan',
        price: '',
        description: ''
      });
      setCurrentPage('listings');
    }, 2500);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-luxury font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-wider">
          List Your Vehicle
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Input details to run AI Pricing Insights and register your car to our public listing feed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Form */}
        <div className="glassmorphism p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider border-b border-white/5 pb-4">
            Vehicle Registration Specifications
          </h3>

          <form onSubmit={handleValuation} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Make</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tesla"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Model Y"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Year</label>
                <input
                  type="number"
                  required
                  min={1990}
                  max={2027}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Odometer Mileage (mi)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 15000"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono text-[9px]">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider font-sans">Propulsion</label>
                <select
                  value={formData.fuelType}
                  onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                  className="w-full px-2.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold outline-none focus:border-accent-cyan"
                >
                  <option value="Electric" className="bg-obsidian-light">Electric</option>
                  <option value="Hybrid" className="bg-obsidian-light">Hybrid</option>
                  <option value="Petrol" className="bg-obsidian-light">Petrol</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider font-sans">Body Type</label>
                <select
                  value={formData.bodyType}
                  onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                  className="w-full px-2.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold outline-none focus:border-accent-cyan"
                >
                  <option value="Sedan" className="bg-obsidian-light">Sedan</option>
                  <option value="SUV" className="bg-obsidian-light">SUV</option>
                  <option value="Coupe" className="bg-obsidian-light">Coupe</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider font-sans">Condition</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-2.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold outline-none focus:border-accent-cyan"
                >
                  <option value="Excellent" className="bg-obsidian-light">Excellent</option>
                  <option value="Good" className="bg-obsidian-light">Good</option>
                  <option value="Fair" className="bg-obsidian-light">Fair</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Short Description</label>
              <textarea
                rows={2}
                placeholder="Include battery life details, unique features..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={analyzing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black font-bold text-xs uppercase tracking-wider transition-luxury flex items-center justify-center gap-2"
            >
              {analyzing ? 'Evaluating Analytics...' : 'Run AI Valuation Analysis'}
              <TrendingUp className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Side: AI valuation result report */}
        <div>
          {published ? (
            <div className="glassmorphism p-16 rounded-3xl border border-accent-green/20 h-[380px] flex flex-col items-center justify-center text-center space-y-4 shadow-green-glow bg-accent-green/5">
              <CheckCircle2 className="w-16 h-16 text-accent-green animate-bounce" />
              <h3 className="font-luxury font-bold text-xl text-white uppercase tracking-wider">Listing Published</h3>
              <p className="text-xs text-gray-500 max-w-sm">
                SSP transaction ledgers have appended your vehicle listing. Redirecting you to fleet index in 2 seconds...
              </p>
            </div>
          ) : aiReport ? (
            <div className="glassmorphism p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
              <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider border-b border-white/5 pb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-cyan" />
                AI Valuation Valuation Report
              </h3>

              <div className="space-y-5">
                {/* MSRP */}
                <div className="text-center p-4 bg-white/3 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-gray-500 block uppercase font-mono tracking-wider">Suggested Listing Price</span>
                  <div className="text-3xl font-bold font-mono text-accent-green text-glow-green mt-1">
                    ${aiReport.estimatedMSRP.toLocaleString()}
                  </div>
                </div>

                {/* Grid ranges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/2 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-gray-500 block uppercase font-mono">Fair Value Range</span>
                    <span className="font-mono text-xs font-semibold text-white">
                      ${aiReport.fairRangeMin.toLocaleString()} - ${aiReport.fairRangeMax.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-white/2 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-gray-500 block uppercase font-mono">Instant Liquidation Offer</span>
                    <span className="font-mono text-xs font-semibold text-accent-cyan">
                      ${aiReport.instantCashOffer.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Score bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">Platform Demand Velocity</span>
                    <span className="font-mono text-accent-cyan font-bold">{aiReport.demandScore}% High Demand</span>
                  </div>
                  <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-green rounded-full shadow-cyan-glow" 
                      style={{ width: `${aiReport.demandScore}%` }}
                    />
                  </div>
                </div>

                {/* Confirm input pricing */}
                <div className="space-y-1.5 pt-4">
                  <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Custom Asking Price ($)</label>
                  <input
                    type="number"
                    value={formData.price || aiReport.estimatedMSRP}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white font-mono font-bold text-accent-green focus:border-accent-green"
                  />
                </div>

                <button
                  onClick={handlePublish}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black font-bold text-xs uppercase tracking-wider transition-luxury"
                >
                  Publish to Public Catalog
                </button>
              </div>
            </div>
          ) : (
            <div className="glassmorphism p-16 rounded-3xl border border-white/5 h-[380px] flex flex-col items-center justify-center text-center space-y-4">
              <Scale className="w-12 h-12 text-gray-600 animate-pulse-slow" />
              <span className="font-luxury font-bold text-base text-white uppercase tracking-wider">Awaiting Specifications</span>
              <p className="text-xs text-gray-500 max-w-sm">
                Fill in the vehicle make, odometer mileage, condition, and run the validator to display your smart valuation report.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
