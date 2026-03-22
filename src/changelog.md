---
layout: layouts/base.njk
title: Changelog
permalink: /changelog/
---

## 2026-03-22
- Added a book library at [/books](/books) 📚. I manage this library with a yaml file. Adding a ISBN to the list will fetch and cache the metadata and cover.

## 2026-03-02
- I've added a book shortcode, so I can display books wherever I like. It finds the metadata and cover via ISBN. I'll do a similar thing with music records.

## 2026-02-16
- Refactored the CSS of this site to be more future proof and maintainable.
- Played around with coloring the site using `oklch` instead of `hsl`. It's pretty cool.
- Added a [/uses](/uses/) page, because I think it is actually useful.

## 2026-02-15
- Fixed the "Last Updated" date logic to reflect actual content changes instead of updating on every push.
- Added defensive styling to hide the "Last Updated" line if date info is missing.
- Updated homepage status labels to clearly indicate they are fetched from the Fediverse.

## 2026-02-14
- Added a manual build trigger button to the site's deployment workflow.
- Rewrote the GPG/security description on the contact page.

## 2026-02-13
- Added latest Fediverse posts to the homepage via RSS.
- Improved page layout with better visual separation (horizontal lines).
- Added Keyoxide verification explanation to the contact page.

## 2026-02-13
- Added latest post from GoToSocial to the homepage.

## 2026-02-11
- Added both [/about](/about/) and [/ideas](/ideas/) pages. 
- Also added a automated 'last updated' date based on Git log to [/now](/now/) and /ideas.

## 2026-02-08
I've added several Indieweb formats and a profile card to the homepage. It is automatically fetched from my Fediverse bio at [id.geff.re](https://id.geff.re/@geffrey).

I've also added a [contact](/contact) page, in case people are interested.

## 2026-01-23
- Moved logo from footer to header.
- Updated color palette and typography styles (headings, links, emphasis).
- Added accessibility features: "skip to content" link and focus states. (hit `tab`!)
- Minor content updates to various pages.

## 2025-12-20
Added other [Slash Pages](/slashes) to the site.

## 2025-12-13
Added navigation.

## 2025-12-08
Added [freelancing as a technical writer](/writer) landing page.

## 2025-12-05
Current version of site went live.
