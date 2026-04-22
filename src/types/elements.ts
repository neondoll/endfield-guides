import { ElementIds } from "@/enums/elements";

export interface Element {
  id: typeof ElementIds[keyof typeof ElementIds];
  image: string;
  name: string;
}

export type ElementListItem = Element;
