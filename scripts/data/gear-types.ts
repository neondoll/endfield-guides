import { GearTypeIds } from "../../src/enums/gear-types";
import type { GearType } from "../../src/types/gear-types";

export default {
  Armor: { id: GearTypeIds.Armor, name: "Броня", order: 0 },
  Gloves: { id: GearTypeIds.Gloves, name: "Перчатки", order: 1 },
  Kit: { id: GearTypeIds.Kit, name: "Амуниция", order: 2 },
} as Record<keyof typeof GearTypeIds, GearType>;
