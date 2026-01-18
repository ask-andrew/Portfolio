
import React, { useState, useEffect } from 'react';
import { PROJECTS, StoryProject, NETLIFY_DEPLOYMENT_MAP } from '../constants';
import { fetchGitHubRepos } from '../services/github';
import { fetchSubstackPosts } from '../services/substack';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [allProjects, setAllProjects] = useState<StoryProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'App', 'Data', 'Dashboard'];

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [githubData, substackData] = await Promise.all([
          fetchGitHubRepos(),
          fetchSubstackPosts()
        ]);

        const finalProjectsMap = new Map<string, StoryProject>();

        // 1. Add manual projects from constants
        PROJECTS.forEach(p => finalProjectsMap.set(p.id, p));

        // 2. Add fetched Substack posts (keeping unique)
        substackData.forEach(p => {
          if (!finalProjectsMap.has(p.id)) finalProjectsMap.set(p.id, p);
        });

        // 3. Process Netlify-linked GitHub projects
        const processedGithubRepoNames = new Set<string>();
        for (const githubRepoName in NETLIFY_DEPLOYMENT_MAP) {
          const netlifyUrl = NETLIFY_DEPLOYMENT_MAP[githubRepoName];
          const matchingGithubProject = githubData.find(gh =>
            gh.title.toLowerCase().replace(/ /g, '-') === githubRepoName.toLowerCase()
          );

          if (matchingGithubProject) {
            const mergedProject: StoryProject = {
              ...matchingGithubProject,
              id: `netlify-gh-${matchingGithubProject.id}`, 
              link: netlifyUrl,
              imageUrl: `https://image.thum.io/get/width/800/crop/600/${netlifyUrl}`,
              source: 'netlify-linked', 
            };
            finalProjectsMap.set(mergedProject.id, mergedProject);
            processedGithubRepoNames.add(githubRepoName.toLowerCase());
          }
        }

        // 4. Add remaining GitHub projects
        githubData.forEach(gh => {
          const githubRepoNameFormatted = gh.title.toLowerCase().replace(/ /g, '-');
          if (!processedGithubRepoNames.has(githubRepoNameFormatted)) {
            finalProjectsMap.set(gh.id, gh);
          }
        });

        const combined = Array.from(finalProjectsMap.values());

        // Sort: Manual highlights (Substack main, etc) -> Netlify Apps -> Substack Posts -> Raw GitHub
        combined.sort((a, b) => {
          const getWeight = (p: StoryProject) => {
            if (p.id === 'substack-main') return 0;
            if (p.source === 'manual') return 1;
            if (p.source === 'netlify-linked') return 2;
            return 3;
          };
          return getWeight(a) - getWeight(b);
        });

        setAllProjects(combined);
      } catch (err) {
        setError('Failed to load project patterns. Please refresh.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, []);

  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
        <div className="max-w-2xl">
          <div className="w-12 h-1 bg-blue-500 mb-6"></div>
          <h2 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Pattern Lab</span></h2>
          <p className="text-slate-400 text-xl md:text-2xl leading-relaxed font-medium">
            I build and write to answer questions. Here is the intersection of my software, data analysis, and strategic prose from Substack.
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

      {loading && (
        <div className="text-center text-blue-400 text-xl py-20 flex flex-col items-center justify-center">
          <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Aggregating patterns from GitHub & Substack...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 text-xl py-20">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col bg-slate-900/40 border-2 border-slate-800 rounded-[3.5rem] overflow-hidden hover:border-white/10 transition-all duration-700 hover:shadow-[0_0_80px_rgba(59,130,246,0.1)]"
            >
              <div className="h-80 relative overflow-hidden bg-slate-950/50">
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10`}></div>
                
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="absolute inset-0 grid-pattern opacity-10"></div>
                    <div className={`w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center animate-spin-slow`}>
                        <div className={`w-16 h-16 bg-gradient-to-br ${project.color || 'from-blue-500 to-cyan-400'} rounded-lg rotate-12`}></div>
                    </div>
                  </div>
                )}
                
                <div className="absolute top-8 left-8 z-20">
                  <span className={`px-4 py-2 bg-gradient-to-r ${project.color || 'from-gray-500 to-gray-400'} text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg`}>
                    {project.category}
                  </span>
                </div>

                {project.id.includes('substack') && (
                  <div className="absolute bottom-8 right-8 z-20">
                    <span className="flex items-center space-x-2 px-3 py-1 bg-orange-600/40 backdrop-blur-md border border-orange-400/20 rounded-full text-[9px] font-bold text-white uppercase tracking-widest">
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                      <span>Substack Insight</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="p-12 md:p-14 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div>
                    <h4 className="text-blue-500 font-black text-xs uppercase tracking-[0.2em] mb-3">
                      {project.id.includes('substack') ? 'The Insight' : 'The Creation'}
                    </h4>
                    <p className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      {project.title}
                    </p>
                  </div>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank"
                      className="flex-shrink-0 w-16 h-16 rounded-[2rem] bg-white text-slate-950 flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group-hover:bg-blue-500 group-hover:text-white"
                      aria-label={`View ${project.title}`}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
