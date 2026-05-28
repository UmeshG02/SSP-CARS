import React from 'react';
import { Calendar, User, ArrowUpRight } from 'lucide-react';
import { blogArticles } from '../data/cars';

export default function Blog() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Title */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-luxury font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-wider">
          The SSP Gazette
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Stay configured on autonomous development trends and limited fleet releases.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogArticles.map((art) => (
          <div
            key={art.id}
            className="group rounded-3xl glassmorphism-card overflow-hidden border border-white/5 hover:border-accent-cyan/15 transition-luxury flex flex-col justify-between"
          >
            <div>
              {/* Image Cover */}
              <div className="h-48 overflow-hidden bg-black/40 border-b border-white/5 relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-luxury duration-750"
                />
                <span className="absolute top-3 left-3 text-[9px] font-bold font-mono tracking-widest uppercase bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan px-2 py-0.5 rounded backdrop-blur-md">
                  {art.category}
                </span>
              </div>

              {/* Text Area */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {art.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {art.author}
                  </span>
                </div>

                <h3 className="font-luxury font-bold text-base text-white group-hover:text-accent-cyan transition-luxury leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>
            </div>

            {/* Bottom button */}
            <div className="p-5 border-t border-white/5 flex items-center justify-between text-xs font-mono font-bold text-gray-400 group-hover:text-accent-cyan transition-luxury">
              <span>{art.readTime}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-luxury" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
