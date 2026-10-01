'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import PostCard from './PostCard';

export default function BlogList({ posts }) {
  const [tag, setTag] = useState('All');
  const ref = useRef(null);
  const tags = useMemo(() => {
    const m = {};
    posts.forEach((p) => p.tags.forEach((t) => { m[t] = (m[t] || 0) + 1; }));
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [posts]);
  const list = tag === 'All' ? posts : posts.filter((p) => p.tags.includes(tag));

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.pc', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out', clearProps: 'transform', delay: 0.15 });
    }, ref);
    return () => ctx.revert();
  }, [tag]);

  return (
    <>
      <div className="flt" role="group" aria-label="Filter posts by tag">
        {[['All', posts.length], ...tags].map(([t, n]) => (
          <button key={t} className={`chip${tag === t ? ' on' : ''}`} aria-pressed={tag === t} onClick={() => setTag(t)}>{t}<sup>{n}</sup></button>
        ))}
      </div>
      <div className="pg" ref={ref}>
        {list.map((p) => <PostCard key={p.slug} p={p} i={posts.indexOf(p)} featured={tag === 'All' && p === posts[0]} />)}
      </div>
    </>
  );
}
