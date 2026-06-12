// Tipo auxiliar para campos bilingües en data.json
export type B<T> = { es: T; en: T };

// ── Interfaces resueltas (monolingual) ──────────────────────────────────────
// Estas son las que usan los componentes. No cambian.

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
  linkedin: string;
  location: string;
  avatar: string;
  yearsExperience: number;
}

export interface ISocial {
  github: string;
}

export interface IAbout {
  summary: string;
}

export interface ITechnology {
  name: string;
  category: 'backend' | 'frontend' | 'devops' | 'cloud' | 'database' | 'other';
}

export interface ISkillItem {
  name: string;
  icon: string;
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

export interface IPortfolioData {
  meta: IMeta;
  hero: IHero;
  about: IAbout;
  technologies: ITechnology[];
  skills: ISkills;
  projects: IProject[];
  experience: IExperience[];
  certificates: ICertificate[];
  social: ISocial;
}

// ── Interfaces raw (bilingüe) ────────────────────────────────────────────────
// Representan la estructura de data.json. Solo se usan en resolve.ts y index.astro.

export interface IRawMeta {
  title: B<string>;
  description: B<string>;
  url: string;
  ogImage: string;
}

export interface IRawHero {
  name: string;
  title: B<string>;
  roles: B<string[]>;
  linkedin: string;
  location: string;
  avatar: string;
  yearsExperience: number;
}

export interface IRawAbout {
  summary: B<string>;
}

export interface IRawSkillItem {
  icon: string;
  name: B<string>;
}

export interface IRawSkills {
  technical: IRawSkillItem[];
  soft: IRawSkillItem[];
}

export interface IRawProject {
  id: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
  hasLink: boolean;
  year: string;
  title: B<string>;
  summary: B<string>;
  description: B<string>;
  role: B<string>;
}

export interface IRawExperience {
  id: string;
  company: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  role: B<string>;
  description: B<string[]>;
}

export interface IRawPortfolioData {
  meta: IRawMeta;
  hero: IRawHero;
  about: IRawAbout;
  technologies: ITechnology[];
  skills: IRawSkills;
  projects: IRawProject[];
  experience: IRawExperience[];
  certificates: ICertificate[];
  social: ISocial;
}
