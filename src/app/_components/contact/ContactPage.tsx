import { PageLayout } from "@/design-system/components/Layout";
import { ContactHeroModule } from "./modules/ContactHeroModule";
import { ContactFormModule } from "./modules/ContactFormModule";
import { ContactDetailsModule } from "./modules/ContactDetailsModule";
import { SiteFooterModule } from "@/app/_components/footer/SiteFooterModule";
import { contactContent } from "@/app/_content/contact";
import type { Locale } from "@/lib/i18n/config";

interface ContactPageProps {
    lang: Locale;
}

export function ContactPage({ lang }: ContactPageProps) {
    return (
        <PageLayout variant="landing">
            <ContactHeroModule />
            <ContactFormModule />
            <ContactDetailsModule />
            {/* Page-specific closing band (the site-wide one points back to this page).
                spaceAbove none: ContactDetailsModule above is dark and ends on a full step. */}
            <SiteFooterModule cta={contactContent[lang].footerCta} spaceAbove="none" />
        </PageLayout>
    );
}
