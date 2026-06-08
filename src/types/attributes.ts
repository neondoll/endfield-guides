import { AttributeIds } from "@/enums/attributes";

export type Attribute = { id: AttributeId; name: string; description: string; image: string };
export type AttributeId = typeof AttributeIds[keyof typeof AttributeIds];
export type AttributeListItem = Pick<Attribute, "id" | "name" | "image">;
