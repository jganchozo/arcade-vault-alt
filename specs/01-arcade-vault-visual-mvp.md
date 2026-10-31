# SPEC 01 — Arcade Vault visual MVP

> **Status:** Approved
> **Depends on:** None; builds on the existing global theme.
> **Date:** 2026-10-30
> **Objective:** Recreate every Arcade Vault reference screen in English as a navigable Next.js UI demo with persistent demo profiles and scores, without implementing games.

## Scope

**In:**

- Preserve the reference's Arcade Vault branding, neon palette, local fonts, pixel typography, CSS cover art, CRT frame, and background effects.
- Translate visible copy into English, including forms, feedback, category labels, and metadata.
- Build the library, game details, player preview, sign-in/sign-up, and Hall of Fame screens.
- Include the shared navigation, mobile menu, credits indicator, and footer.
- Make search, category filters, ranking tabs, demo authentication, pause/resume, end-session modal, replay, and demo score saving work.
- Persist the demo profile and saved demo scores in localStorage.
- Support direct URLs, refresh, and browser Back/Forward with Next.js App Router.
- Preserve the reference layout while fixing mobile overflow, keyboard access, and dialog behavior.

**Out of scope (for future specs):**

- Playable games, physics, collision detection, gameplay input, game loops, automatic scoring, and progression.
- Real authentication, OAuth integrations, servers, databases, APIs, and real leaderboards.
- Credit purchases, credit consumption, multiplayer, and account management.
- A chatbot or bot integration; the chosen product identity is Arcade Vault.

## Reference mapping and routes

| Reference | Application route or shared UI |
| --- | --- |
| `biblioteca.jsx` | `/` — library and empty search state |
| `detalle.jsx` | `/games/[id]` — game details and sample rankings |
| `reproductor.jsx` | `/play/[id]` — decorative player, pause overlay, end-session dialog, save confirmation |
| `auth.jsx` | `/auth` — sign-in and sign-up tabs |
| `salon.jsx` | `/hall-of-fame` — game tabs, podium, rankings, personal best |
| `nav.jsx` | Shared navigation and mobile drawer |
| `app.jsx` | Shared layout, demo state provider, and footer |
| `data.jsx` | Typed catalog and deterministic ranking fixtures |
| `styles.css`, `Arcade Vault.html` | Existing theme, fonts, background layers, and page metadata |

All eight games remain represented as catalog items.
Keep the existing game IDs and cover classes stable.
Translate descriptive game titles and descriptions to English while preserving their reference identities.
Unknown game IDs render the application not-found page.

## Files and module organization

- Update `app/page.tsx`, `app/layout.tsx`, and `app/globals.css` to compose the real screens and shared shell.
- Add `app/games/[id]/page.tsx`, `app/play/[id]/page.tsx`, `app/auth/page.tsx`, `app/hall-of-fame/page.tsx`, and `app/not-found.tsx`.
- Add `app/components/site-nav.tsx`, `site-footer.tsx`, `demo-provider.tsx`, and `game-cover.tsx`.
- Add `app/components/game-library.tsx`, `game-card.tsx`, `game-detail.tsx`, and `leaderboard.tsx`.
- Add `app/components/auth-screen.tsx`, `auth-fields.tsx`, `hall-of-fame.tsx`, and `ranking-podium.tsx`.
- Add `app/components/player-preview.tsx`, `player-hud.tsx`, `crt-preview.tsx`, and `score-dialog.tsx`.
- Add `app/lib/catalog.ts`, `rankings.ts`, `demo-types.ts`, and `demo-storage.ts`.
- Keep route modules and static data on the server where possible.
- Use client components for browser storage, forms, menus, filters, dialogs, and interactive tabs.
- Keep `references/templates/` unchanged as the visual source of truth.
- Reuse the local fonts and licenses already in `public/fonts/`.
- Update `README.md` and the stale structure/font descriptions in `AGENTS.md` when the implementation is complete.

## Data model

Reuse the catalog fields `id`, `title`, `short`, `long`, `cat`, `cover`, `color`, `best`, and `plays` from the reference.
Give these fields a typed `Game` model in `app/lib/catalog.ts`.
Retain deterministic sample rankings rather than generating different values on every render.

