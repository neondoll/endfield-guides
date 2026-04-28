"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table";
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
        <div className="flex flex-col gap-y-1 items-center text-center">
          <img alt={name} className="size-12.5" src={image} />
          <p className="whitespace-normal">{name}</p>
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

      return <p className="text-center whitespace-normal">{typeName}</p>;
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Level" />
    ),
    cell: ({ row }) => {
      const level = row.original.level;

      return <p className="text-center whitespace-normal">{level}</p>;
    },
  },
  {
    accessorKey: "rarity",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Rarity" />
    ),
    cell: ({ row }) => {
      const rarity = row.original.rarity;

      return <p className="text-center whitespace-normal">{rarity}</p>;
    },
  },
  {
    header: "Defense and Substats",
    cell: ({ row }) => {
      const defense = row.original.defense;
      const substats = row.original.substats;

      return (
        <div className="flex flex-col gap-y-1 whitespace-pre-line">
          <p className="pb-1 border-b border-dashed">
            <span className="font-bold">Defense</span>
            :
            {" "}
            {defense}
          </p>
          {substats.map(substat => (
            <p>
              <span className="font-bold">{substat.text}</span>
              :
              {" "}
              {substat.value}
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

      return <p className="text-center whitespace-normal">{setName}</p>;
    },
  },
  {
    accessorKey: "set.effect",
    header: "Set Effect",
    cell: ({ row }) => {
      const bonusStat = row.original.set.bonusStat;
      const setEffect = row.original.set.effect;

      return (
        <div className="flex flex-col gap-y-1 whitespace-pre-line">
          {(bonusStat || setEffect)
            ? (
                <>
                  <p>
                    <span className="font-bold">Bonus Stat</span>
                    :
                    {" "}
                    {bonusStat}
                  </p>
                  <p>
                    <span className="font-bold">Set Effect</span>
                    :
                    {" "}
                    {setEffect}
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
