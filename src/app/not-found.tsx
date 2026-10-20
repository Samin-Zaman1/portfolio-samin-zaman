import { ButtonLink, Container, PageHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="hero-glow flex flex-1">
      <Container>
        <PageHeader
          eyebrow="404 · expected: page · actual: nothing"
          title="Page not found"
          description="This URL doesn't match anything on the site. Consider it a reproducible bug report."
        />
        <ButtonLink href="/" className="mt-8">
          Back to home
        </ButtonLink>
      </Container>
    </div>
  );
}
