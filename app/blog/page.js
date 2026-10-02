import BlogList from '../../components/BlogList';
import Gap from '../../components/Gap';
import { SITE } from '../../lib/data';
import { getPosts } from '../../lib/posts';

const description = `Articles by ${SITE.name} on full stack web development: React, Next.js, Node.js, Express, MongoDB and web animation.`;

export const metadata = {
  title: 'Blog',
  description,
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/feed.xml' } },
  openGraph: { type: 'website', url: '/blog', title: `Blog | ${SITE.name}`, description, siteName: `${SITE.name} Portfolio`, locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: `Blog | ${SITE.name}`, description },
};

export default function BlogPage() {
  const posts = getPosts().map(({ content, ...p }) => p);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Blog', name: `${SITE.name} — Blog`, url: `${SITE.url}/blog`, description,
    author: { '@type': 'Person', name: SITE.name, url: SITE.url },
    blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE.url}/blog/${p.slug}`, datePublished: p.date, keywords: p.tags.join(', ') })),
  };
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="w">
        {/* <header className="bh">
          <Gap className="gp-pg" />
          <p className="lab rv">// writing · {posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
          <h1 className="sp">Notes &amp;<br />write-ups<em className="pd">.</em></h1>
          <p className="in rv">Notes on building for the web: code, SEO, animation and the things I learn along the way.</p>
        </header> */}
        {/* Temporarily hidden while the blog is being rebuilt. */}
        {/* <BlogList posts={posts} /> */}
        <section className="bh" aria-labelledby="uc-title">
          <section className="uc" role="region" aria-label="Blog under construction">
            <p className="lab">// under construction</p>
            <div className="uc-body">
              <div>
                <p className="uc-kicker">A better reading space is on the way.</p>
                <h2 id="uc-title">The blog is<br /><em>taking shape.</em></h2>
              </div>
              <p className="uc-copy">I’m refining the writing, layout and details before publishing the next set of notes. Check back soon for practical ideas on building for the web.</p>
            </div>
            <div className="uc-foot"><span>STATUS</span><strong>IN PROGRESS</strong><span className="uc-mark" aria-hidden="true">↗</span></div>
          </section>
        </section>
      </div>
    </main>
  );
}
