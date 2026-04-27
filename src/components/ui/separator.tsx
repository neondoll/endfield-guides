import { Separator as SeparatorPrimitive } from "radix-ui";

import type { SeparatorProps } from "./separator.types";
import { cn } from "@/lib/utils";

export function Separator({ className, decorative = true, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      className={cn([
        "shrink-0 bg-border data-horizontal:w-full data-horizontal:h-px data-vertical:self-stretch data-vertical:w-px",
      ], className)}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}
