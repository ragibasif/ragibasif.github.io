import { getCollection } from 'astro:content';
import type { APIContext } from 'astro'
import rss from '@astrojs/rss';
import { SITE } from '@/consts/consts';

export async function GET(context: APIContext) {
	try {
		const posts = await getCollection('blog');

		return rss({
			title: SITE.NAME,
			description: SITE.DESCRIPTION,
			site: context.site ?? SITE.HREF,
			items: posts.map((post) => ({
				...post.data,
				link: `/blog/${post.id}/`,
			})),
		})
	} catch (error) {
		console.error('Error generating RSS feed:', error)
		return new Response('Error generating RSS feed', { status: 500 })
	}
}