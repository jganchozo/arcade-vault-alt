# SPEC 02 — Arcade Vault home page

> **Status:** Approved
> **Depends on:** SPEC 01 — Arcade Vault visual MVP
> **Date:** 2026-10-31
> **Objective:** Recreate the home reference at `/` with accurate English demo copy and move the existing library to `/games`.

## Why this spec exists

SPEC 01 placed the library at `/`.
The new home reference introduces a dedicated landing page before the library.
This spec supersedes SPEC 01's library route mapping and navigation destinations.
Its demo behavior, storage contract, and gameplay exclusions continue to apply.

## Scope

**In:**

- Implement every home section from `references/templates/home-about/home.jsx` in its original order.
- Reuse the home styles from `references/templates/home-about/styles.css` and navigation arrangement from `references/templates/home-about/nav.jsx`.
- Preserve the reference's neon colors, typography, floating pixel silhouettes, mini covers, score rows, ranking bars, free-plan card, FAQ, and CTA treatments.
- Translate visible content into English and describe the existing eight-game UI demo accurately.
- Replace the library at `/` with Home and expose the existing library at `/games`.
- Update shared navigation, library return links, and demo authentication redirects for the new route arrangement.
- Show a disabled About item with a visible `Coming soon` label in desktop and mobile navigation.
- Preserve responsive behavior, keyboard access, visible focus, dialog behavior, and reduced-motion support.
- Document the route changes and capture verification screenshots.

**Out of scope (for future specs):**

- An About page, `/about` route, About content, or navigation to an unfinished page.
- Playable games, real accounts, remote rankings, analytics, payments, or backend services.
- Live activity, polling, timers that update sample scores, or merging local results into the home panels.
- A new authentication flow, automatic sign-up tab selection, or changes to profile/score persistence.
- Redesigning the library, game details, player, auth, or Hall of Fame screens beyond the required route integration.

## Reference mapping and routes

| Reference or action | Application destination |
| --- | --- |
| `home.jsx` | `/` — Home |
| Existing library | `/games` — all eight games, search, category filters, and empty state |
| Logo and Home navigation | `/` |
| Library navigation | `/games` |
| Home Explore Games, View All Games, and final CTA | `/games` |
| Home demo access CTAs | `/auth` — existing demo access screen |
| Home mini game card | `/games/[id]` — matching game details |
| Home View Hall link | `/hall-of-fame` |
| About menu item | Disabled; visible `Coming soon` label; no destination |
| Successful demo sign-in/sign-up or Continue as Guest | `/games` |
| Library return actions in details, score dialog, Hall of Fame, and not-found screen | `/games` |

Existing `/games/[id]`, `/play/[id]`, `/auth`, and `/hall-of-fame` URLs remain valid.
Player exit behavior that already returns to game details remains intact.
There is no redirect from `/` to the library because `/` now serves Home.

## Files and module organization

- Update `app/page.tsx` to render Home and supply home-specific metadata.
- Add `app/games/page.tsx` to render the existing `GameLibrary` with library-specific metadata.
- Add `app/components/home-screen.tsx` to compose the hero, features, game previews, stats, and final CTA.
- Add `app/components/home-decorations.tsx` for the reference pixel silhouettes and feature icons.
- Add `app/components/home-activity.tsx` for fixed sample activity and top-player panels.
- Add `app/components/home-pricing.tsx` for the free demo plan and static FAQ.
- Add `app/components/home-reveal.tsx` for scoped, optional scroll-reveal behavior.
- Add `app/lib/home-content.ts` for typed, deterministic home fixtures and repeated content.
- Update `app/components/site-nav.tsx` and `app/globals.css` for navigation, home styles, and responsive refinements.
- Update library return destinations in `app/components/auth-screen.tsx`, `game-detail.tsx`, `score-dialog.tsx`, `hall-of-fame.tsx`, and `app/not-found.tsx`.
- Update `README.md` and `AGENTS.md` to identify Home at `/` and the library at `/games`.
- Add `docs/home-page-verification.md` and screenshots under `docs/screenshots/home-page/` for implementation validation.
- Keep `references/templates/`, the existing catalog, ranking algorithms, and storage helpers unchanged.
- Keep static home content on the server where possible and isolate reveal behavior in a client component.

## Data model

This feature introduces no new persisted data structures.
It reuses `Game`, `GAMES`, and the existing demo provider from SPEC 01.
The `arcade-vault:demo:v1` key and its schema remain unchanged.

Use the first six entries of `GAMES` for the mini game preview rail.
Read their titles, categories, IDs, and covers from the catalog rather than duplicating those fields.
Read the home game count from `GAMES.length`.

Keep display-only fixtures in `app/lib/home-content.ts` with these shapes:

```ts
type HomeActivityEntry = {
  name: string;
  gameId: string;
  score: number;
  timeLabel: string;
};
type HomeTopPlayer = {
  name: string;
  score: number;
};
```

