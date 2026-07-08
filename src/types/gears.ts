import { GearIds } from "@/enums/gears";
import type { GearPack } from "@/types/gear-packs";
import type { GearType } from "@/types/gear-types";

export type Gear = {
  id: GearId;
  name: string;
  packId: GearPack["id"];
  typeId: GearType["id"];
  level: 10 | 20 | 28 | 36 | 50 | 70;
  rarity: "white" | "green" | "blue" | "purple" | "gold";
  defense: number;
  subStats: Array<{ text: string; value: string | number }>;
  image: string;
};
export type GearId = typeof GearIds[keyof typeof GearIds];
export type GearListItem = Gear;
