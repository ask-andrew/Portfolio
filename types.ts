
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'App' | 'Data' | 'Dashboard';
  tags: string[];
  link?: string;
  imageUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  category: 'Data' | 'Strategy' | 'Tools';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
}
