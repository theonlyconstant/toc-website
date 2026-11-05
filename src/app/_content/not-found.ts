import type { Locale } from "@/lib/i18n/config";

const en = {
    hero: {
        eyebrow: "404",
        title: "This page has changed.",
        titleMuted: "Or it never existed.",
        description:
            "Change is the only constant, on this site too. Start again from the homepage, or pick where to go next below.",
        cta: { label: "Go to the homepage", href: "/" },
    },
};

const nl: typeof en = {
    hero: {
        eyebrow: "404",
        title: "Deze pagina is veranderd.",
        titleMuted: "Of hij heeft nooit bestaan.",
        description:
            "Verandering is de enige constante, ook op deze site. Begin opnieuw op de homepage, of kies hieronder waar je verder wilt.",
        cta: { label: "Naar de homepage", href: "/" },
    },
};

export const notFoundContent: Record<Locale, typeof en> = { en, nl };
