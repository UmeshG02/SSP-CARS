import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, ChevronRight, Zap } from 'lucide-react';

export default function VideoHero({ onExploreClick }) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Video autoplay failed to start immediately: ", err);
      });
    }
  }, []);

  // Time milestones for animation states
  const showHeadline = currentTime >= 0.2;
  const showSubtitle = currentTime >= 1.2;
  const showStats = currentTime >= 3.0;
  const showCTAs = currentTime >= 6.0;
  const showScroll = currentTime >= 9.0;

  // Video scale transition
  const videoScale = currentTime < 3.0 ? 'scale-105' : 'scale-100';

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center z-10 select-none">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          src="/assets/cars/download.mp4"
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-all duration-[3000ms] ease-out ${videoScale}`}
        />
        {/* Soft Premium Gradient Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-black/40 transition-opacity duration-1000 ${
            currentTime >= 6.0 ? 'opacity-90' : 'opacity-70'
          }`} 
        />
        {/* Bottom subtle vignetting */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-obsidian transition-opacity duration-1000 ${
            currentTime >= 9.0 ? 'opacity-80' : 'opacity-40'
          }`} 
        />
      </div>

      {/* Cinematic Telemetry Overlay Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col justify-between h-[75vh] w-full pt-16">
        
        {/* Top telemetry spacer */}
        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest px-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            <span>TELEMETRY LINK : ON</span>
          </div>
          <div className="hidden sm:block">
            <span>SEQUENCE 0{Math.min(4, Math.floor(currentTime / 3) + 1)} // 12.0S</span>
          </div>
        </div>

        {/* Middle Stage: Headlines & Performance stats */}
        <div className="space-y-12 my-auto">
          {/* Main Title & Subtitle */}
          <div className="space-y-4">
            <h1 
              className={`font-luxury font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-widest text-white leading-tight uppercase transition-all duration-1000 ease-out transform ${
                showHeadline 
                  ? 'opacity-100 scale-100 text-glow-cyan' 
                  : 'opacity-0 scale-95 translate-y-4'
              }`}
            >
              DRIVE THE FUTURE
            </h1>
            <p 
              className={`text-gray-400 text-xs sm:text-sm font-mono tracking-widest uppercase transition-all duration-1000 ease-out delay-300 transform ${
                showSubtitle 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
            >
              Experience the telemetry of pure electric acceleration
            </p>
          </div>

          {/* Staggered Stats Cards (Power Reveal: 3-6s) */}
          <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            {[
              { label: 'ACCELERATION', val: '0-100 in 2.1s', delay: 'delay-0' },
              { label: 'ENGINE POWER', val: '1,020 HP', delay: 'delay-200' },
              { label: 'CHASSIS MODE', val: 'Electric Precision', delay: 'delay-500' }
            ].map((stat, i) => (
              <div
                key={i}
                className={`px-6 py-4 rounded-2xl glassmorphism border border-white/5 min-w-[180px] text-center transition-all duration-1000 ease-out transform ${
                  showStats
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                } ${stat.delay}`}
              >
                <span className="text-[9px] text-gray-500 block uppercase font-mono tracking-wider mb-1">{stat.label}</span>
                <span className="text-sm font-luxury font-bold text-white uppercase tracking-wider block">{stat.val}</span>
              </div>
            ))}
          </div>

          {/* Luxury CTAs (Luxury Motion: 6-9s) */}
          <div 
            className={`flex flex-wrap justify-center gap-4 pt-6 transition-all duration-1000 ease-out transform ${
              showCTAs 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black font-bold font-luxury text-xs uppercase tracking-wider transition-luxury hover:scale-105 active:scale-95"
            >
              Explore Cars
            </button>
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold font-luxury text-xs uppercase tracking-wider transition-luxury hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center gap-1.5"
            >
              Watch Experience
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Scroll Indicator (Transition Curve: 9s+) */}
        <div className="h-10 flex justify-center items-center">
          <button
            onClick={onExploreClick}
            className={`flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-all duration-1000 transform ${
              showScroll
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to Explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-accent-cyan" />
          </button>
        </div>
      </div>
    </section>
  );
}
