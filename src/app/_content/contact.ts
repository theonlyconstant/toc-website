import type { Locale } from "@/lib/i18n/config";
import type { FooterCtaContent } from "@/app/_content/footer";

const en = {
    hero: {
        title: "CONTACT",
    },
    // Page-specific closing band: the site-wide one asks you to get in touch, which you already are.
    footerCta: {
        title: ["AI AMBITIONS,", "NO CONCRETE", "PLAN YET?"],
        cta: { label: "BOOK AN AI OPPORTUNITY SCAN", href: "/ai-opportunity-scan" },
        panelTitle: "",
        panelBody: "With the AI Opportunity Scan we explore where AI can add value to your organisation and where you can start.",
    } satisfies FooterCtaContent,
    form: {
        eyebrow: "GET IN TOUCH",
        title: "How can we help you?",
        fields: {
            name: { label: "Name", placeholder: "Your name" },
            email: { label: "Email", placeholder: "Your email address", error: "Please enter a valid email address." },
            message: { label: "Message", placeholder: "What do you want to work on?" },
        },
        submit: {
            label: "Send message",
            loading: "SENDING...",
        },
        success: {
            title: "Thanks for your message!",
            message: "We have received your inquiry and will reply within 2 business days.",
            resetLabel: "Send another message",
        }
    },
    details: {
        eyebrow: "COMPANY INFORMATION",
        description: "Here you can find our visiting address and administrative details.",
        cards: [
            {
                title: "VISITING ADDRESS",
                lines: [
                    "Kon. Wilhelminalaan 21",
                    "3818 HN Amersfoort",
                    "The Netherlands",
                ],
                mapLink: {
                    label: "View on Google Maps",
                    href: "https://www.google.com/maps/search/?api=1&query=Kon.+Wilhelminalaan+21,+3818+HN+Amersfoort",
                },
                media: {
                    type: "embed",
                    title: "Map",
                    src: "https://www.google.com/maps?&q=Kon.+Wilhelminalaan+21,+3818+HN+Amersfoort,+The+Netherlands&output=embed",
                },
            },
            {
                title: "REGISTERED ADDRESS",
                lines: [
                    "The Only Constant B.V.",
                    "Surinameplein 1 HS",
                    "1058 GL Amsterdam",
                    "The Netherlands",
                ],
                items: [
                    { label: "Chamber of Commerce (KvK)", value: "91800528" },
                    { label: "VAT (BTW)", value: "NL865775230B01" },
                    { label: "IBAN", value: "NL52 BUNQ 2100 3024 93" },
                ],
            },
        ],
    },
};

const nl: typeof en = {
    hero: {
        title: "CONTACT",
    },
    footerCta: {
        title: ["WEL AI-AMBITIES,", "NOG GEEN", "CONCREET PLAN?"],
        cta: { label: "PLAN EEN AI OPPORTUNITY SCAN", href: "/ai-opportunity-scan" },
        panelTitle: "",
        panelBody: "Met de AI Opportunity Scan onderzoeken we waar AI waarde kan toevoegen aan jouw organisatie en waar je kunt beginnen.",
    },
    form: {
        eyebrow: "NEEM CONTACT OP",
        title: "Waar kunnen we je bij helpen?",
        fields: {
            name: { label: "Naam", placeholder: "Je naam" },
            email: { label: "E-mail", placeholder: "Je e-mailadres", error: "Vul een geldig e-mailadres in." },
            message: { label: "Bericht", placeholder: "Waar wil je mee aan de slag?" },
        },
        submit: {
            label: "Verstuur bericht",
            loading: "VERZENDEN...",
        },
        success: {
            title: "Bedankt voor je bericht!",
            message: "We hebben je vraag ontvangen en reageren binnen 2 werkdagen.",
            resetLabel: "Nog een bericht versturen",
        }
    },
    details: {
        eyebrow: "BEDRIJFSINFORMATIE",
        description: "Hier vind je ons bezoekadres en onze bedrijfsgegevens.",
        cards: [
            {
                title: "BEZOEKADRES",
                lines: [
                    "Kon. Wilhelminalaan 21",
                    "3818 HN Amersfoort",
                    "Nederland",
                ],
                mapLink: {
                    label: "Bekijk op Google Maps",
                    href: "https://www.google.com/maps/search/?api=1&query=Kon.+Wilhelminalaan+21,+3818+HN+Amersfoort",
                },
                media: {
                    type: "embed",
                    title: "Map",
                    src: "https://www.google.com/maps?&q=Kon.+Wilhelminalaan+21,+3818+HN+Amersfoort,+The+Netherlands&output=embed",
                },
            },
            {
                title: "VESTIGINGSADRES",
                lines: [
                    "The Only Constant B.V.",
                    "Surinameplein 1 HS",
                    "1058 GL Amsterdam",
                    "Nederland",
                ],
                items: [
                    { label: "Kamer van Koophandel (KvK)", value: "91800528" },
                    { label: "Btw-nummer", value: "NL865775230B01" },
                    { label: "IBAN", value: "NL52 BUNQ 2100 3024 93" },
                ],
            },
        ],
    },
};

export const contactContent: Record<Locale, typeof en> = { en, nl };
