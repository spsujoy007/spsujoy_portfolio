'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Projects({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="acc">
      {items.map((p, i) => {
        const o = open === i;
        const stack = [...p.frameworks, ...p.other].slice(0, 10);
        return (
          <article className="it rv" key={p.slug} data-open={o} suppressHydrationWarning>
            <h3>
              <span className="n">0{i + 1}</span>
              <Link className="t" href={`/work/${p.slug}`}>{p.name}</Link>
              <span className="r">{p.type}</span>
              <button className="x" aria-expanded={o} aria-controls={`proj-${i}`} aria-label={`${o ? 'Collapse' : 'Expand'} ${p.name} preview`}
                onClick={() => { setOpen(o ? -1 : i); setTimeout(() => ScrollTrigger.refresh(), 700); }} />
            </h3>
            <div className="pb" id={`proj-${i}`} role="region" aria-label={`${p.name} preview`}>
              <div>
                <div className="pi">
                  <span />
                  <div>
                    <p>{p.tagline}</p>
                    <p>{p.summary}</p>
                    <Link className="sq f" href={`/work/${p.slug}`}>View project ↗</Link>
                  </div>
                  <div>
                    <h4>{stack.length ? 'Stack' : 'Language'}</h4>
                    <div className="tg">{(stack.length ? stack : p.languages).map((t) => <span key={t}>{t}</span>)}</div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
