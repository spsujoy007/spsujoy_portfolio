'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');
const rm = () => matchMedia('(prefers-reduced-motion:reduce)').matches;
const flip = (t, f) => `translate(${t.left + t.width / 2 - f.left - f.width / 2}px,${t.top + t.height / 2 - f.top - f.height / 2}px) scale(${t.width / f.width})`;

export default function Gallery({ stories, label = 'Story viewer' }) {
  const N = stories.length;
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [cur, setCur] = useState(0);
  const gal = useRef(null), img = useRef(null), th = useRef(null), xb = useRef(null);
  const st = useRef({ zoomed: false, zr: null, dir: 0, tx: 0 });

  const tileRect = (i) => gal.current.children[i].querySelector('img').getBoundingClientRect();
  const instant = (fn) => { const e = img.current; e.classList.add('na'); fn(e); void e.offsetWidth; e.classList.remove('na'); };
  const resetZ = () => { const e = img.current; st.current.zoomed = false; e.classList.remove('zm'); e.style.transformOrigin = ''; e.style.transform = ''; };

  const openAt = (i) => { setCur(i); setSeen(true); setOpen(true); };
  const close = () => {
    const e = img.current;
    if (!rm()) {
      instant(resetZ);
      const t = tileRect(cur), f = e.getBoundingClientRect();
      if (t.bottom > 0 && t.top < innerHeight) e.style.transform = flip(t, f);
      setTimeout(() => img.current && instant(resetZ), 650);
    }
    setOpen(false);
    gal.current.children[cur].focus({ preventScroll: true });
  };
  const go = (n) => {
    const i = (n + N) % N;
    if (i === cur) return;
    const e = img.current, d = i > cur ? 1 : -1;
    st.current.dir = d; e.style.opacity = 0; e.style.translate = `${-d * 30}px 0`;
    setTimeout(() => setCur(i), 230);
  };

  // slide-in after switching image
  useEffect(() => {
    const e = img.current, d = st.current.dir;
    resetZ();
    if (!d) return;
    st.current.dir = 0;
    instant((x) => { x.style.translate = `${d * 30}px 0`; });
    e.style.opacity = 1; e.style.translate = '0 0';
  }, [cur]); // eslint-disable-line react-hooks/exhaustive-deps

  // open: grow from the tile
  useEffect(() => {
    if (!open) return;
    let dead = false;
    document.body.style.overflow = 'hidden';
    xb.current.focus({ preventScroll: true });
    (async () => {
      const e = img.current;
      try { await e.decode(); } catch (err) {}
      if (dead || rm()) return;
      const t = tileRect(cur), f = e.getBoundingClientRect();
      instant((x) => { x.style.transformOrigin = 'center'; x.style.transform = flip(t, f); });
      e.style.transform = '';
    })();
    return () => { dead = true; document.body.style.overflow = ''; };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (open && th.current) th.current.children[cur]?.scrollIntoView({ inline: 'center', block: 'nearest' }); }, [open, cur]);

  // keyboard
  useEffect(() => {
    if (!open) return;
    const k = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(cur + 1);
      else if (e.key === 'ArrowLeft') go(cur - 1);
      else if (e.key === 'Tab' && !document.getElementById('lb').contains(document.activeElement)) { e.preventDefault(); xb.current.focus(); }
    };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const org = (e) => {
    const r = st.current.zr, c = (v) => Math.min(100, Math.max(0, v));
    return `${c((e.clientX - r.left) / r.width * 100)}% ${c((e.clientY - r.top) / r.height * 100)}%`;
  };
  const zoom = (e) => {
    const s = st.current, el = img.current;
    if (!s.zoomed) s.zr = el.getBoundingClientRect();
    s.zoomed = !s.zoomed; el.classList.toggle('zm', s.zoomed);
    el.style.transformOrigin = org(e); el.style.transform = s.zoomed ? 'scale(2.2)' : '';
  };
  const move = (e) => { if (st.current.zoomed && e.pointerType !== 'touch') img.current.style.transformOrigin = org(e); };

  const s = stories[cur];
  return (
    <>
      <div className="gal" ref={gal}>
        {stories.map((x, i) => (
          <button key={x.src} className="gt" aria-label={`View larger: ${x.title}`} onClick={() => openAt(i)} suppressHydrationWarning>
            <span className="fr">
              <Image src={x.src} width={x.w} height={x.h} alt={x.alt} sizes="(max-width:760px) 100vw, 360px" unoptimized={x.src.endsWith('.svg')} />
              <span className="pl" aria-hidden="true">+</span>
              <span className="ov"><b>{x.title}</b><small>View</small></span>
            </span>
          </button>
        ))}
      </div>

      <div id="lb" className={open ? 'show' : ''} role="dialog" aria-modal="true" aria-label={label} aria-hidden={!open}>
        <div className="lt">
          <span>{pad(cur + 1)} / {pad(N)}</span>
          <span className="h">← → navigate · click image to zoom · Esc to close</span>
          <button className="sq" ref={xb} onClick={close}>Close</button>
        </div>
        <div className="lst" onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          onTouchStart={(e) => { st.current.tx = e.touches[0].clientX; }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - st.current.tx; if (Math.abs(dx) > 50 && !st.current.zoomed) go(cur + (dx < 0 ? 1 : -1)); }}>
          <button className="sq nv p" onClick={() => go(cur - 1)} aria-label="Previous story">←</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img id="lbi" ref={img} src={seen ? s.src : undefined} alt={s.alt} onClick={zoom} onPointerMove={move} />
          <button className="sq nv n" onClick={() => go(cur + 1)} aria-label="Next story">→</button>
        </div>
        <div className="cp"><b>{s.title}</b><span>{s.caption}</span></div>
        <div className="th" ref={th}>
          {seen && stories.map((x, i) => (
            <button key={x.src} className={i === cur ? 'a' : ''} style={{ backgroundImage: `url("${x.src}")` }} aria-label={`Go to ${x.title}`} onClick={() => go(i)} />
          ))}
        </div>
      </div>
    </>
  );
}
