
import React, { useState, useEffect } from 'react';
import { PROJECTS, StoryProject, NETLIFY_DEPLOYMENT_MAP } from '../constants';
import { fetchGitHubRepos } from '../services/github';
import { fetchSubstackPosts } from '../services/substack';

const Projects: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<StoryProject[]>([]);
  const [moreProjects, setMoreProjects] = useState<StoryProject[]>([]);
  const [substackPosts, setSubstackPosts] = useState<StoryProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [githubData, substackData] = await Promise.all([
          fetchGitHubRepos(),
          fetchSubstackPosts()
        ]);

        // 1. Featured Projects (Manual ones from constants)
        setFeaturedProjects(PROJECTS);

        // 2. Substack Posts
        setSubstackPosts(substackData);

        // 3. More Projects (GitHub filtered)
        // Ensure we don't duplicate featured projects if they also appear in GitHub
        const featuredTitles = new Set(PROJECTS.map(p => p.title.toLowerCase()));
        const filteredGithub = githubData.filter(gh => !featuredTitles.has(gh.title.toLowerCase()));
        setMoreProjects(filteredGithub);

      } catch (err) {
        setError('Failed to load projects. Please refresh.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-blue-400 text-xl py-20 flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Building the showroom...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-32">
      {/* SECTION 1: FEATURED WORK */}
      <section id="featured-work">
        <div className="mb-16">
          <div className="w-12 h-1 bg-blue-500 mb-6"></div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Builds</span></h2>
          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
            High-impact solutions focused on efficiency, data visualization, and organizational strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featuredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col bg-slate-900/40 border-2 border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]"
            >
              <div className="h-72 relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center text-slate-800">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                {project.imageUrl && (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 relative z-10"
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).parentElement?.firstElementChild?.remove();
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-20"></div>
                
                <div className="absolute top-6 left-6 flex gap-2">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-slate-400 mb-8 flex-1 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-4">
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank"
                      className="px-6 py-3 bg-white text-slate-950 rounded-xl font-bold text-sm hover:bg-blue-500 hover:text-white transition-all shadow-lg"
                    >
                      Live Demo
                    </a>
                  )}
                  {/* For manual projects that are also on GH, we could add a GH link if available, 
                      but for now let's focus on the primary link provided in constants. */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: MORE PROJECTS (GITHUB) */}
      <section id="more-projects" className="pt-12 border-t border-slate-800/50">
        <div className="mb-12">
          <h3 className="text-3xl font-bold mb-4">Technical Depth</h3>
          <p className="text-slate-400">Curated repositories showcasing specialized technical implementations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moreProjects.map((repo) => (
            <div 
              key={repo.id}
              className="p-8 bg-slate-900/30 border border-slate-800 rounded-3xl hover:border-slate-700 transition-colors flex flex-col group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
                  {repo.tags[0] || 'Code'}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{repo.title}</h4>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed line-clamp-3">
                {repo.description}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {repo.tags[1] || 'Technical'}
                </span>
                <a 
                  href={repo.link} 
                  target="_blank"
                  className="text-xs font-bold text-white hover:text-blue-400 flex items-center transition-colors"
                >
                  View Source 
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: THINKING (SUBSTACK) */}
      <section id="thinking" className="pt-12">
        <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-12 md:p-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-4 flex items-center">
                Strategic Thinking
                <span className="ml-4 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                  Substack Feed
                </span>
              </h3>
              <p className="text-slate-400 max-w-xl">
                Weekly deep-dives into efficiency hacking, leadership patterns, and the intersection of data and strategy.
              </p>
            </div>
            <a 
              href="https://askandrew.substack.com" 
              target="_blank"
              className="text-blue-400 font-bold hover:text-blue-300 transition-colors inline-flex items-center"
            >
              Explore all posts
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {substackPosts.slice(0, 4).map((post) => (
              <a 
                key={post.id}
                href={post.link}
                target="_blank"
                className="group flex gap-6 items-start p-6 rounded-2xl hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                   <img 
                    src={post.imageUrl} 
                    alt="" 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
