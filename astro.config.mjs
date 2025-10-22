// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enables server-side rendering for API routes
  vite: {
    plugins: [tailwindcss()]
  }
});