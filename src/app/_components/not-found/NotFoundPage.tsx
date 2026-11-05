import { PageLayout } from "@/design-system/components/Layout";
import { NotFoundHeroModule } from "./modules/NotFoundHeroModule";
import { SiteFooterModule } from "@/app/_components/footer/SiteFooterModule";

/**
 * The 404 page: the site header, one message with a way home, and the full
 * footer, so a visitor on a dead link still has the whole site in reach.
 */
export function NotFoundPage() {
    return (
        <PageLayout variant="landing">
            <NotFoundHeroModule />
            <SiteFooterModule />
        </PageLayout>
    );
}
