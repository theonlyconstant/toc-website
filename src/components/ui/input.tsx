import * as React from "react"

import { cn } from "@/lib/utils"
import { typography } from "@/design-system/tokens/typography"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-panel border border-[var(--instrument-input-border)] bg-[var(--instrument-input-bg)] text-[var(--instrument-input-fg)] px-4 py-2 transition-[color,box-shadow,border-color] outline-none",
        typography.variants.ui.input.value,
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent",
        typography.variants.ui.inputFile,
        "placeholder:text-[var(--instrument-input-placeholder)]",
        "selection:bg-primary selection:text-primary-foreground",
        // Two-sided 2px outline: inner edge contrasts with the field, outer ring with the tone surface.
        "focus-visible:border-[var(--instrument-input-border-focus)] focus-visible:ring-[var(--instrument-input-ring)] focus-visible:ring-1",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
