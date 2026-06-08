"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table";
import { GearImage } from "@/components/image";
import { cn } from "@/lib/utils";
import type { GearSetListItem } from "@/types/gear-sets";
import type { GearTypeListItem } from "@/types/gear-types";
import type { GearListItem } from "@/types/gears";

export interface GearData extends GearListItem {
  set: GearSetListItem;
  type: GearTypeListItem;
}

export const columns: ColumnDef<GearData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Gear" />
    ),
    cell: ({ row }) => {
      const image = row.original.image;
      const name = row.original.name;

      return (
        <div className="space-y-1 text-center whitespace-normal">
          <GearImage alt={name} className="mx-auto size-12.5" src={image} />
          <p children={name} />
        </div>
      );
    },
  },
  {
    accessorKey: "type.name",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const typeName = row.original.type.name;

      return <p children={typeName} className="text-center whitespace-normal" />;
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Level" />
    ),
    cell: ({ row }) => {
      const level = row.original.level;

      return <p children={level} className="text-center whitespace-normal" />;
    },
  },
  {
    accessorKey: "rarity",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Rarity" />
    ),
    cell: ({ row }) => {
      const rarity = row.original.rarity;

      return (
        <div className="space-y-1 text-center whitespace-normal">
          <div
            className={cn([
              "mx-auto size-7.5 rounded-sm",
              rarity === "white" && "bg-gray-500",
              rarity === "green" && "bg-green-500",
              rarity === "blue" && "bg-blue-500",
              rarity === "purple" && "bg-purple-500",
              rarity === "gold" && "bg-yellow-500",
            ])}
          />
          <p children={rarity} className="sr-only" />
        </div>
      );
    },
  },
  {
    header: "Defense and Substats",
    cell: ({ row }) => {
      const defense = row.original.defense;
      const subStats = row.original.subStats;

      return (
        <div className="space-y-1 whitespace-pre-line">
          <p>
            <span className="font-bold">Defense</span>
            {`: ${defense}`}
          </p>
          <hr className="border-dashed" />
          {subStats.map(subStat => (
            <p key={subStat.text}>
              <span className="font-bold">{subStat.text}</span>
              {`: ${subStat.value}`}
            </p>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "set.name",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Gear Set" />
    ),
    cell: ({ row }) => {
      const setName = row.original.set.name;

      return <p children={setName} className="text-center whitespace-normal" />;
    },
  },
  {
    accessorKey: "set.effect",
    header: "Set Effect",
    cell: ({ row }) => {
      const bonusStat = row.original.set.bonusStat;
      const setEffect = row.original.set.effect;

      return (
        <div className="space-y-1 whitespace-pre-line">
          {(bonusStat || setEffect)
            ? (
                <>
                  <p>
                    <span className="font-bold">Bonus Stat</span>
                    {`: ${bonusStat}`}
                  </p>
                  <p>
                    <span className="font-bold">Set Effect</span>
                    {`: ${setEffect}`}
                  </p>
                </>
              )
            : (
                <p className="text-destructive">No 3-pc Set Effect</p>
              )}
        </div>
      );
    },
  },
];
