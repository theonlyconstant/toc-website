"use client";

import { HomeModule } from "../HomeModule";
import { VideoFeatureSection } from "@/components/sections/VideoFeatureSection";
import { homeContent } from "@/app/_content/home";
import { trackEvent } from "@/lib/analytics/ga";
import { useLocale } from "@/lib/i18n/useLocale";

export function HomeVideoModule() {
    const lang = useLocale();
    const { eyebrow, title, description, credit, ...video } = homeContent[lang].video;

    return (
        <HomeModule id="video" width="full" pad="m" padTop="none" gap="s" containsContent>
            <VideoFeatureSection
                eyebrow={eyebrow}
                title={title}
                description={description}
                credit={credit}
                video={video}
                onPlay={() => trackEvent("video_play", { video_id: "ai_storm", video_location: "home" })}
            />
        </HomeModule>
    );
}
