# Built Clough — Claude Code Project Context

> Read this file at the start of every session before writing any code.
> Update this file at the end of every session if anything changed.

---

## What This Project Is

A residential construction and remodeling landing site for **Built Clough** — three brothers (Jeff, Travis, and Pat Clough) in Southern Illinois. Built as a templatizable Astro project: swapping `src/config/site.ts` and the content collection markdown files is the intended path to adapt it for a new client.

- **Live site:** https://www.builtclough.com
- **Phone:** (618) 956-0808
- **Email:** hello@builtclough.com
- **Address:** 520 S 14th St, Herrin, IL 62948

---

## Hard Rules — Never Violate These

- No component libraries (shadcn, MUI, Chakra) — build custom only
- No `font-weight: 600` or `700` anywhere — only `400` and `500`
- No drop shadows — borders only
- No colors beyond the grayscale palette
- No bare `<img>` tags without `alt`, `width`, `height`, and `loading` attributes
- No Google Fonts `<link>` tags — use `@fontsource` imports in global.css
- No `outline: none` without a custom focus replacement
- No `<div onclick>` — buttons use `<button>`, links use `<a href>`
- No React — all interactivity is vanilla JS in `<script>` blocks
- No Notion API — content comes from `src/content/` markdown files
- No `resend` or `react-email` — contact form is external (iframe or link)
- Never reuse the same meta description across pages
- Never skip the `title`, `description`, and `canonical` props on `<Layout>`

---

## Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Astro 6 (SSG) | Static output to `dist/` |
| Styling | Tailwind CSS v4 | CSS-based config in `src/styles/global.css` — no `tailwind.config.js` |
| Font | Public Sans via `@fontsource/public-sans` | Weights 400 and 500 only, imported in global.css |
| Dark mode | Vanilla JS + CSS | Inline script in `<head>` prevents flash; CSS drives toggle visuals |
| Content | Astro content collections | Markdown files in `src/content/` |
| Hosting | Netlify | `netlify.toml` at project root, publishes `dist/` |
| Forms | External | CTA buttons link to `#` placeholder — swap href when form destination is decided |

---

## Templatization Pattern

To adapt this project for a new client:

1. **Edit `src/config/site.ts`** — name, contact info, service area, hours, social links
2. **Replace content in `src/content/`** — swap markdown files for new client's FAQs, projects, articles, locations
3. **Replace images in `public/images/`** — drop in new client's photos
4. **Update `src/pages/index.astro`** — edit copy, team bios, testimonials
5. **Update `CLAUDE.md`** — update the live URL, contact info, and business name

Everything else (components, layout, styles, scripts) is client-agnostic.

---

## Tailwind v4 Config Pattern

No `tailwind.config.js`. All configuration lives in `src/styles/global.css`:

```css
@import "tailwindcss";
@import "@fontsource/public-sans/400.css";
@import "@fontsource/public-sans/500.css";

/* Class-based dark mode */
@variant dark (&:where(.dark, .dark *));

/* Color tokens — inline so dark-mode CSS vars work at runtime */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-border: var(--border);
}

/* Font */
@theme {
  --font-sans: 'Public Sans', sans-serif;
}
```

Then `:root` and `.dark` blocks define the CSS vars. Generated Tailwind classes `bg-background`, `text-foreground`, `border-border` reference the vars directly and respond to the `.dark` class on `<html>`.

---

## Environment Variables

No runtime env vars required for the current build. If a contact form is wired up later, add:

```
RESEND_API_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=   # if Cloudflare Turnstile is added
TURNSTILE_SECRET_KEY=
```

Add new variables here and to `.env.local`.

---

## Folder Structure

```
src/
  config/
    site.ts               # All client-specific data — edit this to templatize
  content/
  content.config.ts         # Zod schemas + glob loaders for all collections (Astro 6 Content Layer)
    faqs/                 # .md files: question, answer, category, order
    articles/             # .md files: title, slug, excerpt, publishedAt, coverImage, category
    projects/             # .md files: title, slug, location, services, coverImage, gallery, featured
    locations/            # .md files: name, slug, county, services, description
  layouts/
    Layout.astro          # Document shell, dark mode script, SEO meta, Nav + Footer
  components/
    Nav.astro             # Sidebar (desktop) + top bar (mobile); vanilla JS hamburger
    Footer.astro          # Static footer
    ThemeToggle.astro     # Pill toggle; CSS-driven visuals; vanilla JS for class + localStorage
    ParallaxHero.astro    # Hero image with scroll parallax (vanilla JS)
    ParallaxBanner.astro  # Full-width parallax banner (vanilla JS, multi-instance safe)
    FAQAccordion.astro    # Native <details>/<summary>, zero JS
    GalleryScroll.astro   # Horizontal drag-to-scroll gallery (vanilla JS)
  pages/
    index.astro           # Landing page — all sections inline
  styles/
    global.css            # Tailwind v4 config + CSS vars + animation + toggle styles
public/
  images/
    og/                   # Page photos and OG images (.avif + .svg)
    team/                 # Team headshots (.avif)
    projects/             # Project gallery photos (.avif)
    services/             # Service category photos (.avif)
```

---

## Content Collection Schemas

