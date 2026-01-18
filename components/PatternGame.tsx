
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

  /**
   * Generates new challenges using Gemini API.
   * Uses thinkingConfig to ensure mathematical and logical accuracy.
   */
  const generateChallenges = async () => {
    setLoading(true);
    setError('');
    
    try {
      if (!process.env.API_KEY) {
        throw new Error('Gemini API Key is not configured.');
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Generate 6 unique and mathematically RIGOROUS pattern recognition challenges. 

CRITICAL LOGIC RULES:
1. EVERY sequence must follow a strict, solvable formula.
2. The "ans" field MUST be the exact mathematical result of the pattern.
3. The "choices" array MUST contain the "ans" value exactly as one of the options.
4. Verify the "The Almost Squares" pattern (n^2 - 1): if the sequence is 3, 8, 15, 24, the answer MUST be 35 and 35 MUST be in choices.
5. Provide deep business insights (saasInsight) that relate the pattern's logic to real-world strategy.

Mix types:
- Quadratic or Polynomial sequences.
- Prime number gaps or Fibonacci variants.
- Visual growth patterns using characters/emojis.`,
        config: {
          thinkingConfig: { thinkingBudget: 4000 },
          temperature: 0.2, // Lower temperature for higher precision
          responseMimeType: "application/json",
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
                      items: { type: Type.STRING }
                    },
                    ans: { type: Type.STRING },
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
                    saasTitle: { type: Type.STRING },
                    saasInsight: { type: Type.STRING },
                    reflectionPrompt: { type: Type.STRING },
                    color: { type: Type.STRING }
                  },
                  required: ["funLabel", "funSeq", "ans", "choices", "saasTitle", "saasInsight", "reflectionPrompt", "color"]
                }
              }
            },
            required: ["challenges"]
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error('No content received from Gemini.');

      const parsed = JSON.parse(text);
      
      // Basic validation to ensure "ans" is in "choices"
      const validatedChallenges = parsed.challenges.filter((c: Level) => {
        const hasAnswer = c.choices.some(choice => choice.value.toString() === c.ans.toString());
        if (!hasAnswer) console.warn(`Pattern "${c.funLabel}" failed validation: Answer not in choices.`);
        return hasAnswer;
      });

      if (validatedChallenges.length === 0) throw new Error('Generated patterns failed logic validation.');
      
      setChallenges(validatedChallenges);
      setLoading(false);
    } catch (err) {
      console.error('Error generating challenges:', err);
      setError(`Failed to generate valid challenges. Please retry.`);
      setLoading(false);
    }
  };

  useEffect(() => {
    generateChallenges();
  }, []);

  const current = challenges[level];

  const handleChoice = (val: string | number) => {
    if (isRevealed || !current) return;

    const chosenValue = val.toString().trim().toLowerCase();
    const correctAnswer = current.ans.toString().trim().toLowerCase();

    if (chosenValue === correctAnswer) {
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

  const handleReflection = () => setShowReflection(true);

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
      <div className="min-h-[400px] flex items-center justify-center bg-slate-950/20 rounded-[3rem]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse">Calculating Deep Patterns...</p>
        </div>
      </div>
    );
  }

  if (error || !current) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-slate-950/20 rounded-[3rem] p-12 text-center">
        <div>
          <h3 className="text-xl font-black text-white mb-4">Patterns are shifting...</h3>
          <p className="text-slate-500 mb-8">The logic engine encountered a snag.</p>
          <button onClick={resetGame} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-500 transition-all">Retry Generation</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      <div className={`bg-slate-900/60 backdrop-blur-2xl border-2 rounded-[3.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden transition-all duration-700 ${isRevealed ? 'border-blue-500/40 ring-4 ring-blue-500/5' : 'border-slate-800'} ${shake ? 'animate-shake' : ''}`}>
        
        <div className={`absolute -top-32 -right-32 w-80 h-80 opacity-10 blur-[120px] rounded-full bg-${current.color}-500 transition-colors duration-1000`}></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <span className="px-6 py-2.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-[11px] font-black uppercase tracking-[0.4em] text-blue-500">
              {isRevealed ? `LOGIC UNLOCKED` : current.funLabel} • {level + 1}/{challenges.length}
            </span>
            <div className="flex gap-2">
              {challenges.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= level ? (isRevealed && i === level ? 'w-8 bg-blue-500' : 'w-6 bg-slate-400') : 'w-2 bg-slate-800'}`}></div>
              ))}
            </div>
          </div>

          {!isRevealed ? (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-20">
                {current.funSeq.map((item, i) => (
                  <div key={i} className="min-w-[4.5rem] h-20 md:min-w-[7.5rem] md:h-32 px-4 flex items-center justify-center bg-slate-950 border-2 border-slate-800 rounded-[2.5rem] text-2xl md:text-5xl font-black text-white shadow-2xl">
                    {item}
                  </div>
                ))}
                <div className="min-w-[4.5rem] h-20 md:min-w-[7.5rem] md:h-32 px-4 flex items-center justify-center border-3 border-dashed border-blue-500/40 rounded-[2.5rem] text-2xl md:text-5xl font-black bg-blue-500/5 text-blue-500 animate-pulse">
                  ?
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                {current.choices.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(choice.value)}
                    className="group py-10 px-6 bg-slate-950/80 border-2 border-slate-800 rounded-[2.5rem] font-black text-xl md:text-2xl transition-all hover:border-blue-500 hover:text-white hover:-translate-y-3 active:scale-95 text-slate-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)]"
                  >
                    <span className="block mb-2 text-[10px] text-slate-700 group-hover:text-blue-500 transition-colors uppercase tracking-[0.3em]">Option</span>
                    {choice.label}
                  </button>
                ))}
              </div>
              <p className="text-center font-black text-slate-700 uppercase tracking-widest text-xs">{feedback}</p>
            </div>
          ) : (
            <div className="animate-in zoom-in-95 duration-700 flex flex-col items-center text-center py-8">
              <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_0_50px_rgba(37,99,235,0.4)] mb-10 animate-bounce">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-blue-500 font-black text-xs uppercase tracking-[0.5em] mb-4">Strategic Insight</h3>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tighter">
                {current.saasTitle}
              </h2>
              
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-12 font-medium">
                {current.saasInsight}
              </p>

              {!showReflection ? (
                <button 
                  onClick={handleReflection}
                  className="group flex items-center space-x-3 bg-slate-800 text-white px-10 py-5 rounded-[2.5rem] font-bold text-lg hover:bg-slate-700 transition-all mb-6"
                >
                  <span>💡 Apply this mindset</span>
                </button>
              ) : (
                <div className="w-full max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-slate-300 text-lg mb-6 italic leading-relaxed">
                    {current.reflectionPrompt}
                  </p>
                  <textarea
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    placeholder="Write your pattern notes here..."
                    className="w-full px-8 py-6 bg-slate-950 border-2 border-slate-800 rounded-[2.5rem] text-white placeholder-slate-700 focus:border-blue-500 focus:outline-none resize-none h-32 text-lg"
                  />
                </div>
              )}

              <button 
                onClick={nextLevel}
                className="group flex items-center space-x-5 bg-white text-slate-950 px-12 py-6 rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all shadow-3xl active:scale-95"
              >
                <span>{level < challenges.length - 1 ? 'Next Challenge' : 'See Portfolio'}</span>
                <svg className="w-8 h-8 group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          25% { transform: translateX(-12px); }
          75% { transform: translateX(12px); }
        }
        .animate-shake {
          animation: shake 0.25s ease-in-out 0s 2;
        }
        .animate-in {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default PatternGame;
