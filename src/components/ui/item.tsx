import { Slot } from "radix-ui";

import type {
  ItemActionsProps, ItemContentProps, ItemDescriptionProps, ItemFooterProps, ItemGroupProps, ItemHeaderProps,
  ItemMediaProps, ItemProps, ItemSeparatorProps, ItemTitleProps,
} from "./item.types";
import { itemMediaVariants, itemVariants } from "./item.variants";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";

export function Item({ asChild = false, className, size = "default", variant = "default", ...props }: ItemProps) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn(itemVariants({ className, size, variant }))}
      data-size={size}
      data-slot="item"
      data-variant={variant}
      {...props}
    />
  );
}

export function ItemActions({ className, ...props }: ItemActionsProps) {
  return <div className={cn("flex gap-2 items-center", className)} data-slot="item-actions" {...props} />;
}

export function ItemContent({ className, ...props }: ItemContentProps) {
  return (
    <div
      className={cn([
        "flex flex-col flex-1 gap-1 group-data-[size=xs]/item:gap-0.5 [&+[data-slot=item-content]]:flex-none",
      ], className)}
      data-slot="item-content"
      {...props}
    />
  );
}

export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return (
    <p
      className={cn([
        "text-sm font-normal line-clamp-2 leading-relaxed text-left text-muted-foreground [&>a]:underline",
        "[&>a]:underline-offset-4 [&>a:hover]:text-primary",
      ], className)}
      data-slot="item-description"
      {...props}
    />
  );
}

export function ItemFooter({ className, ...props }: ItemFooterProps) {
  return (
    <div
      className={cn("flex basis-full gap-2 justify-between items-center", className)}
      data-slot="item-footer"
      {...props}
    />
  );
}

export function ItemGroup({ className, ...props }: ItemGroupProps) {
  return (
    <div
      className={cn([
        "flex flex-col gap-4 w-full has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2 group/item-group",
      ], className)}
      data-slot="item-group"
      role="list"
      {...props}
    />
  );
}

export function ItemHeader({ className, ...props }: ItemHeaderProps) {
  return (
    <div
      className={cn("flex basis-full gap-2 justify-between items-center", className)}
      data-slot="item-header"
      {...props}
    />
  );
}

export function ItemMedia({ className, variant = "default", ...props }: ItemMediaProps) {
  return (
    <div
      className={cn(itemMediaVariants({ className, variant }))}
      data-slot="item-media"
      data-variant={variant}
      {...props}
    />
  );
}

export function ItemSeparator({ className, ...props }: ItemSeparatorProps) {
  return (
    <Separator
      className={cn("my-2", className)}
      data-slot="item-separator"
      orientation="horizontal"
      {...props}
    />
  );
}

export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return (
    <div
      className={cn([
        "flex gap-2 items-center w-fit text-xs font-semibold line-clamp-1 leading-snug underline-offset-4 uppercase",
      ], className)}
      data-slot="item-title"
      {...props}
    />
  );
}
