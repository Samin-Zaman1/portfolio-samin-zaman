import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Resume & contact"
        title="Resume"
        description="Open to SQA, test automation and QA engineering roles."
      />

      <section aria-labelledby="contact-heading" className="mt-10">
        <h2 id="contact-heading" className="text-xl font-semibold tracking-tight">
          Contact
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
          <li>
            <a href={`mailto:${site.email}`} className="inline-block rounded-full bg-foreground px-5 py-3 text-background hover:opacity-85">
              {site.email}
            </a>
          </li>
          {site.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer" className="inline-block rounded-full border border-border px-5 py-3 hover:border-foreground">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cv-heading" className="mt-12 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="cv-heading" className="text-xl font-semibold tracking-tight">
            CV
          </h2>
          {site.resumePdf && (
            <a href={site.resumePdf} download className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-foreground">
              Download PDF
            </a>
          )}
        </div>
        {site.resumePdf ? (
          <object
            data={site.resumePdf}
            type="application/pdf"
            aria-label="Resume PDF"
            className="mt-4 h-[80vh] w-full rounded-xl border border-border"
          >
            <p className="p-6 text-sm text-muted">
              The PDF can’t be shown here.{" "}
              <a href={site.resumePdf} className="underline">Download it instead.</a>
            </p>
          </object>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed border-border p-6 text-muted">
            Resume PDF coming soon. Email me for a copy in the meantime.
          </p>
        )}
      </section>
    </Container>
  );
}
