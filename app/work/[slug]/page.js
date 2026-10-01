import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SITE, projects, getProject } from '../../../lib/data';

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
const stackOf = (p) => [...p.languages, ...p.frameworks, ...p.other];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const url = `/work/${p.slug}`;
  const title = `${p.name}: ${p.tagline.replace(/\.$/, '')}`;
  const description = `${p.summary}${stackOf(p).length > 1 ? ` Built with ${stackOf(p).slice(0, 6).join(', ')}.` : ''}`;
  const raster = !p.thumb.src.endsWith('.svg'); // raster thumbnails become the social image; otherwise a title card is generated
  return {
    title, description, keywords: [p.name, ...stackOf(p)], alternates: { canonical: url },
    openGraph: { type: 'website', url, title, description, siteName: `${SITE.name} Portfolio`, locale: 'en_US',
      ...(raster ? { images: [{ url: p.thumb.src, width: p.thumb.w, height: p.thumb.h, alt: p.thumb.alt }] } : {}) },
    twitter: { card: 'summary_large_image', title, description, ...(raster ? { images: [p.thumb.src] } : {}) },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.indexOf(p), next = projects[(i + 1) % projects.length];
  const groups = [['Role', [p.role]], ['Languages', p.languages], ['Frameworks', p.frameworks], ['Other', p.other]].filter(([, v]) => v && v.length);
  const ld = [
    { '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.name, headline: p.tagline, description: p.summary, url: `${SITE.url}/work/${p.slug}`,
      keywords: stackOf(p).join(', '), image: SITE.url + p.thumb.src, creator: { '@type': 'Person', name: SITE.name, url: SITE.url } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE.url}/#work` },
      { '@type': 'ListItem', position: 3, name: p.name, item: `${SITE.url}/work/${p.slug}` } ] },
  ];
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="w">
        <nav className="bc" aria-label="Breadcrumb"><Link href="/#work">← Work</Link> / <span>{p.slug}</span></nav>
        <header className="wk-h">
          <p className="lab rv">Project {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</p>
          <h1 className="wk-t sp">{p.name}<em className="pd">.</em></h1>
          <p className="wk-tag rv">{p.tagline}</p>
        </header>
      </div>

      <figure className="wk-hero">
        <Image src={p.thumb.src} alt={p.thumb.alt} fill priority sizes="100vw" unoptimized={p.thumb.src.endsWith('.svg')} />
        <figcaption className="wk-cap">{p.type}</figcaption>
      </figure>

      <div className="w">
        <dl className="wk-meta">
          {groups.map(([k, v]) => (
            <div className="rv" key={k}>
              <dt>{k}</dt>
              <dd>{k === 'Role' ? v[0] : <div className="tg">{v.map((t) => <span key={t}>{t}</span>)}</div>}</dd>
            </div>
          ))}
        </dl>

        <section className="wk-sec" aria-labelledby="ov-h">
          <div className="lab rv">Overview</div>
          <div className="wk-ov rv">
            <h2 className="sr" id="ov-h">About {p.name}</h2>
            {p.overview.map((t) => <p key={t}>{t}</p>)}
            {p.contribution && <p className="d"><b>My contribution:</b> {p.contribution}</p>}
          </div>
        </section>

        <section className="wk-sec" aria-labelledby="how-h">
          <div className="lab rv">How it works</div>
          <div>
            <h2 className="sr" id="how-h">How {p.name} works</h2>
            <ol className="wk-how">
              {p.how.map((s, n) => (
                <li className="rv" key={s.t}><span className="nn" aria-hidden="true">{String(n + 1).padStart(2, '0')}</span><div><h3>{s.t}</h3><p>{s.d}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        {p.links && p.links.length > 0 && (
          <section className="wk-sec" aria-label="Project links">
            <div className="lab rv">Links</div>
            <div className="wk-links rv">{p.links.map((l) => <a className="sq f" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}</div>
          </section>
        )}
      </div>

      <Link className="wk-next" href={`/work/${next.slug}`}>
        <div className="w">
          <span><small>Next project · {String(projects.indexOf(next) + 1).padStart(2, '0')}</small><b>{next.name}</b></span>
          <span className="ar" aria-hidden="true">→</span>
        </div>
      </Link>
    </main>
  );
}
