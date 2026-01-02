
import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Vouched By Peers</h2>
        <div className="w-12 h-1 bg-blue-600"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl flex flex-col justify-between hover:border-blue-500/30 transition-all">
            <div className="mb-6">
              <svg className="w-8 h-8 text-blue-500/20 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z" />
              </svg>
              <p className="text-slate-300 italic leading-relaxed">
                "{t.content}"
              </p>
            </div>
            <div className="flex items-center space-x-4 border-t border-slate-800 pt-6">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-blue-500">
                {t.name[0]}
              </div>
              <div>
                <h4 className="font-bold text-slate-100">{t.name}</h4>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
