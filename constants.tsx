
import { Project, Experience, Skill, Testimonial } from './types';

export interface StoryProject extends Project {
  question: string;
  color: string;
}

export const PROJECTS: StoryProject[] = [
  {
    id: '1',
    title: 'The Shift Swapper',
    question: 'How do we reclaim 40 hours of manual coordination every month?',
    description: 'A React-based internal tool that replaces chaotic email threads with a clean, logic-driven exchange system. It turns scheduling friction into a collaborative game.',
    category: 'App',
    tags: ['React', 'Operations', 'Efficiency'],
    link: 'https://theshiftswapper.netlify.app/',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/https://theshiftswapper.netlify.app/',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: '2',
    title: 'Library Collection Analytics',
    question: 'Where should we spend our next $10,000 to maximize patron impact?',
    description: 'A deep-dive statistical analysis using R to identify circulation trends. This data story revealed which collections were underperforming and which were "hidden gems" needing more shelf space.',
    category: 'Data',
    tags: ['R', 'Library Science', 'KPIs'],
    link: 'https://rpubs.com/aledet/1344036',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/https://rpubs.com/aledet/1344036',
    color: 'from-amber-400 to-orange-600'
  },
  {
    id: '3',
    title: 'The Sax Shed',
    question: 'Can we visualize the "shape" of a jazz solo before playing a single note?',
    description: 'An interactive lab for musicians. It deconstructs complex chord-scale theory into visual patterns, allowing players to explore the invisible mathematics of improvisation through play.',
    category: 'App',
    tags: ['TypeScript', 'Audio API', 'Jazz Theory'],
    link: 'https://thesaxshed.netlify.app/',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/https://thesaxshed.netlify.app/',
    color: 'from-purple-600 to-pink-500'
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
    color: 'from-indigo-500 to-blue-800'
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
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: '6',
    title: 'Churn Prediction Lab (RPubs)',
    question: 'Can we predict a departure before the customer even thinks of leaving?',
    description: 'A collection of R analyses focused on SaaS health. By identifying "silence patterns" in product usage, we can intervene with surgical precision.',
    category: 'Data',
    tags: ['R', 'Predictive', 'SaaS Health'],
    link: 'https://rpubs.com/aledet',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/https://rpubs.com/aledet',
    color: 'from-rose-500 to-red-400'
  }
];

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
