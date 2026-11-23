# Samin Zaman · Portfolio

Live: https://samin-zaman1.github.io/portfolio-samin-zaman/

One static page: `index.html` (HTML, CSS and JS in one file) plus `resume/`. No framework, no build step.

```bash
npm install
npm start                # http://localhost:3000
npm test                 # Playwright against the served page
```

| Spec | Checks |
| --- | --- |
| `tests/page.spec.ts` | console errors, section links, resume PDF, ticket rows |
| `tests/bugs.spec.ts` | the 3 deliberate bugs: hover report, click and keyboard filing, counter, green build |
| `tests/layout.spec.ts` | no horizontal scroll and readable text at 1280, 768 and 390px |
| `tests/accessibility.spec.ts` | WCAG 2.1 AA with axe-core, before and after the bugs are filed |
| `tests/links.spec.ts` | every link resolves, contact links filled in |

Real bugs in the page are kept as `test.fail()` with a comment, so the suite flags them as fixed when they stop failing.

CI (`.github/workflows/ci.yml`) runs the tests on every push and pull request, and deploys `index.html` and `resume/` to GitHub Pages from `main` only when they pass.
