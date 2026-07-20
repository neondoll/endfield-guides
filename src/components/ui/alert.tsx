import type { AlertActionProps, AlertDescriptionProps, AlertProps, AlertTitleProps } from "./alert.types";
import { alertVariants } from "./alert.variants";
import { cn } from "@/lib/utils";

export function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

export function AlertAction({ className, ...props }: AlertActionProps) {
  return (
    <div
      className={cn(["absolute top-2.5 right-3"], className)}
      data-slot="alert-action"
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      className={cn([
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3",
        "[&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
      ], className)}
      data-slot="alert-description"
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      className={cn([
        "text-sm font-semibold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
        "[&_a]:hover:text-foreground",
      ], className)}
      data-slot="alert-title"
      {...props}
    />
  );
}
