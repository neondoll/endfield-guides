import { OperatorRoleIds } from "@/enums/operator-roles";

export interface OperatorRole {
  id: typeof OperatorRoleIds[keyof typeof OperatorRoleIds];
  image: string;
  name: string;
  description: string;
}

export type OperatorRoleListItem = Pick<OperatorRole, "id" | "image" | "name">;
