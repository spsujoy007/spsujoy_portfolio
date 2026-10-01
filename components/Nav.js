'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  ['About', '/#about', 'about'], ['Work', '/#work', 'work'], ['Skills', '/#skills', 'skills'],
  ['Process', '/#process', 'process'], ['Stories', '/#stories', 'stories'], ['Blog', '/blog', 'blog'],
];
const rm = () => matchMedia('(prefers-reduced-motion:reduce)').matches;

export default function Nav() {
  const path = usePathname();
  const [spy, setSpy] = useState('');
  const [menu, setMenu] = useState(false);
  const [time, setTime] = useState('');
  const ind = useRef(null), mm = useRef(null), refs = useRef({}), first = useRef(true);
  const active = path.startsWith('/blog') ? 'blog' : path.startsWith('/work') ? 'work' : path === '/' ? spy : '';

  // scroll-spy (home page only)
  useEffect(() => {
    if (path !== '/') return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setSpy(e.target.id === 'top' ? '' : e.target.id); }), { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('header#top, section[id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [path]);

  // live clock
  useEffect(() => {
    const f = () => setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
    f(); const i = setInterval(f, 15000); return () => clearInterval(i);
  }, []);

  // sliding indicator
  const moveTo = (id, d = 0.5) => {
    const a = refs.current[id], el = ind.current;
    if (!el) return;
    if (!a) gsap.to(el, { width: 0, duration: rm() ? 0 : d });
    else gsap.to(el, { x: a.offsetLeft + 14, width: a.offsetWidth - 28, duration: rm() ? 0 : d, ease: 'power3.out' });
  };
  useEffect(() => { moveTo(active); }, [active]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const f = () => moveTo(active, 0);
    addEventListener('resize', f);
    if (document.fonts) document.fonts.ready.then(f);
    return () => removeEventListener('resize', f);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  // intro
  useEffect(() => {
    if (rm()) return;
    const t = gsap.fromTo('nav .w > *', { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power4.out', clearProps: 'y' });
    return () => t.kill();
  }, []);

  // mobile menu
  useEffect(() => { setMenu(false); }, [path]);
  useEffect(() => {
    const m = mm.current, d = rm() ? 0 : 1;
    if (first.current) { first.current = false; if (!menu) return; }
    if (menu) {
      document.body.style.overflow = 'hidden';
      gsap.set(m, { visibility: 'visible' });
      gsap.fromTo(m, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7 * d, ease: 'power4.inOut' });
      gsap.fromTo(m.querySelectorAll('.mi'), { yPercent: 110 }, { yPercent: 0, duration: 0.9 * d, stagger: 0.06 * d, ease: 'expo.out', delay: 0.25 * d });
      const k = (e) => { if (e.key === 'Escape') setMenu(false); };
      addEventListener('keydown', k);
      return () => removeEventListener('keydown', k);
    }
    document.body.style.overflow = '';
    gsap.to(m, { clipPath: 'inset(0 0 100% 0)', duration: 0.5 * d, ease: 'power4.inOut', onComplete: () => gsap.set(m, { visibility: 'hidden' }) });
  }, [menu]);

  return (
    <>
      <nav aria-label="Primary">
        <div className="w">
          <Link href="/" className="brand" aria-label="Sujoy Kumar Paul, home">
            <span className="mark">S</span>
            <span><b>Sujoy Paul</b><small>Full Stack Developer</small></span>
          </Link>

          <div className="nlw" onMouseLeave={() => moveTo(active)}>
            <ul>
              {LINKS.map(([t, h, id]) => (
                <li key={id}>
                  <Link href={h} ref={(el) => { refs.current[id] = el; }} className={active === id ? 'act' : ''}
                    aria-current={active === id ? (id === 'blog' ? 'page' : 'location') : undefined}
                    onMouseEnter={() => moveTo(id)} onFocus={() => moveTo(id)} onBlur={() => moveTo(active)}>
                    <span className="nl"><span>{t}</span><span aria-hidden="true">{t}</span></span>
                  </Link>
                </li>
              ))}
            </ul>
            <span className="ni" ref={ind} aria-hidden="true" />
          </div>

          <div className="nr">
            <span className="clk" title="Local time in Vadodara"><i aria-hidden="true" />Vadodara {time || '--:--'} IST</span>
            <ThemeToggle />
            <Link className="sq f cta" href="/#contact">Contact</Link>
            <button className="sq bgr" aria-label="Menu" aria-expanded={menu} aria-controls="mm" onClick={() => setMenu(!menu)}><i /><i /></button>
          </div>
        </div>
      </nav>

      <div id="mm" className="mm" ref={mm} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!menu}>
        <ul>
          {[...LINKS, ['Contact', '/#contact', 'contact']].map(([t, h], i) => (
            <li key={t}><Link className="mi" href={h} onClick={() => setMenu(false)}><small>0{i + 1}</small>{t}</Link></li>
          ))}
        </ul>
        <div className="ft2"><span>Vadodara, India</span><span>{time || '--:--'} IST</span></div>
      </div>
    </>
  );
}
