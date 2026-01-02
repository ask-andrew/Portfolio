
import React, { useState } from 'react';

type Choice = {
  label: string;
  value: string | number;
};

type Level = {
  funLabel: string;
  funSeq: (string | number)[];
  ans: string | number;
  choices: Choice[];
  saasTitle: string;
  saasInsight: string;
  color: string;
};

const PatternGame: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [feedback, setFeedback] = useState<string>('Find the pattern...');
  const [shake, setShake] = useState(false);

  const challenges: Level[] = [
    { 
      funLabel: 'GROWTH SPIRAL',
      funSeq: [1, 2, 4, 8], 
      ans: 16, 
      choices: [{label: '12', value: 12}, {label: '16', value: 16}, {label: '20', value: 20}, {label: '32', value: 32}],
      saasTitle: 'EXPONENTIAL MRR',
      saasInsight: "Scaling a SaaS often follows this doubling loop. Early momentum is about hitting that next power of two.",
      color: "blue"
    },
    { 
      funLabel: 'GALAXY ASSEMBLY',
      funSeq: ['🚀', '🚀🚀', '🚀🚀🚀'], 
      ans: '🚀🚀🚀🚀', 
      choices: [
        {label: '🚀', value: '🚀'}, 
        {label: '🚀🚀', value: '🚀🚀'}, 
        {label: '🚀🚀🚀🚀', value: '🚀🚀🚀🚀'}, 
        {label: '🛸', value: '🛸'}
      ],
      saasTitle: 'USER VIRALITY',
      saasInsight: "Linear growth is good, but compounding virality is better. Every new user should invite the next '🚀' into your ecosystem.",
      color: "purple"
    },
    { 
      funLabel: 'BALANCING ACT',
      funSeq: [100, 90, 80, 70], 
      ans: 60, 
      choices: [{label: '75', value: 75}, {label: '65', value: 65}, {label: '60', value: 60}, {label: '50', value: 50}],
      saasTitle: 'CHURN CONTROL',
      saasInsight: "Retention is a leak. If you don't fix the pattern of departure, you're just filling a bucket with holes.",
      color: "rose"
    },
    { 
      funLabel: 'THE PYRAMID',
      funSeq: ['🟢', '🟢🟢', '🟢🟢🟢'], 
      ans: '🟢🟢🟢🟢', 
      choices: [{label: '🟢', value: '🟢'}, {label: '🟢🟢', value: '🟢🟢'}, {label: '🟢🟢🟢🟢', value: '🟢🟢🟢🟢'}, {label: '🔴', value: '🔴'}],
      saasTitle: 'PRODUCT ADOPTION',
      saasInsight: "Users adopt features in layers. The 'Pattern' of usage reveals where the friction is preventing the next layer of growth.",
      color: "emerald"
    },
    { 
      funLabel: 'MAGNITUDE SHIFT',
      funSeq: ['10x', '100x', '1000x'], 
      ans: '10000x', 
      choices: [{label: '2000x', value: '2000x'}, {label: '5000x', value: '5000x'}, {label: '10000x', value: '10000x'}, {label: '∞', value: '∞'}],
      saasTitle: 'EFFICIENCY HACKING',
      saasInsight: "True optimization doesn't just improve things by 10%. It redesigns the system to handle an order of magnitude more complexity.",
      color: "orange"
    }
  ];

  const current = challenges[level];

  const handleChoice = (val: string | number) => {
    if (isRevealed) return;

    const isCorrect = val.toString() === current.ans.toString();

    if (isCorrect) {
      setIsRevealed(true);
      setFeedback("SIGNAL DETECTED");
    } else {
      setShake(true);
      setFeedback("Noise detected. Try again.");
      setTimeout(() => {
        setShake(false);
        setFeedback("Find the pattern...");
      }, 500);
    }
  };

  const nextLevel = () => {
    if (level < challenges.length - 1) {
      setLevel(prev => prev + 1);
      setIsRevealed(false);
      setFeedback("Find the pattern...");
    } else {
      setFeedback("Efficiency Master Class: Complete.");
    }
  };

  return (
    <div className={`max-w-4xl mx-auto px-6 relative transition-all duration-700`}>
      <div className={`bg-slate-900/90 backdrop-blur-2xl border-2 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden transition-all duration-500 ${isRevealed ? 'border-blue-500/50 ring-8 ring-blue-500/5' : 'border-slate-800'} ${shake ? 'animate-shake' : ''}`}>
        
        {/* Playful Background Elements */}
        <div className={`absolute -top-24 -right-24 w-64 h-64 opacity-20 blur-[100px] rounded-full transition-colors duration-1000 ${isRevealed ? 'bg-blue-400' : `bg-${current.color}-500`}`}></div>
        <div className={`absolute -bottom-24 -left-24 w-64 h-64 opacity-20 blur-[100px] rounded-full bg-slate-800`}></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <span className="px-5 py-2 bg-slate-950/50 rounded-2xl border border-slate-800 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              {isRevealed ? `INSIGHT REVEALED` : current.funLabel} • {level + 1}/{challenges.length}
            </span>
            <div className={`flex gap-1.5`}>
              {challenges.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${i <= level ? (isRevealed && i === level ? 'bg-blue-400 scale-125' : 'bg-white') : 'bg-slate-800'}`}></div>
              ))}
            </div>
          </div>

          {!isRevealed ? (
            /* PLAY PHASE */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-16">
                {current.funSeq.map((item, i) => (
                  <div 
                    key={i} 
                    className={`min-w-[4.5rem] h-20 md:min-w-[7rem] md:h-28 px-4 flex items-center justify-center bg-slate-950 border-2 border-slate-800 rounded-3xl text-2xl md:text-4xl font-black transition-all shadow-xl text-white`}
                  >
                    {item}
                  </div>
                ))}
                <div className={`min-w-[4.5rem] h-20 md:min-w-[7rem] md:h-28 px-4 flex items-center justify-center border-3 border-dashed border-blue-500/40 rounded-3xl text-2xl md:text-4xl font-black bg-blue-500/5 text-blue-400 animate-pulse`}>
                  ?
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {current.choices.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(choice.value)}
                    className="group relative py-8 px-4 bg-slate-950 border-2 border-slate-800 rounded-[2rem] font-black text-lg md:text-xl transition-all hover:border-blue-500 hover:text-blue-400 hover:-translate-y-2 active:scale-95 text-slate-300"
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
              <p className="text-center font-black text-slate-600 uppercase tracking-widest text-sm">{feedback}</p>
            </div>
          ) : (
            /* INSIGHT PHASE */
            <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center text-center py-6">
              <div className="w-20 h-20 bg-blue-500 rounded-[2rem] flex items-center justify-center text-slate-950 shadow-2xl mb-8 animate-bounce">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-blue-400 font-black text-xs uppercase tracking-[0.4em] mb-4">SaaS Connection</h3>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                {current.saasTitle}
              </h2>
              
              <p className="text-slate-400 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mb-12 italic">
                "{current.saasInsight}"
              </p>

              <button 
                onClick={nextLevel}
                className="group flex items-center space-x-4 bg-white text-slate-950 px-10 py-5 rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95"
              >
                <span>{level < challenges.length - 1 ? 'NEXT PATTERN' : 'FINISH'}</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
        .animate-in {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default PatternGame;
