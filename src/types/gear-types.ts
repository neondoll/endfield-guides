import { GearTypeIds } from "@/enums/gear-types";

export interface GearType {
  id: typeof GearTypeIds[keyof typeof GearTypeIds];
  name: string;
}

export type GearTypeListItem = GearType;
