# Samin Zaman · Portfolio

Live: https://samin-zaman1.github.io/portfolio-samin-zaman/

Static Next.js site. Playwright and axe-core run against every page in four browser configurations before each deploy.

```bash
npm install
npm run dev              # http://localhost:3000
npm run build            # static export to out/
npm test                 # serves out/ and runs the suite
```

| Spec | Checks |
| --- | --- |
| `tests/navigation.spec.ts` | nav links, console errors, resume PDF |
| `tests/projects.spec.ts` | project list, repo links, data, 404 |
| `tests/accessibility.spec.ts` | WCAG 2.1 AA |

Content lives in `src/data/`. CI (`.github/workflows/ci.yml`) deploys to GitHub Pages from `main` only when every test passes.

`scripts/fix-export-segments.mjs` works around a Next.js 16.4 static-export bug where prefetch files are written to paths the client doesn't request.
