import { Accordion as AccordionPrimitive } from "radix-ui";

import type {
  AccordionContentProps, AccordionItemProps, AccordionProps, AccordionTriggerProps,
} from "./accordion.types";
import { ChevronDownIcon, ChevronUpIcon } from "./icon";
import { cn } from "@/lib/utils";

export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      className={cn(["flex w-full flex-col"], className)}
      data-slot="accordion"
      {...props}
    />
  );
}

export function AccordionContent({ children, className, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      data-slot="accordion-content"
      {...props}
    >
      <div
        className={cn([
          "h-(--radix-accordion-content-height) pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3",
          "[&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        ], className)}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn(["not-last:border-b"], className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

export function AccordionTrigger({ children, className, ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn([
          "group/accordion-trigger relative flex flex-1 items-start justify-between gap-6 rounded-none border",
          "border-transparent py-4 text-left text-sm font-semibold transition-all outline-none hover:underline",
          "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none",
          "disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto",
          "**:data-[slot=accordion-trigger-icon]:size-3.5 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
        ], className)}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <ChevronDownIcon
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
          data-slot="accordion-trigger-icon"
        />
        <ChevronUpIcon
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
          data-slot="accordion-trigger-icon"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
