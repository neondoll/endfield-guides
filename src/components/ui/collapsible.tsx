import { Collapsible as CollapsiblePrimitive } from "radix-ui";

import type { CollapsibleContentProps, CollapsibleProps, CollapsibleTriggerProps } from "./collapsible.types";

export function Collapsible({ ...props }: CollapsibleProps) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export function CollapsibleContent({ ...props }: CollapsibleContentProps) {
  return <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />;
}

export function CollapsibleTrigger({ ...props }: CollapsibleTriggerProps) {
  return <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />;
}
