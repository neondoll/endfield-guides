import { WeaponIds } from "@/enums/weapons";
import type { WeaponType } from "@/types/weapon-types";

export type Weapon = {
  id: WeaponId;
  name: string;
  typeId: WeaponType["id"];
  rarity: 6 | 5 | 4 | 3;
  baseATK90: number;
  skillsMax: Array<{ title: string; text: string }>;
  image: string;
};
export type WeaponId = typeof WeaponIds[keyof typeof WeaponIds];
export type WeaponListItem = Weapon;
