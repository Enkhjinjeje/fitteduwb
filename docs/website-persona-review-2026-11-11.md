# Fitted UWB — 30-persona website review

Reviewed November 11, 2026 (America/Los_Angeles). Target: local working tree at `262cb6c296e638387cb845d7ebfc77d6dcdeee8e`, package version 2.0.0, served at http://127.0.0.1:4317. This is fresh browser and source review, not a production audit. One reviewer simulated all 30 perspectives; no research participants, independent reviewers, or accounts were created. No application fixes or deployment were performed.

## Verdict

The clothing ring, club identity, and poster-specific event treatments are distinctive. The event sheets offer useful text dates, places, and descriptions instead of requiring visitors to decipher posters. The archive works in completed phone journeys, including all 12 events.

Fix the clothing interaction first: reduced-motion selection throws a JavaScript exception, and grid buttons promise styling advice but do nothing. Then address mobile orientation, contrast/focus, clipped event summaries, and recovery when scripts fail. There is no verified P0 blocker. The P1 finding concerns the reduced-motion clothing journey; the event archive remains available.

## Product and route map

- `/`: the only application page, with a 26-piece clothing explorer, 12-event archive, and contact/footer section.
- `/#top` and `/#events`: existing internal destinations. These are states of the same route, not extra pages.
- Event details are native dialogs controlled by component state. There are no individual event URLs.
- Instagram profile/post links and Linktree are outbound destinations. Their URLs were inspected; external service functionality and previews were not tested.
- No accounts, editor, uploads, checkout, user profiles, moderation, reporting, or on-site search/filtering. Those absences are not defects in this club showcase.
- Events range from May 15, 2025 to May 19, 2026. This is an archive as of the review date; the footer directs visitors elsewhere for new events. No claim is made about the club's actual current schedule.

## All 30 perspectives

Evidence: **Browser** = observed locally; **Code** = implementation evidence; **Measured** = stated calculation/measurement; **Assessment** = judgment/proposal; **N/A** = unsupported task; **Untested** = evidence unavailable. Prompt IDs are defined below.

