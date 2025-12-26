import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';


const blog = defineCollection({

	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		id: z.number(),
	}),
});

export const collections = { blog };
