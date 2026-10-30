# Repository Guidelines

## Project Structure & Module Organization

Arcade Vault is currently a Next.js App Router starter using React, TypeScript, and Tailwind CSS.

- `app/page.tsx`: home route and its UI.
- `app/layout.tsx`: root layout, metadata, and Geist font setup.
- `app/globals.css`: Tailwind import, theme variables, and global styles.
- `public/`: static assets served from the root URL, such as `/next.svg`.
- Root configuration includes `next.config.ts`, `tsconfig.json`, and `eslint.config.mjs`.

Keep routes under `app/` and shared assets under `public/`. There is currently no dedicated test directory. Treat `.next/` and `node_modules/` as generated output.

## Build, Test, and Development Commands

Use npm consistently with the committed `package-lock.json`.

- `npm ci`: install dependencies from the lockfile.
- `npm run dev`: start the development server at `http://localhost:3000`.
- `npm run build`: create the production build and check TypeScript compilation.
- `npm start`: serve the production build after building.
- `npm run lint`: run ESLint with Next.js Core Web Vitals and TypeScript rules.

## Coding Style & Naming Conventions

Follow the existing two-space indentation, double-quoted strings, and semicolons in TypeScript files. Use TypeScript and typed component props; strict mode is enabled. Name React components in PascalCase and functions and variables in camelCase. Preserve App Router filenames such as `page.tsx` and `layout.tsx`.

Prefer Tailwind utilities for component styling and reserve `app/globals.css` for shared styles and theme values. The `@/*` import alias resolves from the repository root. No standalone formatter is configured; match surrounding code and run ESLint.

## Testing Guidelines

No automated testing framework, test script, or coverage threshold is configured. For code changes, run `npm run lint` and `npm run build`, then manually verify affected routes, responsive layouts, and light/dark appearance. If adding automated tests, document the runner and command and use descriptive `*.test.ts` or `*.test.tsx` filenames.

## Commit & Pull Request Guidelines

Git history is unavailable in this checkout, so existing commit conventions cannot be verified. Use concise imperative subjects, such as `Add game search controls`. Keep commits focused. Pull requests should describe the change, link relevant issues, record validation performed, and include screenshots for visible UI changes.

## Security & Configuration

Keep secrets in ignored local environment files, such as `.env.local`. Never expose secrets through `NEXT_PUBLIC_` variables. Commit dependency changes together with the updated lockfile.
