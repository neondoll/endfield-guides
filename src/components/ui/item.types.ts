import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { itemMediaVariants, itemVariants } from "./item.variants";
import { Separator } from "./separator";

export interface ItemProps extends ComponentProps<"div">, VariantProps<typeof itemVariants> {
  asChild?: boolean;
}

export type ItemActionsProps = ComponentProps<"div">;
export type ItemContentProps = ComponentProps<"div">;
export type ItemDescriptionProps = ComponentProps<"p">;
export type ItemFooterProps = ComponentProps<"div">;
export type ItemGroupProps = ComponentProps<"div">;
export type ItemHeaderProps = ComponentProps<"div">;
export type ItemMediaProps = ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>;
export type ItemSeparatorProps = ComponentProps<typeof Separator>;
export type ItemTitleProps = ComponentProps<"div">;