| ID / Persona | Task | What works | Problems or opportunities | Evidence / issue IDs | Prompt IDs |
|---|---|---|---|---|---|
| 01 / Curious newcomer | Understand the club and find participation links | Desktop purpose sentence and clear footer destinations | Mobile hides purpose; joining requires reaching footer; surface a short explanation and link | Browser + Code, I03 | B |
| 02 / Veteran | Find a known outfit or event | Clothing grid, event Next/Previous and Home/End | Grid selection is inert; an event index would shorten repeat visits | Browser, I02; Assessment, I03 | A, B |
| 03 / Evidence researcher | Trace event claims and image origins | Posters, text facts, several exact Instagram posts | Six event links go to the general profile; clothing has no per-image provenance | Code, I09 | E |
| 04 / Creator | Draft and publish club content | Existing curated event presentation is readable | N/A: no publishing surface; no draft/publication claim tested | Code; N/A | — |
| 05 / Beginner at design | Publish readable work using defaults | Event sheets consistently separate facts and description | N/A: no editor/defaults to operate; event typography contrast is a reader issue | N/A; Measured, I04 | C |
| 06 / Experienced evidence creator | Compose sourced visual stories | Poster plus recap structure supports context | N/A: no composition tools; provenance could be more specific | N/A; Code, I09 | E |
| 07 / UI/UX expert | Predict behavior across views | Labeled view controls and native event dialogs | Grid preserves actionable labels while disabling the action | Browser + Code, I02 | A |
| 08 / Screen-reader user | Identify controls and hear event facts | Named buttons, labeled dialog, event live status, alt text | Grid action mismatch; timed clothing announcements may interrupt reading; actual AT untested | Code + Browser, I02/I10; Untested AT | A |
| 09 / Low-vision reader | Read event facts on narrow screens | Text equivalents for poster facts; no hero horizontal overflow in samples | Spring Swap body contrast 3.98:1; several muted labels lower; compact summary clips | Measured + Browser, I04/I06; 200% zoom untested | B, C |
| 10 / Slow-phone visitor | Load and explore on limited bandwidth | Small WebP clothing assets; lazy loading on distant posters/recaps | Initial image transfer roughly 0.93–1.00 MB in Chromium dev runs; production speed untested | Measured, coverage below; no verified speed defect | — |
| 11 / Non-native English speaker | Understand club purpose and actions | Plain event formats and When/Where labels | Mobile loses plain purpose statement; jargon such as blokecore could have optional explanations | Browser, I03; glossary is Assessment | B |
| 12 / Streamer sharing links | Share one event with context | Several direct Instagram post links | Opening a sheet does not create an event URL; recipient cannot reopen that state | Browser + Code, I08 | B |
| 13 / Safety-minded moderator | Review reported material | No public posting surface discovered | N/A: no moderation workflow or authorized moderator account | Code; N/A | — |
| 14 / Privacy sceptic | Understand participation and data exposure | Local page asks for no personal information; outbound arrows identify departure | External sign-up privacy/retention untested; no privacy violation inferred | Code + Browser; Untested external services | — |
| 15 / Spoiler-sensitive explorer | Avoid story spoilers | Club events and clothing contain no narrative reveal mechanic | N/A: spoiler controls would not serve this content | Assessment; N/A | — |
| 16 / Returning researcher | Identify recent events or changes | Explicit event dates and archive year range | Archive begins oldest; optional newest/index access; no fabricated update history | Code + Browser; Assessment, I03 | B |
| 17 / Interrupted mobile writer | Resume a draft after interruption | Browsing does not require composing input | N/A: no drafts/editor; event state is not shareable/persistent | N/A; Code, I08 | B |
| 18 / Attribution-conscious artist | Verify credit and submit work | Footer distinguishes club posters from third-party clothing photos | Upload N/A; generic Pinterest credit cannot identify the original image maker | Code, I09 | E |
| 19 / Shared-link reader | Open the specific event someone recommends | `#events` reaches the archive; dialogs give context | No addressable event detail state; provide stable event URLs | Browser + Code, I08 | B |
| 20 / Keyboard-only visitor | Explore without precision pointing | First Tab reaches skip link; Home/End and Escape work | Focus outline absent on the hero/event stages; grid buttons inert | Browser + Code, I05/I02 | A, C |
| 21 / Dyslexia/attention needs | Read styling advice at own pace | Short descriptions and labeled event facts | Advice is scheduled to disappear; fixed mobile summary space clips text | Code, I10; Browser, I06 | A, B |
| 22 / Motion-sensitive visitor | Browse with reduced motion enabled | Ring remains stationary before interaction; event transitions are bypassed | Clothing selection throws `Cannot access 'tw' before initialization` | Browser + Code, I01 | A |
| 23 / Intermittent connection | Keep essential information usable after failure | Loaded archive advances after context is set offline | Blocking JS bundles leaves footer CTAs at opacity zero; use visible defaults | Browser + Code, I07 | D |
| 24 / Shared-device user | Leave without exposing an account | No local sign-in or private draft surface | N/A: local logout/session separation; external account sessions untested | Code; N/A/Untested | — |
| 25 / Password-manager user | Sign in using autofill | No password entry required for local browsing | N/A: no local credential forms; Linktree/Instagram login not exercised | Code; N/A | — |
| 26 / Mobile photographer | Upload a phone photo | Existing recap images have alt text and outbound links | N/A: upload, orientation, progress, and metadata workflows absent | Code; N/A | — |
| 27 / Profile curator | Control public identity | Club name, branding, and social destinations are consistent | N/A: no editable visitor profile or public/private identity controls | Browser + Code; N/A | — |
| 28 / Harassment reporter | Submit a safe report | No visitor-authored posts on this page | N/A: no on-site reporting workflow; no real report submitted | Code; N/A | — |
| 29 / First contributor | Join or make a first contribution | Footer explicitly identifies RSVP/sign-up destination | Publishing N/A; make participation discoverable before a long archive | Browser + Assessment, I03 | B |
| 30 / Different-browser visitor | Use the archive with another engine | Chromium and WebKit completed 12-event phone runs; view-transition fallback exists | Broad compatibility unproven; intermittent automated runs listed below | Browser + Code; Untested Firefox/real devices | — |

