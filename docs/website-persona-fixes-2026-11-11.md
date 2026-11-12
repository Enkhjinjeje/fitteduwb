# Persona-review fixes — November 11, 2026

Implemented against the local Fitted UWB project. No deployment or external service changes.

- **I01/I02/I10:** guarded the instant GSAP path, added a motion pause control and live reduced-motion handling, and made garment selection open a persistent, focused detail section in both ring and grid views. Selecting a garment pauses automatic discovery. Closing details restores the originating button's focus. Automatic preview notes no longer generate recurring live announcements.
- **I03:** added visible Events/Join navigation and a mobile purpose statement. The event year range is explicitly called an archive on desktop.
- **I04:** removed opacity reduction from event text labels and darkened Spring Swap's text color. All 12 normal-text palette pairs now calculate to at least 5.5:1. Large poster artwork itself was not recolored.
- **I05:** restored visible focus on hero/event stages and used current-color focus outlines across event palettes.
- **I06:** mobile event summaries use natural content height, full room text, larger arrow targets, and posters constrained by viewport height. The 720×450 reflow check places navigation fully inside the viewport.
- **I07:** removed early `.js` reveal hiding. Essential content is always visible; entrance animation is an optional translation after initialization. Footer destinations work with blocked or disabled JavaScript.
- **I08:** event URLs use `#event=<event-id>`, with direct entry, history navigation, Escape/Close, unknown-ID recovery, and an explicit event-link anchor. Native dialog opening replaces the earlier asynchronous view-transition wrapper; poster styling and text entrances remain.
- **I09:** profile fallbacks now say “Visit the club’s Instagram”; exact post links say “See the original post.” Garment details explicitly disclose unverified original photographer/source information. Original attribution cannot be reconstructed from the files available, and no sources or authors were invented.

Validation: `npx tsc --noEmit`, `npm run build -- --webpack`, and `tests/website-regressions.cjs`. The four Chromium/WebKit configurations also passed against the production build. Live reduced-motion changes stop the ring and hide the custom cursor. Browser regression evidence lives in `docs/fix-evidence-2026-11-11/`. Tests cover persistent selection and focus return, ring/grid views, all 12 event deep links, Back/Forward, Escape/Close, invalid IDs, 320/390px layouts, Chromium/WebKit, no browser exceptions, and blocked/disabled scripts. Additional checks cover live reduced-motion preference changes, image loading, calculated text contrast, and 720×450 reflow (equivalent CSS dimensions to a 1440×900 viewport at 200%; not an actual screen-reader or physical-device session).

The Impeccable detector reported two apparent missing-image warnings caused by JSX callback refs. Both images have real data-driven `src` values; browser checks found no broken loaded images. No unrelated design replacement was made.

Remaining limits: exact original image credits are unavailable; screen-reader sessions, real-device touch, and external Instagram/Linktree account flows were not tested. Existing review reports remain historical observations, not the final implementation state.
