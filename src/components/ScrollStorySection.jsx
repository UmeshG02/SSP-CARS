import React, { useState, useEffect, useRef } from 'react';

export default function ScrollStorySection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Refs for tracking target scroll progress and current scrub time (with smooth interpolation)
  const targetTime = useRef(0);
  const smoothTime = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
    };

    if (video.readyState >= 1) {
      setIsVideoReady(true);
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Scroll handler to translate page scroll to video playback target time
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current || !isVideoReady) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollHeight = rect.height - window.innerHeight;
      
      // Calculate scroll progress (0 to 1) for this specific container
      const progress = -rect.top / totalScrollHeight;
      const clampedProgress = Math.max(0, Math.min(1, progress));

      const duration = videoRef.current.duration;
      if (duration && !isNaN(duration)) {
        targetTime.current = clampedProgress * duration;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to align video with start position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVideoReady]);

  // requestAnimationFrame loop to smoothly interpolate (lerp) the video scrubbing
  useEffect(() => {
    let animId;

    const updateLoop = () => {
      const video = videoRef.current;
      if (video && isVideoReady) {
        const diff = targetTime.current - video.currentTime;
        
        // If there's a difference, apply smooth interpolation (lerp factor of 0.08)
        if (Math.abs(diff) > 0.01) {
          video.currentTime += diff * 0.08;
        }
      }
      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, [isVideoReady]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-black select-none z-10"
      style={{ height: '220vh' }} // scroll duration container
    >
      {/* Viewport-Locked/Sticky Video Player */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src="/assets/cars/Racing_animation_Suzuka_Circuit_202605281556.mp4"
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Realism-enhancing cinematic vignette overlays */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,10,12,0.8)_100%)] pointer-events-none" />
      </div>

      {/* Scrolling Text Matter Overlays (Slides upward over the still video background) */}
      <div className="relative z-10 -mt-[100vh] w-full flex flex-col">
        
        {/* Section 1 HUD Text Overlay */}
        <div className="h-screen w-full flex items-center justify-center text-center px-4">
          <div className="max-w-2xl space-y-4 bg-black/10 p-8 rounded-3xl backdrop-blur-sm border border-white/5">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-accent-cyan uppercase">
              Suzuka Circuit Racetrack
            </span>
            <h2 className="font-luxury font-extrabold text-3xl sm:text-5xl tracking-wider text-white uppercase leading-tight">
              THE PERFECT LINE.
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide leading-relaxed max-w-xl mx-auto">
              Rainy night motorsport pacing. As you scroll, the vehicle advances along the racetrack, cornering precisely through wet-road tracks.
            </p>
          </div>
        </div>

        {/* Section 2 HUD Text Overlay */}
        <div className="h-screen w-full flex items-center justify-center text-center px-4">
          <div className="max-w-2xl space-y-4 bg-black/10 p-8 rounded-3xl backdrop-blur-sm border border-white/5">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-accent-green uppercase">
              Active Downforce Cornering
            </span>
            <h2 className="font-luxury font-extrabold text-3xl sm:text-5xl tracking-wider text-white uppercase leading-tight">
              PRECISION HANDLING.
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide leading-relaxed max-w-xl mx-auto">
              Grounding telemetry and acceleration dynamics. Stop scrolling to hold the car at its current track coordinate in full cinematic detail.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
