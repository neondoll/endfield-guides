import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import type { ComponentPropsWithRef } from "react";

export type ComboboxProps<Value, Multiple extends boolean | undefined = false> = ComboboxPrimitive.Root.Props<Value, Multiple>;
export type ComboboxChipProps = ComboboxPrimitive.Chip.Props & { showRemove?: boolean };
export type ComboboxChipsProps = ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> & ComboboxPrimitive.Chips.Props;
export type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props;
export type ComboboxClearProps = ComboboxPrimitive.Clear.Props;
export type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props;
export type ComboboxContentProps = ComboboxPrimitive.Popup.Props & Pick<
  ComboboxPrimitive.Positioner.Props,
  "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
>;
export type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;
export type ComboboxGroupProps = ComboboxPrimitive.Group.Props;
export type ComboboxInputProps = ComboboxPrimitive.Input.Props & { showClear?: boolean; showTrigger?: boolean };
export type ComboboxItemProps = ComboboxPrimitive.Item.Props;
export type ComboboxLabelProps = ComboboxPrimitive.GroupLabel.Props;
export type ComboboxListProps = ComboboxPrimitive.List.Props;
export type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props;
export type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props;
export type ComboboxValueProps = ComboboxPrimitive.Value.Props;
