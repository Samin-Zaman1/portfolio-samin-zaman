import { projects } from "../src/data/projects";

// Every URL the site serves, with the <h1> expected on it
export const pages = [
  { path: "/", heading: "Samin Zaman" },
  { path: "/projects", heading: "Projects" },
  { path: "/skills", heading: "Skills" },
  { path: "/artifacts", heading: "Test Artifacts" },
  { path: "/resume", heading: "Resume" },
  ...projects.map((p) => ({ path: `/projects/${p.slug}`, heading: p.title })),
];
