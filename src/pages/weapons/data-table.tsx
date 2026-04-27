/* eslint-disable react-hooks/incompatible-library */
"use client";

import {
  type Column, type ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { type ComponentProps, type HTMLAttributes, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsUpDownIcon, EyeOffIcon,
} from "@/components/ui/icon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface DataTableColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
  align?: ComponentProps<typeof DropdownMenuContent>["align"];
  column: Column<TData, TValue>;
  title: string;
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div>
      <div className="overflow-hidden bg-background rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : (
                  <TableRow>
                    <TableCell className="h-24 text-center" colSpan={columns.length}>No results.</TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end items-center py-4 space-x-2">
        <Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} size="icon-sm">
          <ChevronLeftIcon />
          <span className="sr-only">Previous</span>
        </Button>
        <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} size="icon-sm">
          <ChevronRightIcon />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
}

export function DataTableColumnHeader<TData, TValue>({
  align = "start",
  className,
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div
      className={cn([
        "flex items-center gap-2",
        align === "center" && "justify-center",
        align === "end" && "justify-end",
        align === "start" && "justify-start",
      ], className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={cn([
              "h-8 data-[state=open]:bg-accent",
              align === "center" && "-mr-4.5",
              align === "start" && "-ml-3",
            ])}
            size="sm"
            variant="ghost"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc"
              ? <ArrowDownIcon />
              : column.getIsSorted() === "asc"
                ? <ArrowUpIcon />
                : <ChevronsUpDownIcon />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOffIcon />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
