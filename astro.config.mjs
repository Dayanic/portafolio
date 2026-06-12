import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://dayanestefania.com',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
