"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table";
import { RarityImage, WeaponImage, WeaponTypeImage } from "@/components/image";
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
        <div className="space-y-1 text-center whitespace-normal">
          <WeaponImage alt={name} className="mx-auto size-13.75" src={image} />
          <p children={name} />
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
        <div className="space-y-1 text-center">
          <RarityImage className="mx-auto w-8.75 h-auto" />
          <p children={rarity} />
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
        <div className="space-y-1 text-center whitespace-normal">
          <WeaponTypeImage alt={typeName} className="mx-auto size-7.5" src={typeImage} />
          <p children={typeName} />
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

      return <p children={baseATK90} className="text-center" />;
    },
  },
  {
    accessorKey: "skillsMax",
    header: "Weapon Skills (Max)",
    cell: ({ row }) => {
      const skillsMax = row.original.skillsMax;

      return (
        <div className="space-y-1 whitespace-pre-line">
          {skillsMax.map(skill => (
            <div className="space-y-1" key={skill.title}>
              <h6 children={skill.title} className="font-bold" />
              <p children={skill.text} />
            </div>
          ))}
        </div>
      );
    },
  },
];
