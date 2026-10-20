import type { Metadata } from "next";
import Link from "next/link";
import { ButtonAnchor, ButtonLink, Container, PageHeader, PassMark, SectionTitle, tints } from "@/components/ui";
import {
  defectFlow,
  frameworkIntro,
  layers,
  pipeline,
  pipelineExtras,
  principles,
  snippets,
  structure,
} from "@/data/framework";

export const metadata: Metadata = {
  title: "My Testing Framework",
  description: frameworkIntro,
};

const repo = "https://github.com/Samin-Zaman1/saucedemo-qa-suite";

function Steps({ items, label }: { items: { step: string; detail: string }[]; label: string }) {
  return (
    <ol aria-label={label} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.step} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs font-bold text-white">
            {i + 1}
          </span>
          <span>
            <span className="block font-semibold">{item.step}</span>
            <span className="block text-sm text-muted">{item.detail}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function FrameworkPage() {
  return (
    <>
      <div className="hero-glow">
        <Container>
          <PageHeader eyebrow="How I test" title="My Testing Framework" description={frameworkIntro} />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonAnchor href={repo} target="_blank" rel="noreferrer">
              Reference suite on GitHub ↗
            </ButtonAnchor>
            <ButtonAnchor href="https://samin-zaman1.github.io/saucedemo-qa-suite/" target="_blank" rel="noreferrer" variant="secondary">
              Live test report ↗
            </ButtonAnchor>
          </div>
          <nav aria-label="On this page" className="mt-10">
            <ul className="flex flex-wrap gap-2 text-sm font-medium">
              {[
                ["#layers-heading", "Test layers"],
                ["#structure-heading", "Suite structure"],
                ["#principles-heading", "Principles"],
                ["#code-heading", "In code"],
                ["#pipeline-heading", "CI/CD pipeline"],
                ["#defects-heading", "Defect workflow"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="block rounded-full bg-surface/90 px-3.5 py-1.5 ring-1 ring-border hover:text-accent-strong hover:ring-accent">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      <Container className="space-y-24 pt-4 sm:pt-4">
        <section aria-labelledby="layers-heading" className="scroll-mt-24">
          <SectionTitle id="layers-heading">Test layers</SectionTitle>
          <p className="mt-2 max-w-2xl text-muted">
            Many fast tests at the bottom, a few slow ones at the top. Each layer proves something the others can’t.
            Counts are from my{" "}
            <Link href="/projects/bangla-medical-hall" className="font-medium text-accent-strong underline underline-offset-4">
              pharmacy POS
            </Link>
            .
          </p>
          <ol className="mt-8 space-y-2.5">
            {layers.map((layer) => (
              <li key={layer.name} className="flex flex-col items-center">
                <div className={`${layer.width} ${layer.tint} min-w-full rounded-2xl px-5 py-4 sm:min-w-0`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-bold">
                      {layer.name} <span className="font-normal text-muted">· {layer.tool}</span>
                    </p>
                    {layer.count && (
                      <p className="font-mono text-sm font-bold text-accent-strong">{layer.count} tests</p>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">{layer.proves}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="structure-heading" className="scroll-mt-24">
          <SectionTitle id="structure-heading">Suite structure</SectionTitle>
          <p className="mt-2 max-w-2xl text-muted">How a Playwright suite is laid out, using my SauceDemo suite as the reference.</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-[18rem_1fr]">
            <pre className="overflow-x-auto rounded-2xl bg-foreground p-5 font-mono text-sm leading-7 text-mint" tabIndex={0} aria-label="Folder tree">
{`saucedemo-qa-suite/
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── UsersApi.ts
├── fixtures/index.ts
├── data/
│   ├── users.ts
│   └── money.ts
├── tests/
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── sorting.spec.ts
│   ├── users-api.spec.ts
│   └── known-bugs.spec.ts
├── playwright.config.ts
└── .github/workflows/`}
            </pre>
            <dl className="grid gap-3 sm:grid-cols-2">
              {structure.map((s, i) => (
                <div key={s.path} className={`rounded-2xl ${tints[i % tints.length]} p-5`}>
                  <dt className="font-mono text-sm font-bold text-accent-strong">{s.path}</dt>
                  <dd className="mt-1.5 text-sm leading-6">{s.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="principles-heading" className="scroll-mt-24">
          <SectionTitle id="principles-heading">Principles</SectionTitle>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p.title} className="rounded-2xl border border-border bg-surface p-5">
                <PassMark />
                <h3 className="mt-3 font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="code-heading" className="scroll-mt-24">
          <SectionTitle id="code-heading">In code</SectionTitle>
          <p className="mt-2 max-w-2xl text-muted">Excerpts from the reference suite, lightly trimmed.</p>
          <div className="mt-6 space-y-6">
            {snippets.map((s) => (
              <figure key={s.file} className="overflow-hidden rounded-2xl border border-border bg-surface">
                <figcaption className="grid gap-1 border-b border-border px-6 py-5 md:grid-cols-[1fr_auto] md:items-start md:gap-6">
                  <div>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">{s.why}</p>
                  </div>
                  <a
                    href={`${repo}/blob/main/${s.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit rounded-full bg-mint px-3 py-1 font-mono text-xs font-semibold text-accent-strong hover:underline"
                  >
                    {s.file} ↗
                  </a>
                </figcaption>
                <pre tabIndex={0} aria-label={`Code from ${s.file}`} className="overflow-x-auto bg-foreground p-6 font-mono text-[0.8rem] leading-6 text-mint">
                  <code>{s.code}</code>
                </pre>
              </figure>
            ))}
          </div>
        </section>

        <section aria-labelledby="pipeline-heading" className="scroll-mt-24">
          <SectionTitle id="pipeline-heading">CI/CD pipeline</SectionTitle>
          <p className="mt-2 max-w-2xl text-muted">
            Nothing ships unless every stage is green. This is the full pipeline from my pharmacy POS; this portfolio runs
            the same idea in a smaller form.
          </p>
          <Steps items={pipeline} label="Pipeline stages" />
          <ul className="mt-6 grid gap-3 rounded-2xl bg-mint p-6 sm:grid-cols-2">
            {pipelineExtras.map((e) => (
              <li key={e} className="flex gap-3 text-sm leading-6">
                <PassMark />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="defects-heading" className="scroll-mt-24">
          <SectionTitle id="defects-heading">Defect workflow</SectionTitle>
          <p className="mt-2 max-w-2xl text-muted">From first sighting to a permanent regression test.</p>
          <Steps items={defectFlow} label="Defect workflow steps" />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/artifacts">See a real bug report</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Projects using this framework
            </ButtonLink>
          </div>
        </section>
      </Container>
    </>
  );
}
