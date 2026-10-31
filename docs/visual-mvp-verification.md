# Arcade Vault visual MVP verification

Verified on 2026-10-30 for SPEC 01 on `spec-01-arcade-vault-visual-mvp`.

## Build and regression checks

- `npm run build`: passed, including TypeScript and prerendering.
- `npm run lint`: passed without warnings.
- `npm test`: passed. Six behavioral cases cover defaults, corrupt/incompatible storage, blocked storage, normalization and record validation, credential exclusion, deterministic fixtures, and stable score merging.
- Build-manifest inspection confirmed all eight detail and eight player-preview paths.
- All six font references resolve to local TrueType files.
- Reference files remain unchanged.
- Source inspection found no gameplay timer, animation-frame game loop, or network request in application code.

## Browser checks

| Screen | 390px | 768px | 1440px |
| --- | --- | --- | --- |
| Library | Pass | Pass | Pass |
| Game details | Pass | Pass | Pass |
| Demo authentication | Pass | Pass | Pass |
| Hall of Fame | Pass | Pass | Pass |
| Player preview | Pass | Pass | Pass |

All fifteen checks passed without page-level horizontal overflow or controls extending beyond the viewport. The mobile ranking cells were also inspected separately.

Verified interactions:

- Combined search/category filtering and the empty-result state.
- Card navigation, direct routes, browser Back/Forward, and invalid detail/player IDs.
- Sign-in and sign-up tabs, field validation, social-button feedback, and guest access.
- Demo profile persistence through refresh and persistent sign-out.
- Fixed HUD values, pause/resume, end-session modal, and replay reset.
- Dialog initial focus, forward/backward Tab wrapping, Escape, and focus restoration.
- Mobile drawer opening, focus wrapping, Escape, and focus return.
- Double-clicking Save creates one saved record for that completion.
- Saved scores remain after refresh and guest access, with matching detail/Hall rankings and personal best.
- Keyboard selection of Hall of Fame tabs.
- Final English page metadata, local fonts, and rendered CSS cover artwork.
- No application warnings or errors in the browser console.

Reduced-motion rules were audited in the stylesheet: decorative animations/transitions are disabled, ranking rows retain visibility, and saved-score confirmation retains its full width. Media preference emulation is not available in the browser harness, so this check used CSS inspection rather than browser emulation.

## Visual evidence

Screenshots are retained with the completing Codex chat in the `arcade-vault-mvp` artifact directory. They cover the library, empty results, details, both auth tabs, Hall of Fame, mobile rankings, mobile navigation, and player normal/paused/end/saved states. `layout-checks.json` and `checks-summary.json` record the browser checks.

## Scope

The application is a visual demo. It includes no playable games, real accounts, OAuth integrations, or remote leaderboard services. Preview scores remain fixed at 12,500 points.
