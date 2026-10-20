import type { Metadata } from "next";
import { Container, PageHeader, Tag } from "@/components/ui";
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
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <section
            key={group.title}
            aria-labelledby={`skill-group-${i}`}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h2 id={`skill-group-${i}`} className="font-semibold tracking-tight">
              {group.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{group.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
