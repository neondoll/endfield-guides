"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { type CSSProperties, useContext } from "react";

import { toggleVariants } from "./toggle.variants";
import { ToggleGroupContext } from "./toggle-group.contexts";
import type { ToggleGroupItemProps, ToggleGroupProps } from "./toggle-group.types";
import { cn } from "@/lib/utils";

export function ToggleGroup({
  children,
  className,
  orientation = "horizontal",
  size,
  spacing = 2,
  variant,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn([
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))]",
        "data-[spacing=0]:data-[variant=outline]:rounded-none data-vertical:flex-col data-vertical:items-stretch",
      ], className)}
      data-orientation={orientation}
      data-size={size}
      data-slot="toggle-group"
      data-spacing={spacing}
      data-variant={variant}
      style={{ "--gap": spacing } as CSSProperties}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ orientation, size, spacing, variant }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

export function ToggleGroupItem({
  children,
  className,
  size = "default",
  variant = "default",
  ...props
}: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      className={cn([
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-6",
        "group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10",
        "group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-4",
        "group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-4",
        "group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-none",
        "group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-none",
        "group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-none",
        "group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-none data-[state=on]:bg-muted",
        "data-[state=on]:text-foreground",
        "group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0",
        "group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0",
        "group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l",
        "group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
      ], toggleVariants({ size: context.size || size, variant: context.variant || variant }), className)}
      data-size={context.size || size}
      data-slot="toggle-group-item"
      data-spacing={context.spacing}
      data-variant={context.variant || variant}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}
