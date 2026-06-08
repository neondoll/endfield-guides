import { GearTypeIds } from "@/enums/gear-types";

export type GearType = { id: GearTypeId; name: string };
export type GearTypeId = typeof GearTypeIds[keyof typeof GearTypeIds];
export type GearTypeListItem = GearType;
