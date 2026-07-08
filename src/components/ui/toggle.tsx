import { Toggle as TogglePrimitive } from "radix-ui";

import type { ToggleProps } from "./toggle.types";
import { toggleVariants } from "./toggle.variants";
import { cn } from "@/lib/utils";

export function Toggle({ className, size = "default", variant = "default", ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      className={cn(toggleVariants({ className, size, variant }))}
      data-slot="toggle"
      {...props}
    />
  );
}
