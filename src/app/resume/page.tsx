import type { Metadata } from "next";
import { Container, Section, linkStyle } from "@/components/ui";
import { asset, education, experience, site, tools } from "@/data/site";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <Container>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
        <a href={asset(site.resumePdf)} download className={`${linkStyle} text-sm font-medium`}>
          Download PDF
        </a>
      </div>

      <Section id="experience-heading" title="Experience">
        {experience.map((job) => (
          <div key={job.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold">
                {job.role}, {job.company}
              </h3>
              <p className="text-sm text-muted">{job.period}</p>
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted">
              {job.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section id="education-heading" title="Education">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <p className="font-semibold">{education.degree}</p>
          <p className="text-sm text-muted">{education.period}</p>
        </div>
        <p className="mt-1 text-sm text-muted">{education.school}</p>
      </Section>

      <Section id="tools-heading" title="Tools">
        <p className="text-sm leading-7 text-muted">{tools.join(", ")}</p>
      </Section>
    </Container>
  );
}
