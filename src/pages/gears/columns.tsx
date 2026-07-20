"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table";
import { GearImage } from "@/components/image";
import { cn } from "@/lib/utils";
import type { GearPackListItem } from "@/types/gear-packs";
import type { GearTypeListItem } from "@/types/gear-types";
import type { GearListItem } from "@/types/gears";

export interface GearData extends GearListItem {
  pack: GearPackListItem;
  type: GearTypeListItem;
}

export const columns: ColumnDef<GearData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Снаряжение" />
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
      <DataTableColumnHeader align="center" column={column} title="Тип" />
    ),
    cell: ({ row }) => {
      const typeName = row.original.type.name;

      return <p children={typeName} className="text-center whitespace-normal" />;
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="LV" />
    ),
    cell: ({ row }) => {
      const level = row.original.level;

      return <p children={level} className="text-center whitespace-normal" />;
    },
  },
  {
    accessorKey: "rarity",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Качество" />
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
    id: "stats",
    header: () => (
      <div className="text-center">Характеристики</div>
    ),
    cell: ({ row }) => {
      const defense = row.original.defense;
      const subStats = row.original.subStats;

      return (
        <div className="space-y-1 whitespace-pre-line">
          <p>
            <span className="font-bold">Защита</span>
            <span children={`: +${defense}`} />
          </p>
          <hr className="border-dashed" />
          {subStats.map(subStat => (
            <p key={subStat.text}>
              <span children={subStat.text} className="font-bold" />
              <span children={`: +${subStat.value}`} />
            </p>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "pack.name",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Комплект" />
    ),
    cell: ({ row }) => {
      const packName = row.original.pack.name;

      return <p children={packName} className="text-center whitespace-normal" />;
    },
  },
  {
    accessorKey: "pack.effect",
    header: () => (
      <div className="text-center">Эффект комплекта</div>
    ),
    cell: ({ row }) => {
      const bonusStat = row.original.pack.bonusStat;
      const packEffect = row.original.pack.effect;

      return (
        <div className="space-y-1 whitespace-pre-line">
          {(bonusStat || packEffect)
            ? (
                <>
                  <p>
                    <span className="font-bold">Бонусная характеристика</span>
                    {`: ${bonusStat}`}
                  </p>
                  <p>
                    <span className="font-bold">Эффект комплекта</span>
                    {`: ${packEffect}`}
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
