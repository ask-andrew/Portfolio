
import React, { useState } from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'App', 'Data', 'Dashboard'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
        <div className="max-w-2xl">
          <div className="w-12 h-1 bg-blue-500 mb-6"></div>
          <h2 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Pattern Lab</span></h2>
          <p className="text-slate-400 text-xl md:text-2xl leading-relaxed font-medium">
            I build to answer questions. Each creation here is a solution to a real-world puzzle, turned into a data-driven story.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 bg-slate-900/50 p-2 rounded-[2rem] border border-slate-800 backdrop-blur-md">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3.5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-white text-slate-950 shadow-2xl scale-105' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
        {filteredProjects.map((project, idx) => (
          <div 
            key={project.id} 
            className="group relative flex flex-col bg-slate-900/40 border-2 border-slate-800 rounded-[3.5rem] overflow-hidden hover:border-white/10 transition-all duration-700 hover:shadow-[0_0_80px_rgba(59,130,246,0.1)]"
          >
            {/* Image Section */}
            <div className="h-80 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10`}></div>
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute top-8 left-8 z-20">
                <span className={`px-4 py-2 bg-gradient-to-r ${project.color} text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg`}>
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-12 md:p-14 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <h4 className="text-blue-500 font-black text-xs uppercase tracking-[0.2em] mb-3">The Question</h4>
                  <p className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    "{project.question}"
                  </p>
                </div>
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank"
                    className="flex-shrink-0 w-16 h-16 rounded-[2rem] bg-white text-slate-950 flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group-hover:bg-blue-500 group-hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
              </div>
              
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/5 group-hover:border-white/10 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Background Accent */}
            <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-700`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
