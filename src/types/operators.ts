import { OperatorIds } from "@/enums/operators";
import type { Attribute } from "@/types/attributes";
import type { Element } from "@/types/elements";
import type { OperatorRole } from "@/types/operator-roles";
import type { WeaponType } from "@/types/weapon-types";

export interface Operator {
  id: typeof OperatorIds[keyof typeof OperatorIds];
  image: string;
  name: string;
  rarity: 6 | 5 | 4;
  elementId: Element["id"];
  weaponId: WeaponType["id"];
  roleId: OperatorRole["id"];
  mainAttributeId: Attribute["id"];
  secondaryAttributeId: Attribute["id"];
  version: string;
}

export type OperatorListItem = Pick<Operator, "id" | "image" | "name" | "rarity">;
