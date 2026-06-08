import { OperatorRoleIds } from "@/enums/operator-roles";

export type OperatorRole = { id: OperatorRoleId; name: string; description: string; image: string };
export type OperatorRoleId = typeof OperatorRoleIds[keyof typeof OperatorRoleIds];
export type OperatorRoleListItem = Pick<OperatorRole, "id" | "name" | "image">;
