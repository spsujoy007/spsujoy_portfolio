import fs from 'node:fs';
import path from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) { console.log('Usage: npm run new-post -- "My post title"'); process.exit(1); }
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const file = path.join('content', 'posts', `${slug}.md`);
if (fs.existsSync(file)) { console.log('Already exists:', file); process.exit(1); }
fs.mkdirSync(path.join('public', 'blog', slug), { recursive: true });
fs.mkdirSync(path.dirname(file), { recursive: true });
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(file, `---
title: "${title}"
date: ${today}
excerpt: "One or two sentences that describe the post. This is used as the SEO description."
tags: [Tag One, Tag Two]
# Up to 5 images. The first one is the thumbnail and the social preview image.
# Put the files in public/blog/${slug}/
images:
  - file: cover.jpg
    alt: "Describe the image (used for SEO and accessibility)"
    caption: "Optional caption"
---

Write your first paragraph here. It is shown slightly larger as the lead.

## A section heading

More text, **bold**, *italic*, [links](https://example.com), lists and code blocks all work (Markdown).
`);
console.log('Created', file);
console.log('Now add your images to public/blog/' + slug + '/ and edit the front matter.');
