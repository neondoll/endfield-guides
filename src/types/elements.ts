import { ElementIds } from "@/enums/elements";

export type Element = { id: ElementId; name: string; image: string };
export type ElementId = typeof ElementIds[keyof typeof ElementIds];
export type ElementListItem = Element;
