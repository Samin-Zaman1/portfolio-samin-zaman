import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <Container>
      <PageHeader
        eyebrow="404 · expected: page, actual: nothing"
        title="Page not found"
        description="This URL doesn't match anything on the site. Consider it a reproducible bug report."
      />
      <Link href="/" className="mt-8 inline-block rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-85">
        Back to home
      </Link>
    </Container>
  );
}
