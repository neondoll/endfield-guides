import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { fieldVariants } from "./field.variants";
import { Label } from "./label";

export type FieldProps = ComponentProps<"div"> & VariantProps<typeof fieldVariants>;
export type FieldContentProps = ComponentProps<"div">;
export type FieldDescriptionProps = ComponentProps<"p">;
export type FieldErrorProps = ComponentProps<"div"> & { errors?: Array<{ message?: string } | undefined> };
export type FieldGroupProps = ComponentProps<"div">;
export type FieldLabelProps = ComponentProps<typeof Label>;
export type FieldLegendProps = ComponentProps<"legend"> & { variant?: "legend" | "label" };
export type FieldSeparatorProps = ComponentProps<"div"> & { children?: ReactNode };
export type FieldSetProps = ComponentProps<"fieldset">;
export type FieldTitleProps = ComponentProps<"div">;
