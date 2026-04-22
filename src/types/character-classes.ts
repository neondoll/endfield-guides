import { CharacterClassIds } from "@/enums/character-classes";

export interface CharacterClass {
  id: typeof CharacterClassIds[keyof typeof CharacterClassIds];
  image: string;
  name: string;
  description: string;
}

export type CharacterClassListItem = Pick<CharacterClass, "id" | "image" | "name">;
