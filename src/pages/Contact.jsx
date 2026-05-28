import React, { useState } from 'react';
import { Mail, Phone, Clock, FileText, CheckCircle2, MapPin } from 'lucide-react';

export default function Contact() {
  const [ticket, setTicket] = useState({ name: '', email: '', category: 'General Support', description: '' });
  const [sent, setSent] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticket.name && ticket.email && ticket.description) {
      setTicketRef(`SSP-TCK-${Math.floor(100000 + Math.random() * 900000)}`);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setTicket({ name: '', email: '', category: 'General Support', description: '' });
      }, 5000);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-luxury font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-wider">
          Contact SSP Hub
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Open a priority ticket with support teams or dealer licensing agencies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Support channels list */}
        <div className="glassmorphism p-6 rounded-3xl border border-white/5 space-y-6 lg:col-span-1">
          <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider">Channel Catalog</h3>
          
          <div className="space-y-4 text-xs text-gray-400">
            <div className="flex gap-3 items-start">
              <Mail className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Licensing Desk</span>
                <span className="font-mono text-[10px] text-gray-500">dealers@sspcars.com</span>
                <p className="mt-1 leading-normal">For franchise validation requests and API listings support.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start border-t border-white/5 pt-4">
              <Phone className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Concierge Hotline</span>
                <span className="font-mono text-[10px] text-gray-500">+1 (800) 555-0190</span>
                <p className="mt-1 leading-normal">Open 24/7 for platinum tier escrow transfers.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start border-t border-white/5 pt-4">
              <Clock className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">System SLA</span>
                <p className="mt-1 leading-normal">Response time for Priority-1 tickets is under 15 minutes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket form */}
        <div className="lg:col-span-2 glassmorphism-card p-6 sm:p-8 rounded-3xl border border-white/5 relative">
          <h3 className="font-luxury font-bold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent-cyan" />
            Open Priority Helpdesk Ticket
          </h3>

          {sent ? (
            <div className="h-56 flex flex-col items-center justify-center text-center space-y-3">
              <CheckCircle2 className="w-16 h-16 text-accent-green animate-bounce" />
              <h4 className="font-luxury font-bold text-base text-white uppercase tracking-wider">Ticket Queued</h4>
              <div className="p-3 bg-white/3 rounded-xl border border-white/5 font-mono text-xs text-accent-cyan font-bold">
                Ticket Reference: {ticketRef}
              </div>
              <p className="text-[11px] text-gray-500 max-w-sm leading-relaxed">
                SSP systems have successfully logged your technical request. Please monitor your registered email inbox for responses.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={ticket.name}
                    onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={ticket.email}
                    onChange={(e) => setTicket({ ...ticket, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[10px]">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider font-sans">Ticket Category</label>
                <select
                  value={ticket.category}
                  onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold outline-none focus:border-accent-cyan"
                >
                  <option value="General Support" className="bg-obsidian-light">General Support</option>
                  <option value="Dealer Licensing" className="bg-obsidian-light">Dealer Licensing</option>
                  <option value="Stripe Escrow Error" className="bg-obsidian-light">Stripe Escrow Error</option>
                  <option value="AI Recommendation Feedback" className="bg-obsidian-light">AI Recommendation Feedback</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Detailed Request Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail the error message, query issues..."
                  value={ticket.description}
                  onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs glassmorphism-input text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black font-bold text-xs uppercase tracking-wider transition-luxury"
              >
                Log Ticket to Helpdesk
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
