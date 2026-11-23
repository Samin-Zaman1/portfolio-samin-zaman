# Samin Zaman · Portfolio

Live: https://samin-zaman1.github.io/portfolio-samin-zaman/

One static page: `index.html` (HTML, CSS and JS in one file) plus `resume/`. No framework, no build step.

```bash
npm install
npm start                # http://localhost:3000
npm test                 # Playwright against the served page
```

CI (`.github/workflows/ci.yml`) runs the tests on every push and pull request, and deploys `index.html` and `resume/` to GitHub Pages from `main` only when they pass.