### FAQs (`src/content/faqs/`)
| Field | Type | Notes |
|---|---|---|
| question | string | The FAQ question |
| answer | string | Full answer (frontmatter string, not markdown body) |
| category | enum | General, Pricing, Process, Timeline |
| order | number | Sort order for display |

### Articles (`src/content/articles/`)
| Field | Type | Notes |
|---|---|---|
| title | string | Headline |
| slug | string | URL slug |
| excerpt | string | Summary for listing cards |
| publishedAt | date | ISO date string |
| coverImage | string | Path from `/public/` |
| category | enum | Tips, Pricing, Process, Inspiration |

### Projects (`src/content/projects/`)
| Field | Type | Notes |
|---|---|---|
| title | string | e.g. "Makanda Bathroom Remodel" |
| slug | string | URL slug |
| location | string | e.g. "Makanda, IL" |
| services | string[] | List of service types |
| coverImage | string | Path from `/public/` |
| gallery | string[] (optional) | Additional image paths |
| featured | boolean | Show in featured sections |

### Locations (`src/content/locations/`)
| Field | Type | Notes |
|---|---|---|
| name | string | City name |
| slug | string | URL slug |
| county | string (optional) | County name |
| services | string[] | Services offered in this area |
| description | string | Local SEO copy |

---

## Dark Mode Pattern

The flash-free pattern used throughout:

1. `Layout.astro` `<head>` contains an `is:inline` IIFE script that runs synchronously before paint, reads `localStorage`, and adds `.dark` to `<html>` if needed.
2. CSS in `global.css` defines `:root` and `.dark` custom property blocks.
3. `@variant dark (&:where(.dark, .dark *))` makes `dark:` utilities respond to the `.dark` class.
4. `ThemeToggle.astro` toggle visual is CSS-driven (`.dark .theme-toggle-track`, `.dark .theme-toggle-thumb`) — no JS needed for the visual state.
5. Toggle JS only does three things: toggle `.dark` on `<html>`, save to `localStorage`, sync `aria-pressed`.

---

## Interactivity Pattern — Vanilla JS Only

No React, no Preact, no Alpine. All interactive behavior uses Astro `<script>` blocks (bundled, type="module", deferred). Pattern for components used multiple times on a page:

```js
// Use querySelectorAll, not getElementById, for components used multiple times
document.querySelectorAll('.my-component').forEach((el) => {
  // attach event listeners with closure over `el`
});
```

Astro deduplicates component scripts — a `<script>` inside a component file runs once even if the component renders multiple times. `querySelectorAll` inside that single run finds all instances.

---

## Image Conventions

All images live in `public/` and are already optimized. Use plain `<img>` tags — not Astro's `<Image>` component — since the pipeline doesn't need to process `/public/` assets.

Required attributes on every image:
- `alt` — descriptive for content images, `alt=""` for decorative
- `width` and `height` — prevents layout shift
- `loading` — `"eager"` for above-fold, `"lazy"` for everything else
- `fetchpriority="high"` — on the hero image only

For fill-style images (absolute inside a relative container):
```html
<div class="relative" style="aspect-ratio:16/9">
  <img src="..." alt="..." class="absolute inset-0 w-full h-full object-cover"
       loading="lazy" width="800" height="450" />
</div>
```

---

## SEO — Every Page

Pass props to `<Layout>`:
```astro
<Layout
  title="Page Title | Built Clough"
  description="150–160 chars. Specific to this page."
  ogImage="/images/og/page-slug.jpg"
  canonical="https://builtclough.com/page-slug"
>
```

Title formats:
- Homepage: `Built Clough | Residential Construction & Remodeling in Southern Illinois`
- Service: `[Service] in Southern Illinois | Built Clough`
- Location: `Construction & Remodeling in [City], IL | Built Clough`
- Article: `[Article Title] | Built Clough`

Never reuse the same description across pages.

---

## Accessibility

- All interactive elements keyboard reachable
- Visible focus states always — never `outline:none` without a replacement
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`
- One `<h1>` per page, no skipped heading levels
- Minimum 44×44px tap targets on all interactive elements
- WCAG AA contrast (4.5:1) in both light and dark mode
- `<FAQAccordion>` uses native `<details>`/`<summary>` — keyboard accessible with no JS

---

## Troubleshooting

| Symptom | Check first |
|---|---|
| Dark mode flash on load | Confirm `is:inline` on the head script in `Layout.astro`; script must be before any stylesheet |
| `dark:` utilities not applying | Confirm `@variant dark (&:where(.dark, .dark *))` is in `global.css` above utility usage |
| `bg-background` / `text-foreground` not working | Confirm `@theme inline { --color-background: var(--background); ... }` block in `global.css` |
| Font not loading | Confirm `@import "@fontsource/public-sans/400.css"` is in `global.css`; check node_modules |
| Content collection type errors | Check `src/content.config.ts` schema matches frontmatter fields exactly |
| Build fails on content | Confirm example `.md` files have all required frontmatter fields with correct types |
| Parallax not moving | Check browser console; confirm `prefers-reduced-motion` is not reducing in dev tools |
| Mobile menu not toggling | IDs `mobile-menu-btn` and `mobile-drawer` must be present in the DOM; check Nav.astro |
| Netlify deploy fails | Confirm `publish = "dist"` in `netlify.toml`; Astro outputs to `dist/` not `.next/` |
