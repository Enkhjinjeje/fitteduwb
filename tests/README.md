# Browser regressions

Install project dependencies and Playwright browsers (`npx playwright install chromium webkit`). Start the site on a local port, then run:

```sh
REVIEW_URL=http://127.0.0.1:4317 npm run test:browser
```

The tests launch isolated, anonymous browser contexts and make no external submissions. They save results/screenshots under `docs/fix-evidence-2026-11-11/`; running them again replaces those validation artifacts. The initial review's evidence folder is separate.

Coverage: persistent garment details in both views, focus return, event keyboard navigation, direct event links/history/unknown IDs, normal/reduced motion configurations, narrow layouts, Chromium/WebKit, and blocked/disabled JavaScript fallback. Physical devices and screen readers are not covered.
