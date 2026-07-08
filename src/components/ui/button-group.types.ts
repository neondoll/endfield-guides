import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { buttonGroupVariants } from "./button-group.variants";
import { Separator } from "./separator";

export type ButtonGroupProps = ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>;
export type ButtonGroupSeparatorProps = ComponentProps<typeof Separator>;
export type ButtonGroupTextProps = ComponentProps<"div"> & { asChild?: boolean };
