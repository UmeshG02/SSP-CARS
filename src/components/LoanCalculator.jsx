import React, { useState } from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';

export default function LoanCalculator({ initialPrice = 89990 }) {
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(initialPrice * 0.2);
  const [interestRate, setInterestRate] = useState(5.49);
  const [termMonths, setTermMonths] = useState(60);
  const [planType, setPlanType] = useState('finance'); // 'finance' or 'lease'

  const loanAmount = Math.max(0, vehiclePrice - downPayment);
  
  // Calculate payments
  const calculatePayment = () => {
    if (planType === 'lease') {
      // Lease estimate: ~1.2% of MSRP with down payment reducing capital
      const depreciation = (vehiclePrice * 0.5) - downPayment;
      const rentCharge = (vehiclePrice + (vehiclePrice * 0.5)) * (interestRate / 2400);
      const monthly = (depreciation / termMonths) + rentCharge;
      return isNaN(monthly) || monthly < 0 ? 0 : Math.round(monthly);
    }

    const monthlyRate = (interestRate / 100) / 12;
    if (monthlyRate === 0) return Math.round(loanAmount / termMonths);
    
    const monthly = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                    (Math.pow(1 + monthlyRate, termMonths) - 1);
    return isNaN(monthly) || monthly < 0 ? 0 : Math.round(monthly);
  };

  const monthlyPayment = calculatePayment();
  const totalCost = planType === 'finance' 
    ? (monthlyPayment * termMonths) + downPayment 
    : (monthlyPayment * termMonths) + downPayment + (vehiclePrice * 0.5); // Lease capital return
  
  const totalInterest = Math.max(0, Math.round(totalCost - vehiclePrice));
  const principalPercentage = Math.round(((vehiclePrice - totalInterest) / vehiclePrice) * 100);
  const interestPercentage = 100 - principalPercentage;

  return (
    <div className="glassmorphism-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent-cyan/5 blur-[80px] pointer-events-none rounded-full" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sliders Area */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h3 className="font-luxury font-bold text-xl text-white">Financing Calculator</h3>
              <p className="text-xs text-gray-500">Configure lease or finance rates instantly</p>
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setPlanType('finance')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-luxury ${
                  planType === 'finance'
                    ? 'bg-gradient-to-r from-accent-cyan to-accent-green text-black shadow-cyan-glow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Finance
              </button>
              <button
                onClick={() => setPlanType('lease')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-luxury ${
                  planType === 'lease'
                    ? 'bg-gradient-to-r from-accent-cyan to-accent-green text-black shadow-cyan-glow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Lease
              </button>
            </div>
          </div>

          {/* Vehicle Price */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-gray-400">Vehicle Price</label>
              <span className="font-mono text-white font-semibold">${vehiclePrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={30000}
              max={650000}
              step={1000}
              value={vehiclePrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                setVehiclePrice(val);
                if (downPayment > val) setDownPayment(val * 0.2);
              }}
              className="w-full"
            />
          </div>

          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-gray-400">Down Payment</label>
              <span className="font-mono text-white font-semibold">${downPayment.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={vehiclePrice}
              step={1000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Interest Rate */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400">APR (%)</label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={25}
                  step={0.01}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold font-mono text-sm focus:border-accent-cyan outline-none"
                />
                <Percent className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Term Months */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Term Length</label>
              <div className="relative">
                <select
                  value={termMonths}
                  onChange={(e) => setTermMonths(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold font-mono text-sm focus:border-accent-cyan outline-none appearance-none"
                >
                  <option value={24} className="bg-obsidian-light">24 Months</option>
                  <option value={36} className="bg-obsidian-light">36 Months</option>
                  <option value={48} className="bg-obsidian-light">48 Months</option>
                  <option value={60} className="bg-obsidian-light">60 Months</option>
                  <option value={72} className="bg-obsidian-light">72 Months</option>
                  <option value={84} className="bg-obsidian-light">84 Months</option>
                </select>
                <Calendar className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Circular Visual */}
        <div className="flex flex-col items-center justify-center p-6 border-t lg:border-t-0 lg:border-l border-white/5">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#cyanGreenGrad)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (interestPercentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="cyanGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ffff" />
                  <stop offset="100%" stopColor="#00ffaa" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner text values */}
            <div className="absolute text-center">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-luxury font-medium">Est. Monthly</span>
              <div className="text-3xl font-bold font-mono text-white mt-1 text-glow-cyan">
                ${monthlyPayment}
              </div>
              <span className="text-[10px] text-gray-400 font-medium">/ month</span>
            </div>
          </div>

          {/* Breakdown items */}
          <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5 text-center">
            <div>
              <span className="text-xs text-gray-500 block mb-1">Loan Amount</span>
              <span className="font-semibold text-sm text-white font-mono">${loanAmount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1">Total Interest</span>
              <span className="font-semibold text-sm text-white font-mono">${totalInterest.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
