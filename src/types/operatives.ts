import { OperativeIds } from "@/enums/operatives";
import type { Attribute } from "@/types/attributes";
import type { Element } from "@/types/elements";
import type { OperativeClass } from "@/types/operative-classes";
import type { WeaponType } from "@/types/weapon-types";

export interface Operative {
  id: typeof OperativeIds[keyof typeof OperativeIds];
  image: string;
  name: string;
  rarity: 6 | 5 | 4;
  elementId: Element["id"];
  weaponId: WeaponType["id"];
  classId: OperativeClass["id"];
  mainAttributeId: Attribute["id"];
  secondaryAttributeId: Attribute["id"];
  version: string;
}

export type OperativeListItem = Pick<Operative, "id" | "image" | "name" | "rarity">;
