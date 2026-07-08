"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { Button } from "./button";
import type {
  ComboboxChipProps, ComboboxChipsInputProps, ComboboxChipsProps, ComboboxClearProps, ComboboxCollectionProps,
  ComboboxContentProps, ComboboxEmptyProps, ComboboxGroupProps, ComboboxInputProps, ComboboxItemProps,
  ComboboxLabelProps, ComboboxListProps, ComboboxProps, ComboboxSeparatorProps, ComboboxTriggerProps,
  ComboboxValueProps,
} from "./combobox.types";
import { CheckIcon, ChevronDownIcon, XIcon } from "./icon";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input-group";
import { cn } from "@/lib/utils";

export function Combobox<Value, Multiple extends boolean | undefined = false>({ ...props }: ComboboxProps<Value, Multiple>) {
  return ComboboxPrimitive.Root(props);
}

export function ComboboxChip({ children, className, showRemove = true, ...props }: ComboboxChipProps) {
  return (
    <ComboboxPrimitive.Chip
      className={cn([
        "flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-none bg-muted px-2 text-xs",
        "font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
      ], className)}
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
          render={<Button size="icon-xs" variant="ghost" />}
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

export function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
  return (
    <ComboboxPrimitive.Chips
      className={cn([
        "flex min-h-10 flex-wrap items-center gap-1.5 rounded-none border border-transparent border-b-input",
        "bg-transparent bg-clip-padding px-0 py-1.5 text-sm transition-[color,border-color] focus-within:border-b-ring",
        "has-aria-invalid:border-b-destructive has-data-[slot=combobox-chip]:px-0",
        "dark:has-aria-invalid:border-b-destructive/50",
      ], className)}
      data-slot="combobox-chips"
      {...props}
    />
  );
}

export function ComboboxChipsInput({ className, ...props }: ComboboxChipsInputProps) {
  return (
    <ComboboxPrimitive.Input
      className={cn(["min-w-16 flex-1 outline-none"], className)}
      data-slot="combobox-chip-input"
      {...props}
    />
  );
}

export function ComboboxClear({ className, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      className={cn(className)}
      data-slot="combobox-clear"
      render={<InputGroupButton size="icon-xs" variant="ghost" />}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}

export function ComboboxCollection({ ...props }: ComboboxCollectionProps) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

export function ComboboxContent({
  align = "start",
  alignOffset = 0,
  anchor,
  className,
  side = "bottom",
  sideOffset = 6,
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          className={cn([
            "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width)",
            "min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-none",
            "bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100",
            "data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2",
            "data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2",
            "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1.5 *:data-[slot=input-group]:mb-0",
            "*:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-transparent",
            "*:data-[slot=input-group]:bg-transparent *:data-[slot=input-group]:px-2.5",
            "*:data-[slot=input-group]:focus-within:border-transparent data-open:animate-in data-open:fade-in-0",
            "data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          ], className)}
          data-chips={!!anchor}
          data-slot="combobox-content"
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

export function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      className={cn([
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground",
        "group-data-empty/combobox-content:flex",
      ], className)}
      data-slot="combobox-empty"
      {...props}
    />
  );
}

export function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  return (
    <ComboboxPrimitive.Group
      className={cn(className)}
      data-slot="combobox-group"
      {...props}
    />
  );
}

export function ComboboxInput({
  children,
  className,
  disabled = false,
  showClear = false,
  showTrigger = true,
  ...props
}: ComboboxInputProps) {
  return (
    <InputGroup className={cn(["w-auto"], className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            asChild
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            data-slot="input-group-button"
            disabled={disabled}
            size="icon-xs"
            variant="ghost"
          >
            <ComboboxTrigger />
          </InputGroupButton>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

export function ComboboxItem({ children, className, ...props }: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      className={cn([
        "relative flex w-full cursor-default items-center gap-2.5 rounded-none py-2 pr-8 pl-3 text-sm outline-hidden",
        "select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none",
        "data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
      ], className)}
      data-slot="combobox-item"
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />}
      >
        <CheckIcon className="pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

export function ComboboxLabel({ className, ...props }: ComboboxLabelProps) {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn(["px-3 py-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase"], className)}
      data-slot="combobox-label"
      {...props}
    />
  );
}

export function ComboboxList({ className, ...props }: ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      className={cn([
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))]",
        "scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5 data-empty:p-0",
      ], className)}
      data-slot="combobox-list"
      {...props}
    />
  );
}

export function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  return (
    <ComboboxPrimitive.Separator
      className={cn(["-mx-1.5 my-1.5 h-px bg-border/50"], className)}
      data-slot="combobox-separator"
      {...props}
    />
  );
}

export function ComboboxTrigger({ children, className, ...props }: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      className={cn(["[&_svg:not([class*='size-'])]:size-3.5"], className)}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-3.5 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  );
}

export function ComboboxValue({ ...props }: ComboboxValueProps) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}
