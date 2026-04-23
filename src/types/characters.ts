import { CharacterIds } from "@/enums/characters";
import type { Attribute } from "@/types/attributes";
import type { CharacterClass } from "@/types/character-classes";
import type { Element } from "@/types/elements";
import type { WeaponType } from "@/types/weapon-types";

export interface Character {
  id: typeof CharacterIds[keyof typeof CharacterIds];
  image: string;
  name: string;
  rarity: 6 | 5 | 4;
  elementId: Element["id"];
  weaponId: WeaponType["id"];
  classId: CharacterClass["id"];
  mainAttributeId: Attribute["id"];
  secondaryAttributeId: Attribute["id"];
  version: string;
}

export type CharacterListItem = Pick<Character, "id" | "image" | "name" | "rarity">;
