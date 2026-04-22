import type {
  CardActionProps, CardContentProps, CardDescriptionProps, CardFooterProps, CardHeaderProps, CardProps, CardTitleProps,
} from "./card.types";
import { cn } from "@/lib/utils";

export function Card({ className, size = "default", ...props }: CardProps) {
  return (
    <div
      className={cn([
        "flex overflow-hidden flex-col gap-8 py-8 text-sm text-card-foreground bg-card shadow-sm ring-1",
        "ring-foreground/5 has-[>img:first-child]:pt-0 group/card data-[size=sm]:gap-5 data-[size=sm]:py-5",
        "*:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",
      ], className)}
      data-size={size}
      data-slot="card"
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      className={cn("col-start-2 row-span-2 row-start-1 justify-self-end self-start", className)}
      data-slot="card-action"
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      className={cn("px-8 group-data-[size=sm]/card:px-5", className)}
      data-slot="card-content"
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      data-slot="card-description"
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn([
        "flex items-center px-8 [.border-t]:pt-8 group-data-[size=sm]/card:px-5",
        "group-data-[size=sm]/card:[.border-t]:pt-5",
      ], className)}
      data-slot="card-footer"
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn([
        "grid auto-rows-min gap-1.5 items-start px-8 rounded-none has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "has-data-[slot=card-description]:grid-rows-[auto_auto] group/card-header [.border-b]:pb-8",
        "group-data-[size=sm]/card:px-5 group-data-[size=sm]/card:[.border-b]:pb-5 @container/card-header",
      ], className)}
      data-slot="card-header"
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      className={cn("font-heading text-lg font-semibold tracking-wider uppercase", className)}
      data-slot="card-title"
      {...props}
    />
  );
}
