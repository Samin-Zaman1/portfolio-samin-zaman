import Link from "next/link";
import { Container, linkStyle } from "@/components/ui";

export default function NotFound() {
  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">Expected a page. Got nothing.</p>
      <Link href="/" className={`${linkStyle} mt-6 inline-block text-sm font-medium`}>
        Back to home
      </Link>
    </Container>
  );
}
