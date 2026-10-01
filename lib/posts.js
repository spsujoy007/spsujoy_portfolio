import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import sizeOf from 'image-size';

/* Posts live in /content/posts/<slug>.md, images in /public/blog/<slug>/ (max 5, first = thumbnail). */
const DIR = path.join(process.cwd(), 'content', 'posts');

function read(file) {
  const slug = file.replace(/\.mdx?$/, '');
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'));
  const images = (data.images || []).slice(0, 5).map((im) => {
    const o = typeof im === 'string' ? { file: im } : im;
    const src = `/blog/${slug}/${o.file}`;
    let w = 1600, h = 1000;
    try { const d = sizeOf(path.join(process.cwd(), 'public', src)); w = d.width; h = d.height; } catch (e) {}
    return { src, w, h, alt: o.alt || `${data.title}`, caption: o.caption || '', title: o.title || o.caption || o.alt || data.title };
  });
  const date = new Date(data.date || Date.now()).toISOString().slice(0, 10);
  const excerpt = data.excerpt || content.replace(/[#>*`\-]/g, '').trim().slice(0, 155);
  return { slug, title: data.title || slug, date, excerpt, tags: data.tags || [], images, cover: images[0] || null, content, draft: !!data.draft,
    readMin: Math.max(1, Math.round(content.trim().split(/\s+/).length / 200)) };
}

export function getPosts() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => /\.mdx?$/.test(f)).map(read).filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}
export const getPost = (slug) => getPosts().find((p) => p.slug === slug);
