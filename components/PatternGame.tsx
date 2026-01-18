
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

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
  reflectionPrompt: string;
  color: string;
};

const PatternGame: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [feedback, setFeedback] = useState<string>('Find the pattern...');
  const [shake, setShake] = useState(false);
  const [challenges, setChallenges] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [userResponse, setUserResponse] = useState('');
  const [showReflection, setShowReflection] = useState(false);

  // Generates new challenges using Gemini API.
  // ALWAYS uses gemini-3-pro-preview for complex generation tasks.
  const generateChallenges = async () => {
    setLoading(true);
    setError('');
    
    try {
      // API Key is obtained exclusively from process.env.API_KEY
      if (!process.env.API_KEY) {
        throw new Error('Gemini API Key is not configured.');
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Generate 6 unique pattern recognition challenges. Each should be genuinely fun and surprising.

Mix these types:
- Numeric sequences (Fibonacci, primes, geometric, arithmetic with twists)
- Visual patterns with emojis (spatial, alternating, growing)
- Mixed patterns (numbers + symbols, colors + shapes)

Make patterns creative and varied. Ensure one correct answer per challenge. Make insights genuinely useful.`,
        config: {
          temperature: 0.8,
          responseMimeType: "application/json",
          // Define the exact schema for the expected response
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              challenges: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    funLabel: { type: Type.STRING },
                    funSeq: { 
                      type: Type.ARRAY, 
                      items: { type: Type.STRING },
                      description: 'The sequence of elements showing the pattern.'
                    },
                    ans: { type: Type.STRING, description: 'The next element in the pattern.' },
                    choices: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          label: { type: Type.STRING },
                          value: { type: Type.STRING }
                        },
                        required: ["label", "value"]
                      }
                    },
                    saasTitle: { type: Type.STRING, description: 'A business or strategy term for this pattern.' },
                    saasInsight: { type: Type.STRING, description: 'Practical explanation of this pattern in work.' },
                    reflectionPrompt: { type: Type.STRING },
                    color: { type: Type.STRING, description: 'One of: blue, purple, emerald, rose, orange, violet.' }
                  },
                  required: ["funLabel", "funSeq", "ans", "choices", "saasTitle", "saasInsight", "reflectionPrompt", "color"]
                }
              }
            },
            required: ["challenges"]
          }
        }
      });

      // Directly access text property from response object
      const text = response.text;
      
      if (!text) {
        throw new Error('No content received from Gemini API.');
      }

      const parsed = JSON.parse(text);
      setChallenges(parsed.challenges);
      setLoading(false);
    } catch (err) {
      console.error('Error generating challenges:', err);
      setError(`Failed to generate challenges: ${(err as Error).message}.`);
      setLoading(false);
    }
  };

  useEffect(() => {
    generateChallenges();
  }, []); // Run once on component mount

  const current = challenges[level];

  const handleChoice = (val: string | number) => {
    if (isRevealed || !current) return;

    const chosenValue = val.toString().trim();
    const correctAnswer = current.ans.toString().trim();

    const isCorrect = chosenValue === correctAnswer;

    if (isCorrect) {
      setIsRevealed(true);
      setFeedback("PATTERN DETECTED");
    } else {
      setShake(true);
      setFeedback("Not quite. Look closer.");
      setTimeout(() => {
        setShake(false);
        setFeedback("Find the pattern...");
      }, 500);
    }
  };

  const handleReflection = () => {
    setShowReflection(true);
  };

  const nextLevel = () => {
    if (level < challenges.length - 1) {
      setLevel(prev => prev + 1);
      setIsRevealed(false);
      setShowReflection(false);
      setUserResponse('');
      setFeedback("Find the pattern...");
    } else {
      setFeedback("Pattern Master: Complete!");
    }
  };

  const resetGame = () => {
    setLevel(0);
    setIsRevealed(false);
    setShowReflection(false);
    setUserResponse('');
    setFeedback("Find the pattern...");
    generateChallenges();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-medium">Generating unique patterns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
        <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-2xl border-2 border-red-900/50 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-xl font-black text-white mb-2">Error</h3>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => generateChallenges()}
            className="bg-blue-500 text-white px-6 py-3 rounded-2xl font-black hover:bg-blue-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-slate-400 font-medium">No challenge data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className={`bg-slate-900/90 backdrop-blur-2xl border-2 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden transition-all duration-500 ${isRevealed ? 'border-blue-500/50 ring-8 ring-blue-500/5' : 'border-slate-800'} ${shake ? 'animate-shake' : ''}`}>
          
          {/* Background Elements */}
          <div className={`absolute -top-24 -right-24 w-64 h-64 opacity-20 blur-[100px] rounded-full transition-colors duration-1000 ${isRevealed ? 'bg-blue-400' : `bg-${current.color}-500`}`}></div>
          <div className={`absolute -bottom-24 -left-24 w-64 h-64 opacity-20 blur-[100px] rounded-full bg-slate-800`}></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
              <span className="px-5 py-2 bg-slate-950/50 rounded-2xl border border-slate-800 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                {isRevealed ? `INSIGHT REVEALED` : current.funLabel} • {level + 1}/{challenges.length}
              </span>
              <div className="flex gap-1.5">
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
                      className="min-w-[4.5rem] h-20 md:min-w-[7rem] md:h-28 px-4 flex items-center justify-center bg-slate-950 border-2 border-slate-800 rounded-3xl text-2xl md:text-4xl font-black transition-all shadow-xl text-white"
                    >
                      {item}
                    </div>
                  ))}
                  <div className="min-w-[4.5rem] h-20 md:min-w-[7rem] md:h-28 px-4 flex items-center justify-center border-3 border-dashed border-blue-500/40 rounded-3xl text-2xl md:text-4xl font-black bg-blue-500/5 text-blue-400 animate-pulse">
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
                
                <h3 className="text-blue-400 font-black text-xs uppercase tracking-[0.4em] mb-4">Pattern Identified</h3>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  {current.saasTitle}
                </h2>
                
                <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                  {current.saasInsight}
                </p>

                {!showReflection ? (
                  <button 
                    onClick={handleReflection}
                    className="group flex items-center space-x-3 bg-slate-800 text-white px-8 py-4 rounded-[2rem] font-bold text-base hover:bg-slate-700 transition-all mb-4"
                  >
                    <span>💭 Reflect on this pattern</span>
                  </button>
                ) : (
                  <div className="w-full max-w-2xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <p className="text-slate-400 text-base mb-4 italic">
                      {current.reflectionPrompt}
                    </p>
                    <textarea
                      value={userResponse}
                      onChange={(e) => setUserResponse(e.target.value)}
                      placeholder="Your thoughts..."
                      className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none resize-none h-24"
                    />
                    <p className="text-slate-600 text-xs mt-2">This is just for your own reflection—not saved anywhere</p>
                  </div>
                )}

                <button 
                  onClick={nextLevel}
                  className="group flex items-center space-x-4 bg-white text-slate-950 px-10 py-5 rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95"
                >
                  <span>{level < challenges.length - 1 ? 'NEXT PATTERN' : 'FINISH'}</span>
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {level === challenges.length - 1 && (
                  <button 
                    onClick={resetGame}
                    className="mt-4 text-slate-500 hover:text-blue-400 text-sm font-medium transition-colors"
                  >
                    🔄 Generate New Patterns
                  </button>
                )}
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
        .animate-in {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default PatternGame;
