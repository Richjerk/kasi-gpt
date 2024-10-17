import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import content from '@astrojs/content'; 

export default defineConfig({
  site: 'https://kasi-gpt-chatbot.netlify.app',
  integrations: [
    preact(),
    sitemap({
      canonicalURL: 'https://kasi-gpt-chatbot.netlify.app'
    }),
    content(), // Include content integration here
  ],
});

