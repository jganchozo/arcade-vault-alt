# Repository Guidelines

## Project Structure & Module Organization

Arcade Vault is a visual Next.js App Router MVP using React, strict TypeScript, and Tailwind CSS. Gameplay and backend services are outside its current scope.

- `app/page.tsx`: library; `app/games/[id]/` and `app/play/[id]/`: game details and decorative previews.
- `app/auth/` and `app/hall-of-fame/`: demo access and rankings.
- `app/components/`: shared shell, screens, dialogs, and the demo state provider.
- `app/lib/`: catalog, rankings, storage validation, and focus handling.
- `app/layout.tsx` and `app/globals.css`: global shell, metadata, reference theme, and local fonts.
- `public/fonts/`: font files and licenses; `references/templates/`: unchanged design references.
- `tests/`: Node regression tests; `specs/`: feature contracts and workflow configuration.

Treat `.next/` and `node_modules/` as generated output.

## Build, Test, and Development Commands

Use npm with `package-lock.json`.

- `npm ci`: install locked dependencies.
- `npm run dev`: run locally at `http://localhost:3000`.
- `npm run build`: create production output and check TypeScript.
- `npm start`: serve an existing production build.
- `npm run lint`: check Next.js Core Web Vitals and TypeScript rules.
- `npm test`: run storage and ranking regression tests.

## Coding Style & Naming Conventions

Use two-space indentation, double quotes, semicolons, and explicit prop types. Name components in PascalCase, variables/functions in camelCase, and module files in kebab-case. Preserve App Router filenames such as `page.tsx` and `layout.tsx`. The `@/*` alias resolves from the repository root.

Keep browser APIs in client components or event handlers. Reuse reference CSS classes and theme tokens. Respect reduced motion, visible focus, and dialog focus trapping. No standalone formatter is configured; match surrounding code and run ESLint.

## Testing Guidelines

Node's built-in runner executes `tests/*.test.mjs` against the actual TypeScript helpers. Add behavioral regression tests for storage and ranking changes; no coverage threshold is configured.

Run tests, lint, and build before submitting. Review affected screens at 390px, 768px, and 1440px. Check direct URLs, browser history, refresh persistence, keyboard input, and modal states.

## Commit & Pull Request Guidelines

Spec implementation history uses `step-one: details`, `step-two: details`, and corresponding numbered step names. Keep changes focused. PRs should describe behavior, link the spec/issues, record validation, and include screenshots for UI changes.

## Security & Configuration

Persist only demo display names and scores under `arcade-vault:demo:v1`. Never store or transmit form passwords/emails. Keep secrets in ignored `.env.local`; no environment variables are currently required. Commit dependency changes with the lockfile.
