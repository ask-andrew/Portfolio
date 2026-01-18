import React, { useState, useEffect } from 'react';

type Choice = {
  label: string;
  value: string;
};

type Challenge = {
  label: string;
  sequence: string[];
  answer: string;
  choices: Choice[];
  insightTitle: string;
  insightText: string;
  reflectionPrompt: string;
};

const PatternGame: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [feedback, setFeedback] = useState('Find the pattern...');
  const [shake, setShake] = useState(false);
  const [reflection, setReflection] = useState('');
  const [showReflection, setShowReflection] = useState(false);

  // Curated challenges with clear patterns and work insights
  const challenges: Challenge[] = [
    {
      label: "The Almost Squares",
      sequence: ["3", "8", "15", "24"],
      answer: "35",
      choices: [
        { label: "30", value: "30" },
        { label: "35", value: "35" },
        { label: "40", value: "40" },
        { label: "48", value: "48" }
      ],
      insightTitle: "Growth Isn't Always Linear",
      insightText: "This pattern (n² - 1) accelerates over time. Just like product adoption, customer growth, or skill development—early progress seems slow, but momentum compounds.",
      reflectionPrompt: "Where in your work are you seeing exponential growth that might not be obvious at first glance?"
    },
    {
      label: "Fibonacci Flow",
      sequence: ["1", "1", "2", "3", "5"],
      answer: "8",
      choices: [
        { label: "6", value: "6" },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
        { label: "9", value: "9" }
      ],
      insightTitle: "Build On What Came Before",
      insightText: "Each number is the sum of the previous two. Strong projects don't start from scratch—they combine and build upon existing successes.",
      reflectionPrompt: "What two past wins could you combine to create something bigger?"
    },
    {
      label: "Powers of Two",
      sequence: ["2", "4", "8", "16"],
      answer: "32",
      choices: [
        { label: "24", value: "24" },
        { label: "32", value: "32" },
        { label: "36", value: "36" },
        { label: "40", value: "40" }
      ],
      insightTitle: "Network Effects Matter",
      insightText: "Doubling isn't just addition—it's multiplication. This is how platforms scale, how ideas spread, and how small teams achieve outsized impact.",
      reflectionPrompt: "What could double in value if you doubled the connections or users?"
    },
    {
      label: "Prime Gaps",
      sequence: ["2", "3", "5", "7", "11"],
      answer: "13",
      choices: [
        { label: "12", value: "12" },
        { label: "13", value: "13" },
        { label: "14", value: "14" },
        { label: "15", value: "15" }
      ],
      insightTitle: "Find the Irreducible Core",
      insightText: "Primes can't be divided further—they're fundamental. The best products and strategies are built on irreducible truths about what users actually need.",
      reflectionPrompt: "What's the one thing your product does that nothing else can replicate?"
    },
    {
      label: "Triangular Numbers",
      sequence: ["1", "3", "6", "10"],
      answer: "15",
      choices: [
        { label: "13", value: "13" },
        { label: "14", value: "14" },
        { label: "15", value: "15" },
        { label: "16", value: "16" }
      ],
      insightTitle: "Incremental Additions Compound",
      insightText: "Adding 1, then 2, then 3, then 4... Small, consistent improvements create significant results. This is the math behind daily habits and continuous improvement.",
      reflectionPrompt: "What small daily action could you add that would compound over time?"
    },
    {
      label: "Skip by Three",
      sequence: ["3", "6", "9", "12", "15"],
      answer: "18",
      choices: [
        { label: "17", value: "17" },
        { label: "18", value: "18" },
        { label: "19", value: "19" },
        { label: "21", value: "21" }
      ],
      insightTitle: "Consistency Beats Complexity",
      insightText: "The simplest pattern is often the most powerful. Consistent 3x progress—whether in revenue, users, or output—beats erratic spikes every time.",
      reflectionPrompt: "What's one metric you could move by the same percentage each week?"
    }
  ];

  const current = challenges[currentLevel];

  const handleChoice = (value: string) => {
    if (isRevealed) return;

    if (value === current.answer) {
      setIsRevealed(true);
      setFeedback("PATTERN DETECTED ✓");
    } else {
      setShake(true);
      setFeedback("Not quite. Look closer.");
      setTimeout(() => {
        setShake(false);
        setFeedback("Find the pattern...");
      }, 600);
    }
  };

  const nextLevel = () => {
    if (currentLevel < challenges.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setIsRevealed(false);
      setShowReflection(false);
      setReflection('');
      setFeedback("Find the pattern...");
    } else {
      setFeedback("🎯 Pattern Master Complete!");
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setIsRevealed(false);
    setShowReflection(false);
    setReflection('');
    setFeedback("Find the pattern...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Pattern Recognition
          </h1>
          <p className="text-slate-400 text-lg">
            Find the logic. Unlock the insight.
          </p>
        </div>

        {/* Game Card */}
        <div className={`bg-slate-800/40 backdrop-blur-xl border-2 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 ${
          isRevealed ? 'border-blue-400/50' : 'border-slate-700'
        } ${shake ? 'animate-shake' : ''}`}>
          
          {/* Progress */}
          <div className="flex justify-between items-center mb-10">
            <span className="px-5 py-2 bg-slate-900/60 rounded-full text-xs font-bold uppercase tracking-wider text-blue-400 border border-slate-700">
              Level {currentLevel + 1} of {challenges.length}
            </span>
            <div className="flex gap-2">
              {challenges.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i < currentLevel ? 'w-8 bg-blue-500' :
                    i === currentLevel ? 'w-12 bg-blue-400' :
                    'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {!isRevealed ? (
            /* Puzzle View */
            <div>
              <h2 className="text-center text-slate-500 font-semibold mb-8 uppercase tracking-wider text-sm">
                {current.label}
              </h2>

              {/* Sequence Display */}
              <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
                {current.sequence.map((item, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center bg-slate-900 border-2 border-slate-700 rounded-2xl text-3xl md:text-4xl font-black text-white shadow-lg"
                  >
                    {item}
                  </div>
                ))}
                <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border-2 border-dashed border-blue-400/50 rounded-2xl text-3xl md:text-4xl font-black text-blue-400 bg-blue-500/5">
                  ?
                </div>
              </div>

              {/* Choices */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {current.choices.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(choice.value)}
                    className="py-8 px-6 bg-slate-900/60 border-2 border-slate-700 rounded-2xl font-bold text-2xl text-slate-300 transition-all hover:border-blue-400 hover:text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
                  >
                    {choice.label}
                  </button>
                ))}
              </div>

              <p className="text-center text-slate-600 font-medium text-sm uppercase tracking-wide">
                {feedback}
              </p>
            </div>
          ) : (
            /* Insight View */
            <div className="text-center space-y-8">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <p className="text-blue-400 font-semibold uppercase tracking-widest text-xs mb-3">
                  Strategic Insight
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  {current.insightTitle}
                </h2>
                <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                  {current.insightText}
                </p>
              </div>

              {!showReflection ? (
                <button
                  onClick={() => setShowReflection(true)}
                  className="bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-600 transition-all"
                >
                  💭 Reflect on this
                </button>
              ) : (
                <div className="max-w-2xl mx-auto space-y-4">
                  <p className="text-slate-400 italic text-lg">
                    {current.reflectionPrompt}
                  </p>
                  <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Your thoughts..."
                    className="w-full px-6 py-4 bg-slate-900/60 border-2 border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-blue-400 focus:outline-none resize-none h-32"
                  />
                </div>
              )}

              <button
                onClick={nextLevel}
                className="bg-white text-slate-900 px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition-all shadow-xl inline-flex items-center gap-3"
              >
                <span>{currentLevel < challenges.length - 1 ? 'Next Pattern' : 'Complete Game'}</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Reset Button */}
        {currentLevel === challenges.length - 1 && isRevealed && (
          <div className="text-center mt-8">
            <button
              onClick={resetGame}
              className="text-slate-400 hover:text-white transition-colors font-medium"
            >
              ↻ Start Over
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PatternGame;