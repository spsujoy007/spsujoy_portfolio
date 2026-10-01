import Link from 'next/link';
import Image from 'next/image';
import { fmtDate } from '../lib/format';

export default function PostCard({ p, i = 0, featured = false }) {
  const H = featured ? 'h2' : 'h3';
  return (
    <article className={`pc${featured ? ' ft' : ''}`} data-tags={p.tags.join('|')}>
      <Link href={`/blog/${p.slug}`} className="pc-a">
        <div className="pc-img">
          {p.cover
            ? <Image src={p.cover.src} alt={p.cover.alt} fill sizes={featured ? '(max-width:900px) 100vw, 640px' : '(max-width:900px) 100vw, 360px'} unoptimized={p.cover.src.endsWith('.svg')} />
            : <div className="pc-ph" aria-hidden="true">{p.title[0]}</div>}
          <span className="pc-n">No. {String(i + 1).padStart(2, '0')}</span>
          <span className="pc-ar" aria-hidden="true">↗</span>
        </div>
        <div className="pc-b">
          <div className="pc-m">
            <time dateTime={p.date}>{fmtDate(p.date)}</time>
            <span>{p.readMin} min read</span>
            <span>{p.images.length} {p.images.length === 1 ? 'image' : 'images'}</span>
          </div>
          <H className="pc-t"><span>{p.title}</span></H>
          <p className="pc-x">{p.excerpt}</p>
          <div className="tg">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
      </Link>
    </article>
  );
}
