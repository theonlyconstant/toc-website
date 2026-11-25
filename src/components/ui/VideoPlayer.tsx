"use client";

import { useEffect, useRef, useState } from "react";
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

type Connection = { saveData?: boolean };
const savesData = () =>
    typeof navigator !== "undefined" &&
    (navigator as Navigator & { connection?: Connection }).connection?.saveData === true;

/**
 * A self-hosted video behind a poster.
 *
 * Nothing of the video is requested on page load (`preload="none"`), so it
 * costs the page nothing, and no third party is involved: no consent gate
 * needed. The poster is a lazy next/image rather than
 * the `poster` attribute, which would be fetched eagerly and unoptimised.
 *
 * The poster stays until the first frame plays, so there is no black flash
 * between the click and the picture. When the video ends the poster and the
 * play button come back.
 *
 * Loading is staged, so the first play starts clean, also on a phone, without
 * every visitor downloading the video:
 *   1. page load: nothing;
 *   2. the frame comes within a screen of the viewport: the header
 *      (`metadata`), so the decoder is ready before the click;
 *   3. a pointer, a finger or keyboard focus reaches the frame: the browser
 *      may buffer the video itself (`auto`), a beat ahead of the click.
 * A visitor who asked the browser to save data gets none of 2 and 3.
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

    useEffect(() => {
        const el = videoRef.current;
        if (!el || savesData() || typeof IntersectionObserver === "undefined") return;
        const near = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                if (el.preload === "none") el.preload = "metadata";
                near.disconnect();
            },
            { rootMargin: "100% 0px" },
        );
        near.observe(el);
        return () => near.disconnect();
    }, []);

    function buffer() {
        const el = videoRef.current;
        if (el && el.preload !== "auto" && !savesData()) el.preload = "auto";
    }

    function start() {
        setStarted(true);
        onPlay?.();
        void videoRef.current?.play();
    }

    function reset() {
        setStarted(false);
        setPlaying(false);
    }

    return (
        <div
            className={cn("relative aspect-video w-full overflow-hidden", className)}
            onPointerEnter={buffer}
            onTouchStart={buffer}
            onFocusCapture={buffer}
        >
            <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                preload="none"
                controls={started}
                playsInline
                // The bar keeps play, time, sound, subtitles and full screen.
                // No download and no playback speed.
                controlsList="nodownload noplaybackrate"
                onPlaying={() => setPlaying(true)}
                onEnded={reset}
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
