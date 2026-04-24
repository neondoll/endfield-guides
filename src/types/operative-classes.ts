import { OperativeClassIds } from "@/enums/operative-classes";

export interface OperativeClass {
  id: typeof OperativeClassIds[keyof typeof OperativeClassIds];
  image: string;
  name: string;
  description: string;
}

export type OperativeClassListItem = Pick<OperativeClass, "id" | "image" | "name">;
