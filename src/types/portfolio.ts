export interface IMeta {
  title: string;
  description: string;
  url: string;
  ogImage: string;
}

export interface IHero {
  name: string;
  title: string;
  roles: string[];
  location: string;
  avatar: string;
  cv: string;
  cvAvailable: boolean;
}

export interface IAbout {
  summary: string;
}

export interface ITechnology {
  name: string;
  level: 'experto' | 'intermedio' | 'aprendiendo' | 'expert' | 'intermediate' | 'learning';
  category: 'backend' | 'frontend' | 'devops' | 'cloud' | 'database' | 'other';
}

export interface ISkillItem {
  name: string;
  level: number;
}

export interface ISkills {
  technical: ISkillItem[];
  soft: ISkillItem[];
}

export interface IProject {
  id: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
  hasLink: boolean;
  year: string;
  role: string;
}

export interface IExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string[];
}

export interface ICertificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl: string;
}

export interface IContact {
  email: string;
  linkedin: string;
  github: string;
  showGithub: boolean;
}

export interface IPortfolioData {
  meta: IMeta;
  hero: IHero;
  about: IAbout;
  technologies: ITechnology[];
  skills: ISkills;
  projects: IProject[];
  experience: IExperience[];
  certificates: ICertificate[];
  contact: IContact;
}
