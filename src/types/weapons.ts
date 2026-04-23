import { WeaponIds } from "@/enums/weapons";
import type { WeaponType } from "@/types/weapon-types";

export interface Weapon {
  id: typeof WeaponIds[keyof typeof WeaponIds];
  image: string;
  name: string;
  typeId: WeaponType["id"];
  rarity: 6 | 5 | 4 | 3;
  baseATK90: number;
  skillsMax: Record<string, string>;
}

export type WeaponListItem = Pick<Weapon, "id" | "image" | "name">;
