
import React from 'react';

/**
 * Hero component for the landing page.
 * Showcases the main value proposition and a high-impact visual of Andrew.
 */
const Hero: React.FC = () => {
  // Direct Google Drive link using the 'lh3' format for better reliability in web apps
  const headshotUrl = "https://lh3.googleusercontent.com/d/1FtWbn6LluSxwc_Xa4VYNe9g-2pn45RrZ";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1">
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          I See <span className="text-blue-500">Patterns</span> Where Others See Noise.
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 font-medium mb-10 leading-relaxed">
          Andrew Ledet: Efficiency hacker, strategy coach, and data storyteller. Bridging the gap between complex data and human leadership.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="#projects" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            View Creations
          </a>
          <a 
            href="#play" 
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg border border-slate-700 transition-all transform hover:scale-105"
          >
            Play the Pattern Game
          </a>
        </div>
      </div>
      
      <div className="order-1 md:order-2 flex justify-center">
        <div className="relative group">
          {/* Decorative Background Blur */}
          <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Geometric Photo Frame */}
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-4 border-slate-800 shadow-2xl relative z-10 rotate-3 transition-transform group-hover:rotate-0 flex items-center justify-center bg-slate-900">
             <img 
               src={headshotUrl} 
               alt="Andrew Ledet" 
               className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
               loading="lazy"
               onError={(e) => {
                 // Final fallback in case of absolute network failure
                 const target = e.target as HTMLImageElement;
                 target.style.display = 'none';
                 const parent = target.parentElement;
                 if (parent) {
                    const initials = document.createElement('div');
                    initials.className = 'text-blue-500 font-black text-6xl';
                    initials.innerText = 'AL';
                    parent.appendChild(initials);
                 }
               }}
             />
             
             {/* Overlay pattern for texture */}
             <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"></div>
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-950 border-2 border-slate-800 rounded-3xl p-4 flex flex-col justify-center items-center shadow-2xl z-20 -rotate-12 group-hover:rotate-0 transition-transform">
            <span className="text-blue-500 font-black text-2xl">10+</span>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center">Years of Strategy</span>
          </div>

          {/* Abstract Line Detail */}
          <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-blue-500/40 rounded-tl-xl z-0"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 border-b-2 border-r-2 border-blue-500/20 rounded-br-3xl z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
