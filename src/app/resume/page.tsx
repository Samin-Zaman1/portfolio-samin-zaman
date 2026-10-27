import type { Metadata } from "next";
import { Band, Button, Chip, Container, Section } from "@/components/ui";
import { activities, asset, education, experience, postman, site, tools } from "@/data/site";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <>
      <Band>
        <h1 className="text-4xl font-extrabold tracking-tight">Resume</h1>
        <p className="mt-4 text-lg text-muted">
          {site.role} · {site.location}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={asset(site.resumePdf)} download>Download PDF</Button>
          <Button href={`mailto:${site.email}`} variant="outline">{site.email}</Button>
        </div>
      </Band>

      <Container>
        <Section id="experience-heading" title="Experience">
          {experience.map((job) => (
            <div key={job.period}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-bold">{job.role}</h3>
                <p className="font-mono text-xs text-accent-strong">{job.period}</p>
              </div>
              <p className="text-sm text-muted">{job.where}</p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 leading-7 marker:text-accent">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section id="postman-heading" title="API testing in Postman">
          <ul className="list-disc space-y-1.5 pl-5 leading-7 marker:text-accent">
            {postman.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Section>

        <Section id="education-heading" title="Education">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="font-bold">{education.degree}</p>
            <p className="font-mono text-xs text-accent-strong">{education.period}</p>
          </div>
          <p className="text-sm text-muted">{education.school}</p>
        </Section>

        <Section id="activities-heading" title="Activities">
          {activities.map((a) => (
            <div key={a.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="font-bold">{a.role}</p>
                <p className="font-mono text-xs text-accent-strong">{a.period}</p>
              </div>
              <p className="text-sm text-muted">{a.org}</p>
            </div>
          ))}
        </Section>

        <Section id="tools-heading" title="Tools">
          <ul className="flex flex-wrap gap-2">
            {tools.map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </>
  );
}
