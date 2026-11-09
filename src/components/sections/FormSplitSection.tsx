import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Heading, Text } from "@/design-system/components/Typography";
import { SectionEyebrow } from "@/design-system/components/SectionEyebrow";
import { layoutTokens } from "@/design-system/tokens/layout";
import { spacing } from "@/design-system/tokens/spacing";
import { typography } from "@/design-system/tokens/typography";

export interface FormSplitPerson {
    name: string;
    email: string;
    imageSrc: string;
    imageAlt: string;
}

export interface FormSplitSectionProps {
    eyebrow: string;
    title: string;
    /** The people who read what is sent, each reachable directly. */
    people?: FormSplitPerson[];
    /** The form itself (FormPanel). The section owns the grid, not the form. */
    children: React.ReactNode;
    className?: string;
}

/**
 * Editorial form section, after the About "approach" pattern: divider, then a
 * 40/60 split with eyebrow, display title and people on the left and the form
 * on the right. Source order is the mobile order (title, form, people); from lg
 * the grid places the items.
 */
export function FormSplitSection({
    eyebrow,
    title,
    people,
    children,
    className,
}: FormSplitSectionProps) {
    return (
        <div className={cn("container mx-auto", className)}>
            <div className="border-t border-border/80" />
            <div className={spacing.component.editorialGrid}>
                {/* Eyebrow sits above the grid (same eyebrow-to-title rhythm as SectionHeader
                    stacked), so title and form share the grid's first row and top-align.
                    Source order = mobile order (title, form, people). From lg: title and people
                    stack in the 40 column, the form spans both rows in the 60 column. */}
                <div className="flex flex-col gap-3 md:gap-4">
                    <SectionEyebrow as="div">{eyebrow}</SectionEyebrow>

                    <div className={layoutTokens.splitForm}>
                        <Heading
                            level={2}
                            className={cn(
                                typography.variants.display.section,
                                typography.capTrim, // cap top meets the form panel's top edge
                                "max-w-4xl lg:col-start-1 lg:row-start-1",
                            )}
                        >
                            {title}
                        </Heading>

                        <div className="w-full lg:col-start-2 lg:row-start-1 lg:row-span-2">{children}</div>

                        {people && people.length > 0 && (
                            <ul className={cn(spacing.stackLg, "lg:col-start-1 lg:row-start-2")}>
                                {people.map((person) => (
                                    <li key={person.email} className="flex items-center gap-4">
                                        <Image
                                            src={person.imageSrc}
                                            alt={person.imageAlt}
                                            width={64}
                                            height={64}
                                            className="size-16 shrink-0 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <Text className={typography.variants.ui.nav.link}>{person.name}</Text>
                                            <a
                                                href={`mailto:${person.email}`}
                                                className={cn(
                                                    "text-muted-foreground underline underline-offset-4 decoration-transparent hover:decoration-current hover:text-foreground transition-colors duration-200", /* lint:allowed - matches ContactDetailsModule link */
                                                    typography.variants.body.md,
                                                )}
                                            >
                                                {person.email}
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
