# ACS IACS Student Chapter — Prototype Web Portal

> **Award-grade, production-engineered web portal for the American Chemical Society Student Chapter at the Indian Association for the Cultivation of Science (IACS), Kolkata, India.**

Designed and developed by **@samratchakraborty**.

---

## 🔬 Architectural Overview

```text
acsiacstest/
├── .github/workflows/          # Automated CI and CD GitHub Pages deployment
├── public/
│   ├── team/                   # Drop real team photographs here
│   ├── 404.html                # GitHub Pages SPA deep-link routing fallback
│   ├── favicon.svg             # Custom geometric chemical lattice emblem
│   ├── robots.txt & sitemap.xml# SEO discovery indexes
│   └── .nojekyll               # GitHub Pages Jekyll bypass
├── src/
│   ├── app/                    # Layout shell, navbar, footer, Lenis scroll, routing
│   ├── components/ui/          # Composable primitives (Button, Card, TiltCard, Img, Cursor, Marquee)
│   ├── content/
│   │   └── site.ts             # 💎 Central typed source of truth (zero strings in components)
│   ├── hooks/                  # useReducedMotion, useMediaQuery, useScrollDirection
│   ├── pages/                  # Home.tsx, Join.tsx, NotFound.tsx (code-split)
│   ├── sections/               # Hero, About, TeamPreview, WhyJoin, Action, Focus, TeamGrid
│   ├── styles/                 # Tailwind CSS v4, tokens.css, globals.css
│   └── three/                  # WebGL 3D molecular dynamics, dynamic bonds, device tiering
└── tests/                      # Vitest unit test suites (pure logic & UI integration)
```

---

## 🚀 1. How to Run Locally

### Prerequisites

- Node.js >= 20.18.0 LTS
- npm >= 10.8.0

### Commands

```bash
# Clone the repository
git clone https://github.com/samrattestworks/acsiacstest.git
cd acsiacstest

# Install dependencies
npm install

# Start development server
npm run dev
# The portal will be available at http://localhost:5173

# Run unit tests
npm test

# Run linter & formatting check
npm run lint
npm run format:check

# Production build
npm run build
```

---

## 📝 2. How to Edit Content in `src/content/site.ts`

**All website copy, URLs, focus areas, social links, and metadata reside exclusively in `src/content/site.ts`.**
No hardcoded copy exists in UI components.

- **Chapter Description & SEO**: Edit `siteConfig.meta`
- **Navigation Links**: Edit `siteConfig.navigation.links`
- **External URLs**: Edit `siteConfig.links`
- **Why Join Cards**: Edit `siteConfig.whyJoin` (6 items, icon + 3-4 word title + short line)
- **Research Domains**: Edit `siteConfig.focusAreas` (4 cards)
- **About Real Copy**: The constant `ACS_ABOUT_TEXT = "[PASTE TEXT FROM ACS WEBSITE HERE]"` is wired directly to the About section text slot. Simply replace the string literal in `src/content/site.ts`.

---

## 📸 3. How to Add Team Photos

Team cards feature zero layout shift and automatic generated fallback placeholders:

1. Save member images into the `/public/team/` directory (e.g. `public/team/advisor.jpg`, `public/team/president.jpg`).
2. In `src/content/site.ts`, update the `photo` field for that member:
   ```ts
   {
     id: 'member-1',
     name: 'Prof. J. Doe',
     role: 'Faculty Advisor & Patron',
     group: 'Core',
     photo: '/team/advisor.jpg', // was null
     links: { ... }
   }
   ```
3. When `photo` is `null`, the portal automatically renders a molecular gradient avatar featuring the member's initials and subtle chemical lattice geometries.

---

## ⚡ 4. How to Open Registration (Flip One Boolean)

To toggle registration across the entire portal:

1. Open `src/content/site.ts`.
2. Locate the `registration` configuration:
   ```ts
   registration: {
     open: false, // 👈 Change to true
     ...
   }
   ```
3. **When `false`**: The Join page displays a high-polish `Registrations Closed` state with a disabled button, status pill, and direct follow links.
4. **When `true`**: The card automatically updates with an active glowing animated button linking to `config.links.registration`.

No other components or styles need to be touched.

---

## 🚢 5. How to Deploy to GitHub Pages

### Automatic CI/CD

Every commit pushed to the `master` branch triggers `.github/workflows/deploy.yml`, which:

1. Runs full validation (`npm run lint`, `tsc -b`, `npm test`).
2. Builds the Vite production bundle with base URL set to `/acsiacstest/`.
3. Publishes artifacts directly to GitHub Pages via the official GitHub Pages deployment action.

### Manual Build

```bash
BASE_URL=/acsiacstest/ npm run build
# Files ready in dist/
```

---

## 🎯 6. Architectural Decisions

1. **GitHub Pages Deep Linking**: Implemented the RFC-compliant SPA 404 redirect trick (`public/404.html` and `index.html` state decoder) so direct navigation and refreshes on `/join` work seamlessly on GitHub Pages.
2. **Three.js Performance & Code Splitting**: R3F and Three.js vendor packages are split into a dedicated chunk (`three-vendor`) and lazy-loaded via React Suspense. Initial JavaScript bundle is **43 KB gzip**, well under the 150 KB budget.
3. **WCAG 2.2 AA Accessibility**: Full keyboard navigation, visible focus indicators, skip-to-content link, semantic HTML landmarks (`header`, `main`, `footer`, `nav`), ARIA tabs for filters, and strict color contrast verification in both Dark and Light themes.
4. **Motion System**: All animations respect `prefers-reduced-motion: reduce`. When active, the 3D canvas is replaced with an elegant static SVG lattice fallback, and parallax/tilt effects are disabled.
5. **Brand Trademark Policy**: Strictly avoids official ACS trademarked graphics, using a custom chemical bonding hexagonal emblem placeholder.

---

## 📄 License

MIT © 2024–2026 ACS IACS Student Chapter & Samrat Chakraborty.
