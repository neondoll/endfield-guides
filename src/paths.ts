import type { OperatorId } from "@/types/operators";

const PATHS = {
  Gears: "/gears",
  Home: "/",
  Operator: (operatorId: OperatorId | string) => `/operators/${operatorId}`,
  Operators: "/operators",
  Weapons: "/weapons",
};
export default PATHS;
