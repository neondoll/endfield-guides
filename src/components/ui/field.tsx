import { useMemo } from "react";

import type {
  FieldContentProps, FieldDescriptionProps, FieldErrorProps,
  FieldGroupProps,
  FieldLabelProps,
  FieldLegendProps,
  FieldProps, FieldSeparatorProps,
  FieldSetProps, FieldTitleProps,
} from "./field.types";
import { fieldVariants } from "./field.variants";
import { Label } from "./label";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";

export function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <div
      className={cn(fieldVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="field"
      role="group"
      {...props}
    />
  );
}

export function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      className={cn(["group/field-content flex flex-1 flex-col gap-1 leading-snug"], className)}
      data-slot="field-content"
      {...props}
    />
  );
}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <p
      className={cn([
        "text-left text-sm leading-normal font-normal tracking-normal text-muted-foreground normal-case",
        "group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
      ], className)}
      data-slot="field-description"
      {...props}
    />
  );
}

export function FieldError({ children, className, errors, ...props }: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map(error => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error, index) => {
          return error?.message && <li key={index}>{error.message}</li>;
        })}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      className={cn(["text-sm font-normal text-destructive"], className)}
      data-slot="field-error"
      role="alert"
      {...props}
    >
      {content}
    </div>
  );
}

export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-10 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className,
      )}
      {...props}
    />
  );
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <Label
      className={cn([
        "group/field-label peer/field-label flex w-fit gap-2 leading-relaxed",
        "group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5",
        "has-[>[data-slot=field]]:rounded-none has-[>[data-slot=field]]:border *:data-[slot=field]:p-4",
        "dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
      ], className)}
      data-slot="field-label"
      {...props}
    />
  );
}

export function FieldLegend({ className, variant = "legend", ...props }: FieldLegendProps) {
  return (
    <legend
      className={cn([
        "mb-3 font-semibold uppercase data-[variant=label]:text-xs data-[variant=legend]:text-xs",
      ], className)}
      data-slot="field-legend"
      data-variant={variant}
      {...props}
    />
  );
}

export function FieldSeparator({ children, className, ...props }: FieldSeparatorProps) {
  return (
    <div
      className={cn(["relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2"], className)}
      data-content={!!children}
      data-slot="field-separator"
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
}

export function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <fieldset
      className={cn([
        "flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
      ], className)}
      data-slot="field-set"
      {...props}
    />
  );
}

export function FieldTitle({ className, ...props }: FieldTitleProps) {
  return (
    <div
      className={cn([
        "flex w-fit items-center gap-2 text-xs font-semibold uppercase group-data-[disabled=true]/field:opacity-50",
        "in-data-[slot=field-label]:font-semibold",
      ], className)}
      data-slot="field-label"
      {...props}
    />
  );
}
