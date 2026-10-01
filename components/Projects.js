'use client';
import { useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Projects({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="acc">
      {items.map((p, i) => {
        const o = open === i;
        return (
          <article className="it rv" key={p.name} data-open={o} style={{ '--d': `${i * 0.12}s` }} suppressHydrationWarning>
            <h3>
              <button aria-expanded={o} aria-controls={`proj-${i}`} onClick={() => { setOpen(o ? -1 : i); setTimeout(() => ScrollTrigger.refresh(), 700); }}>
                <span className="n">0{i + 1}</span><span className="t">{p.name}</span><span className="r">{p.meta}</span><span className="x" aria-hidden="true" />
              </button>
            </h3>
            <div className="pb" id={`proj-${i}`} role="region" aria-label={`${p.name} details`}>
              <div>
                <div className="pi">
                  <span />
                  <div>
                    {p.text.map((t) => <p key={t}>{t}</p>)}
                    {p.contribution && <p><b>My contribution:</b> {p.contribution}</p>}
                  </div>
                  <div>
                    <h4>{p.label}</h4>
                    <div className="tg">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
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
