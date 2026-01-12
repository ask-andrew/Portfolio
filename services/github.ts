
import { StoryProject } from '../constants'; // Import StoryProject from constants

const GITHUB_USERNAME = 'ask-andrew';
// Add any repository names you want to exclude from your portfolio
const GITHUB_EXCLUDE_REPOS = ['andrew-ledet-portfolio']; 

const colors = [
  'from-blue-500 to-cyan-400',
  'from-amber-400 to-orange-600',
  'from-purple-600 to-pink-500',
  'from-indigo-500 to-blue-800',
  'from-green-500 to-emerald-400',
  'from-rose-500 to-red-400',
];

export const fetchGitHubRepos = async (): Promise<StoryProject[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=100`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    const data = await response.json();

    return data
      .filter((repo: any) => !repo.fork && !GITHUB_EXCLUDE_REPOS.includes(repo.name))
      .map((repo: any): StoryProject => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        let category: 'App' | 'Data' | 'Dashboard' = 'App'; // Default category
        const topics = repo.topics || [];
        if (topics.includes('data-analysis') || topics.includes('r') || topics.includes('statistics') || repo.language === 'R') {
            category = 'Data';
        } else if (topics.includes('dashboard') || topics.includes('visualization')) {
            category = 'Dashboard';
        }

        const title = repo.name.replace(/-/g, ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const description = repo.description || 'A project from my GitHub repository.';
        const question = `Exploring: "${description.substring(0, 70)}${description.length > 70 ? '...' : ''}"`;
        const tags = topics.length > 0 ? topics.map((tag: string) => tag.replace(/-/g, ' ')) : (repo.language ? [repo.language] : []);

        return {
          id: `gh-${repo.id}`, // Prefix to avoid conflicts with manual IDs
          title: title,
          question: question,
          description: description,
          category: category,
          tags: tags,
          link: repo.html_url,
          imageUrl: `https://image.thum.io/get/width/800/crop/600/${repo.html_url}`,
          color: randomColor,
          source: 'github',
        };
      })
      .sort((a: StoryProject, b: StoryProject) => (b.id || '').localeCompare(a.id || '')); // Sort by ID (latest GitHub IDs first)
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error);
    return [];
  }
};
