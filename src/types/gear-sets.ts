import type { GearSetIds } from "@/enums/gear-sets";

export type GearSet = { id: GearSetId; name: string; bonusStat?: string; effect?: string };
export type GearSetId = typeof GearSetIds[keyof typeof GearSetIds];
export type GearSetListItem = GearSet;
