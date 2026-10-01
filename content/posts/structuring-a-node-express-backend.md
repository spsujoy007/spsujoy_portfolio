---
title: "Structuring a Node.js and Express backend that scales"
date: 2026-09-28
excerpt: "A practical folder structure and request flow for an Express and MongoDB API, from routes to controllers to services."
tags: [Node.js, Express.js, MongoDB, Architecture]
images:
  - file: cover.svg
    alt: "The request flow at a glance"
    caption: "The request flow at a glance"
  - file: image-2.svg
    alt: "Routes, controllers and services"
    caption: "Routes, controllers and services"
  - file: image-3.svg
    alt: "Validation at the edge"
    caption: "Validation at the edge"
  - file: image-4.svg
    alt: "Models and data"
    caption: "Models and data"
  - file: image-5.svg
    alt: "Ready to grow"
    caption: "Ready to grow"
---

A backend is easier to grow when every request follows the same path. On HelloTalk, my team project, I built the whole backend, and the layering below is what keeps an Express and MongoDB API readable as features pile up.

## Start with clear layers

Routes only map a URL and method to a handler. Controllers read the request and shape the response. Services hold the actual business logic, and models talk to MongoDB through Mongoose. When each layer has one job, a change in one place rarely breaks another.

## Keep validation at the edge

Validate input as early as possible, before it reaches a service. Reject bad data with a clear status code and message, and let the rest of the code assume the input is already clean. The same idea applies to authentication: verify a JWT in middleware once, then pass the user along.

> Small, boring conventions beat clever structure every time.

## Plan for growth

- Use one error-handling middleware so every failure returns the same shape.
- Keep configuration in environment variables, never in code.
- Split routes into modules by feature as the API grows.

None of this is exotic, and that is the point. A predictable structure lets a team move fast without stepping on each other.
