import { SITE, projects } from '../lib/data';
import { getPosts } from '../lib/posts';

export default function sitemap() {
  const posts = getPosts();
  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/blog`, lastModified: posts[0] ? new Date(posts[0].date) : new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...projects.map((p) => ({ url: `${SITE.url}/work/${p.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 })),
    ...posts.map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: 'yearly', priority: 0.6 })),
  ];
}
