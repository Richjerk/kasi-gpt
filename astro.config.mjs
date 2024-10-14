import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kasi-gpt-chatbot.netlify.app',
  integrations: [
    preact(),
    sitemap({
      canonicalURL: 'https://kasi-gpt-chatbot.netlify.app'
    })
  ],
});
