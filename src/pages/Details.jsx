import React, { useState } from 'react';
import { Calendar, Tag, ShieldCheck, Mail, Phone, MapPin, CheckCircle2, ChevronLeft } from 'lucide-react';
import { carsData } from '../data/cars';
import LoanCalculator from '../components/LoanCalculator';

export default function Details({ currentCarId, setCurrentPage }) {
  // Find car in data
  const car = carsData.find(c => c.id === currentCarId) || carsData[0];
  
  const [selectedColor, setSelectedColor] = useState(car.colors[0]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: `Hi, I am interested in this ${car.year} ${car.make} ${car.model} and would like to schedule a virtual tour.` });
  const [formSent, setFormSent] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email) {
      setFormSent(true);
      setTimeout(() => {
        setFormSent(false);
        setContactForm({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back Button */}
      <button
        onClick={() => setCurrentPage('listings')}
        className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-gray-500 hover:text-white transition-luxury"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Listings
      </button>

      {/* Main Vehicle Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Images & Color Switcher */}
        <div className="space-y-6">
          {/* Main Visual Display */}
          <div 
            className="relative h-[320px] sm:h-[400px] rounded-3xl overflow-hidden bg-black/40 border-2 transition-luxury duration-500"
            style={{ borderColor: selectedColor.hex }}
          >
            <img
              src={car.images.main}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white backdrop-blur-md">
              {car.fuelType}
            </div>
            
            {/* Color Overlay Badge */}
            <div className="absolute bottom-4 left-4 px-4 py-2 rounded-2xl bg-black/80 border border-white/10 text-xs font-medium text-white backdrop-blur-md">
              Selected Trim: <span className="font-semibold" style={{ color: selectedColor.hex }}>{selectedColor.name}</span>
            </div>
          </div>

          {/* Color Switcher Controls */}
          <div className="glassmorphism p-5 rounded-3xl border border-white/5 space-y-3">
            <span className="text-[10px] font-bold tracking-widest font-mono text-gray-500 uppercase block">
              Exterior Paint Selection
            </span>
            <div className="flex gap-4">
              {car.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(c)}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-300 relative flex items-center justify-center ${
                    selectedColor.name === c.name 
                      ? 'scale-110 shadow-glass-glow border-white' 
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor.name === c.name && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white mix-blend-difference" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Car Details & Summaries */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-accent-cyan uppercase bg-accent-cyan/10 border border-accent-cyan/20 px-2.5 py-0.5 rounded-md">
                {car.year} Model
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-accent-green uppercase bg-accent-green/10 border border-accent-green/20 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Dealer Certified
              </span>
            </div>
            <h1 className="font-luxury font-extrabold text-4xl sm:text-5xl text-white uppercase tracking-tight mt-3">
              {car.make} {car.model}
            </h1>
            <div className="flex items-baseline gap-4 mt-2">
              <span className="font-mono text-3xl font-extrabold text-accent-green text-glow-green">
                ${car.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                {car.mileage.toLocaleString()} mi. odometer
              </span>
            </div>
          </div>

          {/* AI Pricing Insight */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-accent-cyan/10 to-accent-green/10 border border-accent-cyan/15 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/25">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] block font-mono font-bold tracking-wider text-accent-cyan uppercase">SSP Pricing Insight</span>
              <span className="text-xs text-gray-300 font-semibold">{car.pricingInsight}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {car.description}
          </p>

          {/* AI Deep Analysis Summaries */}
          <div className="glassmorphism p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent-cyan" />
              SSP Neural Summary
            </h3>
            
            <div className="text-xs text-gray-300 leading-relaxed font-sans space-y-3">
              {/* Highlight bullet parts */}
              {car.aiSummary.split('*').map((block, index) => {
                if (index % 2 === 1) {
                  return (
                    <div key={index} className="p-3 bg-accent-neon/5 border border-accent-neon/15 rounded-xl flex items-start gap-2.5">
                      <span className="font-bold text-accent-neon font-mono uppercase shrink-0 text-[10px] mt-0.5">Note:</span>
                      <span className="text-gray-400 leading-normal">{block}</span>
                    </div>
                  );
                }
                return <p key={index}>{block}</p>;
              })}
            </div>
          </div>

          {/* General specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(car.specs).map(([key, val]) => (
              <div key={key} className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-500 block uppercase font-mono tracking-wider">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="text-sm font-bold text-white font-mono">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dealer info & Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10 border-t border-white/5 items-start">
        {/* Dealership Details */}
        <div className="glassmorphism p-6 rounded-3xl border border-white/5 space-y-6">
          <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider">Dealership Contact</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-luxury font-bold text-base text-white">{car.dealer.name}</h4>
              {car.dealer.verified && (
                <span className="inline-block text-[9px] px-1.5 py-0.5 rounded border border-accent-green/20 bg-accent-green/10 text-accent-green font-mono uppercase tracking-widest font-semibold mt-1">
                  Verified Dealer
                </span>
              )}
            </div>

            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span>{car.dealer.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="font-mono">{car.dealer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <span>support@{car.dealer.name.toLowerCase().replace(/\s/g, '')}.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lead submission form */}
        <div className="lg:col-span-2 glassmorphism-card p-6 rounded-3xl border border-white/5 relative">
          <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider mb-4">Request Information & Video Walkthrough</h3>
          
          {formSent ? (
            <div className="h-44 flex flex-col items-center justify-center text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-accent-green animate-bounce" />
              <span className="font-luxury font-bold text-sm text-white uppercase tracking-wider">Ticket Submitted Successfully</span>
              <p className="text-xs text-gray-500 max-w-sm">
                SSP Elite verification algorithms have queued your details. The dealer will contact you in under 1 hour.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Message</label>
                <textarea
                  rows={3}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black font-bold text-xs uppercase tracking-wider transition-luxury"
              >
                Send Request
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Financing Calculator Section */}
      <div className="pt-12 border-t border-white/5">
        <LoanCalculator initialPrice={car.price} />
      </div>
    </div>
  );
}
