
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Shapes & Decorative Numbers */}
      <div className="absolute top-20 left-10 w-32 h-32 border-4 border-blue-500/20 rounded-[2rem] rotate-12 animate-pulse hidden md:block"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl hidden md:block"></div>
      
      {/* Floating Numbers Decoration */}
      <div className="absolute top-1/4 right-[15%] text-blue-500/10 text-9xl font-black select-none pointer-events-none animate-bounce hidden xl:block" style={{ animationDuration: '4s' }}>01</div>
      <div className="absolute bottom-1/4 left-[5%] text-purple-500/10 text-8xl font-black select-none pointer-events-none animate-bounce hidden xl:block" style={{ animationDuration: '6s' }}>88</div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-32 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 text-blue-400 border-2 border-blue-500/20 rounded-2xl text-xs font-black uppercase tracking-tighter mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
            <span>STRATEGY • DATA • PLAY</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            Play with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Data</span>. Tell a <span className="italic">Story</span>.
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-xl leading-relaxed font-medium">
            Andrew Ledet here. I transform abstract numbers into operational clarity. Let's find the rhythm in your chaos.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#projects" className="px-10 py-5 bg-white text-slate-950 hover:bg-slate-200 transition-all rounded-[2rem] font-black text-lg shadow-2xl shadow-white/10 active:scale-95">
              Explore Lab
            </a>
            <a href="#coaching" className="px-10 py-5 bg-slate-900 text-white hover:bg-slate-800 transition-all rounded-[2rem] font-black text-lg border-2 border-slate-800 active:scale-95">
              Mindset Coaching
            </a>
          </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center relative">
          <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 w-full max-w-md aspect-square rounded-[4rem] overflow-hidden border-4 border-white/10 shadow-2xl transition-transform duration-700 hover:scale-105 group">
            <img 
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200" 
              alt="Data Playground & Storytelling"
              className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/data-viz/800/800';
              }}
            />
            {/* Playful Overlay Gradient */}
            <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-transparent transition-colors duration-500"></div>
            
            {/* Playful SVG Element */}
            <div className="absolute top-6 right-6 flex space-x-2">
               <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                 Insight Found
               </div>
            </div>
            
            <svg className="absolute bottom-6 right-6 w-16 h-16 text-white/40 animate-spin-slow" viewBox="0 0 100 100">
              <path fill="currentColor" d="M50 0 L100 50 L50 100 L0 50 Z" />
            </svg>
          </div>
          
          {/* Decorative Geometric Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
