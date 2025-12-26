import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('blog');

    return rss({
        title: 'My Blog',
        description: 'Thoughts and stories',
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            id: post.data.id,
            content: post.body,
            link: `/blog/${post.slug}/`,
        })),
    });
}