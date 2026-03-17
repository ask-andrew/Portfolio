
import React from 'react';

const Coaching: React.FC = () => {
  const engagements = [
    {
      title: "Process Audit",
      description: "A deep dive into your team's current workflows to identify hidden friction, manual bottlenecks, and 'invisible work' that's draining time.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Build & Hand-Off",
      description: "I don't just advise—I build the custom tools, dashboards, or automations needed to fix the problem, then train your team to own them.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Ongoing Advisory",
      description: "A continuous partnership to help your leadership team navigate scaling, maintain operational excellence, and keep processes lean.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div className="relative">
            <div className="w-12 h-1 bg-blue-500 mb-6"></div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              Is your team <span className="text-blue-500">losing time</span> to broken processes?
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed font-medium">
              Manual work, cross-channel noise, and fragmented data aren't just annoying—they're expensive. I help you find the unseen rhythms in your business and build the systems that reclaim your time.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">How We Work Together</h3>
            <div className="grid gap-6">
              {engagements.map((item, idx) => (
                <div key={idx} className="group p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-blue-500/30 transition-all">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="text-blue-500 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight">{item.title}</h4>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
            <h4 className="text-lg font-bold text-blue-400 mb-2">The Human Element</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              I also offer leadership coaching focused on emotional intelligence and communication. Because once the systems are right, the people side has to follow.
            </p>
          </div>
        </div>

        <div className="sticky top-32">
          <div className="relative bg-slate-900 border-4 border-slate-800 p-12 rounded-[2.5rem] shadow-3xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl"></div>
            <div className="space-y-8">
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                ))}
              </div>
              <h3 className="text-3xl font-black italic text-white leading-tight">
                "I don't just write a deck and leave. I build the tools that fix the thing."
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                Most consultants advise. I operate at the intersection of strategy and execution. My technical builds are the proof that I understand the systems I'm helping you optimize.
              </p>
              <div className="pt-8">
                <a 
                  href="https://calendar.app.google/fgRCxYxdCTaVWDxF6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-4 group/btn"
                >
                  <span className="text-2xl font-black text-blue-400 group-hover/btn:text-white transition-colors underline decoration-blue-500 underline-offset-8">Book a Strategy Session</span>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-slate-950 group-hover/btn:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coaching;