- Use the reference's seven sample activity entries and five sample top-player entries in their reference order.
- Resolve activity game names and neon colors through the existing catalog using `gameId`.
- Translate reference time labels into English and identify them as sample timing.
- Format numbers using the existing English score formatter.
- Do not use randomness, network requests, localStorage reads, or the current time to produce home fixtures.
- Keep top-player totals as reference sample values without introducing a cross-game ranking calculation.

## Screen behavior

### Shared navigation and integration

- Desktop and mobile menus show Home, Library, Hall of Fame, and About in that order.
- Home is active only at `/`.
- Library is active at `/games`, `/games/[id]`, and `/play/[id]`.
- About is visibly disabled and exposes its disabled state to assistive technology.
- Clicking or activating About does not change the URL, open a modal, or navigate to a not-found page.
- Preserve the current credits indicator, demo profile display, sign-out behavior, and mobile menu focus handling.
- Enabled mobile links close the drawer on selection.
- Library return actions use a clear English label such as `Back to the Library` alongside their updated `/games` destination.

### Hero, features, and game previews

- Preserve the large three-line hero heading, eight decorative silhouettes, two CTAs, and decorative scroll cue.
- Translate the hero into English while describing browsing classic games and CRT previews.
- The primary CTA opens the library.
- The secondary CTA clearly describes demo access and opens the existing `/auth` screen.
- Keep four feature cards with the reference gamepad, free-access, trophy, and rocket icons.
- Describe the classic catalog, free demo access, sample rankings, and exploration of the eight-game collection.
- Do not claim real competition, playable games, or a monthly release schedule.
- Render six compact game cards using the existing CSS cover art.
- Each mini card is a keyboard-accessible Next.js link to its matching details page.
- View All Games opens the library without changing its search/filter behavior.

### Stats and sample activity

- Preserve the three-column stats strip and responsive stacked layout.
- Show the catalog game count, seven sample activity entries, and five sample players instead of unsupported usage claims.
- Label the activity section `Demo Activity` and the panels `Sample Scores` and `Sample Top Players`.
- Include a visible note that names, scores, and relative times are illustrative fixtures.
- Preserve the reference's score-row styling and top-three ranking accents.
- Preserve the five ranking bars as decorative representations of the sample ordering.
- View Hall opens the existing Hall of Fame.
- Saving a local demo score does not alter either home panel.

### Free plan, FAQ, and final CTA

- Preserve the free-plan card, `$0` price treatment, six-item feature list, stamp, and three static FAQ entries.
- Describe the free local demo, catalog browsing, CRT previews, sample rankings, local profile/score saving, and guest access.
- Explain that profiles and saved scores live in the current browser and do not create a real account.
- Do not claim nonprofit status, a global live service, guaranteed future releases, or require account creation to save a guest preview score.
- The plan CTA opens `/auth` and uses an accurate demo access label.
- The FAQ stays fully expanded as in the reference; it introduces no accordion state.
- Preserve the final heading, prominent CTA, and supporting line.
- The final CTA opens `/games` and describes exploring the demo accurately.

### Responsive rendering and motion

- Reuse the established fonts, theme tokens, shared shell, and footer.
- Port the home-specific style blocks without importing the reference's About or unrelated screen styles.
- Scope new selectors where necessary to avoid changing existing screens.
- Match the reference's feature, mini-card, stats, activity, and pricing layouts at their responsive breakpoints.
- Keep English headings, CTAs, disabled menu labels, and sample rows within the viewport.
- Treat silhouettes, feature SVGs, ranking bars, and scroll cues as decorative where their meaning is already expressed in text.
- Keep content visible by default; enhance with reveals only when observation is available.
- Scope observation to the home content and disconnect observers when it unmounts.
- Under reduced motion, disable home reveal transforms, floating, pulsing, and scrolling cues while keeping every section visible.
- Do not add a page-loading state or data-error state for static home content.

## Implementation plan

Make small runnable changes in the following order.
Split each step into patches of approximately 30–50 lines when necessary.

1. Add `/games` as a working library route using `GameLibrary`, while keeping the current `/` screen functional.
2. Update shared navigation with separate Home and Library destinations, active states, and the disabled About item.
3. Update auth redirects and library return links to `/games` without changing the underlying demo flows.
4. Add typed home fixtures and English repeated content in `app/lib/home-content.ts` without changing the rendered routes.
5. Add the decorative SVG components in small groups without replacing existing cover art.
6. Add a runnable `HomeScreen` containing the hero and working CTAs, then render it at `/` with home metadata.
7. Port the hero styles, floating silhouettes, and responsive English heading treatment.
8. Add the four feature cards and their reference styles to the working home page.
9. Add the six linked game previews, View All Games action, and responsive mini-card styles.
10. Add the three demo stats blocks and their responsive strip styling.
11. Add the sample activity panel with seven catalog-linked fixture labels and the visible demo explanation.
12. Add the sample top-player panel, decorative ranking bars, and View Hall link.
13. Add the free demo plan card and working demo access CTA.
14. Add the three expanded FAQ entries and final library CTA with the reference styles.
15. Add optional scoped reveal behavior with visible-content fallback and reduced-motion support.
16. Apply any responsive and keyboard refinements found while reviewing the affected screens.
17. Update route documentation and record completed validation with screenshots in `docs/home-page-verification.md`.

