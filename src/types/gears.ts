import { GearIds } from "@/enums/gears";
import type { GearSet } from "@/types/gear-sets";
import type { GearType } from "@/types/gear-types";

export interface Gear {
  id: typeof GearIds[keyof typeof GearIds];
  image: string;
  name: string;
  typeId: GearType["id"];
  level: 10 | 20 | 28 | 36 | 50 | 70;
  rarity: "white" | "green" | "blue" | "purple" | "gold";
  defense: number;
  substats: Array<{ text: string; value: string | number }>;
  setId: GearSet["id"];
}

export type GearListItem = Gear;
