
import React from 'react';

const Coaching: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
      <div className="space-y-12">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
          <h2 className="text-6xl font-black mb-8 leading-tight relative">Coaching <br/>the <span className="text-blue-500">Unseen</span>.</h2>
          <p className="text-slate-400 text-2xl leading-relaxed font-medium">
            I help analysts find their voice and leaders find their data. Most business problems are just stories waiting for a better narrator.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          <div className="group flex items-start space-x-6 p-6 rounded-3xl hover:bg-white/5 transition-all">
            <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 transform group-hover:rotate-12 transition-transform shadow-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Efficiency Hacking</h4>
              <p className="text-slate-500 leading-relaxed font-medium">Stop grinding. Start optimizing. I teach you how to see the friction patterns that slow down teams.</p>
            </div>
          </div>
          
          <div className="group flex items-start space-x-6 p-6 rounded-3xl hover:bg-white/5 transition-all">
            <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-slate-950 transform group-hover:-rotate-12 transition-transform shadow-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Data Storytelling</h4>
              <p className="text-slate-500 leading-relaxed font-medium">Charts are boring. Insights are exciting. Learn how to present data that triggers emotional buy-in.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative">
         {/* Playful Frame */}
         <div className="absolute -inset-4 border-2 border-dashed border-white/20 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform"></div>
         <div className="relative bg-slate-900 border-4 border-slate-800 p-12 rounded-[2.5rem] shadow-3xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl"></div>
            <div className="space-y-8">
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                ))}
              </div>
              <h3 className="text-3xl font-black italic text-white leading-tight">
                "What if complexity wasn't a wall, but a playground?"
              </h3>
              <p className="text-slate-500 text-lg">
                That's the question we answer in my strategy sessions. We bridge the gap between technical wizardry and human leadership.
              </p>
              <div className="pt-8">
                <a href="#contact" className="inline-flex items-center space-x-4 group/btn">
                  <span className="text-2xl font-black text-blue-400 group-hover/btn:text-white transition-colors underline decoration-blue-500 underline-offset-8">Book a session</span>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-slate-950 group-hover/btn:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </div>
                </a>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Coaching;
