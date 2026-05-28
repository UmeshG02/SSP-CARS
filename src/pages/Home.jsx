import React, { useState, useRef, useEffect } from 'react';
import { Search, Star, ChevronRight, Fuel, Gauge, Zap, TrendingUp } from 'lucide-react';
import { carsData } from '../data/cars';
import LoanCalculator from '../components/LoanCalculator';
import VideoHero from '../components/VideoHero';
import ScrollStorySection from '../components/ScrollStorySection';

export default function Home({ setCurrentPage, setSelectedCarId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const mainHeroRef = useRef(null);

  const handleExploreScroll = () => {
    mainHeroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const brands = ['All', 'Tesla', 'Porsche', 'Rivian', 'Lucid', 'Ferrari'];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Pass query in some state, or just route to listings
      setCurrentPage('listings');
    }
  };

  const filteredCars = selectedBrand === 'All' 
    ? carsData.slice(0, 3) 
    : carsData.filter(c => c.make === selectedBrand).slice(0, 3);

  const reviews = [
    { name: "Alexander Wright", role: "Venture Partner", text: "SSP CARS completely redefined my buying experience. The AI vector recommendation matched me with the Taycan Turbo S, and it fits my daily coastal commute perfectly.", rating: 5 },
    { name: "Serena Chen", role: "AI Tech Lead", text: "The natural language search bar actually understands specifications like '0-60 under 3 seconds'. Buying took under 5 minutes with Stripe earnest deposits.", rating: 5 },
    { name: "David Vance", role: "Collector", text: "Acquiring a limited-allocation SF90 Stradale was seamless. The dealer verified badges and vehicle history reports are perfectly transparent.", rating: 5 }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Cinematic Fullscreen Video Hero (Shot-by-Shot Telemetry Sequence) */}
      <VideoHero onExploreClick={handleExploreScroll} />

      {/* Cinematic Scroll Story Section */}
      <ScrollStorySection />

      {/* Section 2: Combined Hero, Brands, & Featured Fleet */}
      <section 
        ref={mainHeroRef} 
        className="relative min-h-screen py-24 flex flex-col justify-center items-center scroll-mt-20"
      >
        {/* Outer Scrolling Wrapper container for all sections inside */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          
          {/* A: Hero HUD Content */}
          <div className="text-center space-y-8 max-w-4xl mx-auto pt-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider text-gray-300 uppercase">
                The Next Evolution of Auto Marketplaces
              </span>
            </div>

            <h1 className="font-luxury font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-tight uppercase">
              DRIVE THE FUTURE.<br />
              <span className="bg-gradient-to-r from-accent-cyan via-accent-green to-accent-cyan bg-size-200 bg-clip-text text-transparent text-glow-cyan">
                SSP CARS.
              </span>
            </h1>

            <p className="text-gray-400 text-base sm:text-xl font-medium tracking-wide max-w-2xl mx-auto">
              AI-driven vector recommendations, side-by-side telemetry compare, and direct dealer escrow deposits. Designed for premium fleets.
            </p>

            {/* Quick Search Bar */}
            <form 
              onSubmit={handleSearchSubmit}
              className="max-w-xl mx-auto relative rounded-2xl glassmorphism border border-white/10 p-1.5 flex gap-2"
            >
              <div className="flex-1 flex items-center gap-3 pl-4">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Type 'Fastest car under $150k'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white text-sm font-medium placeholder-gray-500"
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black font-bold text-xs uppercase tracking-wider transition-luxury"
              >
                Analyze
              </button>
            </form>

            {/* Action CTAs */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentPage('listings')}
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold font-luxury text-sm hover:bg-white/10 transition-luxury uppercase tracking-wider"
              >
                Browse Fleet
              </button>
              <button
                onClick={() => setCurrentPage('ai-recommendation')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black font-bold font-luxury text-sm transition-luxury uppercase tracking-wider"
              >
                Consult AI Advisor
              </button>
            </div>
          </div>

          {/* B: Brand Selector Bar */}
          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-3">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-6 py-3 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-luxury border ${
                    (brand === selectedBrand)
                      ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-cyan-glow'
                      : 'border-white/5 bg-white/3 text-gray-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* C: Featured Grid */}
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6">
              <div>
                <h2 className="font-luxury font-bold text-3xl text-white uppercase tracking-wider">Featured Luxury Vehicles</h2>
                <p className="text-sm text-gray-500 mt-1">Hand-picked premium performance builds available today</p>
              </div>
              <button
                onClick={() => setCurrentPage('listings')}
                className="flex items-center gap-1.5 text-accent-cyan font-semibold text-sm hover:text-white transition-luxury uppercase tracking-wider"
              >
                Explore all listings
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <div 
                  key={car.id}
                  onClick={() => {
                    setSelectedCarId(car.id);
                    setCurrentPage('details');
                  }}
                  className="group cursor-pointer rounded-3xl glassmorphism-card overflow-hidden hover:-translate-y-2 border border-white/5 hover:border-accent-cyan/20 transition-luxury"
                >
                  {/* Card Image */}
                  <div className="relative h-[220px] overflow-hidden bg-black/40">
                    <img 
                      src={car.images.main} 
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-luxury duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {car.trending && (
                        <span className="flex items-center gap-1 text-[9px] font-bold tracking-widest font-mono uppercase bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan px-2.5 py-1 rounded-md backdrop-blur-md">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                      <span className="text-[9px] font-bold tracking-widest font-mono uppercase bg-white/5 border border-white/10 text-white px-2.5 py-1 rounded-md backdrop-blur-md">
                        {car.fuelType}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <h3 className="font-luxury font-bold text-lg text-white leading-tight">{car.make}</h3>
                        <p className="text-gray-300 text-sm font-semibold">{car.model}</p>
                      </div>
                      <span className="font-mono font-bold text-base text-accent-green text-glow-green">
                        ${car.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Card Specs */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-center py-2.5 bg-white/3 rounded-2xl border border-white/5 text-gray-400">
                      <div className="space-y-0.5">
                        <span className="text-[10px] block uppercase font-mono tracking-wider">0-60mph</span>
                        <span className="text-xs font-bold text-white font-mono">{car.specs.zeroToSixty}</span>
                      </div>
                      <div className="space-y-0.5 border-x border-white/5">
                        <span className="text-[10px] block uppercase font-mono tracking-wider">Power</span>
                        <span className="text-xs font-bold text-white font-mono">{car.specs.power}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] block uppercase font-mono tracking-wider">Range</span>
                        <span className="text-xs font-bold text-white font-mono">{car.specs.range}</span>
                      </div>
                    </div>

                    {/* AI Summary Snip */}
                    <div className="p-3 bg-white/1 border border-white/5 rounded-2xl space-y-1">
                      <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest font-mono text-accent-cyan uppercase">
                        <Star className="w-3 h-3 text-accent-cyan fill-accent-cyan/20" />
                        AI Summary
                      </span>
                      <p className="text-[11px] text-gray-400 leading-normal line-clamp-2">
                        {car.aiSummary.replace(/\*/g, '')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Financing Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <LoanCalculator initialPrice={89990} />
        </div>
      </section>

      {/* Client Reviews Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-luxury font-bold text-3xl text-white uppercase tracking-wider">Strategic Testimonials</h2>
          <p className="text-sm text-gray-500 mt-1">Read reviews from executives and tech leaders globally</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="glassmorphism p-6 rounded-3xl space-y-4 border border-white/5 relative">
              <div className="flex items-center gap-1 text-accent-cyan">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-cyan" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                "{rev.text}"
              </p>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-luxury font-bold text-sm text-white">{rev.name}</h4>
                  <span className="text-xs text-gray-500 font-mono">{rev.role}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
