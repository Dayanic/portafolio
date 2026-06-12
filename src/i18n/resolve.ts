import type { Lang } from './ui';
import type { B, IRawPortfolioData, IPortfolioData } from '../types/portfolio';

function pick<T>(field: B<T>, lang: Lang): T {
  return field[lang];
}

export function resolveData(raw: IRawPortfolioData, lang: Lang): IPortfolioData {
  return {
    meta: {
      title:       pick(raw.meta.title, lang),
      description: pick(raw.meta.description, lang),
      url:         raw.meta.url,
      ogImage:     raw.meta.ogImage,
    },
    hero: {
      name:            raw.hero.name,
      title:           pick(raw.hero.title, lang),
      roles:           pick(raw.hero.roles, lang),
      linkedin:        raw.hero.linkedin,
      location:        raw.hero.location,
      avatar:          raw.hero.avatar,
      yearsExperience: raw.hero.yearsExperience,
    },
    about: {
      summary: pick(raw.about.summary, lang),
    },
    technologies: raw.technologies,
    skills: {
      technical: raw.skills.technical.map(s => ({ name: pick(s.name, lang), icon: s.icon })),
      soft:      raw.skills.soft.map(s => ({ name: pick(s.name, lang), icon: s.icon })),
    },
    projects: raw.projects.map(p => ({
      id:           p.id,
      title:        pick(p.title, lang),
      summary:      pick(p.summary, lang),
      description:  pick(p.description, lang),
      technologies: p.technologies,
      liveUrl:      p.liveUrl,
      repoUrl:      p.repoUrl,
      hasLink:      p.hasLink,
      year:         p.year,
      role:         pick(p.role, lang),
    })),
    experience: raw.experience.map(e => ({
      id:          e.id,
      company:     e.company,
      role:        pick(e.role, lang),
      startDate:   e.startDate,
      endDate:     e.endDate,
      current:     e.current,
      description: pick(e.description, lang),
    })),
    certificates: raw.certificates,
    social:       raw.social,
  };
}
