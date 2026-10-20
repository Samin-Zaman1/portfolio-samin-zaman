export const site = {
  name: "Samin Zaman",
  role: "Software Quality Assurance Engineer",
  // TODO: replace with your own introduction
  intro:
    "I test software the way users break it. I plan risk-based test coverage, automate the regressions that matter, and write bug reports developers can act on in one read.",
  // TODO: fill in your real contact details
  email: "you@example.com",
  links: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  // TODO: drop your resume at public/resume/resume.pdf and set this to "/resume/resume.pdf"
  resumePdf: "",
};

// Each page's <h1> must match its label; tests/navigation.spec.ts relies on it
export const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/artifacts", label: "Test Artifacts" },
  { href: "/resume", label: "Resume" },
];
