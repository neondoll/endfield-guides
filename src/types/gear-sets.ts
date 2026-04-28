import type { GearSetIds } from "@/enums/gear-sets";

export interface GearSet {
  id: typeof GearSetIds[keyof typeof GearSetIds];
  name: string;
  bonusStat?: string;
  effect?: string;
}

export type GearSetListItem = GearSet;
