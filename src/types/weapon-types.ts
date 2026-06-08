import { WeaponTypeIds } from "@/enums/weapon-types";

export type WeaponType = { id: WeaponTypeId; name: string; image: string };
export type WeaponTypeId = typeof WeaponTypeIds[keyof typeof WeaponTypeIds];
export type WeaponTypeListItem = WeaponType;
