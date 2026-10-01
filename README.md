# Sujoy Kumar Paul — Portfolio (Next.js)

Next.js (App Router) version of the portfolio: server-rendered, fast, and SEO-ready.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Theme
Black, white and one orange accent. Colors are CSS variables at the top of `app/globals.css`
(`--bg`, `--fg`, `--ac` for fills and lines, `--act` for small orange text). Change `--ac`/`--act`
(and the two `#ff6a1f` values in the `opengraph-image.js` files) to re-color the whole site.

## Animations (GSAP)
All animation code is in `components/Effects.js` (GSAP + ScrollTrigger + SplitText, which are free to use).
Hero intro timeline, masked heading reveals, scroll-filled About text, counters, velocity-reactive marquee,
horizontally pinned "Process" section, tile wipes in Stories, magnetic buttons, hide-on-scroll nav, progress bar
footer wordmark, intro loader with counter, per-letter hero reveal, floating hero shapes, a custom square cursor and scroll-velocity skew on images. Everything is skipped when the visitor prefers reduced motion, and content is always in the HTML for SEO.

## Contact numbers
Edit the `phones` array in `lib/data.js` (display text, `tel:` number and WhatsApp number). Both numbers get Call and WhatsApp buttons in the Contact section; the footer uses the first one.

## Projects
Projects are an array in `lib/data.js` (`projects`). Each object becomes a page at `/work/<slug>` automatically (the project title on the home page opens it): name, tagline, type, role, thumbnail (shown full-bleed), languages, frameworks, other tools, overview, "how it works" steps and optional links. `thumb.src` can be a local file in `public/` or a remote image URL (hosts must be listed in `next.config.mjs`). Fill the `TODO` stacks for MyPaste and Profile-View.

## Blog
- Posts are Markdown files in `content/posts/`; their images live in `public/blog/<slug>/`.
- Create a post: `npm run new-post -- "My post title"`, then drop your images into `public/blog/<slug>/` and edit the front matter.
- Each post has a title, excerpt (used as the SEO description), tags, date, body (Markdown) and **up to 5 images**. The first image is the thumbnail on the blog page and the social preview image.
- SEO per post: title and description, canonical URL, Open Graph/Twitter tags (your cover image, or an auto-generated title card if the cover is an SVG), `BlogPosting` and breadcrumb JSON-LD, sitemap entry and an RSS feed at `/blog/feed.xml`.
- The 3 posts in `content/posts/` are samples. Delete them (and their `public/blog/` folders) or replace them with your own.
- Tip: use JPG/PNG/WebP covers around 1200x630 or larger so social networks show them.

## Before you deploy
1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your real domain. This drives canonical URLs, Open Graph, sitemap and robots.
2. Add your photos to `public/stories/` and edit the `stories` list in `lib/data.js` (src, w, h, title, caption, alt). Delete the `story-0X.svg` placeholders.
3. Add live-site/repo, GitHub, LinkedIn and email links in `lib/data.js` and `app/page.js` (contact section) and to `sameAs` in the JSON-LD.

## SEO included
- Metadata API: title template, description, keywords, canonical, Open Graph, Twitter cards, robots
- Auto-generated social image (`app/opengraph-image.js`), favicon (`app/icon.svg`)
- JSON-LD structured data (Person + WebSite)
- `sitemap.xml` and `robots.txt`
- Semantic HTML (one `h1`, `header/nav/main/section/article/footer`, `dl` for facts, alt text on all images)
- `next/font` self-hosted fonts (no layout shift), `next/image` for photos, skip link, reduced-motion support
- Content is rendered on the server, so crawlers see everything even without JavaScript

## Deploy
Push to GitHub and import into Vercel (zero config), or run `npm run build` on any Node host.

After deploying, submit `https://your-domain/sitemap.xml` in Google Search Console.
