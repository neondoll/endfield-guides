/* eslint-disable react-hooks/incompatible-library */
"use client";

import {
  type Column, type ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, type SortingState, useReactTable,
} from "@tanstack/react-table";
import { type ComponentProps, type HTMLAttributes, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon } from "@/components/ui/icon";
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
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="overflow-hidden bg-background border">
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
    <div className={cn(["-mx-3"], className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={cn([
              "gap-1 w-full h-11.75 data-[state=open]:bg-accent [&_svg:not([class*='size-'])]:size-3.5",
              align === "end" && "px-3 justify-end has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
              align === "center" && "px-4.5 justify-center has-data-[icon=inline-end]:pr-0 has-data-[icon=inline-start]:pl-0",
              align === "start" && "px-3 justify-start has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
            ])}
            size="sm"
            variant="ghost"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc"
              ? <ArrowDownIcon data-icon="inline-end" />
              : column.getIsSorted() === "asc"
                ? <ArrowUpIcon data-icon="inline-end" />
                : <ChevronsUpDownIcon data-icon="inline-end" />}
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
