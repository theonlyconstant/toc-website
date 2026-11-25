"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { typography } from "@/design-system/tokens/typography";

export type VideoTrack = {
    src: string;
    srcLang: string;
    label: string;
    /** Shown without the viewer switching it on. */
    default?: boolean;
};

type VideoPlayerProps = {
    src: string;
    poster: string;
    posterAlt: string;
    /** Accessible name of the play button, e.g. "Watch the video". */
    playLabel: string;
    /** Shown on the poster, e.g. "1:57". */
    duration: string;
    tracks?: readonly VideoTrack[];
    onPlay?: () => void;
    className?: string;
};

/**
 * A self-hosted video behind a poster.
 *
 * Nothing of the video is requested until the visitor presses play
 * (`preload="none"`), so it costs the page nothing and no third party is
 * involved: no consent gate needed. The poster is a lazy next/image rather than
 * the `poster` attribute, which would be fetched eagerly and unoptimised.
 *
 * The poster stays until the first frame plays, so there is no black flash
 * between the click and the picture.
 */
export function VideoPlayer({
    src,
    poster,
    posterAlt,
    playLabel,
    duration,
    tracks = [],
    onPlay,
    className,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [started, setStarted] = useState(false);
    const [playing, setPlaying] = useState(false);

    function start() {
        setStarted(true);
        onPlay?.();
        void videoRef.current?.play();
    }

    return (
        <div className={cn("relative aspect-video w-full overflow-hidden", className)}>
            <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                preload="none"
                controls={started}
                playsInline
                onPlaying={() => setPlaying(true)}
            >
                <source src={src} type="video/mp4" />
                {tracks.map((track) => (
                    <track
                        key={track.srcLang}
                        kind="subtitles"
                        src={track.src}
                        srcLang={track.srcLang}
                        label={track.label}
                        default={track.default}
                    />
                ))}
            </video>

            {!playing && (
                <Image
                    src={poster}
                    alt={posterAlt}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover pointer-events-none"
                />
            )}

            {!started && (
                <button
                    type="button"
                    onClick={start}
                    aria-label={`${playLabel} (${duration})`}
                    className="group absolute inset-0 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
                >
                    <span className="flex size-16 md:size-20 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-110">
                        <Play className="size-6 md:size-8 translate-x-0.5 fill-current" aria-hidden />
                    </span>
                    <span
                        className={cn(
                            typography.variants.meta.badge,
                            "absolute bottom-4 left-4 rounded-full bg-background text-foreground px-2 py-0.5" /* lint:allowed - duration badge on poster */,
                        )}
                    >
                        {duration}
                    </span>
                </button>
            )}
        </div>
    );
}