## Prioritized evidence ledger

### I01 — P1: reduced-motion clothing selection throws

**Browser + Code.** At 390×844 with `prefers-reduced-motion: reduce`, switch to grid, activate the Dior item with Enter, return to Ring view, and activate it again. The page error is `Cannot access 'tw' before initialization`; one picked note stays at opacity zero. A separate reduced-motion click run also showed an incomplete pair.

`components/hero/use-ring.ts:151` constructs a zero-duration tween for reduced motion; its completion callback at line 163 references `tw` during the initialization of that binding. Handle the instant path explicitly and publish a complete, stable selection. Preserve the stationary ring and reduced event motion. Affects 08, 20, 22. Evidence: `focus.json`, `edge.json`, `reduced-click.png`. Limited to local development Chromium; not reproduced in a production build.

### I02 — P2: clothing grid has inert action buttons

**Browser + Code.** Select Grid view, then activate “Dior Sports crewneck … Show how to wear it.” by pointer or Enter. Grid stays selected and both note panels remain `display:none`; no styling information appears. `components/hero/use-ring.ts:202` returns early outside carousel view, although `components/hero/ring-hero.tsx:33` retains the same button action/label. Render the selected advice in grid view or explicitly switch to a usable detail view. Preserve the fast visual overview. Affects 02, 07, 08, 20. Evidence: `focus.json`, initial/checks JSON, grid captures. Some animation-sensitive pointer attempts timed out; keyboard reproduction independently confirmed the mismatch.

### I03 — P2: mobile entry does not explain the club or expose participation

**Browser + Code; recommendation partly Assessment.** At 390px and 320px, the purpose paragraph is `display:none` (`components/hero/ring-hero.tsx:75`). At 320×568 the 780px minimum hero puts even its bottom name/view controls below the first screen (`:18`). The only top link is the husky's back-to-top action. Signup destinations are in `components/site/footer.tsx:19`, after a 925svh event section (`components/events/loop-scroll.tsx:72`).

Keep a brief club explanation and visible Events/Join anchors on phones. Clarify that the local events are an archive, with current signups external. A compact index/newest shortcut is an optional enhancement, not a missing-feature defect. Preserve the ring, husky, and poster identities. Affects 01, 02, 11, 16, 29. Evidence: hero captures and `checks.json`. No assertion that the club has ceased running events.

### I04 — P2: small event text lacks sufficient contrast

**Measured + Code.** Calculated sRGB relative luminance from `lib/data.ts` colors and CSS opacity composited over each event ground. Spring Swap's `#1b78b5` on `#fde4ef` is **3.98:1** for normal-sized date/body text; 60%-opacity labels are **2.22:1** and 70% labels **2.57:1**. Christmas 60% labels are **2.84:1**, hiking **2.59:1**. These are below the 4.5:1 normal-text criterion. Large titles have a different threshold and are not all failures.

Adjust text tokens/opacity while preserving poster colors and display faces. References: `lib/data.ts:132`, `components/events/event-sheet.tsx:41`, `:45`, `components/events/event-reel.tsx:74`. Affects 05, 09, 21. Evidence: `contrast.json`, Spring Swap sheet capture. This is a targeted contrast calculation, not whole-site accessibility certification or a scan of poster lettering.

### I05 — P2: keyboard stages suppress visible focus

