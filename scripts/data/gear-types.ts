import { GearTypeIds } from "../../src/enums/gear-types";
import type { GearType } from "../../src/types/gear-types";

export default {
  Armor: { id: GearTypeIds.Armor, name: "Armor" },
  Gloves: { id: GearTypeIds.Gloves, name: "Gloves" },
  Kit: { id: GearTypeIds.Kit, name: "Kit" },
} as Record<keyof typeof GearTypeIds, GearType>;
