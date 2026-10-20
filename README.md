# Samin Zaman · SQA Portfolio

Portfolio site for my software quality assurance work: case studies, skills, and real test artifacts. The site is tested by its own Playwright suite, which runs in GitHub Actions on every push.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Tests

```bash
npm run build
npx playwright install   # first time only
npm test                 # all browsers + mobile
npx playwright show-report
```

| Spec | Covers |
| --- | --- |
| `tests/navigation.spec.ts` | TC-01 navigation, TC-05 console errors |
| `tests/projects.spec.ts` | TC-02 project pages, TC-03 404 |
| `tests/accessibility.spec.ts` | TC-04 WCAG 2.1 AA with axe-core |
| `tests/data.spec.ts` | TC-06 data integrity |

The test plan and test cases are documented on the site's **Test Artifacts** page.

## Editing content

All content lives in `src/data/`:

- `site.ts`: name, intro, contact links, resume path
- `projects.ts`: case studies (each one gets its own page and is tested automatically)
- `skills.ts`: skill groups
- `artifacts.ts`: test plan, test cases, sample bug report
