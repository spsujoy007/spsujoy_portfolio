---
title: "A Next.js SEO checklist for a developer portfolio"
date: 2026-09-20
excerpt: "The metadata, structured data and performance basics that help a Next.js portfolio get found and shared properly."
tags: [Next.js, SEO, Performance]
images:
  - file: cover.svg
    alt: "Metadata that matters"
    caption: "Metadata that matters"
  - file: image-2.svg
    alt: "Shareable previews"
    caption: "Shareable previews"
---

A portfolio only works if people can find it, and good SEO starts with fundamentals rather than tricks. Here is the short checklist I follow with Next.js.

## Get the metadata right

Give every page a unique title and a clear description, set a canonical URL, and add Open Graph and Twitter tags so links look good when shared. In the App Router this lives in the metadata API, so it stays next to the page it describes.

## Describe yourself to search engines

Structured data (JSON-LD) tells search engines who you are and what a page is. A `Person` schema for the home page and a `BlogPosting` schema for each article are a great start. Add a sitemap and a robots file so crawlers can find everything.

## Keep it fast and semantic

- Use one `h1` per page and a logical heading order.
- Write descriptive alt text for every image.
- Serve fonts and images through the framework so layout does not jump.

Finish by submitting your sitemap in Google Search Console and checking the page with a rich results test.
