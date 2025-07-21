// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

import node from "@astrojs/node";
import clerk from "@clerk/astro";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [alpinejs(),clerk()],
  adapter: node({ mode: "standalone" }),
  i18n: {
    locales: ["es", "en", "it"],
    defaultLocale: "en",
  },
  output: "server"
});