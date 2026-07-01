import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type CollapsibleProps = ComponentProps<typeof CollapsiblePrimitive.Root>;
export type CollapsibleContentProps = ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>;
export type CollapsibleTriggerProps = ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>;
