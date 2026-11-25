import { cn } from "@/lib/utils";
import { Heading, Text } from "@/design-system/components/Typography";
import { SectionEyebrow } from "@/design-system/components/SectionEyebrow";
import { Surface } from "@/design-system/components/Surfaces";
import { typography } from "@/design-system/tokens/typography";
import { spacing } from "@/design-system/tokens/spacing";
import { layoutTokens } from "@/design-system/tokens/layout";
import { VideoPlayer, type VideoTrack } from "@/components/ui/VideoPlayer";

type VideoFeatureSectionProps = {
    eyebrow: string;
    title: string;
    description: string;
    /** Where the video comes from, as an external link. */
    credit?: { label: string; href: string };
    video: {
        src: string;
        poster: string;
        posterAlt: string;
        playLabel: string;
        duration: string;
        tracks?: readonly VideoTrack[];
    };
    onPlay?: () => void;
    className?: string;
};

/**
 * One video with the claim it supports: narrative 40, picture 60.
 * Stacks below md, narrative first, so the claim frames the video.
 */
export function VideoFeatureSection({
    eyebrow,
    title,
    description,
    credit,
    video,
    onPlay,
    className,
}: VideoFeatureSectionProps) {
    return (
        <div className={cn(layoutTokens.splitGolden, "md:items-center", className)}>
            <div className={spacing.stackLg}>
                <div className={spacing.stackMd}>
                    <SectionEyebrow className={typography.variants.meta.eyebrow}>{eyebrow}</SectionEyebrow>
                    <Heading level={2} className={typography.variants.heading.subsection}>
                        {title}
                    </Heading>
                </div>

                <Text className={cn(typography.variants.body.md, "max-w-prose opacity-80")}>
                    {description}
                </Text>

                {credit && (
                    <div className="flex justify-start">
                        <a
                            href={credit.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                typography.variants.meta.label,
                                "underline underline-offset-4 decoration-border hover:decoration-current transition-colors duration-200",
                            )}
                        >
                            {credit.label} &rarr;
                        </a>
                    </div>
                )}
            </div>

            <Surface variant="media" className="overflow-hidden">
                <VideoPlayer {...video} onPlay={onPlay} />
            </Surface>
        </div>
    );
}