**Browser + Code.** Focus the event stage and use Home/End. Navigation changes the event, but computed outline style is `none` even though the element is focused. Both that stage and the hero have `tabIndex=0` plus `outline-none`. References: `components/events/event-reel.tsx:59`, `components/hero/ring-hero.tsx:12`; global focus style at `app/globals.css:72` is overridden. Add an intentional visible focus state. Preserve skip navigation, named buttons, and native dialog Escape/focus return. Affects 08, 09, 20. Evidence: `initial-checks.json`, `checks.json`, `focus.json`. No actual screen-reader session.

### I06 — P2: compact event summary clips location

**Browser + Code.** At 320×568, navigate to DIY Meet × Stitched. In the reel the date/location text shows “DISC” but its room continuation is clipped. The title/metadata region is only 22% of a stage with a 600px minimum height, with `overflow-hidden`; its title wraps to two lines. Bottom controls also extend partly below this viewport. The complete information remains available in the scrollable detail dialog.

References: `components/events/event-reel.tsx:64`, `:119`, `:134`, `:149`. Allow content-dependent summary space and keep navigation visible on short phones without removing the event typography. Affects 09, 10, 21. Evidence: `events-chromium-320-last.png`; opened detail samples at 320px. True 200% browser zoom and landscape devices were not tested.

### I07 — P2: failed bundles hide essential footer content

**Browser + Code.** In a fresh context, abort requests matching `**/_next/static/**/*.js`, allow the document/CSS to load, and scroll to the footer. Inline code still sets `.js`; reveal observers never run. The contact button group has opacity zero. References: `app/layout.tsx:31`, `app/globals.css:85`, `components/site/effects.tsx:12`, `components/site/footer.tsx:22`.

Make content visible by default; apply entrance hiding only when the reveal controller can run, with a fail-open path. Affects 01, 10, 23, 29. Evidence: `edge.json`, `blocked-scripts-footer.png`. This is a synthetic script-failure state, not proof that production bundles normally fail. Already loaded event navigation advanced successfully offline; cache misses/external services remain untested.

### I08 — P2: event details cannot be shared or reopened by URL

**Browser + Code.** Open a poster, inspect/copy the address, and open that address in a fresh visit: the event selection is not encoded in it. `show()` only updates React state and opens a dialog (`components/events/event-reel.tsx:45`). Event IDs already exist in `lib/data.ts:7`.

Add stable event state in a hash/query/route with refresh, Back/Forward, unknown-ID recovery, and focus behavior. Preserve the single-page reel and direct Instagram sources. Affects 12, 17, 19. Evidence: URLs in `checks.json`/`events.json`; source. No social-service preview test and no claim that existing links are broken.

### I09 — P3: provenance can be more specific

**Code; enhancement.** Six event `post` values use the Instagram profile rather than an exact post (first general meeting, Christmas, hidden gems, bins, Lunar New Year, runway). Clothing type has no source/creator fields (`lib/pieces.ts:1`); footer offers only a generic Pinterest explanation (`components/site/footer.tsx:49`). Exact links on the other events are a strength.

Add only verified original links/credits and distinguish profile fallback wording from “See it” when no exact source is available. Do not invent rights, authors, or URLs. Affects 03, 06, 18. External destination availability and ownership were not verified; this is not a legal finding.

### I10 — P2: styling advice has a fixed reading window

**Code; runtime timing not fully validated.** A picked pair is scheduled to return after `FLY_DUR + SPOT_HOLD`, with `SPOT_HOLD=5`, followed by another automatic pair (`components/hero/use-ring.ts:30`, `:222`). The UI exposes ring/grid controls but no persistent selection/pause-reading control. Grid is not a working reading alternative because of I02. Notes are polite live regions (`components/hero/ring-hero.tsx:104`).

