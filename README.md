# Photography Portfolio Starter

A starter template for a photography portfolio website. You'll work with Claude to customize the design, add your photos, and publish it to a real domain.

This README is your **pre-meeting checklist**. Complete these steps before our session so we can hit the ground running.

---

## Before our meeting

### 1. Create three free accounts

These are all free. Use the same email address for each so it's easy to keep track.

- [ ] **GitHub** — [github.com/signup](https://github.com/signup)
  - This is where your website's code (and photos) will live.
- [ ] **Netlify** — [app.netlify.com/signup](https://app.netlify.com/signup)
  - Click "Sign up with GitHub" — it's the easiest way.
  - Netlify is what makes your site appear on the internet.
- [ ] **Anthropic / Claude** — [claude.ai](https://claude.ai)
  - Sign up for an account.
  - **Claude Pro** ($20/month) is recommended for the build phase — you'll have a lot of back-and-forth and the free tier limits will run out fast.

### 2. Install three programs

#### On a Mac

- [ ] **Node.js** — [nodejs.org](https://nodejs.org/) → click the **LTS** button → run the installer.
- [ ] **Git** — [git-scm.com/downloads](https://git-scm.com/downloads) → run the macOS installer.
- [ ] **Claude Code CLI** — open the **Terminal** app (press ⌘ + Space, type "Terminal", hit Enter), then paste this and press Enter:
  ```
  npm install -g @anthropic-ai/claude-code
  ```

#### On Windows

Same three programs, slightly different installers — Fima will help in person if you get stuck.

### 3. Make your own copy of this starter

- [ ] Open [this repository on GitHub](https://github.com/efimfurman/photo-site-starter) (Fima will send you the link).
- [ ] Click the green **"Use this template"** button → **"Create a new repository"**.
- [ ] Name it something like `your-name-photography` (lowercase, no spaces — use dashes).
- [ ] Set it to **Public** (it can be made private later if you want).
- [ ] Click **"Create repository"**.
- [ ] Copy the URL of your new repo (looks like `https://github.com/yourname/your-name-photography`) and send it to Fima.

### 4. Bring to our session

- [ ] Your laptop and charger.
- [ ] **A few photos** you'd like to put on the site (5–20 is plenty to start with). Put them in a folder you can find easily.
- [ ] **Inspiration** — links to 2–3 photographer websites whose look or feel you like. Doesn't matter if they're famous photographers or random ones — what matters is what *you* respond to.
- [ ] A rough idea of the **vibe**: minimal? bold? warm? cool? dark? light? — even if you can only describe it in words, that's enough.

---

## What happens during our session

Roughly:

1. **Set up locally** — clone your repo, install the project, run a preview server.
2. **Walk through the template** — see what it looks like out of the box.
3. **Customize** — work with Claude to change the design, add your photos, write your bio.
4. **Connect Netlify** — link your GitHub repo to Netlify so changes auto-publish.
5. **Custom domain (optional)** — if you've bought a domain, we'll point it at your site.

---

## After we publish: how the workflow works

Once everything is set up, your day-to-day workflow is:

1. Open Claude Code in the project folder.
2. Tell Claude what you want — *"add a new gallery called Weddings"*, *"make the homepage darker"*, *"the photo on the about page is too big"*, etc.
3. Claude makes the changes.
4. Watch them live in your browser at `localhost:4321`.
5. When happy, Claude commits and pushes to GitHub.
6. Netlify auto-deploys within ~1 minute. Your live site updates.

You don't need to memorize any commands. Just describe what you want.

---

## Questions?

Text or email Fima before our session. **Don't worry if you can't finish all the install steps** — we can do them together if needed.
