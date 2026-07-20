import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { alertVariants } from "./alert.variants";

export type AlertProps = ComponentProps<"div"> & VariantProps<typeof alertVariants>;
export type AlertActionProps = ComponentProps<"div">;
export type AlertDescriptionProps = ComponentProps<"div">;
export type AlertTitleProps = ComponentProps<"div">;