```ts
type DemoProfile = { name: string };
type DemoScore = {
  id: string;
  gameId: string;
  name: string;
  score: number;
  savedAt: string; // ISO timestamp
};
type DemoState = {
  version: 1;
  profile: DemoProfile | null;
  scores: DemoScore[];
};
```

- Store one validated object under `arcade-vault:demo:v1`.
- Use `null` for a signed-out profile and an empty array for unsaved scores.
- Store display names and demo scores only; never persist passwords or email addresses.
- Normalize display names to uppercase and limit them to ten characters.
- Read storage after mounting to avoid server/client hydration differences.
- Ignore malformed records, unknown game IDs, invalid timestamps, and non-finite or negative scores.
- Use in-memory state if storage is unavailable; show that changes cannot be saved across refreshes when a persistence action fails.
- Ignore the original template's `av_user` and `av_scores` keys; no legacy migration is required.
- Keep search, filters, selected ranking tab, auth tab, and player overlays in component state.
- Sign-out clears the saved profile while retaining saved demo scores.

## Screen behavior

### Shared shell and library

- The logo links to `/`; the library remains active on details and player routes.
- Navigation links use real URLs and remain keyboard accessible.
- The mobile drawer closes on selection, backdrop click, or Escape.
- Move focus into the open drawer and restore focus to its trigger when it closes.
- Search matches English game titles without case sensitivity and combines with the selected category.
- Selecting a card or its Play button opens that game's detail page.
- Show the translated reference empty state when no games match.
- The credits indicator remains the reference's fixed decorative value of three.

### Game details and Hall of Fame

- Detail pages show the matching cover, description, metadata, stats, and top ten rankings.
- Play Now opens `/play/[id]`; the return action opens `/`.
- Hall of Fame tabs switch the displayed game, podium, and top twelve rankings.
- Merge saved demo scores with deterministic sample rankings and sort by descending score.
- Use stable tie ordering and recompute displayed ranks after merging.
- Show the signed-in profile's best saved score for the selected game when one exists.
- Do not invent a personal score for a profile with no saved result.
- Format numbers and displayed dates with English locale conventions.

### Demo authentication

- Provide both reference form tabs, guest access, and Google/GitHub buttons.
- Mark the form as demo access so submitting it does not imply a real account was created.
- Validate a nonempty username and password; sign-up also requires a valid email address.
- Successful demo submission saves only the display name and returns to the library.
- Guest access clears the profile and returns to the library.
- Social buttons show a brief unavailable-in-demo message without external navigation.
- The signed-in navigation provides a sign-out action.

### Player preview and score dialog

- Render the reference CRT artwork and HUD as decorative UI for the selected game.
- Show fixed preview values: score `12,500`, three lives, and level `01`.
- Label the screen as a preview; no action starts a game.
- Pause/Resume toggles the reference overlay and button label without changing the HUD values.
- End opens the reference final-score dialog with the fixed preview score.
- Prefill the name from the demo profile or use `GUEST`; require a nonempty name to save.
- Saving writes one demo score and replaces the form with the translated saved confirmation.
- Disable repeated saves for the same open dialog, including rapid repeated clicks.
- Play Again closes the dialog and resets only the preview's transient UI state.
- Exit returns to the selected game's detail page.
- Dialogs have accessible labels, focus trapping, Escape dismissal, and focus restoration.
- Decorative CSS animations may remain; no timer changes score, lives, or level.

## Implementation plan

Make small runnable changes in the following order.
Split each step into patches of approximately 30–50 lines when necessary.

