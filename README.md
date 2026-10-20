# Samin Zaman · SQA Portfolio

Portfolio site for my software quality assurance work: case studies, skills, and real test artifacts. The site is tested by its own Playwright suite, which runs in GitHub Actions on every push.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Tests

```bash
npm run build            # static export to out/
npx playwright install   # first time only
npm test                 # serves out/ and runs all browsers + mobile
npx playwright show-report
```

## Deploy

`.github/workflows/ci.yml` runs lint, type check, build and the full Playwright suite on every push. On `main`, if everything passes, it rebuilds with the GitHub Pages base path and deploys to **https://samin-zaman1.github.io/portfolio-samin-zaman/**.

`scripts/fix-export-segments.mjs` runs after every build to work around a Next.js 16.4 static-export bug (prefetch files written to nested paths the client doesn't request). TC-05 fails if it's ever needed and missing.

| Spec | Covers |
| --- | --- |
| `tests/navigation.spec.ts` | TC-01 navigation, TC-05 console errors, TC-06 resume PDF |
| `tests/projects.spec.ts` | TC-02 project pages, TC-03 404 |
| `tests/accessibility.spec.ts` | TC-04 WCAG 2.1 AA with axe-core |
| `tests/data.spec.ts` | TC-07 data integrity |

The test plan and test cases are documented on the site's **Test Artifacts** page.

## Editing content

All content lives in `src/data/`:

- `site.ts`: name, intro, contact, stats, experience, education (resume PDF lives in `public/resume/`)
- `projects.ts`: case studies (each one gets its own page and is tested automatically)
- `skills.ts`: skill groups
- `artifacts.ts`: test plan, test cases, sample bug report
