import type { VariantProps } from "class-variance-authority";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

import { toggleVariants } from "./toggle.variants";

export type ToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants> & {
  orientation?: "horizontal" | "vertical";
  spacing?: number;
};
export type ToggleGroupState = VariantProps<typeof toggleVariants> & {
  orientation?: "horizontal" | "vertical";
  spacing?: number;
};
export type ToggleGroupItemProps = ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>;
