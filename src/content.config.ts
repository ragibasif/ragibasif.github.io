import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: () =>
		z.object({
			title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
		}),
});

export const collections = { blog };
