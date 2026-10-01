import { getPosts } from '../../../lib/posts';
import { SITE } from '../../../lib/data';

export const dynamic = 'force-static';
const esc = (s) => String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

export function GET() {
  const items = getPosts().map((p) => `<item><title>${esc(p.title)}</title><link>${SITE.url}/blog/${p.slug}</link><guid>${SITE.url}/blog/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description>${p.tags.map((t) => `<category>${esc(t)}</category>`).join('')}</item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE.name)} — Blog</title><link>${SITE.url}/blog</link><description>${esc(SITE.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
