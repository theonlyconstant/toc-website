"use client";

import { LeadMagnetHero } from "@/components/sections/LeadMagnetHero";
import { notFoundContent } from "@/app/_content/not-found";
import { useLocale } from "@/lib/i18n/useLocale";

export function NotFoundHeroModule() {
    const lang = useLocale();
    const { hero } = notFoundContent[lang];

    return (
        <LeadMagnetHero
            id="not-found-hero"
            eyebrow={hero.eyebrow}
            title={hero.title}
            titleMuted={hero.titleMuted}
            description={hero.description}
            cta={hero.cta}
        />
    );
}
