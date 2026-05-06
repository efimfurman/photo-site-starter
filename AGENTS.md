# Photography Portfolio Site — Guide for Claude

This file is for **Claude** to read at the start of each session. It explains the project, the owner, and the conventions used here.

## Project overview

A small static photography portfolio website.

- **Framework:** Astro 4 (static site generator)
- **Language:** TypeScript (strict mode)
- **Image processing:** Sharp (built into Astro for optimization)
- **Hosting:** Netlify (auto-deploys on git push)
- **Deployment trigger:** any commit pushed to `main` on the connected GitHub repo

The site is a small set of pages:

- `/` — home (lists all galleries)
- `/<gallery-slug>/` — one page per gallery, dynamic
- `/about/` — bio + contact info
- `/sitemap.xml` — auto-generated

## Owner profile

The owner is a **non-technical photographer**. She will not edit code directly. She will describe what she wants in plain English (e.g. *"the homepage feels too plain"*, *"add a gallery for the wedding shoot last weekend"*, *"can the menu be at the bottom instead?"*) and Claude is expected to do all the actual editing.

When she gives vague creative direction, default to:
1. Making one concrete interpretation
2. Showing it to her (she has `npm run dev` running, so the change will appear in her browser within a second)
3. Iterating based on her reaction

Don't ask 10 clarifying questions before starting. Pick a reasonable interpretation and iterate.

## File structure

```
photo-site-starter/
├── README.md                       # Owner's onboarding doc — don't edit this
├── AGENTS.md                       # This file
├── CLAUDE.md                       # Pointer to this file
├── netlify.toml                    # Netlify build config
├── package.json                    # Dependencies (astro, sharp)
├── astro.config.mjs                # Astro config (site URL lives here)
├── tsconfig.json
├── public/
│   ├── favicon.svg                 # Replace with custom favicon when she has a logo
│   └── robots.txt
└── src/
    ├── components/
    │   ├── Navigation.astro        # Top nav, data-driven from galleries.json
    │   └── Gallery.astro           # Grid layout + <dialog> lightbox
    ├── content/galleries/
    │   └── <slug>/                 # One folder per gallery; drop images here
    ├── data/
    │   └── galleries.json          # Site config + gallery list
    ├── layouts/
    │   └── BaseLayout.astro        # Header / footer / meta tags
    ├── lib/
    │   └── galleries.ts            # Image discovery via import.meta.glob()
    ├── pages/
    │   ├── index.astro             # Home
    │   ├── [gallery].astro         # Dynamic gallery pages
    │   ├── about.astro             # About / contact
    │   └── sitemap.xml.ts          # Auto-generated sitemap
    └── styles/
        └── global.css              # Single CSS file with theme variables at the top
```

## Common tasks

### Add a new gallery

1. Create the folder: `src/content/galleries/<slug>/` (slug is lowercase-with-dashes).
2. Drop image files in, named `01-…jpg`, `02-…jpg`, etc. The numeric prefix controls order.
3. Add an entry to `galleries` in `src/data/galleries.json`:
   ```json
   { "slug": "<slug>", "title": "Display Title", "description": "One-sentence description." }
   ```
4. That's it — the new gallery appears in nav and on the home page automatically.

### Add photos to an existing gallery

Drop them into `src/content/galleries/<slug>/` with numeric prefixes. The dev server hot-reloads.

### Resize photos that are too large

If she's added a folder of full-size camera originals, build will be slow and the deployed site will be heavy. Resize them with Sharp via a one-off script. Example for a single folder:

```bash
npx sharp-cli --input "src/content/galleries/<slug>/*.jpg" \
  --output src/content/galleries/<slug> \
  resize 2400 \
  --withoutEnlargement \
  -- jpeg --quality 85
```

(Or write a small Node script — `sharp` is already installed.) Always commit the resized versions, not the originals. Aim for ~2 MB max per image.

### Change site name, tagline, or social links

Edit `src/data/galleries.json` → `site` object. Don't hard-code these elsewhere.

### Change colors / theme

