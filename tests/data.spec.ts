import { expect, test } from "@playwright/test";
import { testCases } from "../src/data/artifacts";
import { projects } from "../src/data/projects";
import { existsSync } from "node:fs";

test.describe("TC-07 project data integrity", () => {
  test("slugs are unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  for (const p of projects) {
    test(`${p.slug} is complete`, () => {
      expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      for (const field of ["title", "summary", "context"] as const) {
        expect(p[field].trim(), field).not.toBe("");
      }
      for (const field of ["scope", "approach", "tools", "outcomes"] as const) {
        expect(p[field].length, field).toBeGreaterThan(0);
      }
    });
  }
});

test("every documented test case points at a real spec file", () => {
  for (const tc of testCases) {
    expect(existsSync(tc.spec), `${tc.id} → ${tc.spec}`).toBe(true);
  }
});
