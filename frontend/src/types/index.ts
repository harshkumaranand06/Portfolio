export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  tech_stack: string[];
  link?: string;
}

export interface ResumeData {
  name: string;
  tagline: string;
  about: string;
  skills: Skill[];
  projects: Project[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