1. Add the shared types without changing the rendered starter page.
2. Port and translate the catalog in batches of two entries, retaining IDs and CSS covers.
3. Port deterministic ranking fixtures and the sorting/merging helpers.
4. Add validated storage reading with an in-memory fallback.
5. Add storage writing and the demo state provider, then mount it around existing content.
6. Add the reusable CSS cover component and shared footer.
7. Add desktop navigation with real Next.js links and route highlighting.
8. Add the accessible mobile drawer and its open/close behavior.
9. Add game cards, then replace the starter page with the library composition.
10. Add search, category filters, and the empty state to the working library.
11. Add the reusable leaderboard and the dynamic detail route, including unknown-ID handling.
12. Add the detail metadata, statistics, and navigation actions in separate patches.
13. Add the auth route, tabs, and reusable labeled fields.
14. Add validated demo submission, guest access, social-button feedback, and sign-out.
15. Add the ranking podium and Hall of Fame route with game selection.
16. Connect saved scores and personal-best display to both ranking screens.
17. Add the player route and static CRT preview for valid game IDs.
18. Add the fixed HUD, pause/resume overlay, and exit navigation.
19. Add the accessible end-session dialog and its fixed final-score view.
20. Add single-save behavior, saved confirmation, and preview replay controls.
21. Apply targeted responsive and reduced-motion refinements while preserving the reference design.
22. Replace starter metadata with Arcade Vault English metadata and update the repository documentation.

## Acceptance criteria

- [ ] All five screen types and their shared shell are implemented using the reference design.
- [ ] All visible application copy is English and the product is named Arcade Vault.
- [ ] All eight catalog entries have working detail and player-preview URLs.
- [ ] Each route loads directly and after refresh; browser Back/Forward follows navigation.
- [ ] Invalid game URLs show an English not-found screen with a link to the library.
- [ ] Search, combined category filtering, and the no-results state work.
- [ ] Auth tabs, validation, guest access, social feedback, and sign-out work as specified.
- [ ] The demo profile survives refresh; signing out removes it from storage.
- [ ] Saved demo scores survive refresh and appear in the matching rankings.
- [ ] Repeated Save clicks do not create duplicate entries for one preview completion.
- [ ] Hall of Fame game tabs update the podium, rankings, and personal-best state.
- [ ] Pause, resume, end-session dialog, save confirmation, replay, and exit are reachable.
- [ ] Score, lives, and level never change automatically or in response to gameplay input.
- [ ] No game engine, gameplay loop, physics, or playable game is introduced.
- [ ] Corrupt or unavailable localStorage does not prevent rendering or navigation.
- [ ] No password or email address is written to localStorage or sent over the network.
- [ ] Menus, tabs, forms, and dialogs work with keyboard input and visible focus.
- [ ] Screens are checked at 390px, 768px, and 1440px widths without page-level horizontal overflow.
- [ ] Reduced-motion preference disables decorative motion without hiding content or confirmations.
- [ ] Fonts and assets load locally without missing-file errors.
- [ ] `npm run lint` and `npm run build` pass without hydration or application console errors.
- [ ] Save screenshots of each screen and the pause/end/saved states for visual review against the references.

## Decisions

- **Arcade Vault, English:** explicitly selected instead of the initial Arcade Bot name and Spanish reference copy.
- **Full UI demo:** interactions should communicate the flow while remaining independent of real services.
- **Next.js routes:** selected instead of the template's hash router for direct links and browser history.
- **localStorage:** selected instead of refresh-only state to retain demo profiles and results.
- **Fixed player fixtures:** selected instead of the template's automatic score timer to honor the no-games requirement.
- **Reuse existing styles and fonts:** visual fidelity takes priority over introducing a new design system.
- **No real authentication or OAuth:** account and social UI are previews within this MVP.

## Risks

| Risk | Mitigation |
| --- | --- |
| Reference browser globals cannot run unchanged in Next.js. | Port to typed modules and isolate browser APIs in client components. |
| Saved data differs between server and first client render. | Hydrate storage after mounting and render stable defaults first. |
| English labels exceed the reference's Spanish control widths. | Adjust wrapping and spacing at the specified review widths. |
| Pixel fonts, long usernames, or ranking tables overflow on mobile. | Bound field lengths and adapt grid columns without removing content. |
| Demo actions could be mistaken for real accounts or games. | Label demo access and the player preview clearly. |

## What is **not** in this spec

- No games or gameplay implementation.
- No real users, authentication, payments, external integrations, or server-persisted results.
- No chatbot or Arcade Bot behavior.
