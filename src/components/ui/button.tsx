import { Slot } from "radix-ui";

import type { ButtonProps } from "./button.types";
import { buttonVariants } from "./button.variants";
import { cn } from "@/lib/utils";

export function Button({ asChild = false, className, size = "default", variant = "default", ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-size={size}
      data-slot="button"
      data-variant={variant}
      {...props}
    />
  );
}