Edit the CSS custom properties at the top of `src/styles/global.css`:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-muted: #6a6a6a;
  --color-border: #e5e5e5;
  --color-accent: #1a1a1a;
  /* ... */
}
```

Most color changes should happen here, not by sprinkling colors throughout the rest of the CSS.

### Change fonts

1. Add a `<link>` to a Google Font (or other) in `src/layouts/BaseLayout.astro` `<head>`.
2. Update `--font-body` and `--font-heading` in `src/styles/global.css`.

### Make the design "more X" (warmer, bolder, moodier, etc.)

Free-form design work. Suggested order of attack:
1. Adjust the color palette (CSS custom properties).
2. Adjust typography (font choice, sizes, weights).
3. Adjust spacing (`--space-*` variables).
4. Adjust the gallery grid (column count, gap, aspect ratio).
5. Add a hero image to the home page if she wants something more visual.

### Add a new page (e.g. "Press", "Exhibitions")

1. Create `src/pages/<page-slug>.astro` based on the structure of `about.astro`.
2. Add a link to it in `src/components/Navigation.astro` (or make Navigation read from a list in `galleries.json` if there will be multiple custom pages).
3. Add it to the sitemap in `src/pages/sitemap.xml.ts`.

## Local preview

```bash
npm install      # first time only
npm run dev      # opens http://localhost:4321 with hot reload
```

Always check that her dev server is running before iterating; if not, start it for her.

## Deployment

The site is on Netlify, connected to GitHub. **Pushing to `main` auto-deploys.** Workflow:

```bash
git add .
git commit -m "describe the change"
git push
```

Netlify rebuilds and publishes within ~60 seconds. No manual deploy command needed.

### First-time Netlify setup (during initial session)

1. Go to [app.netlify.com](https://app.netlify.com).
2. **Add new site → Import an existing project → GitHub**.
3. Pick her repo.
4. Build settings should auto-detect from `netlify.toml` (build command: `npm run build`, publish dir: `dist`). Confirm and click **Deploy**.
5. Netlify gives the site a random URL like `https://lucky-fox-12345.netlify.app/`.
6. Update `astro.config.mjs` `site:` to that URL (or the custom domain when she sets one up).

### Custom domain

When she's ready to use her own domain:
1. Buy a domain (Namecheap, Google Domains, Porkbun — anything).
2. In Netlify: **Domain management → Add custom domain**.
3. Follow Netlify's DNS instructions (usually adding a CNAME or A record at her registrar).
4. Update `astro.config.mjs` `site:` to the new domain.
5. Uncomment the www-redirect block in `netlify.toml` and replace `yourdomain.com` with the real one.
6. Commit + push.

## Image guidelines

- **Max size**: aim for under 2 MB per image. Astro/Sharp will further optimize at build, but starting from huge files makes builds slow and pushes hit GitHub's file size limits.
- **Formats**: JPG for photos. PNG only for graphics with transparency. Don't commit RAW files (NEF, CR2, ARW) — they're huge and Astro can't process them.
- **Don't commit**: `node_modules/`, `dist/`, `.astro/` (already in `.gitignore`).

## Things to NOT do without asking

- **Don't change the slug of an existing gallery** without confirming with the owner — it changes the URL and breaks any links she's shared.
- **Don't delete photos from a gallery** without confirming — even if she said "clean up" something.
- **Don't push commits with unresolved errors or warnings** — verify locally first (run `npm run build` if making structural changes).
- **Don't add JavaScript framework dependencies** (React, Vue, etc.) without asking. The site is intentionally JS-light.

## Stack notes for Claude

- **Image discovery is automatic.** `src/lib/galleries.ts` uses `import.meta.glob()` to find all images at build time. The owner doesn't list images anywhere — she just drops them in folders. Don't try to add a manual image manifest.
- **`trailingSlash: 'always'`** is set in `astro.config.mjs`. Always link to `/page/` not `/page` for internal links.
- **Lightbox is vanilla JS** in `Gallery.astro`. ~30 lines, intentionally simple. If she wants fancier (zoom, captions overlay, swipe gestures on mobile), redesign rather than adding a heavy lightbox library.
- **No Swiper, no React, no Tailwind, no shadcn.** Just Astro components and plain CSS. Keep it that way unless asked.
