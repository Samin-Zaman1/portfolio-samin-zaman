import type { Metadata } from "next";
import { ButtonAnchor, Container, PageHeader, PassMark, SectionTitle } from "@/components/ui";
import { activities, asset, education, experience, site } from "@/data/site";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  const pdf = asset(site.resumePdf);

  return (
    <Container>
      <PageHeader
        eyebrow="Resume & contact"
        title="Resume"
        description="Open to SQA, test automation and QA engineering roles, on-site in Dhaka or remote."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonAnchor href={pdf} download>
          Download PDF
        </ButtonAnchor>
        <ButtonAnchor href={`mailto:${site.email}`} variant="secondary">
          {site.email}
        </ButtonAnchor>
        <ButtonAnchor href={site.github} target="_blank" rel="noreferrer" variant="secondary">
          GitHub ↗
        </ButtonAnchor>
      </div>

      <section aria-labelledby="experience-heading" className="mt-16">
        <SectionTitle id="experience-heading">Experience</SectionTitle>
        {experience.map((job) => (
          <article key={job.company} className="mt-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-bold">{job.role}</h3>
              <p className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-accent-strong">{job.period}</p>
            </div>
            <p className="mt-1 text-sm font-medium text-muted">
              {job.company} · {job.detail}
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <PassMark />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <section aria-labelledby="education-heading" className="rounded-2xl bg-sky p-6 sm:p-8">
          <h2 id="education-heading" className="text-xl font-bold tracking-tight">Education</h2>
          <p className="mt-4 font-semibold">{education.degree}</p>
          <p className="text-sm text-muted">{education.school} · {education.period}</p>
        </section>
        <section aria-labelledby="activities-heading" className="rounded-2xl bg-lilac p-6 sm:p-8">
          <h2 id="activities-heading" className="text-xl font-bold tracking-tight">Activities</h2>
          {activities.map((a) => (
            <div key={a.role} className="mt-4">
              <p className="font-semibold">{a.role}</p>
              <p className="text-sm text-muted">{a.org} · {a.period}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
                {a.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>

      <section aria-labelledby="cv-heading" className="mt-16">
        <SectionTitle id="cv-heading">CV (PDF)</SectionTitle>
        <object
          data={pdf}
          type="application/pdf"
          aria-label="Resume PDF"
          className="mt-6 h-[85vh] w-full rounded-2xl border border-border bg-surface"
        >
          <p className="p-6 text-sm text-muted">
            The PDF can’t be shown here.{" "}
            <a href={pdf} className="font-medium text-accent-strong underline">Download it instead.</a>
          </p>
        </object>
      </section>
    </Container>
  );
}
