import { WeaponTypeIds } from "@/enums/weapon-types";

export interface WeaponType {
  id: typeof WeaponTypeIds[keyof typeof WeaponTypeIds];
  image: string;
  name: string;
}

export type WeaponTypeListItem = WeaponType;
