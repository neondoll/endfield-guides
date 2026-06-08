import { GearIds } from "@/enums/gears";
import type { GearSet } from "@/types/gear-sets";
import type { GearType } from "@/types/gear-types";

export type Gear = {
  id: GearId;
  name: string;
  setId: GearSet["id"];
  typeId: GearType["id"];
  level: 10 | 20 | 28 | 36 | 50 | 70;
  rarity: "white" | "green" | "blue" | "purple" | "gold";
  defense: number;
  subStats: Array<{ text: string; value: string | number }>;
  image: string;
};
export type GearId = typeof GearIds[keyof typeof GearIds];
export type GearListItem = Gear;
