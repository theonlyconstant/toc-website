import React from 'react';
import { cn } from '@/lib/utils';
import { spacing } from '@/design-system/tokens/spacing';

export interface FormPanelProps {
    /** The content of the form. */
    children: React.ReactNode;
    /** Optional class name for style overrides. */
    className?: string;
}

/**
 * High-level container for form content.
 * Enforces standardized spacing (stackXl) between form sections.
 */
export function FormPanel({ children, className }: FormPanelProps) {
    return (
        <div className={cn("bg-[var(--surface-card)] rounded-surface p-6 md:p-8 shadow-panel", spacing.stackXl, className)}>
            {children}
        </div>
    );
}
