import { OperatorIds } from "@/enums/operators";
import type { Attribute } from "@/types/attributes";
import type { Element } from "@/types/elements";
import type { Faction } from "@/types/factions";
import type { OperatorRole } from "@/types/operator-roles";
import type { Race } from "@/types/races";
import type { WeaponType } from "@/types/weapon-types";

export type Operator = {
  id: OperatorId;
  name: string;
  factionId: Faction["id"];
  raceId: Race["id"];
  rarity: 6 | 5 | 4;
  elementId: Element["id"];
  weaponId: WeaponType["id"];
  roleId: OperatorRole["id"];
  mainAttributeId?: Attribute["id"];
  secondaryAttributeId?: Attribute["id"];
  version: string;
  image: string;
};
export type OperatorId = typeof OperatorIds[keyof typeof OperatorIds];
export type OperatorListItem = Pick<Operator, "id" | "name" | "rarity" | "image">;
