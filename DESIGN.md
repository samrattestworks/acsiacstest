# Design System & Motion Specification

> **ACS IACS Student Chapter Visual & Motion Language**  
> Theme: Molecular Chemistry, Bonds, Clean Precision, Deep Space Navy.

---

## 🎨 1. Color Palette & Design Tokens

Tokens are defined in `src/styles/tokens.css` as CSS custom properties and mapped to Tailwind CSS v4 variables in `src/styles/globals.css`.

| Token             | Dark (Default)             | Light                    | Description                                      |
| ----------------- | -------------------------- | ------------------------ | ------------------------------------------------ |
| `--bg`            | `#050B1A`                  | `#F8FAFC`                | Deep ink navy background / Slate white           |
| `--surface`       | `#0A1329`                  | `#FFFFFF`                | Lifted glass card surface                        |
| `--surface-hover` | `#111E3D`                  | `#F1F5F9`                | Hover card surface                               |
| `--border`        | `rgba(56, 189, 248, 0.14)` | `rgba(15, 23, 42, 0.12)` | Subtle cyan-ice border                           |
| `--text`          | `#F1F5F9`                  | `#0F172A`                | Primary high-contrast body text (>15:1 contrast) |
| `--text-muted`    | `#94A3B8`                  | `#475569`                | Secondary metadata text (>6:1 contrast)          |
| `--primary`       | `#2563EB`                  | `#1D4ED8`                | ACS royal cobalt blue                            |
| `--accent`        | `#00D2FF`                  | `#0284C7`                | Electric cyan luminescent accent                 |
| `--amber`         | `#F59E0B`                  | `#D97706`                | Warm amber highlight                             |
| `--success`       | `#10B981`                  | `#059669`                | Open registration & active indicators            |

All color combinations have been verified against **WCAG 2.2 AA** contrast standards.

---

## 🔤 2. Typography Scale

Self-hosted via Fontsource to eliminate external round-trips:

- **Display**: Space Grotesk (`var(--font-display)`) — Headings, titles, brand emblem.
- **Body**: Inter (`var(--font-body)`) — Paragraphs, buttons, navigation.
- **Monospace**: JetBrains Mono (`var(--font-mono)`) — Elemental tags, metadata, dates, numbers.

### Fluid Sizes

- Title: `clamp(2.5rem, 6vw + 1rem, 4.75rem)`
- H2: `clamp(1.85rem, 3.5vw + 0.5rem, 2.85rem)`
- H3: `clamp(1.25rem, 2vw + 0.25rem, 1.75rem)`
- Body: `clamp(0.95rem, 0.5vw + 0.8rem, 1.125rem)`

---

## ⚡ 3. Motion System & Physics

- **Shared Easing Curve**: `cubic-bezier(0.22, 1, 0.36, 1)` across all Framer Motion, GSAP, and CSS transitions.
- **Lenis Smooth Scroll**: Normalized scroll velocity with lag smoothing disabled for crisp input handling.
- **Page Load Reveal**: Headline lines reveal in stagger (< 1.8s duration) and are skippable.
- **3D Hero Molecular Simulation**:
  - Triatomic water-like molecular geometry (1 central Oxygen + 2 Hydrogen satellites).
  - Dynamic line segments rendered for transient hydrogen bonds.
  - Interactive cursor force field with subtle attraction vector.
  - Camera scroll dolly back with outward molecular dispersion.
- **3D Card Tilt**: Mouse-relative perspective rotation with a radial glare sheen.
- **Magnetic Buttons & Icons**: Spring attraction toward cursor coordinates on hover.
- **Reduced Motion**: When `prefers-reduced-motion: reduce` is detected:
  - 3D WebGL scene is gracefully replaced with `StaticMoleculeFallback.tsx`.
  - CSS animation durations are reduced to `0.01ms`.
  - Parallax transforms and 3D tilts are disabled.
