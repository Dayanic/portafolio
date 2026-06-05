# Especificaciones Técnicas — Portafolio Personal
**Dayane Coronado Guzmán**
**Versión:** 1.0.0
**Fecha:** Mayo 2026
**Estado:** Aprobado para desarrollo

---

## Tabla de contenidos

1. [Resumen del proyecto](#1-resumen-del-proyecto)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Arquitectura del proyecto](#3-arquitectura-del-proyecto)
4. [Estructura de archivos](#4-estructura-de-archivos)
5. [Estructura del archivo de datos JSON](#5-estructura-del-archivo-de-datos-json)
6. [Secciones del portafolio](#6-secciones-del-portafolio)
7. [Internacionalización (i18n)](#7-internacionalización-i18n)
8. [Sistema de temas (Dark / Light)](#8-sistema-de-temas-dark--light)
9. [Animaciones](#9-animaciones)
10. [SEO y metadatos](#10-seo-y-metadatos)
11. [Analytics](#11-analytics)
12. [Configuración de Vercel](#12-configuración-de-vercel)
13. [Variables de entorno](#13-variables-de-entorno)
14. [Convenciones de código](#14-convenciones-de-código)
15. [Flujo de trabajo Git](#15-flujo-de-trabajo-git)
16. [Requisitos no funcionales](#16-requisitos-no-funcionales)

---

## 1. Resumen del proyecto

### Descripción
Portafolio personal profesional de tipo *one-page* para Dayane Coronado Guzmán, Ingeniera en Informática. El sitio presenta información profesional, tecnologías, proyectos, experiencia laboral, certificaciones y datos de contacto.

### Objetivos
- Presentar el perfil profesional de forma clara, moderna y accesible.
- Ser completamente mantenible actualizando únicamente el archivo `data.json`, sin tocar código fuente.
- Ofrecer soporte bilingüe (español / inglés) desde el inicio.
- Garantizar rendimiento óptimo (Lighthouse ≥ 95 en todas las métricas).
- Ser desplegable de forma continua desde GitHub hacia Vercel.

### URL del proyecto
- **Repositorio:** `https://github.com/Dayanic/portafolio`
- **Dominio principal:** pendiente de definición entre `dayanestefania.dev` y `dayanestefania.com`
- **Dominio secundario:** el no elegido como principal actuará como redirección (configuración pendiente)

---

## 2. Stack tecnológico

| Herramienta | Versión | Propósito |
|---|---|---|
| Node.js | 24 LTS | Runtime de desarrollo |
| pnpm | latest | Gestor de paquetes |
| Astro | 6.3.1 | Framework principal (SSG) |
| TypeScript | 5.x (incluido en Astro 6) | Tipado estático |
| Tailwind CSS | 4.x | Estilos utilitarios |
| Astro i18n (nativo) | — | Internacionalización |
| `@astrojs/vercel` | latest | Adaptador de despliegue |
| `@astrojs/sitemap` | latest | Generación de sitemap |

### Justificación del stack
- **Astro 6 (SSG):** genera HTML estático en build time, ideal para portafolios. Máximo rendimiento, sin JavaScript innecesario en el cliente.
- **Tailwind CSS 4:** sistema de diseño utilitario sin CSS personalizado, mantenible y consistente.
- **TypeScript:** tipado de los datos del JSON para evitar errores al editar contenido.
- **pnpm:** más eficiente en espacio en disco y velocidad de instalación que npm o yarn.
- **Astro i18n nativo:** sin dependencias externas para el soporte de idiomas.

---

## 3. Arquitectura del proyecto

### Tipo de renderizado
**Static Site Generation (SSG)** — todo el sitio se genera como HTML estático en tiempo de build. No hay servidor en runtime.

### Flujo de datos
```
data/
├── es.json   ← contenido en español
└── en.json   ← contenido en inglés
        ↓
Astro (build time)
        ↓
HTML estático generado
        ↓
Vercel CDN
        ↓
Usuario final
```

### Flujo de i18n
```
/          → redirige automáticamente a /es o /en según el navegador
/es        → portafolio en español
/en        → portafolio en inglés
```

---

## 4. Estructura de archivos

```
portafolio/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── avatar.jpg               ← foto profesional (subir manualmente)
│   ├── cv-es.pdf                ← CV en español (subir cuando esté listo)
│   ├── cv-en.pdf                ← CV en inglés (subir cuando esté listo)
│   └── og-image.jpg             ← imagen para Open Graph / redes sociales
│
├── src/
│   ├── data/
│   │   ├── es.json              ← datos del portafolio en español
│   │   └── en.json              ← datos del portafolio en inglés
│   │
│   ├── types/
│   │   └── portfolio.ts         ← interfaces TypeScript para los datos JSON
│   │
│   ├── i18n/
│   │   ├── ui.ts                ← traducciones de textos fijos de la UI
│   │   └── utils.ts             ← helper para obtener el idioma activo
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro     ← layout base: HTML, head, meta, scripts globales
│   │
│   ├── components/
│   │   ├── Header.astro         ← barra de navegación sticky con controles de tema e idioma
│   │   ├── Hero.astro           ← sección principal con foto, nombre, rol y CTAs
│   │   ├── About.astro          ← sección "Sobre mí" con tagline completo
│   │   ├── Technologies.astro   ← grid de tecnologías con niveles de dominio
│   │   ├── Skills.astro         ← habilidades técnicas y soft skills con barras
│   │   ├── Projects.astro       ← grid de proyectos con modal de detalle
│   │   ├── ProjectModal.astro   ← modal reutilizable de detalle de proyecto
│   │   ├── Experience.astro     ← timeline de experiencia laboral
│   │   ├── Certificates.astro   ← grid de certificaciones
│   │   ├── Contact.astro        ← sección de datos de contacto
│   │   ├── ThemeToggle.astro    ← botón de cambio dark/light
│   │   └── LangToggle.astro     ← botón de cambio ES/EN
│   │
│   └── pages/
│       ├── index.astro          ← redirección automática a /es o /en
│       ├── es/
│       │   └── index.astro      ← portafolio en español
│       └── en/
│           └── index.astro      ← portafolio en inglés
│
├── .env                         ← variables de entorno (no se sube a Git)
├── .env.example                 ← plantilla de variables de entorno (sí se sube a Git)
├── .gitignore
├── .nvmrc                       ← versión de Node.js: 24
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── vercel.json
├── pnpm-lock.yaml
└── package.json
```

---

## 5. Estructura del archivo de datos JSON

Cada idioma tiene su propio archivo JSON (`src/data/es.json` y `src/data/en.json`) con la misma estructura. A continuación se define la estructura completa con valores de ejemplo (*dummy*) para que sean reemplazados con información real.

### `src/data/es.json`

```json
{
  "meta": {
    "title": "Dayane Coronado Guzmán — Ingeniera en Informática",
    "description": "Portafolio profesional de Dayane Coronado Guzmán, Technical Project Manager y Senior Backend Developer con más de 7 años de experiencia.",
    "url": "https://dayanestefania.dev",
    "ogImage": "/og-image.jpg"
  },
  "hero": {
    "name": "Dayane Coronado Guzmán",
    "title": "Ingeniera en Informática",
    "roles": [
      "Technical Project Manager",
      "Software Engineering Leader",
      "Senior BackEnd Developer"
    ],
    "location": "Santiago, Chile",
    "avatar": "/avatar.jpg",
    "cv": "/cv-es.pdf",
    "cvAvailable": false
  },
  "about": {
    "summary": "Como Technical Project Manager orientado a resultados, con más de 7 años de experiencia en ingeniería de software y consultoría TI, me especializo en la implementación de soluciones digitales a gran escala en el sector de tecnología para seguros. Mi experiencia abarca la gestión de proyectos de ciclo completo, arquitectura de software y liderazgo de equipos, impulsando la implementación de sistemas robustos en equipos multiculturales en toda América Latina. En Insurance Technology S.A., lideré el despliegue internacional para Everest Insurance, coordinando operaciones en Chile, México y Colombia. He promovido de forma constante mejoras en procesos, estrategias de automatización y estándares de codificación que elevan la calidad del producto y reducen cuellos de botella operativos. Con una sólida base en .NET, PL/SQL, JavaScript y herramientas DevOps (Azure, GitHub), destaco en la intersección entre tecnología y resultados de negocio. Mi estilo de liderazgo se centra en la colaboración interdisciplinaria, el aprendizaje continuo y la entrega de software sin defectos en entornos ágiles."
  },
  "technologies": [
    {
      "name": "TECNOLOGÍA DUMMY 1",
      "level": "experto",
      "category": "backend"
    },
    {
      "name": "TECNOLOGÍA DUMMY 2",
      "level": "experto",
      "category": "backend"
    },
    {
      "name": "TECNOLOGÍA DUMMY 3",
      "level": "intermedio",
      "category": "frontend"
    },
    {
      "name": "TECNOLOGÍA DUMMY 4",
      "level": "intermedio",
      "category": "devops"
    },
    {
      "name": "TECNOLOGÍA DUMMY 5",
      "level": "aprendiendo",
      "category": "cloud"
    }
  ],
  "skills": {
    "technical": [
      {
        "name": "HABILIDAD TÉCNICA DUMMY 1",
        "level": 90
      },
      {
        "name": "HABILIDAD TÉCNICA DUMMY 2",
        "level": 85
      },
      {
        "name": "HABILIDAD TÉCNICA DUMMY 3",
        "level": 80
      },
      {
        "name": "HABILIDAD TÉCNICA DUMMY 4",
        "level": 75
      }
    ],
    "soft": [
      {
        "name": "SOFT SKILL DUMMY 1",
        "level": 95
      },
      {
        "name": "SOFT SKILL DUMMY 2",
        "level": 90
      },
      {
        "name": "SOFT SKILL DUMMY 3",
        "level": 88
      },
      {
        "name": "SOFT SKILL DUMMY 4",
        "level": 85
      }
    ]
  },
  "projects": [
    {
      "id": "project-1",
      "title": "NOMBRE PROYECTO DUMMY 1",
      "summary": "Descripción breve del proyecto para la tarjeta de visualización rápida.",
      "description": "Descripción detallada completa del proyecto. Incluir contexto, problema que resuelve, tu rol, impacto logrado y aprendizajes clave.",
      "technologies": ["TECH 1", "TECH 2", "TECH 3"],
      "liveUrl": "",
      "repoUrl": "",
      "hasLink": false,
      "year": "0000",
      "role": "ROL EN EL PROYECTO"
    },
    {
      "id": "project-2",
      "title": "NOMBRE PROYECTO DUMMY 2",
      "summary": "Descripción breve del proyecto para la tarjeta de visualización rápida.",
      "description": "Descripción detallada completa del proyecto. Incluir contexto, problema que resuelve, tu rol, impacto logrado y aprendizajes clave.",
      "technologies": ["TECH 1", "TECH 2"],
      "liveUrl": "",
      "repoUrl": "",
      "hasLink": false,
      "year": "0000",
      "role": "ROL EN EL PROYECTO"
    },
    {
      "id": "project-3",
      "title": "NOMBRE PROYECTO DUMMY 3",
      "summary": "Descripción breve del proyecto para la tarjeta de visualización rápida.",
      "description": "Descripción detallada completa del proyecto. Incluir contexto, problema que resuelve, tu rol, impacto logrado y aprendizajes clave.",
      "technologies": ["TECH 1", "TECH 2", "TECH 3"],
      "liveUrl": "",
      "repoUrl": "",
      "hasLink": false,
      "year": "0000",
      "role": "ROL EN EL PROYECTO"
    }
  ],
  "experience": [
    {
      "id": "exp-1",
      "company": "EMPRESA DUMMY 1",
      "role": "CARGO DUMMY",
      "startDate": "MM/AAAA",
      "endDate": null,
      "current": true,
      "description": "Descripción breve de responsabilidades y logros en este cargo.",
      "technologies": ["TECH 1", "TECH 2"]
    },
    {
      "id": "exp-2",
      "company": "EMPRESA DUMMY 2",
      "role": "CARGO DUMMY",
      "startDate": "MM/AAAA",
      "endDate": "MM/AAAA",
      "current": false,
      "description": "Descripción breve de responsabilidades y logros en este cargo.",
      "technologies": ["TECH 1", "TECH 2"]
    },
    {
      "id": "exp-3",
      "company": "EMPRESA DUMMY 3",
      "role": "CARGO DUMMY",
      "startDate": "MM/AAAA",
      "endDate": "MM/AAAA",
      "current": false,
      "description": "Descripción breve de responsabilidades y logros en este cargo.",
      "technologies": ["TECH 1", "TECH 2"]
    }
  ],
  "certificates": [
    {
      "id": "cert-1",
      "name": "NOMBRE CERTIFICACIÓN DUMMY 1",
      "issuer": "ENTIDAD EMISORA DUMMY",
      "year": "0000",
      "credentialUrl": ""
    },
    {
      "id": "cert-2",
      "name": "NOMBRE CERTIFICACIÓN DUMMY 2",
      "issuer": "ENTIDAD EMISORA DUMMY",
      "year": "0000",
      "credentialUrl": ""
    },
    {
      "id": "cert-3",
      "name": "NOMBRE CERTIFICACIÓN DUMMY 3",
      "issuer": "ENTIDAD EMISORA DUMMY",
      "year": "0000",
      "credentialUrl": ""
    }
  ],
  "contact": {
    "email": "dayanne.cguzman@gmail.com",
    "linkedin": "https://www.linkedin.com/in/dayanecoronado",
    "github": "https://github.com/Dayanic",
    "showGithub": false
  }
}
```

> **Nota:** El archivo `en.json` tiene la misma estructura exacta pero con todos los textos traducidos al inglés. Los campos `showGithub`, `cvAvailable` y `hasLink` son booleanos que controlan visibilidad sin necesidad de modificar código.

---

## 6. Secciones del portafolio

El portafolio es **one-page** con scroll suave entre secciones. El orden de renderizado es el siguiente:

| # | ID de sección | Componente | Descripción |
|---|---|---|---|
| 1 | `#hero` | `Hero.astro` | Foto, nombre, roles, ubicación, botones de CV y contacto |
| 2 | `#about` | `About.astro` | Párrafo de presentación extendida |
| 3 | `#technologies` | `Technologies.astro` | Grid de tecnologías con indicador de nivel |
| 4 | `#skills` | `Skills.astro` | Habilidades técnicas y soft skills con barras de progreso |
| 5 | `#projects` | `Projects.astro` | Tarjetas de proyectos con modal de detalle al hacer clic |
| 6 | `#experience` | `Experience.astro` | Timeline vertical de experiencia laboral |
| 7 | `#certificates` | `Certificates.astro` | Grid de certificaciones con link a credencial si aplica |
| 8 | `#contact` | `Contact.astro` | Email, LinkedIn y GitHub (opcional) con íconos |

### Comportamiento de la navegación
- El `Header` es sticky (se mantiene visible al hacer scroll).
- Los enlaces del menú realizan scroll suave hacia cada sección.
- En mobile, el menú colapsa en un botón hamburguesa.
- El idioma activo y el tema seleccionado se persisten en `localStorage`.

### Comportamiento del modal de proyectos
- Al hacer clic en una tarjeta de proyecto se abre un modal superpuesto.
- El modal muestra: título, año, rol, descripción completa, tecnologías y links (si `hasLink: true`).
- Se cierra con botón X, tecla Escape o clic fuera del modal.
- No navega a otra página; mantiene al usuario en el one-page.

---

## 7. Internacionalización (i18n)

### Estrategia
Se utiliza el sistema de i18n nativo de Astro 6 con rutas basadas en prefijos de idioma.

### Idiomas soportados
| Código | Idioma | Ruta |
|---|---|---|
| `es` | Español | `/es` |
| `en` | English | `/en` |

### Idioma por defecto
Español (`es`). La ruta raíz `/` redirige automáticamente según el idioma del navegador del usuario (`navigator.language`). Si el idioma del navegador no es español ni inglés, se redirige a `/es`.

### Textos de la UI
Los textos fijos de la interfaz (etiquetas de secciones, botones, mensajes) se definen en `src/i18n/ui.ts` como un objeto TypeScript tipado. Los textos de contenido (proyectos, experiencia, etc.) se leen desde los archivos JSON de datos.

### Cambio de idioma
- El componente `LangToggle.astro` muestra el idioma opuesto al activo (`ES` / `EN`).
- Al cambiar de idioma navega a la ruta equivalente en el otro idioma (`/es` ↔ `/en`).
- El idioma preferido se guarda en `localStorage` bajo la clave `preferred-lang`.

---

## 8. Sistema de temas (Dark / Light)

### Tema por defecto
**Dark mode** al cargar por primera vez.

### Implementación
- Se usa la clase `dark` en el elemento `<html>` para activar el modo oscuro de Tailwind CSS.
- Al cargar la página se ejecuta un script inline (antes del render) que lee `localStorage` bajo la clave `theme` y aplica la clase `dark` si corresponde. Esto previene el *flash of unstyled content* (FOUC).
- El componente `ThemeToggle.astro` alterna la clase `dark` en `<html>` y guarda la preferencia en `localStorage`.

### Paleta de colores
| Token | Dark | Light |
|---|---|---|
| Fondo principal | `#0f172a` (slate-900) | `#f8fafc` (slate-50) |
| Fondo secundario | `#1e293b` (slate-800) | `#ffffff` |
| Fondo tarjetas | `#334155` (slate-700) | `#f1f5f9` (slate-100) |
| Texto principal | `#f1f5f9` (slate-100) | `#0f172a` (slate-900) |
| Texto secundario | `#94a3b8` (slate-400) | `#475569` (slate-600) |
| Acento | `#14b8a6` (teal-500) | `#0d9488` (teal-600) |
| Borde | `#334155` (slate-700) | `#e2e8f0` (slate-200) |

---

## 9. Animaciones

### Tipo seleccionado
**Fade + Slide combinado:** los elementos entran con opacidad de 0 a 1 y se desplazan levemente hacia arriba (translateY) al ingresar al viewport.

### Implementación
Se usa la API nativa `IntersectionObserver` del navegador (sin librerías externas) para detectar cuando un elemento entra en el viewport y aplicar una clase CSS que activa la transición.

```css
/* Estado inicial (antes de entrar al viewport) */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Estado final (al entrar al viewport) */
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Parámetros
- **Duración:** 500ms
- **Easing:** `ease` (suave, sin rebote)
- **Desplazamiento:** 20px (sutil, no distrae)
- **Threshold:** 0.1 (se activa cuando el 10% del elemento es visible)
- **Respeto a preferencias de accesibilidad:** si el usuario tiene `prefers-reduced-motion: reduce`, las animaciones se desactivan completamente.

---

## 10. SEO y metadatos

### Metadatos por página
Cada página (`/es` y `/en`) tendrá metadatos individuales definidos desde el JSON:
- `<title>`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta property="og:image">` → `/og-image.jpg`
- `<meta property="og:url">`
- `<link rel="canonical">`
- `<link rel="alternate" hreflang="es">`
- `<link rel="alternate" hreflang="en">`

### Sitemap
Generado automáticamente con `@astrojs/sitemap` en build time. Incluye las rutas `/es` y `/en`.

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://dayanestefania.dev/sitemap-index.xml
```

---

## 11. Analytics

### Herramienta
**Google Analytics 4 (GA4)**

### Implementación
- El Measurement ID de GA4 se almacena en una variable de entorno `PUBLIC_GA_MEASUREMENT_ID`.
- El script de GA4 se inyecta en el `<head>` del `BaseLayout.astro` únicamente en producción (`import.meta.env.PROD`).
- En desarrollo local el script no se carga para no contaminar las métricas reales.

### Configuración requerida
1. Crear propiedad GA4 en Google Analytics.
2. Obtener el Measurement ID (formato: `G-XXXXXXXXXX`).
3. Agregar el ID en Vercel como variable de entorno `PUBLIC_GA_MEASUREMENT_ID`.

---

## 12. Configuración de Vercel

### Método de despliegue
**CI/CD automático desde GitHub.** Cada push a la rama `main` dispara un build y despliegue automático en Vercel.

### Configuración `vercel.json`
```json
{
  "framework": "astro",
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install",
  "outputDirectory": "dist",
  "redirects": [
    {
      "source": "/",
      "destination": "/es",
      "permanent": false
    }
  ]
}
```

> **Nota sobre dominios:** La configuración de cuál dominio (`dayanestefania.dev` o `dayanestefania.com`) actuará como principal y cuál como redirección se realizará directamente desde el panel de Vercel una vez tomada la decisión. No requiere cambios en el código.

### Variables de entorno en Vercel
| Variable | Entorno | Descripción |
|---|---|---|
| `PUBLIC_GA_MEASUREMENT_ID` | Production | Measurement ID de Google Analytics 4 |

---

## 13. Variables de entorno

### `.env.example` (se sube al repositorio)
```env
# Google Analytics 4 — Measurement ID
# Formato: G-XXXXXXXXXX
PUBLIC_GA_MEASUREMENT_ID=
```

### `.env` (NO se sube al repositorio — está en .gitignore)
```env
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 14. Convenciones de código

### Nombrado
| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes Astro | PascalCase | `Hero.astro`, `ProjectModal.astro` |
| Archivos TypeScript | camelCase | `portfolio.ts`, `utils.ts` |
| Variables y funciones | camelCase | `getLanguageFromUrl()` |
| Interfaces TypeScript | PascalCase con prefijo `I` | `IProject`, `IExperience` |
| Clases CSS (Tailwind) | kebab-case | `animate-on-scroll` |
| IDs en JSON | kebab-case | `project-1`, `exp-2` |

### TypeScript
- Modo estricto habilitado (`"strict": true` en `tsconfig.json`).
- Todas las interfaces de datos del JSON deben estar definidas en `src/types/portfolio.ts`.
- No se usa `any`. En casos excepcionales, se usa `unknown` con validación.

### Astro
- Los componentes reciben props tipados con interfaces TypeScript.
- La lógica de datos se procesa en el frontmatter (entre `---`), no en el cliente.
- El JavaScript del cliente se minimiza al máximo; solo se usa para interacciones imprescindibles (toggle de tema, toggle de idioma, modal, animaciones).

### Tailwind CSS
- No se escribe CSS personalizado salvo para las animaciones de scroll (definidas en una clase global).
- Se usan las clases `dark:` de Tailwind para el modo oscuro.
- Las clases de color de acento se centralizan en `tailwind.config.mjs` como colores personalizados.

---

## 15. Flujo de trabajo Git

### Ramas
| Rama | Propósito |
|---|---|
| `main` | Producción. Cada push dispara deploy en Vercel. |
| `develop` | Rama de integración durante el desarrollo. |
| `feature/*` | Ramas para funcionalidades individuales. |

### Flujo recomendado
```
feature/hero-section
        ↓ Pull Request
     develop
        ↓ Pull Request (cuando el sitio está listo)
       main
        ↓ Deploy automático
      Vercel
```

### Commits
Usar el estándar **Conventional Commits**:
```
feat: agregar sección de proyectos con modal
fix: corregir scroll en mobile para el header sticky
chore: actualizar dependencias
docs: actualizar README con instrucciones de despliegue
style: ajustar espaciado en sección hero
```

---

## 16. Requisitos no funcionales

### Rendimiento
- Lighthouse Performance: ≥ 95
- Lighthouse Accessibility: ≥ 95
- Lighthouse Best Practices: ≥ 95
- Lighthouse SEO: ≥ 95
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s

### Accesibilidad
- HTML semántico en todas las secciones (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`).
- Todos los íconos decorativos tienen `aria-hidden="true"`.
- Todos los íconos funcionales (botones) tienen `aria-label` descriptivo.
- Contraste de color mínimo WCAG AA en ambos temas.
- Animaciones desactivadas si el usuario tiene `prefers-reduced-motion: reduce`.
- El modal de proyectos maneja correctamente el foco (`focus trap`) y cierre con teclado.

### Compatibilidad de navegadores
- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)
- Mobile Safari (iOS 16+)
- Chrome for Android (últimas 2 versiones)

### Diseño responsivo
- Mobile first.
- Breakpoints de Tailwind estándar: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
- El layout en mobile es de una columna. En desktop el hero y algunas secciones utilizan múltiples columnas.

---

*Documento generado en Mayo 2026. Versión 1.0.0.*
*Cualquier cambio en los requisitos debe reflejarse en este documento antes de modificar el código.*
