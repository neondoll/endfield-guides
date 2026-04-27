import { WeaponIds } from "@/enums/weapons";
import type { WeaponType } from "@/types/weapon-types";

export interface Weapon {
  id: typeof WeaponIds[keyof typeof WeaponIds];
  image: string;
  name: string;
  typeId: WeaponType["id"];
  rarity: 6 | 5 | 4 | 3;
  baseATK90: number;
  skillsMax: Array<{ title: string; text: string }>;
}

export type WeaponListItem = Weapon;
