
import { Project, Experience, Skill, Testimonial } from './types';

export interface StoryProject extends Project {
  question?: string; // Made optional for dynamically fetched projects
  color?: string;    // Made optional for dynamically fetched projects
}

/**
 * Manually defined projects that are NOT on GitHub or require custom overrides.
 */
export const PROJECTS: StoryProject[] = [
  {
    id: 'substack-main',
    title: 'AskAndrew Substack',
    question: 'Where do patterns meet prose?',
    description: 'Weekly insights on the intersection of strategy, leadership, and efficiency hacking. Finding the unseen rhythms in business and life.',
    category: 'App',
    tags: ['Writing', 'Strategy', 'Insights'],
    link: 'https://askandrew.substack.com/',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/https://askandrew.substack.com/',
    color: 'from-orange-500 to-rose-600',
    source: 'manual'
  },
  {
    id: 'library-shift-swapper-manual',
    title: 'Library Shift Swapper',
    question: 'How do we solve the chaos of student worker scheduling?',
    description: 'A streamlined application for managing library staff shifts, allowing for easy swaps and real-time schedule visibility. Built to reduce administrative friction in high-turnover environments.',
    category: 'App',
    tags: ['React', 'Scheduling', 'Efficiency'],
    link: 'https://library-shift-swapper.netlify.app',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/https://library-shift-swapper.netlify.app',
    color: 'from-blue-400 to-indigo-600',
    source: 'manual'
  },
  {
    id: 'jazz-theory-app-manual',
    title: 'Jazz Theory Explorer',
    question: 'Can we map the infinite patterns of jazz improvisation?',
    description: 'A visual tool for exploring chord-scale relationships and harmonic substitutions in jazz music. Bringing data visualization to the world of musical theory.',
    category: 'App',
    tags: ['Music Tech', 'Theory', 'Interactive'],
    link: 'https://jazz-theory-app.netlify.app',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/https://jazz-theory-app.netlify.app',
    color: 'from-purple-500 to-pink-500',
    source: 'manual'
  },
  {
    id: '4',
    title: '360Brief.com',
    question: 'How can we turn a hundred fragmented pings into a single, actionable brief?',
    description: 'A strategic solution designed to consolidate fragmented streams of communication into one unified brief. It eliminates cross-channel noise, ensuring leadership stays aligned on what actually matters.',
    category: 'Dashboard',
    tags: ['Strategy', 'Leadership', 'GTM'],
    link: 'https://360brief.com',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/https://360brief.com',
    color: 'from-indigo-500 to-blue-800',
    source: 'manual'
  },
  {
    id: '5',
    title: 'Ho-Ho-Holidays Analysis',
    question: 'Does the "Modern Holiday Classic" actually exist, or are we just drowning in quantity?',
    description: 'An 80-year cinematic investigation into the "Frequency of Greatness." This R-driven analysis tests if holiday movies are actually worse over time or simply buried by production volume. Includes deep dives into the 1960s quality desert, box office myths, and identifying which actors truly own the season.',
    category: 'Data',
    tags: ['R', 'Statistics', 'Cinema History'],
    link: 'https://rpubs.com/askandrew/ho-ho-holidays',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/https://rpubs.com/askandrew/ho-ho-holidays',
    color: 'from-green-500 to-emerald-400',
    source: 'manual'
  },
];

/**
 * Map GitHub repository names to their corresponding Netlify deployment URLs.
 */
export const NETLIFY_DEPLOYMENT_MAP: { [githubRepoName: string]: string } = {
  'library-shift-swapper': 'https://library-shift-swapper.netlify.app',
  'jazz-theory-app': 'https://jazz-theory-app.netlify.app',
  'sentiment-analysis-dashboard': 'https://sentiment-analysis-dashboard.netlify.app',
  'churn-prediction-model': 'https://churn-prediction-model.netlify.app',
};


export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marissa Kaufmann',
    role: 'Customer Success at G2',
    content: "Andrew is a visionary leader. I have developed both personally and professionally under his leadership. He is a source of constant knowledge and inspiration."
  },
  {
    id: 't2',
    name: 'Jeremy Levin',
    role: 'Account Manager @ G2',
    content: "Andrew's love for data taught me #efficiency-hacking. He led an initiative to bring data to the fingertips of every employee, developing G2's first QBR Machine."
  },
  {
    id: 't3',
    name: 'Mitch Osborne',
    role: 'AI-Automation & Data Specialist',
    content: "There are managers, and then there are leaders. Andrew is a stellar one. Presentations are never dull when Ledet is on the mic. A flurry of data and great nuggets."
  },
  {
    id: 't4',
    name: 'Anna Zhuk',
    role: 'Senior CSM @ Demandbase',
    content: "Andrew makes meetings as fun as they are productive. He is such an advocate for his team and super comfortable with data. I have learned so much from him."
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    company: 'AskAndrew + 360Brief.com',
    role: 'Founder & Patterns Coach',
    period: '2023 – Present',
    highlights: [
      'Scaling SMB operations by identifying friction patterns in GTM processes.',
      'Individual coaching for high-potential leaders and analysts.',
      'Developing visual tools to simplify complex organizational data.'
    ]
  },
  {
    id: 'exp2',
    company: 'G2.com',
    role: 'Director, Enterprise Customer Success',
    period: '2020 – 2023',
    highlights: [
      'Pioneered #Efficiency-Hacking at G2, saving hundreds of hours in CSM workflows.',
      'Architected the "QBR Machine" (Looker + Gong) to automate data storytelling.',
      'Managed a $18M ARR book with a focus on pattern-based churn prediction.'
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: 'Efficiency Hacking', category: 'Strategy' },
  { name: 'Pattern Recognition', category: 'Strategy' },
  { name: 'R (Tidyverse)', category: 'Data' },
  { name: 'Data Storytelling', category: 'Data' },
  { name: 'Looker / LookML', category: 'Data' },
  { name: 'Conscious Leadership', category: 'Strategy' }
];
