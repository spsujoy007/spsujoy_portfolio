import Link from 'next/link';
import Image from 'next/image';
import { Children } from 'react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Gallery from '../../../components/Gallery';
import PostCard from '../../../components/PostCard';
import { getPosts, getPost } from '../../../lib/posts';
import { SITE } from '../../../lib/data';
import { fmtDate, slugify } from '../../../lib/format';

export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const url = `/blog/${p.slug}`;
  const raster = p.cover && !p.cover.src.endsWith('.svg'); // raster covers become the social image; otherwise a title card is generated
  return {
    title: p.title, description: p.excerpt, keywords: p.tags, alternates: { canonical: url },
    openGraph: { type: 'article', url, title: p.title, description: p.excerpt, siteName: `${SITE.name} Portfolio`, locale: 'en_US', publishedTime: p.date, authors: [SITE.name], tags: p.tags,
      ...(raster ? { images: [{ url: p.cover.src, width: p.cover.w, height: p.cover.h, alt: p.cover.alt }] } : {}) },
    twitter: { card: 'summary_large_image', title: p.title, description: p.excerpt, ...(raster ? { images: [p.cover.src] } : {}) },
  };
}

const text = (c) => Children.toArray(c).map((x) => (typeof x === 'string' ? x : '')).join('');
const md = {
  h2: ({ children }) => <h2 id={slugify(text(children))}>{children}</h2>,
  a: ({ href, children }) => <a href={href} {...(href && href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>,
};

export default async function PostPage({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const posts = getPosts();
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 2);
  const toc = [...p.content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  const ld = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.excerpt, datePublished: p.date, dateModified: p.date,
    keywords: p.tags.join(', '), mainEntityOfPage: `${SITE.url}/blog/${p.slug}`,
    author: { '@type': 'Person', name: SITE.name, url: SITE.url }, publisher: { '@type': 'Person', name: SITE.name },
    ...(p.cover ? { image: p.images.map((i) => SITE.url + i.src) } : {}),
  };
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
    { '@type': 'ListItem', position: 3, name: p.title, item: `${SITE.url}/blog/${p.slug}` } ] };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([ld, crumbs]) }} />
      <div className="w">
        <nav className="bc" aria-label="Breadcrumb"><Link href="/blog">← Blog</Link> / <span>{p.slug}</span></nav>
        <header className="ph">
          <div className="tg rv">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          <h1 className="ph1 sp">{p.title}</h1>
          <p className="lead rv">{p.excerpt}</p>
          <div className="pm rv">
            <span>By {SITE.name}</span><time dateTime={p.date}>{fmtDate(p.date)}</time><span>{p.readMin} min read</span><span>{p.images.length} {p.images.length === 1 ? 'image' : 'images'}</span>
          </div>
        </header>

        {p.cover && (
          <figure className="pimg">
            <Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="(max-width:1120px) 100vw, 1080px" unoptimized={p.cover.src.endsWith('.svg')} />
          </figure>
        )}

        <div className="pbody">
          <aside className="rail" aria-label="Article info">
            <div className="rp" aria-hidden="true"><i /></div>
            {toc.length > 0 && (<><h4>On this page</h4><ol className="toc">{toc.map((t) => <li key={t}><a href={`#${slugify(t)}`}>{t}</a></li>)}</ol></>)}
            <h4>Tags</h4>
            <div className="tg">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </aside>
          <article className="art"><ReactMarkdown components={md}>{p.content}</ReactMarkdown></article>
        </div>
      </div>

      {p.images.length > 1 && (
        <section className="pgal" aria-labelledby="gal-h">
          <div className="w">
            <div className="lab rv" style={{ marginBottom: 28 }}>Gallery — {p.images.length - 1} more {p.images.length === 2 ? 'image' : 'images'}</div>
            <h2 className="sr" id="gal-h">Images from {p.title}</h2>
            <Gallery stories={p.images.slice(1)} label="Image viewer" />
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="mp" aria-labelledby="more-h">
          <div className="w">
            <div className="lab rv" style={{ marginBottom: 28 }}>Keep reading</div>
            <h2 className="sr" id="more-h">More posts</h2>
            <div className="pg">{more.map((x) => <PostCard key={x.slug} p={x} i={posts.indexOf(x)} />)}</div>
          </div>
        </section>
      )}
    </main>
  );
}
