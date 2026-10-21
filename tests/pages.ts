import { projects } from "../src/data/projects";
import { qaDocs } from "../src/data/qa";

// Every URL the site serves, with the <h1> expected on it
export const pages = [
  { path: "/", heading: "Samin Zaman" },
  { path: "/projects", heading: "Projects" },
  { path: "/framework", heading: "My Testing Framework" },
  { path: "/resume", heading: "Resume" },
  ...qaDocs.map((d) => ({
    path: `/projects/${d.slug}`,
    heading: projects.find((p) => p.slug === d.slug)!.title,
  })),
];
