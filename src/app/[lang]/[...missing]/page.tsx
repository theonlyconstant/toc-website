import { notFound } from "next/navigation";

/**
 * An unmatched URL under a locale doesn't reach [lang]/not-found.tsx on its
 * own; Next sends it to its root 404 instead. This catch-all matches anything
 * no other route does and hands it to that boundary.
 */
export default function MissingPage() {
    notFound();
}
