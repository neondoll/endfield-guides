import type { GearPackIds } from "@/enums/gear-packs";

export type GearPack = { id: GearPackId; name: string; bonusStat?: string; effect?: string };
export type GearPackId = typeof GearPackIds[keyof typeof GearPackIds];
export type GearPackListItem = GearPack;
