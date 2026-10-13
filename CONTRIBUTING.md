# Contributing to ACS IACS Student Chapter Portal

We welcome contributions from chapter members, student researchers, and developers.

## Code Standards

- **TypeScript**: Strict mode enabled. No `any` types allowed.
- **Components**: Feature-first, composable, small components under 200 lines.
- **Content Integrity**: All content and external URLs must live in `src/content/site.ts`. Never hardcode copy into JSX templates.
- **Accessibility**: All interactive elements must be keyboard focusable, have visible focus indicators, and include proper ARIA roles and labels.
- **Images**: Always use the `<Img>` component with defined width, height, and alt attributes to guarantee zero layout shift (CLS < 0.02).

## Development Workflow

1. Fork or branch from `master` (`git checkout -b feat/your-feature-name`).
2. Make your intentional changes following existing code style.
3. Run linting, formatting, and unit tests:
   ```bash
   npm run format
   npm run lint
   npx tsc -b
   npm test
   npm run build
   ```
4. Commit using conventional commit format:
   - `feat:` for new features or sections
   - `fix:` for bug fixes
   - `chore:` for tooling, dependencies, or documentation
5. Open a Pull Request. CI must pass before merging.
