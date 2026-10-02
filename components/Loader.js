'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import Gap from './Gap';

/* Intro curtain: counter + progress line, then the panel slides up. Shown once per browser session. */
export default function Loader() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('ld-done') || matchMedia('(prefers-reduced-motion:reduce)').matches) { root.classList.add('ld-done'); return; }
    try { sessionStorage.setItem('ld', '1'); } catch (e) {}
    const el = document.getElementById('ld'), n = el.querySelector('.ld-n'), o = { v: 0 };
    gsap.from(el.querySelectorAll('.gp-ld b'), { autoAlpha: 0, yPercent: 30, duration: 1.6, stagger: 0.15, ease: 'expo.out' });
    const tl = gsap.timeline({ onComplete: () => { root.classList.add('ld-done'); dispatchEvent(new Event('resize')); } });
    tl.to(o, { v: 100, duration: 1.7, ease: 'power2.inOut', onUpdate: () => { n.textContent = String(Math.round(o.v)).padStart(3, '0'); } })
      .to(el.querySelector('.ld-b i'), { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0)
      .to(el.querySelectorAll('.ld-in > *'), { yPercent: -120, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: 'power3.in' })
      .to(el, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.15');
    return () => tl.kill();
  }, []);
  return (
    <div id="ld" className="ld" aria-hidden="true">
      <Gap className="gp-ld" />
      <div className="ld-in"><span className="ld-t">Sujoy Kumar Paul<em className="pd">.</em></span><span className="ld-r">Portfolio / 2026</span></div>
      <div className="ld-in"><span className="ld-n">000</span><span className="ld-b"><i /></span></div>
    </div>
  );
}