Keep user-selected advice visible until dismissed or replaced, and offer a clear pause for automatic movement/selection. Preserve optional animated discovery. Affects 08, 11, 20, 21, 22. This timing concern is source-confirmed; no claim is made about actual screen-reader announcement interruption. Reduced-motion errors can alter normal scheduling.

## Copyable fix prompts

### A — Clothing interaction and motion (I01, I02, I10)

> Recheck I01/I02/I10 against current `components/hero/use-ring.ts` and `ring-hero.tsx`. Local Chromium with reduced motion throws “Cannot access 'tw' before initialization” on clothing selection; the zero-duration GSAP completion references its initializing tween. Grid item buttons promise advice but `showPair` returns outside carousel mode. Source also schedules advice to disappear after a fixed hold. Make both views offer stable, keyboard-operable styling details, implement a safe instant path, and keep explicit selections readable until changed/dismissed. Preserve the clothing ring, grid overview, visual identity, and optional motion. Scope changes to these interactions. Verify pointer/Enter selection in both views, repeated toggles, no console exceptions, reduced-motion first load and preference changes, stable focus, and a usable pause/reading control. Recheck current code, follow project instructions, report results and remaining limits. Do not deploy or mutate production unless separately authorized.

### B — Mobile entry, archive navigation, and event links (I03, I06, I08)

> Recheck I03/I06/I08 in `components/hero/ring-hero.tsx`, `components/events/event-reel.tsx`, `loop-scroll.tsx`, and `lib/data.ts`. Mobile hides the club purpose; participation links occur after the long archive. At 320×568 the final event's room text is clipped. Event dialogs have no URL state. Preserve the ring, poster typography, native dialog, and existing event facts. Add a concise mobile purpose/Events/Join path, let event summaries fit short viewports, and make event details addressable with sensible history and focus behavior. Treat a full archive index as an optional proposal unless requested. Verify 320/390px, desktop, 200% zoom, direct entry/refresh/Back/Forward, unknown event IDs, dialog dismissal, and access to untruncated location text. Recheck current code, follow project instructions, report results and limits. Do not deploy or mutate production unless separately authorized.

### C — Contrast and visible focus (I04, I05)

> Recheck I04/I05 in `lib/data.ts`, `components/events/event-sheet.tsx`, `event-reel.tsx`, `components/hero/ring-hero.tsx`, and `app/globals.css`. Calculated Spring Swap normal text contrast is 3.98:1; its muted labels fall to 2.22–2.57:1. Several other muted palettes also fall below 4.5:1. Keyboard-focusable hero/event stages suppress outlines. Preserve poster identity, large display faces, text facts, skip link, and dialog semantics. Bound changes to accessible text colors/opacity and focus treatments. Check all 12 palettes at settled states, all keyboard controls, short-phone reflow, and 200% zoom; distinguish large-text thresholds and disabled controls. No screen-reader session or full certification was completed in the review. Recheck current code, follow project instructions, report checks and limits. Do not deploy or mutate production unless separately authorized.

### D — Content survives script failure (I07)

> Recheck I07 in `app/layout.tsx`, `app/globals.css`, `components/site/effects.tsx`, and `footer.tsx`. In a fresh local browser, blocking Next static JS bundles leaves `.js` set and the footer contact group at opacity zero. Keep essential content visible if initialization fails while preserving optional reveal animation when it succeeds. Scope to progressive enhancement and essential link access, not new infrastructure. Verify normal load, delayed/blocked bundles, JavaScript disabled, reduced motion, and loaded-page offline navigation; verify Instagram/Linktree links stay visible and keyboard reachable. Production timing was not measured. Recheck current code, follow project instructions, report results and limits. Do not deploy or mutate production unless separately authorized.

### E — Verified source credit (I09, optional)

