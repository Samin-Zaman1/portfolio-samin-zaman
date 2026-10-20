// Workaround for Next.js 16.4 static export: the client prefetches segment data
// from flat paths (projects/__next.projects.__PAGE__.txt) but the export writes
// them nested (projects/__next.projects/__PAGE__.txt). On a static host such as
// GitHub Pages those requests 404. This copies each nested file to its flat name.
// Caught by TC-05 (no console errors). Remove once Next.js fixes the export.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const outDir = "out";
let copied = 0;

function filesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? filesIn(path) : [path];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (!statSync(path).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of filesIn(path)) {
        const flat = join(dir, `${name}.${relative(path, file).split(sep).join(".")}`);
        if (!existsSync(flat)) {
          copyFileSync(file, flat);
          copied++;
        }
      }
    } else {
      walk(path);
    }
  }
}

if (existsSync(outDir)) {
  walk(outDir);
  console.log(`fix-export-segments: added ${copied} flat segment file(s)`);
}
