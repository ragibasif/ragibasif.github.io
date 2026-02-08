import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    id: z.number().optional(),
  }),
});

export const collections = {
  blog: blog,
};