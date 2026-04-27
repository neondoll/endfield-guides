import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export interface DropdownMenuCheckboxItemProps extends ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> {
  inset?: boolean;
}

export interface DropdownMenuItemProps extends ComponentProps<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean;
  variant?: "default" | "destructive";
}

export interface DropdownMenuLabelProps extends ComponentProps<typeof DropdownMenuPrimitive.Label> {
  inset?: boolean;
}

export interface DropdownMenuRadioItemProps extends ComponentProps<typeof DropdownMenuPrimitive.RadioItem> {
  inset?: boolean;
}

export interface DropdownMenuSubTriggerProps extends ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> {
  inset?: boolean;
}

export type DropdownMenuProps = ComponentProps<typeof DropdownMenuPrimitive.Root>;
export type DropdownMenuContentProps = ComponentProps<typeof DropdownMenuPrimitive.Content>;
export type DropdownMenuGroupProps = ComponentProps<typeof DropdownMenuPrimitive.Group>;
export type DropdownMenuPortalProps = ComponentProps<typeof DropdownMenuPrimitive.Portal>;
export type DropdownMenuRadioGroupProps = ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>;
export type DropdownMenuSeparatorProps = ComponentProps<typeof DropdownMenuPrimitive.Separator>;
export type DropdownMenuShortcutProps = ComponentProps<"span">;
export type DropdownMenuSubProps = ComponentProps<typeof DropdownMenuPrimitive.Sub>;
export type DropdownMenuSubContentProps = ComponentProps<typeof DropdownMenuPrimitive.SubContent>;
export type DropdownMenuTriggerProps = ComponentProps<typeof DropdownMenuPrimitive.Trigger>;
