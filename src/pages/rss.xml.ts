import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const blog = await getCollection('blog');

    return rss({
        title: 'Ragib Asif',
        description: 'Blog',
        site: context.site,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            link: `/blog/${post.slug}/`,
        })),
    });
}
