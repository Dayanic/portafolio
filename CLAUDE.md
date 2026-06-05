# CLAUDE.md — Portafolio Dayane Coronado Guzmán

Este archivo es leído automáticamente por Claude Code al iniciar cada sesión.
Contiene todo el contexto necesario para trabajar en este proyecto sin repetir instrucciones.

---

## Contexto del proyecto

Portafolio personal profesional de tipo one-page para **Dayane Coronado Guzmán**, Ingeniera en Informática.
El documento de referencia principal es `documents/Technical_Specifications.md`.
**Antes de escribir cualquier código, leer ese archivo completo.**

---

## Stack tecnológico

- **Runtime:** Node.js 24 LTS
- **Gestor de paquetes:** pnpm (nunca usar npm ni yarn)
- **Framework:** Astro 6.3.1
- **Estilos:** Tailwind CSS 4
- **Lenguaje:** TypeScript 5 (modo estricto)
- **Deploy:** Vercel con adaptador `@astrojs/vercel`

---

## Reglas obligatorias

### Paquetes
- Usar **siempre pnpm** para instalar, actualizar o eliminar dependencias.
- Nunca sugerir ni ejecutar `npm install` o `yarn add`.
- Comando correcto: `pnpm add <paquete>` / `pnpm remove <paquete>`

### TypeScript
- Modo estricto activado. No usar `any` bajo ninguna circunstancia.
- Todas las interfaces de datos del JSON deben estar en `src/types/portfolio.ts`.
- Los props de cada componente Astro deben estar tipados.

### Contenido
- **Nunca hardcodear texto de contenido** en los componentes.
- Todo el contenido (nombres, descripciones, proyectos, etc.) se lee desde `src/data/es.json` y `src/data/en.json`.
- Los textos fijos de la UI (etiquetas, botones) se leen desde `src/i18n/ui.ts`.

### Estilos
- Usar únicamente clases de Tailwind CSS. No escribir CSS personalizado salvo para las animaciones de scroll definidas en las especificaciones.
- Implementar variantes `dark:` de Tailwind para el modo oscuro.
- Los colores de acento se definen en `tailwind.config.mjs`, no inline.

### Componentes
- Un componente por archivo `.astro`.
- Nomenclatura PascalCase: `Hero.astro`, `ProjectModal.astro`.
- La lógica de datos va en el frontmatter (entre `---`), no en scripts del cliente.
- El JavaScript del lado del cliente se minimiza al máximo.

### Accesibilidad
- Usar HTML semántico en todas las secciones (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`).
- Todos los íconos decorativos llevan `aria-hidden="true"`.
- Todos los botones e íconos funcionales llevan `aria-label` descriptivo.
- El modal de proyectos debe tener focus trap y cerrarse con la tecla Escape.
- Respetar `prefers-reduced-motion` desactivando animaciones cuando corresponda.

### Commits
Usar el estándar Conventional Commits:
- `feat:` para nuevas funcionalidades
- `fix:` para correcciones
- `chore:` para tareas de mantenimiento
- `docs:` para documentación
- `style:` para cambios de estilo sin lógica

---

## Estructura de archivos esperada

```
portafolio/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── avatar.jpg
│   ├── cv-es.pdf
│   ├── cv-en.pdf
│   └── og-image.jpg
├── src/
│   ├── data/
│   │   ├── es.json
│   │   └── en.json
│   ├── types/
│   │   └── portfolio.ts
│   ├── i18n/
│   │   ├── ui.ts
│   │   └── utils.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Technologies.astro
│   │   ├── Skills.astro
│   │   ├── Projects.astro
│   │   ├── ProjectModal.astro
│   │   ├── Experience.astro
│   │   ├── Certificates.astro
│   │   ├── Contact.astro
│   │   ├── ThemeToggle.astro
│   │   └── LangToggle.astro
│   └── pages/
│       ├── index.astro
│       ├── es/
│       │   └── index.astro
│       └── en/
│           └── index.astro
├── .env
├── .env.example
├── .nvmrc
├── CLAUDE.md
├── documents/
│   └── Technical_Specifications.md
├── README.md
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## Paleta de colores

| Token | Dark | Light |
|---|---|---|
| Fondo principal | `#0f172a` slate-900 | `#f8fafc` slate-50 |
| Fondo secundario | `#1e293b` slate-800 | `#ffffff` |
| Fondo tarjetas | `#334155` slate-700 | `#f1f5f9` slate-100 |
| Texto principal | `#f1f5f9` slate-100 | `#0f172a` slate-900 |
| Texto secundario | `#94a3b8` slate-400 | `#475569` slate-600 |
| Acento | `#14b8a6` teal-500 | `#0d9488` teal-600 |
| Borde | `#334155` slate-700 | `#e2e8f0` slate-200 |

---

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PUBLIC_GA_MEASUREMENT_ID` | Measurement ID de Google Analytics 4 (formato: G-XXXXXXXXXX) |

El script de GA4 solo se carga en producción (`import.meta.env.PROD`).

---

## Decisiones pendientes

- [ ] Definir cuál dominio es el principal: `dayanestefania.dev` o `dayanestefania.com`
- [ ] Subir foto de perfil (`public/avatar.jpg`)
- [ ] Subir CV en PDF (`public/cv-es.pdf` y `public/cv-en.pdf`)
- [ ] Completar datos reales en `src/data/es.json` y `src/data/en.json` (actualmente con valores dummy)
- [ ] Configurar Measurement ID de Google Analytics en Vercel

---

## Cómo trabajar con este proyecto

1. Leer `documents/Technical_Specifications.md` antes de cualquier tarea.
2. Respetar la estructura de archivos definida arriba.
3. No asumir nada que no esté en las especificaciones; preguntar antes de decidir.
4. Cada componente debe funcionar de forma aislada y recibir sus datos por props.
5. Probar en modo oscuro y claro antes de dar una tarea por terminada.
6. Verificar que el build `pnpm build` pase sin errores antes de hacer commit.