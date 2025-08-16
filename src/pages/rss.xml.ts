import { getCollection } from 'astro:content';
import type { APIContext } from 'astro'
import rss from '@astrojs/rss';
import { SITE } from '@/consts/consts';

export async function GET(context: APIContext) {
	try {
		const posts = await getCollection('blog');

		// Newest first
		posts.sort((a, b) => {
			const ad = a.data.pubDate instanceof Date ? a.data.pubDate : new Date(a.data.pubDate as any);
			const bd = b.data.pubDate instanceof Date ? b.data.pubDate : new Date(b.data.pubDate as any);
			return bd.getTime() - ad.getTime();
		});

		return rss({
			title: SITE.NAME,
			description: SITE.DESCRIPTION,
			site: context.site ?? SITE.HREF,

			items: posts.map((post) => ({
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: `/blog/${post.slug}/`,
				categories: post.data.tags ?? [],
				content: post.body,
			})),
		})
	} catch (error) {
		console.error('Error generating RSS feed:', error)
		return new Response('Error generating RSS feed', { status: 500 })
	}
}