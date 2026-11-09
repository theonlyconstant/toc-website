import * as React from "react"

import { cn } from "@/lib/utils"
import { typography } from "@/design-system/tokens/typography"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full resize-none rounded-panel border border-[var(--instrument-input-border)] bg-[var(--instrument-input-bg)] text-[var(--instrument-input-fg)] px-4 py-3 transition-[color,box-shadow,border-color] outline-none",
        typography.variants.ui.input.value,
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

export { Textarea }
