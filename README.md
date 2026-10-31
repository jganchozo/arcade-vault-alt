# Arcade Vault

A visual arcade portal built with Next.js App Router, React, TypeScript, and Tailwind CSS. It recreates the screens in `references/templates/` with English copy and the original neon theme.

This MVP includes a searchable eight-game library, game details, demo sign-in/sign-up, a Hall of Fame, and decorative CRT player previews. No games, gameplay loops, real authentication, or backend services are implemented.

## Run locally

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production preview, run `npm run build` followed by `npm start`.

## Routes

| URL | Screen |
| --- | --- |
| `/` | Library, search, and category filters |
| `/games/[id]` | Game details and sample high scores |
| `/play/[id]` | Static CRT preview, pause overlay, and score dialog |
| `/auth` | Demo sign-in and account creation tabs |
| `/hall-of-fame` | Game ranking tabs, podium, and personal best |

Example game ID: `bloque-buster`. Unknown game IDs show the custom not-found page. Navigation uses real URLs and supports browser Back/Forward.

## Demo behavior

- Sign-in accepts a nonempty username and password; sign-up also validates an email address. These forms create a local demo profile only.
- Only the display name and saved preview scores are persisted under `arcade-vault:demo:v1` in localStorage. Email addresses and passwords are never stored or transmitted.
- Guest access and sign-out clear the profile while retaining preview scores.
- Google and GitHub buttons explain that external sign-in is unavailable.
- Player previews always show 12,500 points, three lives, and level 01. End opens the score dialog; Play Again resets the preview controls. Neither action runs a game.
- Storage failures fall back to in-memory state with a visible notice.

## Structure

- `app/components/`: shared shell, screen components, dialogs, and demo state provider.
- `app/lib/`: typed catalog, deterministic rankings, storage validation, and focus handling.
- `app/globals.css`: reference styles, Tailwind tokens, local font faces, and responsive refinements.
- `public/fonts/`: Press Start 2P, JetBrains Mono, Courier Prime, and their licenses.
- `references/templates/`: unchanged reference templates.
- `specs/`: approved feature contract and workflow configuration.
- `tests/`: storage and ranking regression checks using Node's test runner and the installed TypeScript compiler.

No environment variables or external services are required. All runtime fonts and artwork are local or CSS-generated.

## Validate

```bash
npm test
npm run lint
npm run build
```

The tests cover malformed/blocked storage, normalization, credential exclusion, persistence round-trips, deterministic rankings, and stable game-specific score merging.

For UI changes, also check all routes at 390px, 768px, and 1440px widths. Exercise search, empty results, auth tabs, refresh persistence, ranking tabs, pause/resume, save/replay, mobile navigation, keyboard focus, and Escape dismissal. Respect the reduced-motion preference.
