---
title: "Scroll animations with GSAP ScrollTrigger"
date: 2026-09-12
excerpt: "How to build smooth, purposeful scroll effects with GSAP and ScrollTrigger without hurting accessibility or performance."
tags: [GSAP, Animation, Frontend]
images:
  - file: cover.svg
    alt: "Animation with purpose"
    caption: "Animation with purpose"
---

Scroll animation can make a page feel alive, but only when it guides attention instead of distracting from the content. GSAP and its ScrollTrigger plugin make that easy to control.

## Start with one idea per section

Pick a single effect for each part of the page: a heading that reveals line by line, a list that cascades in, a line that draws as you scroll. Repetition of a few well-chosen effects feels more professional than a different trick everywhere.

## A small example

```js
gsap.from('.card', {
  autoAlpha: 0,
  y: 40,
  stagger: 0.12,
  scrollTrigger: { trigger: '.cards', start: 'top 85%' },
});
```

## Respect the visitor

Always check the reduced motion preference and skip animation for people who ask for it. Keep the real content in the HTML so search engines and assistive tools still see everything, and call `ScrollTrigger.refresh()` whenever the layout height changes.
