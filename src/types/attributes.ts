import { AttributeIds } from "@/enums/attributes";

export interface Attribute {
  id: typeof AttributeIds[keyof typeof AttributeIds];
  image: string;
  name: string;
  description: string;
}

export type AttributeListItem = Pick<Attribute, "id" | "image" | "name">;
