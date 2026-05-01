import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(['General', 'Pricing', 'Process', 'Timeline']),
    order: z.number(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    publishedAt: z.date(),
    coverImage: z.string(),
    category: z.enum(['Tips', 'Pricing', 'Process', 'Inspiration']),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    location: z.string(),
    services: z.array(z.string()),
    coverImage: z.string(),
    gallery: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    county: z.string().optional(),
    services: z.array(z.string()),
    description: z.string(),
  }),
});

export const collections = { faqs, articles, projects, locations };
