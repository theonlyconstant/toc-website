import Image from "next/image";
import { cn } from "@/lib/utils";
import { Surface } from "@/design-system/components/Surfaces";
import { SectionHeader } from "./SectionHeader";

import { spacing } from "@/design-system/tokens/spacing";

type ClientLogo = {
    name: string;
    src: string;
};

type ClientsSectionProps = {
    eyebrow: string;
    items: ClientLogo[];
    className?: string;
};

/**
 * A logo count that doesn't fill the last row leaves the remainder hanging on
 * the left, which reads as a missing logo. The remainder row is centred instead.
 *
 * The grid has twice the visible columns and every tile spans two tracks, so a
 * partial row can start half a tile in. Tile widths and gaps are the same as a
 * plain 2/4-column grid. Only the first tile of the partial row gets a start
 * line; the tiles after it flow on from there.
 */
const MOBILE_COLUMNS = 2;
const DESKTOP_COLUMNS = 4;

// Start line for a remainder of 1, 2 or 3 tiles on the 8-track desktop grid.
const desktopRemainderStart: Record<number, string> = {
    1: "md:col-start-4",
    2: "md:col-start-3",
    3: "md:col-start-2",
};

function remainderRowStart(index: number, count: number): string[] {
    const classes: string[] = [];

    const mobileRemainder = count % MOBILE_COLUMNS;
    const startsMobileRemainder = mobileRemainder > 0 && index === count - mobileRemainder;
    if (startsMobileRemainder) classes.push("col-start-2");

    const desktopRemainder = count % DESKTOP_COLUMNS;
    if (desktopRemainder > 0 && index === count - desktopRemainder) {
        classes.push(desktopRemainderStart[desktopRemainder]);
    } else if (startsMobileRemainder) {
        classes.push("md:col-start-auto");
    }

    return classes;
}

export function ClientsSection({
    eyebrow,
    items,
    className,
}: ClientsSectionProps) {
    return (
        <div className={cn("container mx-auto", className)}>
            <div className={cn("flex flex-col", spacing.component.sectionHeader)}>
                <SectionHeader variant="stacked" eyebrow={eyebrow} />

                <div className="grid grid-cols-4 md:grid-cols-8 gap-6 lg:gap-8">
                    {items.map((item, index) => (
                        <Surface
                            key={item.name}
                            variant="media"
                            className={cn(
                                "col-span-2",
                                remainderRowStart(index, items.length),
                                "flex items-center justify-center",
                                "h-[120px] md:h-[140px]",
                                "p-6 md:p-8",
                                "transition-colors",
                                "group"
                            )}
                        >
                            <Image
                                src={item.src}
                                alt={item.name}
                                width={220}
                                height={80}
                                className={cn(
                                    "max-h-[48px] md:max-h-[56px] w-auto",
                                    "opacity-90",
                                    "transition-opacity duration-300",
                                    "group-hover:opacity-100"
                                )}
                                style={{ objectFit: "contain" }}
                                priority={false}
                                // Logo files are drawn at the size they should show (1-6 KB each).
                                // Through the optimizer they get a "2x" srcset entry that isn't
                                // upscaled, so retina screens showed every logo at half size.
                                unoptimized
                            />
                        </Surface>
                    ))}
                </div>
            </div>
        </div>
    );
}