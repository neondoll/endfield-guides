"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table";
import type { WeaponTypeListItem } from "@/types/weapon-types";
import type { WeaponListItem } from "@/types/weapons";

export interface WeaponData extends WeaponListItem {
  type: WeaponTypeListItem;
}

export const columns: ColumnDef<WeaponData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Оружие" />
    ),
    cell: ({ row }) => {
      const image = row.original.image;
      const name = row.original.name;

      return (
        <div className="flex flex-col gap-y-1 items-center text-center">
          <img alt={name} className="size-13.75" src={image} />
          <p>{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "rarity",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="Редкость" />
    ),
    cell: ({ row }) => {
      const rarity = row.original.rarity;

      return (
        <div className="flex flex-col gap-y-1 items-center text-center">
          <img alt="Звезда" className="w-8.75 h-auto" src={import.meta.env.BASE_URL + "images/rarity.png"} />
          <p>{rarity}</p>
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
      const typeImage = row.original.type.image;
      const typeName = row.original.type.name;

      return (
        <div className="flex flex-col gap-y-1 items-center text-center">
          <img alt={typeName} className="size-7.5" src={typeImage} />
          <p>{typeName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "baseATK90",
    header: ({ column }) => (
      <DataTableColumnHeader align="center" column={column} title="ATK (Lv.90)" />
    ),
    cell: ({ row }) => {
      const baseATK90 = row.original.baseATK90;

      return <div className="text-center">{baseATK90}</div>;
    },
  },
  {
    accessorKey: "skillsMax",
    header: "Weapon Skills (Max)",
    cell: ({ row }) => {
      const skillsMax = row.original.skillsMax;

      return (
        <div className="flex flex-col gap-y-1 whitespace-pre-line">
          {skillsMax.map(skill => (
            <div className="space-y-1">
              <h6 className="font-bold">{skill.title}</h6>
              <p>{skill.text}</p>
            </div>
          ))}
        </div>
      );
    },
  },
];
