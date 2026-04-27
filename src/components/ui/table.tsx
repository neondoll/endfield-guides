import type {
  TableBodyProps, TableCaptionProps, TableCellProps, TableFooterProps, TableHeaderProps, TableHeadProps, TableProps,
  TableRowProps,
} from "./table.types";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="relative overflow-x-auto w-full" data-slot="table-container">
      <table className={cn("w-full text-sm caption-bottom", className)} data-slot="table" {...props} />
    </div>
  );
}

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} data-slot="table-body" {...props} />;
}

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      data-slot="table-caption"
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn("p-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className)}
      data-slot="table-cell"
      {...props}
    />
  );
}

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      className={cn("font-medium bg-muted/50 border-t [&>tr]:last:border-b-0", className)}
      data-slot="table-footer"
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn([
        "px-3 h-12 text-xs font-medium tracking-wider text-left text-muted-foreground uppercase whitespace-nowrap",
        "align-middle [&:has([role=checkbox])]:pr-0",
      ], className)}
      data-slot="table-head"
      {...props}
    />
  );
}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={cn("[&_tr]:border-b", className)} data-slot="table-header" {...props} />;
}

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn([
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
      ], className)}
      data-slot="table-row"
      {...props}
    />
  );
}
