// src/content/config.ts
import { z, defineCollection } from 'astro:content';

// Define a schema for blog posts
const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// Define other collections if necessary
export const collections = {
  posts: posts,
};
