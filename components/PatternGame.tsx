
import React, { useState, useEffect } from 'react';

type Choice = {
  label: string;
  value: string | number;
};

type Level = {
  type: 'number' | 'visual' | 'logic';
  seq: (string | number)[];
  ans: string | number;
  choices: Choice[];
  hint: string;
  celebration: string;
  color: string;
};

const PatternGame: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [feedback, setFeedback] = useState<string>('Identify the next missing piece...');
  const [shake, setShake] = useState(false);

  const challenges: Level[] = [
    { 
      type: 'number', 
      seq: [1, 2, 4, 8], 
      ans: 16, 
      choices: [{label: '12', value: 12}, {label: '16', value: 16}, {label: '20', value: 20}, {label: '32', value: 32}],
      hint: "Doubling every step. Scaling a team often starts here.",
      celebration: "YES! Exponential growth identified.",
      color: "blue"
    },
    { 
      type: 'visual', 
      seq: ['⬤', '⬤⬤', '⬤⬤⬤', '⬤⬤⬤⬤'], 
      ans: '⬤⬤⬤⬤⬤', 
      choices: [{label: '⬤⬤⬤⬤', value: '⬤⬤⬤⬤'}, {label: '⬤⬤⬤⬤⬤', value: '⬤⬤⬤⬤⬤'}, {label: '⬤⬤⬤', value: '⬤⬤⬤'}, {label: '⬤', value: '⬤'}],
      hint: "Linear progression. The foundation of steady progress.",
      celebration: "Perfect. Consistency wins the game.",
      color: "emerald"
    },
    { 
      type: 'logic', 
      seq: ['1s', '10s', '100s', '1000s'], 
      ans: '10000s', 
      choices: [{label: '1001s', value: '1001s'}, {label: '2000s', value: '2000s'}, {label: '10000s', value: '10000s'}, {label: '1M', value: '1M'}],
      hint: "Orders of magnitude. Thinking big requires this logic.",
      celebration: "Big thinker! You see the scale clearly.",
      color: "purple"
    },
    { 
      type: 'number', 
      seq: [1, 1, 2, 3, 5], 
      ans: 8, 
      choices: [{label: '6', value: 6}, {label: '7', value: 7}, {label: '8', value: 8}, {label: '9', value: 9}],
      hint: "Summing the previous two. Nature's favorite spiral.",
      celebration: "Fibonacci Master! Natural rhythm found.",
      color: "orange"
    },
    { 
      type: 'visual', 
      seq: ['/', '\\', '/', '\\', '/'], 
      ans: '\\', 
      choices: [{label: '/', value: '/'}, {label: '-', value: '-'}, {label: '\\', value: '\\'}, {label: '|', value: '|'}],
      hint: "Alternating angles. Balancing logic and intuition.",
      celebration: "Boom! Pattern equilibrium achieved.",
      color: "rose"
    }
  ];

  const current = challenges[level];

  const handleChoice = (val: string | number) => {
    if (celebrating) return;

    const isCorrect = val.toString() === current.ans.toString();

    if (isCorrect) {
      setCelebrating(true);
      setFeedback(current.celebration);
      
      setTimeout(() => {
        setCelebrating(false);
        if (level < challenges.length - 1) {
          setLevel(prev => prev + 1);
          setFeedback('Next level! What comes next?');
        } else {
          setFeedback("Ultimate Pattern Master! Let's talk data.");
        }
      }, 2000);
    } else {
      setShake(true);
      setFeedback("Almost. Take another look at the sequence.");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className={`max-w-3xl mx-auto px-6 relative transition-all duration-700 ${celebrating ? 'scale-105' : 'scale-100'}`}>
      <div className={`bg-slate-900/90 backdrop-blur-2xl border-2 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden transition-all duration-500 ${celebrating ? 'border-white/50 ring-8 ring-white/5' : 'border-slate-800'} ${shake ? 'animate-shake' : ''}`}>
        
        {/* Colorful Gradients */}
        <div className={`absolute -top-24 -right-24 w-64 h-64 opacity-20 blur-[100px] rounded-full bg-${current.color}-500 transition-colors duration-1000`}></div>
        <div className={`absolute -bottom-24 -left-24 w-64 h-64 opacity-20 blur-[100px] rounded-full bg-blue-500 transition-colors duration-1000`}></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-10">
            <span className="px-5 py-2 bg-slate-950/50 rounded-2xl border border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              PATTERN HUNT • LEVEL {level + 1}
            </span>
            <div className={`flex gap-1.5`}>
              {challenges.map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${i <= level ? 'bg-blue-500 scale-125' : 'bg-slate-800'}`}></div>
              ))}
            </div>
          </div>

          {/* Sequence Display */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-16">
            {current.seq.map((item, i) => (
              <div 
                key={i} 
                className={`w-14 h-14 md:w-20 md:h-20 flex items-center justify-center bg-slate-950 border-2 border-slate-800 rounded-2xl text-2xl md:text-4xl font-black transition-all shadow-xl text-blue-400`}
              >
                {item}
              </div>
            ))}
            <div className={`w-14 h-14 md:w-20 md:h-20 flex items-center justify-center border-3 border-dashed rounded-2xl text-2xl md:text-4xl font-black transition-all ${celebrating ? 'bg-white text-slate-900 border-white rotate-12' : 'bg-blue-500/5 border-blue-500/40 text-blue-400 animate-pulse'}`}>
              {celebrating ? current.ans : '?'}
            </div>
          </div>

          {/* Multiple Choice Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {current.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoice(choice.value)}
                disabled={celebrating}
                className={`group relative py-6 px-4 bg-slate-950 border-2 border-slate-800 rounded-3xl font-black text-xl transition-all active:scale-95 ${celebrating && choice.value === current.ans ? 'bg-white text-slate-950 border-white' : 'hover:border-blue-500 hover:text-blue-400'}`}
              >
                {choice.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-6">
            <p className={`text-center font-black transition-all duration-300 text-xl md:text-2xl h-8 ${celebrating ? 'text-white translate-y-[-4px]' : 'text-slate-400'}`}>
              {feedback}
            </p>
            {!celebrating && (
              <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Strategy:</span>
                <span className="text-xs text-slate-300 font-medium italic">{current.hint}</span>
              </div>
            )}
          </div>
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
      `}</style>
    </div>
  );
};

export default PatternGame;
