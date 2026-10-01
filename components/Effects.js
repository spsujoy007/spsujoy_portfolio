'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);
gsap.config({ nullTargetWarn: false });
const q = (s, c = document) => [...c.querySelectorAll(s)];
let celebrated = false;

/* All GSAP animation lives here. Content is server-rendered; this layer only enhances it. */
export default function Effects() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) { root.classList.remove('js'); const pb = document.getElementById('party'); if (pb) pb.hidden = true; return; }
    root.classList.add('gs');
    const mm = gsap.matchMedia();
    const onEnd = () => { skew(0); tweens.forEach((t) => gsap.to(t, { timeScale: 1, duration: 1.2, overwrite: true })); };
    const tweens = [];
    let skew = () => {};
    const loaderDelay = root.classList.contains('ld-done') ? 0 : 2.6;
    const offs = [];
    const on = (el, ev, fn) => { el.addEventListener(ev, fn); offs.push(() => el.removeEventListener(ev, fn)); };

    const ctx = gsap.context(() => {
      /* 1. Horizontal pinned "Process" section (desktop). Created first so later triggers measure after the pin spacing. */
      mm.add('(min-width: 861px)', () => {
        const sec = document.getElementById('process');
        const track = sec && sec.querySelector('.hz-t'), hz = sec && sec.querySelector('.hz');
        if (!track) return;
        root.classList.add('hz-on');
        const dist = () => parseFloat(getComputedStyle(hz).paddingLeft) + track.scrollWidth - innerWidth + 24;
        const len = () => '+=' + Math.max(dist(), 1) * 1.1;
        const move = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: len, pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1 } });
        gsap.to('.hz-bar i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: len, scrub: true, invalidateOnRefresh: true } });
        q('.hp').forEach((p) => gsap.from(q('.nn,h3,p,.tg', p), { autoAlpha: 0, y: 40, duration: 0.9, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: p, containerAnimation: move, start: 'left 88%', toggleActions: 'play none none reverse' } }));
        return () => root.classList.remove('hz-on');
      });

      /* 2. Hero intro timeline */
      if (document.querySelector('.hero')) {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: loaderDelay });
        tl.from('.lab.hi', { autoAlpha: 0, x: -24, duration: 0.9 }, 0.1);
        q('h1 .hi').forEach((el, i) => {
          const sp = new SplitText(el, { type: 'chars' });
          gsap.set(el, { autoAlpha: 1 });
          tl.from(sp.chars, { yPercent: 125, rotate: 12, duration: 1.3, stagger: 0.045, ease: 'expo.out' }, 0.15 + i * 0.25);
        });
        tl.from('.hg p.hi', { autoAlpha: 0, y: 26, duration: 1 }, 0.95)
          .from('.hg .b.hi', { autoAlpha: 0, y: 26, duration: 1 }, 1.1)
          .from('.meta .hi', { autoAlpha: 0, x: 30, duration: 0.9, stagger: 0.1 }, 1.05);
        q('.shapes i').forEach((el, i) => {
          gsap.from(el, { scale: 0, rotation: -90, duration: 1.4, delay: loaderDelay + 0.3 + i * 0.12, ease: 'expo.out' });
          gsap.to(el, { x: 'random(-30,30)', y: 'random(-30,30)', rotation: 'random(-30,30)', duration: 'random(4,7)', repeat: -1, yoyo: true, repeatRefresh: true, ease: 'sine.inOut' });
          gsap.to(el, { yPercent: -30 * (i + 1), ease: 'none', scrollTrigger: { trigger: 'header', start: 'top top', end: 'bottom top', scrub: true } });
        });
      }

      /* 3. Hero parallax on scroll */
      if (document.querySelector('.hero')) {
        gsap.to('.hero h1', { yPercent: 28, opacity: 0.08, ease: 'none', scrollTrigger: { trigger: 'header', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.hg', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: 'header', start: 'top top', end: 'bottom top', scrub: true } });
      }

      /* 4. Masked line reveal for every section heading */
      q('.sp').forEach((h) => {
        try {
          SplitText.create(h, {
            type: 'lines', mask: 'lines', autoSplit: true,
            onSplit: (self) => {
              gsap.set(h, { visibility: 'visible' });
              return gsap.from(self.lines, { yPercent: 115, duration: 1.1, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
            },
          });
        } catch (e) { gsap.set(h, { visibility: 'visible' }); }
      });

      /* 5. About paragraph: words fill in as you scroll */
      const fill = document.querySelector('.fill');
      if (fill) SplitText.create(fill, { type: 'words', autoSplit: true, onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.18 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: fill, start: 'top 82%', end: 'bottom 50%', scrub: true } }) });

      /* 6. Generic reveals, section rules, counters */
      ScrollTrigger.batch('.rv', { start: 'top 90%', once: true, onEnter: (b) => gsap.fromTo(b, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', overwrite: true, clearProps: 'transform' }) });
      q('.rl').forEach((r) => gsap.from(r, { scaleX: 0, transformOrigin: '0 50%', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: r.parentElement, start: 'top 85%', once: true } }));
      q('.gl b').forEach((el) => {
        const n = +el.dataset.n, o = { v: 0 };
        el.textContent = '0';
        ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => gsap.to(o, { v: n, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); } }) });
      });

      /* 7. Skills list items cascade in */
      q('.sc').forEach((c) => gsap.from(q('li', c), { autoAlpha: 0, x: -24, duration: 0.7, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 85%', once: true } }));

      /* 8. Stories: tiles wipe up */
      ScrollTrigger.batch('.gt', { start: 'top 92%', once: true, onEnter: (b) => gsap.fromTo(b, { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, stagger: 0.12, ease: 'power4.out', clearProps: 'clipPath' }) });

      /* 9. Marquee: two rows, opposite directions, speed reacts to scroll velocity */
      q('.mq .row').forEach((r, i) => tweens.push(gsap.fromTo(r, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, duration: 40, ease: 'none', repeat: -1 })));
      const skewEls = q('.fr,.pc-img');
      if (skewEls.length) skew = gsap.quickTo(skewEls, 'skewY', { duration: 0.5, ease: 'power3' });
      ScrollTrigger.create({ onUpdate: (s) => { skew(gsap.utils.clamp(-5, 5, s.getVelocity() / -350)); const v = 1 + Math.min(7, Math.abs(s.getVelocity()) / 300); tweens.forEach((t) => gsap.to(t, { timeScale: v, duration: 0.3, overwrite: true })); } });
      ScrollTrigger.addEventListener('scrollEnd', onEnd);

      /* Project page: full-bleed hero wipes in from the left, then drifts as you scroll */
      if (document.querySelector('.wk-hero')) {
        gsap.fromTo('.wk-hero', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut', delay: 0.35, clearProps: 'clipPath' });
        gsap.fromTo('.wk-hero img', { scale: 1.2, yPercent: -7 }, { scale: 1.06, yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.wk-hero', start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.from('.wk-cap', { xPercent: -101, duration: 0.9, delay: 1.5, ease: 'power4.out' });
      }

      /* Blog post page */
      if (document.querySelector('.pimg')) {
        gsap.fromTo('.pimg', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.out', delay: 0.2, clearProps: 'clipPath' });
        gsap.fromTo('.pimg img', { yPercent: -7, scale: 1.14 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.pimg', start: 'top bottom', end: 'bottom top', scrub: true } });
      }
      if (document.querySelector('.art')) {
        gsap.to('.rp i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.art', start: 'top 40%', end: 'bottom 70%', scrub: true } });
        ScrollTrigger.batch('.art > *', { start: 'top 92%', once: true, onEnter: (b) => gsap.fromTo(b, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' }) });
      }
      ScrollTrigger.batch('.mp .pc', { start: 'top 92%', once: true, onEnter: (b) => gsap.fromTo(b, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', clearProps: 'transform' }) });

      /* 10. Progress bar, nav hide/show, footer wordmark */
      gsap.to('#sp', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });
      ScrollTrigger.create({ start: 160, end: 'max', onUpdate: (s) => gsap.to('nav', { yPercent: s.direction === 1 ? -100 : 0, duration: 0.4, ease: 'power3.out', overwrite: true }) });
      /* Footer: celebration, drifting marquee, playful wordmark, floating shapes */
      const foot = document.querySelector('footer');
      if (foot) {
        const burst = (from) => {
          if (!from) return;
          const r = from.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          const box = document.createElement('div'); box.className = 'cf'; document.body.appendChild(box);
          const cols = ['var(--ac)', 'var(--ac)', 'var(--fg)', 'var(--dim)'];
          for (let i = 0; i < 44; i++) {
            const el = document.createElement('i'), sz = gsap.utils.random(6, 14, 1);
            el.style.cssText = `width:${sz}px;height:${sz}px;background:${gsap.utils.random(cols)}`;
            box.appendChild(el);
            gsap.timeline({ onComplete: () => el.remove() })
              .set(el, { x: cx, y: cy })
              .to(el, { x: cx + gsap.utils.random(-360, 360), y: cy + gsap.utils.random(-380, -90), rotation: gsap.utils.random(-270, 270), duration: gsap.utils.random(0.6, 1), ease: 'power3.out' })
              .to(el, { y: '+=' + (innerHeight + 200), rotation: '+=' + gsap.utils.random(200, 500), opacity: 0, duration: gsap.utils.random(1.2, 1.9), ease: 'power2.in' });
          }
          gsap.delayedCall(4, () => box.remove());
        };
        const pc = foot.querySelector('.ft-pc');
        if (pc) pc.textContent = '0';
        ScrollTrigger.create({ trigger: '.ft-top', start: 'top 80%', once: true, onEnter: () => {
          if (pc) { const o = { v: 0 }; gsap.to(o, { v: 100, duration: 1.6, ease: 'power2.out', onUpdate: () => { pc.textContent = Math.round(o.v); } }); }
          if (!celebrated) { celebrated = true; gsap.delayedCall(0.6, () => burst(foot.querySelector('.ft-h'))); }
        } });
        const party = document.getElementById('party');
        if (party) on(party, 'click', () => burst(party));
        const top = document.getElementById('totop');
        if (top) on(top, 'click', (e) => { e.preventDefault(); gsap.to(window, { scrollTo: 0, duration: Math.min(2.4, Math.max(1, scrollY / 2500)), ease: 'power4.inOut' }); });

        const fm = foot.querySelector('.ft-mq .row');
        if (fm) {
          const wrap = gsap.utils.wrap(-50, 0);
          let xp = 0, dir = -1, boost = 0;
          const tick = (t, dt) => { boost += (0 - boost) * 0.04; xp += dir * (1 + boost) * dt * 0.0017; gsap.set(fm, { xPercent: wrap(xp) }); };
          gsap.ticker.add(tick); offs.push(() => gsap.ticker.remove(tick));
          ScrollTrigger.create({ onUpdate: (s) => { dir = s.direction === 1 ? -1 : 1; boost = Math.min(7, Math.abs(s.getVelocity()) / 250); } });
        }

        const big = foot.querySelector('.big');
        if (big) {
          const sp = new SplitText(big, { type: 'chars', charsClass: 'ch' });
          gsap.set(sp.chars, { transformOrigin: '50% 100%' });
          gsap.fromTo(sp.chars, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, ease: 'none', scrollTrigger: { trigger: 'footer', start: 'top 90%', end: 'bottom bottom', scrub: true } });
          on(big, 'click', (e) => { const c = e.target.closest('.ch'); if (c) gsap.fromTo(c, { y: 0 }, { y: -70, rotation: gsap.utils.random(-12, 12), yoyo: true, repeat: 1, duration: 0.22, ease: 'power2.out' }); });
          if (matchMedia('(hover: hover)').matches) {
            on(foot, 'pointermove', (e) => sp.chars.forEach((c) => {
              const r = c.getBoundingClientRect(), d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)), k = Math.max(0, 1 - d / 260);
              gsap.to(c, { y: -k * 46, scaleY: 1 + k * 0.18, duration: 0.4, overwrite: 'auto' });
              c.classList.toggle('hot', k > 0.72);
            }));
            on(foot, 'pointerleave', () => sp.chars.forEach((c) => { gsap.to(c, { y: 0, scaleY: 1, duration: 0.8, ease: 'elastic.out(1,0.5)', overwrite: 'auto' }); c.classList.remove('hot'); }));
          }
        }

        const fs = q('.fsh i', foot);
        fs.forEach((el) => gsap.to(el, { x: 'random(-25,25)', y: 'random(-25,25)', rotation: 'random(-40,40)', duration: 'random(4,7)', repeat: -1, yoyo: true, repeatRefresh: true, ease: 'sine.inOut' }));
        if (matchMedia('(hover: hover)').matches) on(foot, 'pointermove', (e) => { const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5; fs.forEach((el, i) => gsap.to(el, { xPercent: nx * 40 * (i + 1), yPercent: ny * 40 * (i + 1), duration: 0.8, overwrite: 'auto' })); });
      }
    });

    /* 11. Magnetic buttons (pointer devices only) */
    mm.add('(hover: hover) and (pointer: fine)', () => {
      const off = q('header .sq, nav .sq, .ft-b .sq').map((b) => {
        const xt = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3.out' }), yt = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3.out' });
        const mv = (e) => { const r = b.getBoundingClientRect(); xt((e.clientX - r.left - r.width / 2) * 0.3); yt((e.clientY - r.top - r.height / 2) * 0.3); };
        const lv = () => { xt(0); yt(0); };
        b.addEventListener('pointermove', mv); b.addEventListener('pointerleave', lv);
        return () => { b.removeEventListener('pointermove', mv); b.removeEventListener('pointerleave', lv); };
      });
      return () => off.forEach((f) => f());
    });

    /* Custom square cursor (pointer devices only) */
    mm.add('(hover: hover) and (pointer: fine)', () => {
      const ring = document.createElement('div'), dot = document.createElement('div');
      ring.className = 'cr'; dot.className = 'cd'; document.body.append(ring, dot);
      gsap.set([ring, dot], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
      const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
      const dx = gsap.quickTo(dot, 'x', { duration: 0.1 }), dy = gsap.quickTo(dot, 'y', { duration: 0.1 });
      let shown = false;
      const mv = (e) => {
        if (!shown) { shown = true; gsap.set([ring, dot], { x: e.clientX, y: e.clientY }); gsap.to([ring, dot], { autoAlpha: 1, duration: 0.3 }); }
        rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
      };
      const over = (e) => {
        const view = e.target.closest && e.target.closest('.gt,.pc-a'), link = e.target.closest && e.target.closest('a,button');
        ring.dataset.l = view ? 'View' : '';
        gsap.to(ring, { scale: view ? 3.4 : link ? 1.7 : 1, rotation: link || view ? 45 : 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
      };
      const out = () => { shown = false; gsap.to([ring, dot], { autoAlpha: 0, duration: 0.2 }); };
      addEventListener('pointermove', mv); addEventListener('pointerover', over); document.documentElement.addEventListener('pointerleave', out);
      return () => { removeEventListener('pointermove', mv); removeEventListener('pointerover', over); document.documentElement.removeEventListener('pointerleave', out); ring.remove(); dot.remove(); };
    });

    const refresh = () => ScrollTrigger.refresh();
    addEventListener('load', refresh);
    if (document.fonts) document.fonts.ready.then(refresh);

    return () => {
      removeEventListener('load', refresh);
      ScrollTrigger.removeEventListener('scrollEnd', onEnd);
      offs.forEach((f) => f()); mm.revert(); ctx.revert();
      root.classList.remove('hz-on', 'gs');
    };
  }, [path]);
  return null;
}
