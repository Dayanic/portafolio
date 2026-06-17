# Especificaciones Técnicas — Portafolio Personal
**Dayane Coronado Guzmán**
**Versión:** 2.1.0
**Fecha:** Junio 2026
**Estado:** Implementado y en producción

---

## Tabla de contenidos

1. [Resumen del proyecto](#1-resumen-del-proyecto)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Arquitectura del proyecto](#3-arquitectura-del-proyecto)
4. [Estructura de archivos](#4-estructura-de-archivos)
5. [Estructura del archivo de datos JSON](#5-estructura-del-archivo-de-datos-json)
6. [Secciones del portafolio](#6-secciones-del-portafolio)
7. [Sistema de iconos](#7-sistema-de-iconos)
8. [Internacionalización (i18n)](#8-internacionalización-i18n)
9. [Sistema de temas (Dark / Light)](#9-sistema-de-temas-dark--light)
10. [Animaciones](#10-animaciones)
11. [SEO y metadatos](#11-seo-y-metadatos)
12. [Analytics](#12-analytics)
13. [Configuración de Vercel](#13-configuración-de-vercel)
14. [Variables de entorno](#14-variables-de-entorno)
15. [Convenciones de código](#15-convenciones-de-código)
16. [Flujo de trabajo Git](#16-flujo-de-trabajo-git)
17. [Requisitos no funcionales](#17-requisitos-no-funcionales)
18. [Historial de decisiones](#18-historial-de-decisiones)

---

## 1. Resumen del proyecto

### Descripción
Portafolio personal profesional de tipo *one-page* para Dayane Coronado Guzmán, Ingeniera en Informática. El sitio presenta información profesional, tecnologías con iconos representativos, proyectos, experiencia laboral y certificaciones.

### Objetivos
- Presentar el perfil profesional de forma clara, moderna y accesible.
- Ser completamente mantenible actualizando únicamente `src/data/data.json`, sin tocar código fuente.
- Ofrecer soporte bilingüe (español / inglés) desde el inicio.
- Garantizar rendimiento óptimo (Lighthouse ≥ 95 en todas las métricas).
- Ser desplegable de forma continua desde GitHub hacia Vercel.

### URL del proyecto
- **Repositorio:** `https://github.com/Dayanic/portafolio`
- **Dominio principal:** `https://dayanestefania.com`
- **Dominio secundario:** `dayanestefania.dev` — redirige con 301 permanente al dominio principal (regla en `vercel.json`)

---

## 2. Stack tecnológico

| Herramienta | Versión | Propósito |
|---|---|---|
| Node.js | 24 LTS | Runtime de desarrollo |
| pnpm | latest | Gestor de paquetes (nunca usar npm o yarn) |
| Astro | 6.3.x | Framework principal (SSG) |
| TypeScript | 5.x (incluido en Astro 6) | Tipado estático |
| Tailwind CSS | 4.x | Estilos utilitarios |
| `astro-icon` | 1.1.x | Renderizado build-time de SVG desde Iconify |
| `@iconify-json/devicon` | 1.2.x | Iconos de marca a color para tecnologías |
| `@iconify-json/simple-icons` | 1.2.x | Iconos de marca monocromáticos (`currentColor`) |
| `@iconify-json/mdi` | 1.2.x | Material Design Icons para habilidades |
| `@astrojs/vercel` | latest | Adaptador de despliegue |
| `@astrojs/sitemap` | latest | Generación de sitemap |

### Justificación del stack
- **Astro 6 (SSG):** genera HTML estático en build time, ideal para portafolios. Máximo rendimiento, sin JavaScript innecesario en el cliente.
- **Tailwind CSS 4:** sistema de diseño utilitario sin CSS personalizado, mantenible y consistente.
- **TypeScript:** tipado de los datos del JSON para evitar errores al editar contenido.
- **pnpm:** más eficiente en espacio en disco y velocidad de instalación que npm o yarn.
- **astro-icon:** los iconos se incrustan como SVG inline en build time, sin peticiones externas en runtime.

---

## 3. Arquitectura del proyecto

### Tipo de renderizado
**Static Site Generation (SSG)** — todo el sitio se genera como HTML estático en tiempo de build. No hay servidor en runtime.

### Flujo de datos
```
src/data/data.json   ← archivo único bilingüe
        ↓
src/i18n/resolve.ts  ← resolveData(raw, lang) convierte B<T> → T
        ↓
Astro (build time)   ← genera dos conjuntos de props: es + en
        ↓
HTML estático con data-lang="es" / data-lang="en"
        ↓
CSS oculta la sección inactiva según clase lang-en en <html>
        ↓
Vercel CDN
        ↓
Usuario final
```

### Estrategia bilingüe (SSG sin rutas duplicadas)
El sitio genera **una sola página HTML** que contiene el contenido en ambos idiomas. Cada sección se envuelve en `<div data-lang="es">` y `<div data-lang="en">`. El CSS global oculta el bloque inactivo (`display: none !important`) según la clase `lang-en` en `<html>`. El cambio de idioma no recarga la página — solo alterna la clase y actualiza `localStorage`.

---

## 4. Estructura de archivos

```
portafolio/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── avatar.webp               ← foto profesional
│   ├── robots.txt
│   └── og-image.jpg             ← imagen para Open Graph / redes sociales (pendiente)
│
├── src/
│   ├── data/
│   │   └── data.json            ← archivo único con todo el contenido bilingüe
│   │
│   ├── types/
│   │   └── portfolio.ts         ← interfaces TypeScript: IRaw* (bilingüe) + I* (monolingüe)
│   │
│   ├── i18n/
│   │   ├── ui.ts                ← traducciones de textos fijos de la UI
│   │   ├── utils.ts             ← helper useTranslations(lang)
│   │   └── resolve.ts           ← resolveData(raw, lang): IRawPortfolioData → IPortfolioData
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro     ← layout base: HTML, head, meta, scripts globales
│   │
│   ├── components/
│   │   ├── Header.astro         ← barra de navegación sticky con controles de tema e idioma
│   │   ├── Hero.astro           ← foto, nombre, roles rotativos, badges (experiencia + LinkedIn)
│   │   ├── About.astro          ← sección "Sobre mí"
│   │   ├── Technologies.astro   ← grid de tecnologías con icono representativo por tecnología
│   │   ├── Skills.astro         ← habilidades en grid 2 columnas con chips + icono
│   │   ├── Projects.astro       ← grid de proyectos con modal de detalle al hacer clic
│   │   ├── ProjectModal.astro   ← modal reutilizable de detalle de proyecto
│   │   ├── Experience.astro     ← timeline vertical de experiencia laboral
│   │   ├── Certificates.astro   ← grid de certificaciones
│   │   ├── ThemeToggle.astro    ← botón de cambio dark/light
│   │   └── LangToggle.astro     ← botón de cambio ES/EN
│   │
│   └── pages/
│       └── index.astro          ← página única; renderiza todo el contenido con data-lang
│
├── documents/
│   └── Technical_Specifications.md
├── .env                         ← variables de entorno (no se sube a Git)
├── .env.example                 ← plantilla de variables de entorno (sí se sube a Git)
├── .gitignore
├── .nvmrc                       ← versión de Node.js: 24
├── astro.config.mjs
├── tailwind.config.mjs          ← darkMode: 'class', font Inter, token accent (teal, reservado)
├── tsconfig.json
├── vercel.json
├── pnpm-lock.yaml
└── package.json
```

---

## 5. Estructura del archivo de datos JSON

El portafolio utiliza **un único archivo bilingüe** (`src/data/data.json`). Los campos que varían según idioma se definen con la estructura `{ "es": "...", "en": "..." }`. Los campos compartidos (nombres propios, fechas, URLs) se definen una sola vez.

### Tipo auxiliar B\<T\>

```typescript
export type B<T> = { es: T; en: T };
```

### Interfaces TypeScript (`src/types/portfolio.ts`)

Las interfaces se dividen en dos grupos:

**Interfaces resueltas** (`I*`) — usadas por los componentes. Todos los campos son monolingües.

```typescript
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
  linkedin: string;         // URL al perfil de LinkedIn
  location: string;
  avatar: string;
  yearsExperience: number;
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
  icon: string;             // nombre de icono Iconify, ej: "mdi:sitemap"
}

export interface ISkills {
  technical: ISkillItem[];
  soft: ISkillItem[];
}

export interface IProject {
  id: string;
  title: string;
  summary: string;          // texto corto para la tarjeta
  description: string;      // texto largo para el modal
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
  startDate: string;        // formato "MM/AAAA"
  endDate: string | null;
  current: boolean;
  description: string[];    // array de bullets
}

export interface ICertificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl: string;
}

export interface ISocial {
  github: string;           // reservado para uso futuro
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
```

**Interfaces raw** (`IRaw*`) — representan la estructura de `data.json`. Solo se usan en `resolve.ts` e `index.astro`.

```typescript
export interface IRawHero {
  name: string;
  title: B<string>;
  roles: B<string[]>;
  linkedin: string;
  location: string;
  avatar: string;
  yearsExperience: number;
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
```

### Estructura de `data.json`

```json
{
  "meta": {
    "title":       { "es": "...", "en": "..." },
    "description": { "es": "...", "en": "..." },
    "url": "https://dayanestefania.com",
    "ogImage": "/og-image.jpg"
  },
  "hero": {
    "name": "Dayane Coronado Guzmán",
    "title": { "es": "Ingeniera en Informática", "en": "Computer Engineer" },
    "roles": {
      "es": ["Rol 1", "Rol 2", "Rol 3"],
      "en": ["Role 1", "Role 2", "Role 3"]
    },
    "linkedin": "https://www.linkedin.com/in/dayanecoronado",
    "location": "Santiago, Chile",
    "avatar": "/avatar.webp",
    "yearsExperience": 13
  },
  "about": {
    "summary": { "es": "...", "en": "..." }
  },
  "technologies": [
    { "name": "HTML", "category": "frontend" }
  ],
  "skills": {
    "technical": [
      { "icon": "mdi:sitemap", "name": { "es": "Arquitectura de software", "en": "Software Architecture" } }
    ],
    "soft": [
      { "icon": "mdi:account-group", "name": { "es": "Liderazgo de equipos", "en": "Leadership" } }
    ]
  },
  "projects": [
    {
      "id": "project-1",
      "technologies": ["Tech 1"],
      "liveUrl": "",
      "repoUrl": "",
      "hasLink": false,
      "year": "2024",
      "title":       { "es": "...", "en": "..." },
      "summary":     { "es": "...", "en": "..." },
      "description": { "es": "...", "en": "..." },
      "role":        { "es": "...", "en": "..." }
    }
  ],
  "experience": [
    {
      "id": "exp-1",
      "company": "Empresa S.A.",
      "startDate": "01/2024",
      "endDate": null,
      "current": true,
      "role":        { "es": "Cargo", "en": "Role" },
      "description": {
        "es": ["Logro 1.", "Logro 2."],
        "en": ["Achievement 1.", "Achievement 2."]
      }
    }
  ],
  "certificates": [
    {
      "id": "cert-1",
      "name": "Nombre certificación",
      "issuer": "Entidad emisora",
      "year": "2025",
      "credentialUrl": "https://..."
    }
  ],
  "social": {
    "github": "https://github.com/Dayanic"
  }
}
```

> **Nota:** El campo `social.github` está reservado para uso futuro. Los campos booleanos `hasLink` y `current` controlan visibilidad de elementos en la UI sin necesidad de modificar código.

---

## 6. Secciones del portafolio

El portafolio es **one-page** con scroll suave entre secciones. El orden de renderizado es el siguiente:

| # | ID de sección | Componente | Descripción |
|---|---|---|---|
| 1 | `#hero` | `Hero.astro` | Foto, nombre, roles rotativos, ubicación, badge de experiencia y botón LinkedIn |
| 2 | `#about` | `About.astro` | Párrafo de presentación extendida |
| 3 | `#technologies` | `Technologies.astro` | Grid de tarjetas con icono representativo de cada tecnología |
| 4 | `#skills` | `Skills.astro` | Habilidades técnicas y soft skills en grid 2 columnas con chips + icono |
| 5 | `#projects` | `Projects.astro` | Tarjetas de proyectos con modal de detalle al hacer clic |
| 6 | `#experience` | `Experience.astro` | Timeline vertical de experiencia laboral |
| 7 | `#certificates` | `Certificates.astro` | Grid de certificaciones con link a credencial si aplica |

El pie de página (copyright) se renderiza directamente en `index.astro` tras el cierre de `<main>`, con bloques `data-lang` para cada idioma.

### Hero
- Altura mínima `min-h-[60vh]`.
- Roles rotativos con animación fade (intervalo 3 segundos, script cliente mínimo).
- Badges en fila: badge de años de experiencia + botón de LinkedIn (mismo estilo de pill, con hover).
- El botón de LinkedIn abre el perfil en nueva pestaña con `rel="noopener noreferrer"`.

### Technologies
- Grid responsivo: 2 cols mobile → 3 cols sm → 4 cols lg → 5 cols xl.
- Cada tarjeta muestra el icono de la tecnología (32×32 px) y su nombre.
- Los iconos se resuelven en build time vía `techIconMap` en `Technologies.astro` (ver sección 7).
- Borde visible en dark mode: `dark:border-violet-500/40`.

### Skills
- Dos columnas de chips: Técnicas | Blandas.
- Grid fijo de 2 columnas dentro de cada grupo — todos los chips tienen el mismo ancho.
- Cada chip tiene: icono MDI de 16×16 px + texto. Icono en violet (`text-violet-500 dark:text-violet-400`).
- Borde visible en dark mode: `dark:border-violet-500/40`.

### Experience
- Timeline vertical con línea conectora entre items via `::before` pseudo-element.
- `description` es un array de bullets — cada elemento se renderiza como un `<li>`.
- Borde visible en dark mode: `dark:border-violet-500/40` en cada tarjeta de trabajo.
- El item activo (en zona de lectura) se muestra a opacidad completa; los demás se atenúan a 0.45.

### Comportamiento del modal de proyectos
- Al hacer clic en una tarjeta se abre un modal superpuesto.
- Muestra: título, año, rol, descripción completa, tecnologías y links (si `hasLink: true`).
- Se cierra con botón X, tecla Escape o clic fuera del modal.
- Focus trap activo mientras el modal está abierto.

### Comportamiento de la navegación
- El `Header` es sticky (se mantiene visible al hacer scroll).
- Los enlaces del menú realizan scroll suave hacia cada sección.
- En mobile, el menú colapsa en un botón hamburguesa.
- El idioma activo y el tema seleccionado se persisten en `localStorage`.

---

## 7. Sistema de iconos

### Librería
`astro-icon` v1 + paquetes `@iconify-json/*`. Los iconos se incrustan como SVG inline en build time — sin peticiones a CDN en runtime.

### Paquetes instalados

| Paquete | Prefijo | Uso |
|---|---|---|
| `@iconify-json/devicon` | `devicon:` | Iconos de marca a color para tecnologías (HTML, JS, C#, Git…) |
| `@iconify-json/simple-icons` | `simple-icons:` | Iconos de marca monocromáticos (`currentColor`) — SQL Server, Azure DevOps, JIRA |
| `@iconify-json/mdi` | `mdi:` | Material Design Icons para skills (sitemap, database, puzzle…) |

### Uso en componentes

```astro
import { Icon } from 'astro-icon/components';

<Icon name="devicon:javascript" class="w-8 h-8" />
<Icon name="simple-icons:azuredevops" class="w-8 h-8 text-violet-500 dark:text-violet-400" />
<Icon name="mdi:database" class="w-4 h-4 text-violet-500 dark:text-violet-400" aria-hidden="true" />
```

Los iconos `simple-icons:*` usan `currentColor` y deben recibir explícitamente una clase de color.

### Mapa de iconos — Technologies (`techIconMap`)

| Tecnología | Icono |
|---|---|
| HTML | `devicon:html5` |
| JavaScript | `devicon:javascript` |
| C# | `devicon:csharp` |
| VB.NET | `devicon:visualbasic` |
| Oracle PL/SQL | `devicon:oracle` |
| SQL Server | `simple-icons:microsoftsqlserver` |
| PostgreSQL | `devicon:postgresql` |
| NPM | `devicon:npm-wordmark` |
| REST API | `devicon:swagger` |
| JIRA | `simple-icons:jira` |
| ServiceNow | SVG inline (ver nota abajo) |
| Git / GitHub | `devicon:git` |
| Azure DevOps CI/CD pipelines | `simple-icons:azuredevops` |
| Team Foundation Version Control (TFVC) | `devicon:visualstudio` |
| SVN (Subversion) | `devicon:subversion` |

> **ServiceNow:** No existe icono oficial en ningún paquete Iconify gratuito. Se usa un SVG inline que aproxima su marca: círculo verde (#81b5a1) con anillo blanco y punto central blanco.
> **JIRA:** Se usa `simple-icons:jira` en lugar de `devicon:jira` porque la variante devicon tiene un viewBox de 128×128 con gradientes que causa recorte visual en contenedores pequeños.

### Mapa de iconos — Skills (`icon` en JSON)

| Skill | Icono |
|---|---|
| Arquitectura de software / Software Architecture | `mdi:sitemap` |
| Desarrollo Web / Web development | `mdi:web` |
| Integración de API / API integration | `mdi:api` |
| Optimización de base de datos / Database optimization | `mdi:database` |
| Revisión de calidad de código / Code quality review | `mdi:code-tags-check` |
| Planificación Ágil / Agile planning | `mdi:lightning-bolt` |
| Automatización de procesos / Process automation | `mdi:robot` |
| Optimización de rendimiento / Performance tuning | `mdi:speedometer` |
| Liderazgo de equipos / Leadership | `mdi:account-group` |
| Resolución de problemas / Problem Solving | `mdi:puzzle` |
| Comunicación efectiva / Communication | `mdi:message-text` |
| Colaborativa / Collaboration | `mdi:handshake` |
| Trabajo en equipo multicultural / Multicultural Teamwork | `mdi:earth` |

---

## 8. Internacionalización (i18n)

### Estrategia
El sitio genera **una sola página HTML** con contenido dual. No hay rutas `/es` ni `/en`. El CSS oculta el bloque inactivo y el JS del cliente alterna la clase `lang-en` en `<html>` al cambiar de idioma.

### Idiomas soportados
| Código | Idioma |
|---|---|
| `es` | Español (por defecto) |
| `en` | English |

### Idioma por defecto
Español (`es`). Al cargar por primera vez se detecta `navigator.language`; si comienza por `en` se activa inglés automáticamente. La preferencia se persiste en `localStorage` bajo la clave `preferred-lang`.

### Textos de la UI
Los textos fijos de la interfaz (etiquetas de secciones, botones) se definen en `src/i18n/ui.ts`. Los textos de contenido (proyectos, experiencia, etc.) se leen desde `data.json`.

### Módulo `resolve.ts`
`resolveData(raw: IRawPortfolioData, lang: Lang): IPortfolioData` extrae los campos del idioma solicitado de cada `B<T>` y devuelve un objeto monolingüe listo para pasar a los componentes.

---

## 9. Sistema de temas (Dark / Light)

### Tema por defecto
**Dark mode** al cargar por primera vez.

### Implementación
- Se usa la clase `dark` en el elemento `<html>` para activar el modo oscuro de Tailwind CSS.
- Al cargar la página se ejecuta un script inline (antes del render) que lee `localStorage` bajo la clave `theme` y aplica la clase `dark`. Esto previene el *flash of unstyled content* (FOUC).
- `ThemeToggle.astro` alterna la clase `dark` y guarda la preferencia.

### Paleta de colores

| Token | Dark | Light |
|---|---|---|
| Fondo principal | `#0f172a` slate-900 | `#f8fafc` slate-50 |
| Fondo secundario | `#1e293b` slate-800 | `#ffffff` |
| Fondo tarjetas Tech | `#180028` personalizado | `#ffffff` |
| Fondo chips Skills | `#220038` personalizado | `#f1f5f9` slate-100 |
| Texto principal | `#f1f5f9` slate-100 | `#0f172a` slate-900 |
| Texto secundario | `#94a3b8` slate-400 | `#475569` slate-600 |
| Acento | `violet-400` / `violet-500` | `violet-500` / `violet-600` |
| Borde elementos dark | `violet-500/40` (universal en tarjetas, chips y separadores) | `slate-100` / `slate-200` |

> **Nota:** El `tailwind.config.mjs` define un token `accent` con valor teal como reserva, pero en la implementación actual el color de acento predominante en toda la UI es violet.

---

## 10. Animaciones

### Tipo
**Fade + Slide:** los elementos entran con opacidad 0→1 y se desplazan levemente hacia arriba (translateY) al ingresar al viewport.

### Implementación
API nativa `IntersectionObserver` (sin librerías externas).

```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Parámetros
- **Duración:** 500ms · **Easing:** ease · **Desplazamiento:** 20px · **Threshold:** 0.1
- `prefers-reduced-motion: reduce` desactiva todas las animaciones.

### Animaciones adicionales (Hero)
- El avatar tiene un glow pulsante via `@keyframes` con variantes diferenciadas para dark (intensa) y light (sutil).
- Los roles del Hero rotan con fade cada 3 segundos via script cliente mínimo.

---

## 11. SEO y metadatos

### Metadatos por página
- `<title>`, `<meta name="description">`, Open Graph (title, description, image, url), `<link rel="canonical">`, `<link rel="alternate" hreflang>`.

### Sitemap
Generado automáticamente con `@astrojs/sitemap`. Incluye la URL canónica del sitio.

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://dayanestefania.com/sitemap-index.xml
```

---

## 12. Analytics

### Herramienta
**Google Analytics 4 (GA4)**

### Implementación
- Measurement ID en variable de entorno `PUBLIC_GA_MEASUREMENT_ID`.
- Script inyectado en `BaseLayout.astro` solo en producción (`import.meta.env.PROD`).

### Configuración requerida
1. Crear propiedad GA4 en Google Analytics.
2. Obtener Measurement ID (formato: `G-XXXXXXXXXX`).
3. Agregar en Vercel como variable de entorno.

---

## 13. Configuración de Vercel

### Método de despliegue
CI/CD automático desde GitHub. Cada push a `main` dispara build y despliegue.

### `vercel.json`
```json
{
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install",
  "redirects": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "dayanestefania.dev" }],
      "destination": "https://dayanestefania.com/$1",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options",        "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy",        "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy",     "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy","value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; frame-ancestors 'none';" }
      ]
    }
  ]
}
```

### Variables de entorno en Vercel
| Variable | Entorno | Descripción |
|---|---|---|
| `PUBLIC_GA_MEASUREMENT_ID` | Production | Measurement ID de Google Analytics 4 |

---

## 14. Variables de entorno

### `.env.example` (se sube al repositorio)
```env
# Google Analytics 4 — Measurement ID
# Formato: G-XXXXXXXXXX
PUBLIC_GA_MEASUREMENT_ID=
```

---

## 15. Convenciones de código

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes Astro | PascalCase | `Hero.astro`, `ProjectModal.astro` |
| Archivos TypeScript | camelCase | `portfolio.ts`, `utils.ts` |
| Variables y funciones | camelCase | `resolveData()`, `useTranslations()` |
| Interfaces TypeScript | PascalCase con prefijo `I` | `IProject`, `IExperience`, `ISocial` |
| Interfaces raw bilingüe | PascalCase con prefijo `IRaw` | `IRawHero`, `IRawPortfolioData` |
| Tipo auxiliar bilingüe | `B<T>` | `B<string>`, `B<string[]>` |
| Clases CSS (Tailwind) | kebab-case | `animate-on-scroll` |
| IDs en JSON | kebab-case | `project-1`, `exp-2` |

### Reglas obligatorias
- TypeScript en modo estricto — sin `any`.
- Todo el contenido proviene de `data.json`; nunca hardcodear texto en componentes.
- Solo clases Tailwind; CSS personalizado únicamente para animaciones de scroll y glow del avatar.
- Lógica de datos en el frontmatter de Astro, no en scripts de cliente.
- JavaScript de cliente al mínimo: theme toggle, lang toggle, modal, roles Hero, IntersectionObserver.

---

## 16. Flujo de trabajo Git

### Commits (Conventional Commits)
```
feat:   nueva funcionalidad
fix:    corrección de bug
chore:  mantenimiento (deps, config)
docs:   documentación
style:  cambios visuales sin lógica
```

---

## 17. Requisitos no funcionales

### Rendimiento
- Lighthouse Performance ≥ 95 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO ≥ 95
- FCP < 1.5s · LCP < 2.5s

### Accesibilidad
- HTML semántico (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`).
- Íconos decorativos con `aria-hidden="true"`.
- Botones funcionales con `aria-label` descriptivo.
- Contraste WCAG AA en ambos temas.
- Modal con focus trap y cierre con teclado (Escape).

### Compatibilidad
Chrome, Firefox, Safari, Edge (últimas 2 versiones). Mobile Safari iOS 16+. Chrome for Android.

---

## 18. Historial de decisiones

Esta sección documenta decisiones tomadas durante el desarrollo que no son evidentes desde el código.

| Decisión | Alternativa descartada | Razón |
|---|---|---|
| Acento violet en UI (no teal) | Token `accent` teal del config | Violet ofrece mejor contraste y coherencia visual en el tema oscuro profundo |
| ServiceNow con SVG inline | `simple-icons:now` (wordmark) | El slug `simple-icons:now` renderiza el texto "NOW", no reconocible como ícono de marca |
| `simple-icons:microsoftsqlserver` para SQL Server | `devicon:microsoftsqlserver` | La variante devicon usa gradientes claros invisibles en fondos oscuros y claros |
| `devicon:visualstudio` para TFVC | Ningún ícono específico de TFVC | TFVC es una característica de Visual Studio/Azure DevOps; VS es el ícono más representativo |
| `devicon:swagger` para REST API | `simple-icons:openapiinitiative` | Swagger es más reconocible visualmente; OpenAPI Initiative no tiene ícono gráfico, solo texto |
| `simple-icons:jira` para JIRA | `devicon:jira` | El viewBox 128×128 de devicon:jira con gradientes causa recorte visual en contenedores pequeños |
| Grid 2 columnas fijas en Skills | `flex flex-wrap` | El flex wrap genera filas de ancho irregular según longitud de texto; el grid da alineación uniforme |
| JSON bilingüe único (`data.json`) | Dos archivos separados (`es.json` / `en.json`) | Elimina duplicación de datos compartidos (fechas, URLs, nombres); los campos traducibles usan `B<T>` = `{ es, en }` |
| LinkedIn como badge en Hero | Sección Contact separada | Facilita el acceso al perfil profesional desde el primer vistazo; elimina una sección redundante |
| Sin sección Contact | Cards de email/LinkedIn al final | El email expuesto en la web es vector de spam; LinkedIn basta como punto de contacto profesional |
| `social.github` en JSON (no expuesto en UI) | Eliminar GitHub del JSON | El link puede activarse en el futuro cambiando solo el JSON; no requiere modificar componentes |
| `dayanestefania.com` como dominio principal | `dayanestefania.dev` | `.com` es más universal y memorable para una audiencia profesional general |
| Redirect 301 de `.dev` → `.com` en `vercel.json` | Redirect en Vercel Dashboard | El redirect en código es versionable y reproducible en cualquier entorno de despliegue |
| Pie de página en `index.astro` (no en `BaseLayout`) | Footer en `BaseLayout.astro` | El footer necesita bloques `data-lang` para alternar entre idiomas; BaseLayout no tiene acceso a esa lógica |
| `description` como array en `IExperience` | String único | Permite renderizar logros individuales como bullets independientes sin parsing |

### Pendientes de configuración
- [ ] Subir `og-image.jpg` a `public/`
- [ ] Configurar Measurement ID de Google Analytics en Vercel

---

*Documento actualizado en Junio 2026. Versión 2.1.0.*
*Refleja el estado real de la implementación. Cualquier cambio posterior debe actualizarse aquí.*