> Recheck the I09 provenance opportunity in `lib/data.ts`, `lib/pieces.ts`, `components/events/event-sheet.tsx`, and `components/site/footer.tsx`. Six event links currently point at the general profile; clothing has generic Pinterest credit and no per-image origin fields. Propose a minimal verified-source/credit model, preserving the exact links already present and the club's clear non-affiliation statement. Do not fabricate sources, authorship, or rights. Use honest profile-fallback labels where exact evidence is unavailable. If approved for implementation, check every new destination and accessible label, and list unresolved sources. Follow project instructions; do not contact creators, publish, or deploy without separate authorization.

## Coverage, measurements, and limits

- **One unique local application route**, plus the observed `#top` and `#events` anchors, clothing states, and dialogs. Dialog attempts are not extra pages. No guessed-URL 404 findings.
- Headless Playwright Chromium at **1440×900, 390×844, 320×568**; WebKit at **390×844**. Initial/corrected batches each had five engine/viewport/motion configurations; a further four-configuration reduced-motion event batch isolated archive navigation. Additional focused sessions checked script failure, offline behavior, keyboard, and reduced-motion selection.
- Completed 12 distinct event dialogs in Chromium 390px with normal motion, Chromium 390px/320px with reduced motion, and WebKit 390px in the corrected normal workflow with reduced motion. Desktop targeted run reached ten distinct named dialogs before an inconsistent state/timeout. Some later attempted dialog entries returned no heading or revisited earlier events; these were **not** counted as coverage of those event variants. See raw JSON.
- Visual inspection of desktop hero, 320px hero, 390px opening sheet, 320px Spring Swap sheet and last-event reel, and reduced-motion selection. Additional screenshots retained for review, not all visually inspected.
- Keyboard: skip-link first Tab/activation, event Home/End, grid Enter selection, dialog Escape and focus return. This is **not** an actual assistive-technology session. Live announcements, 200% zoom, Firefox, real-device touch, mobile browser chrome, and landscape remain untested.
- Contrast: explicit sRGB calculation across all 12 event text/background pairs, including 60% and 70% alpha labels. Not a complete audit of all images, hover states, transitions, or focus color contrast.
- Performance: localhost development build, desktop host, no network/CPU throttling. Chromium initial resource entries reported approximately **6.50–6.57 MB total transfer**, including dev tooling, and **0.93–1.00 MB image transfer**. These are Resource Timing sums after settling, not production performance, LCP, or a slow-phone benchmark. WebKit image transfer values were zero/unusable. No infrastructure upgrade is recommended from these measurements.
- Production build unavailable: default sandbox build failed to fetch Google Fonts; escalated Turbopack failed to bind a worker port; webpack production build failed inside `next/font` with a null-match error. Development webpack served the actual source without code changes. These are recorded environment/build limitations, not a claim that the deployed site is down.
- Python Playwright unavailable; used installed Node Playwright. Sandbox browser launch failed, then approved isolated launch succeeded. Initial automated “Next” selection collided with Next's development toolbar and was corrected to scope to `#events`. Subsequent animation-sensitive timeouts and one `Unexpected end of JSON input` were retained as unresolved test instability, not elevated to verified site defects.
- No production URL, authorized account, external service sign-in, public post/report, purchase, upload, email, password change, deletion, or deployment was exercised. Private-data workflows are N/A locally; external service behavior is untested.
- Source inspected: page/layout, global CSS, hero/ring logic, event scroll/reel/sheet, footer/header/effects, event and piece data, package/config. No backend or local account persistence was found in this small codebase. No comprehensive security assessment was performed.
- `next dev` generated `AGENTS.md`; read its project guidance. Application source was left unchanged. Local review server stopped after evidence collection.

## Saved evidence

`docs/review-evidence-2026-11-11/` contains `initial-checks.json`, `checks.json`, `events.json`, `edge.json`, `focus.json`, `contrast.json`, screenshots, and the four browser scripts. Scripts contain the original local absolute path and localhost port and may need adjustment before reuse. They are review harnesses, not a new maintained test suite. Failed attempts and partial observations are retained. No credentials or unrelated user data were captured.
