import { RaceIds } from "@/enums/races";

export type Race = { id: RaceId; name: string };
export type RaceId = typeof RaceIds[keyof typeof RaceIds];
