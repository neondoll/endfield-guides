import { Slot } from "radix-ui";

import type { ButtonGroupProps, ButtonGroupSeparatorProps, ButtonGroupTextProps } from "./button-group.types";
import { buttonGroupVariants } from "./button-group.variants";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";

export function ButtonGroup({ className, orientation, ...props }: ButtonGroupProps) {
  return (
    <div
      className={cn(buttonGroupVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="button-group"
      role="group"
      {...props}
    />
  );
}

export function ButtonGroupSeparator({ className, orientation = "vertical", ...props }: ButtonGroupSeparatorProps) {
  return (
    <Separator
      className={cn([
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px",
        "data-vertical:h-auto",
      ], className)}
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
    />
  );
}

export function ButtonGroupText({ asChild = false, className, ...props }: ButtonGroupTextProps) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn([
        "flex items-center gap-2 border border-transparent border-b-input bg-transparent px-2.5 text-xs font-semibold",
        "uppercase group-has-[>[data-variant=outline]]/button-group:border-border [&_svg]:pointer-events-none",
        "[&_svg:not([class*='size-'])]:size-3.5",
      ], className)}
      {...props}
    />
  );
}
