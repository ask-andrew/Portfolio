
import React, { useState, useEffect } from 'react';
import { PROJECTS, StoryProject, NETLIFY_DEPLOYMENT_MAP } from '../constants';
import { fetchGitHubRepos } from '../services/github';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [githubProjects, setGithubProjects] = useState<StoryProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'App', 'Data', 'Dashboard'];

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedRepos = await fetchGitHubRepos();
        setGithubProjects(fetchedRepos);
      } catch (err) {
        setError('Failed to load GitHub projects. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  // Map to store final projects, handling merges and preventing duplicates
  const finalProjectsMap = new Map<string, StoryProject>();

  // 1. Add manually defined projects
  PROJECTS.forEach(p => finalProjectsMap.set(p.id, p));

  // 2. Process Netlify-linked projects first (prioritize Netlify URL)
  const processedGithubRepoNames = new Set<string>();
  for (const githubRepoName in NETLIFY_DEPLOYMENT_MAP) {
    const netlifyUrl = NETLIFY_DEPLOYMENT_MAP[githubRepoName];
    // Find GitHub project using a normalized name for robust matching
    const matchingGithubProject = githubProjects.find(gh =>
      gh.title.toLowerCase().replace(/ /g, '-') === githubRepoName.toLowerCase()
    );

    if (matchingGithubProject) {
      // Create a new project entry, using GitHub data but Netlify link/image
      const mergedProject: StoryProject = {
        ...matchingGithubProject,
        id: `netlify-gh-${matchingGithubProject.id}`, 
        link: netlifyUrl,
        imageUrl: `https://image.thum.io/get/width/800/crop/600/${netlifyUrl}`,
        source: 'netlify-linked', 
      };
      finalProjectsMap.set(mergedProject.id, mergedProject);
      processedGithubRepoNames.add(githubRepoName.toLowerCase()); // Mark as processed
    }
  }

  // 3. Add remaining GitHub projects (those not linked to Netlify)
  githubProjects.forEach(gh => {
    const githubRepoNameFormatted = gh.title.toLowerCase().replace(/ /g, '-');
    if (!processedGithubRepoNames.has(githubRepoNameFormatted)) {
      finalProjectsMap.set(gh.id, gh);
    }
  });

  const allProjects: StoryProject[] = Array.from(finalProjectsMap.values());

  // Sort projects: manual projects first, then Netlify-linked, then GitHub-only by ID (latest first)
  allProjects.sort((a, b) => {
    const order = { 'manual': 1, 'netlify-linked': 2, 'github': 3 };
    const orderA = order[a.source || 'github'] || 3;
    const orderB = order[b.source || 'github'] || 3;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return (b.id || '').localeCompare(a.id || '');
  });

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
            I build to answer questions. I prioritize using Netlify for project links and images, while documentation and code-level insights are sourced directly from GitHub.
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
          Scanning for patterns...
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
              {/* Image Section */}
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
                  /* Geometric Placeholder for GitHub-only repos */
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

                {project.source === 'github' && (
                  <div className="absolute bottom-8 right-8 z-20">
                    <span className="flex items-center space-x-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                      <span>Code Repository</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-12 md:p-14 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div>
                    <h4 className="text-blue-500 font-black text-xs uppercase tracking-[0.2em] mb-3">The Purpose</h4>
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