Each step leaves the application functional.
Do not change storage or ranking behavior to support home fixtures.

## Acceptance criteria

- [ ] `/` renders Home with all reference sections in their original order.
- [ ] `/games` renders the existing eight-game library with working search, category combinations, and empty state.
- [ ] Hero, features, six mini game cards, stats, both activity panels, free plan, three FAQ entries, and final CTA are present.
- [ ] Visible home copy is English and accurately identifies demo profiles, previews, sample results, and browser-local saving.
- [ ] Home displays the catalog's current count rather than the reference's unsupported `12+` claim.
- [ ] No home copy presents fixture activity as live or claims playable games, real accounts, or scheduled new releases.
- [ ] Each mini card opens its matching `/games/[id]` page with mouse and keyboard input.
- [ ] Library CTAs and return links open `/games`; the logo and Home menu item open `/`.
- [ ] Home demo access CTAs open `/auth`, and View Hall opens `/hall-of-fame`.
- [ ] Successful demo form submission and Continue as Guest open `/games`.
- [ ] Home is active only at `/`; Library is active on library, detail, and player routes.
- [ ] Desktop and mobile About items show `Coming soon`, expose a disabled state, and do not navigate.
- [ ] No About page is implemented.
- [ ] Home shows seven fixed sample score rows and five fixed sample top-player rows with English number formatting.
- [ ] Saving a preview score leaves home fixtures unchanged while the existing game rankings still update correctly.
- [ ] Existing demo profiles and scores survive refresh without a storage schema change.
- [ ] Direct URLs, refresh, and browser Back/Forward work for Home, library, details, player, auth, and Hall of Fame.
- [ ] Unknown game IDs still show the not-found screen and its return link opens `/games`.
- [ ] Affected screens are reviewed at 390px, 768px, and 1440px without page-level horizontal overflow or clipped controls.
- [ ] Mobile navigation retains Escape/backdrop dismissal, focus trapping, visible focus, and focus restoration.
- [ ] All home content remains visible when reveals are unavailable and when reduced motion is enabled.
- [ ] Fonts and CSS artwork load without missing assets; no hydration or application console errors occur.
- [ ] `npm test`, `npm run lint`, and `npm run build` pass.
- [ ] Screenshots at all three review widths and a screenshot of the mobile menu are saved with the verification record.
- [ ] `README.md` and `AGENTS.md` describe the updated routes, and reference files remain unchanged.

## Decisions

- **Home at `/`:** explicitly selected as the site's entry route.
- **Library at `/games`:** selected by the user instead of `/library` to place the catalog alongside game details.
- **All reference sections:** selected instead of a reduced landing page to retain the complete reference composition.
- **Accurate English demo copy:** selected instead of literal marketing translations because the current product provides previews and local demo state.
- **Fixed sample home data:** selected instead of merging saved demo scores to avoid new ranking logic and persistence dependencies.
- **Disabled About with `Coming soon`:** selected instead of hiding it so the intended menu remains visible while the page is deferred.
- **Existing `/auth` flow:** reused for demo access; no new account creation route or tab-selection contract is introduced.
- **Existing catalog and covers:** reused to keep mini cards and game counts consistent with the library.
- **Reference styles and SVGs:** reused instead of a new visual system or generated raster artwork.
- **Progressive reveal enhancement:** keeps the reference's motion without making section visibility depend on an observer.

## Risks

| Risk | Mitigation |
| --- | --- |
| Existing `/` links still intend to open the library. | Audit every root link and auth redirect; retain `/` only for Home and the logo. |
| New global selectors alter existing screens. | Port only home styles and scope collisions; review library, details, auth, rankings, and player states. |
| English headings and additional menu items overflow. | Check the three required widths and adapt wrapping, spacing, and menu breakpoints. |
| Reveal styles leave content hidden after navigation or under reduced motion. | Keep default content visible and clean up scoped observers on unmount. |
| Reference claims imply a live arcade service. | Use demo-specific copy and visible sample labels throughout Home. |

## What is **not** in this spec

- No About implementation.
- No playable games, real accounts, backend services, live activity, or payments.
- No new storage schema, home persistence, cross-game ranking algorithm, or local-score merging into home fixtures.
- No redesign of the existing demo screens beyond navigation integration.
