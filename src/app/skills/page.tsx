import type { Metadata } from "next";
import { Container, PageHeader, tints } from "@/components/ui";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Toolbox"
        title="Skills"
        description="The practices, techniques and tools I use to find problems early and keep them from coming back."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <section
            key={group.title}
            aria-labelledby={`skill-group-${i}`}
            className="overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div className={`${tints[i % tints.length]} px-6 py-5`}>
              <h2 id={`skill-group-${i}`} className="text-lg font-bold tracking-tight">
                {group.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{group.description}</p>
            </div>
            <ul className="flex flex-wrap gap-2 p-6">
              {group.items.map((item) => (
                <li key={item} className="rounded-full bg-background px-3 py-1.5 text-sm font-medium ring-1 ring-border">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
