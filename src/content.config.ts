import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		id: z.number(),
	}),
});

export const collections = { blog };
