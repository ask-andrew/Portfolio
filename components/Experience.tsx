
import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
      </div>
      
      <div className="space-y-12">
        {EXPERIENCES.map((exp, index) => (
          <div key={exp.id} className="relative pl-8 border-l border-slate-800">
            {/* Dot */}
            <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                <p className="text-blue-400 font-medium">{exp.company}</p>
              </div>
              <span className="text-sm font-semibold text-slate-500 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                {exp.period}
              </span>
            </div>
            
            <ul className="space-y-3">
              {exp.highlights.map((item, i) => (
                <li key={i} className="flex items-start text-slate-400 text-sm leading-relaxed">
                  <span className="mr-3 text-blue-500 mt-1.5 flex-shrink-0">
                    <svg className="w-2 h-2 fill-current" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
