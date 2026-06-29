import type { FactionIds } from "@/enums/factions";

export type Faction = { id: FactionId; name: string };
export type FactionId = typeof FactionIds[keyof typeof FactionIds];
