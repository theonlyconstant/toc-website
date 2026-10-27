import { LocalizedLink as Link } from "@/components/i18n/LocalizedLink";
import { typography } from "@/design-system/tokens/typography";
import { cn } from "@/lib/utils";

/**
 * A short notice where a visitor types or leaves their details, ending in a
 * link to the privacy statement.
 *
 * The statement itself is only linked from the footer and the cookie banner,
 * so without this nobody sees, at the moment of typing, that what they enter is
 * stored. The full stop after the link is rendered here, so the label stays a
 * bare noun phrase ("privacyverklaring") that reads the same in every notice.
 */
export interface PrivacyNoticeContent {
    /** Everything before the link, e.g. "… Zie onze". */
    message: string;
    /** The linked words, e.g. "privacyverklaring". */
    privacyLabel: string;
}

interface PrivacyNoticeProps {
    content: PrivacyNoticeContent;
    className?: string;
}

export function PrivacyNotice({ content, className }: PrivacyNoticeProps) {
    return (
        <p className={cn(typography.variants.body.sm, "text-muted-foreground", className)}>
            {content.message}{" "}
            <Link
                href="/privacy"
                className="underline underline-offset-4 decoration-foreground/30 hover:decoration-current transition-colors"
            >
                {content.privacyLabel}
            </Link>
            .
        </p>
    );
}
