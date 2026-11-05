import { NotFoundPage } from "@/app/_components/not-found/NotFoundPage";

/**
 * Catches notFound() anywhere under /nl and /en: unknown blog posts and
 * answers, and every unmatched path through [...missing]. It renders inside
 * the [lang] layout, so the page keeps its language, header and footer.
 *
 * A path whose first segment isn't a locale (/wp-login.php) fails in the
 * layout itself, above this boundary, and gets Next's plain 404.
 */
export default function NotFound() {
    return <NotFoundPage />;
}
