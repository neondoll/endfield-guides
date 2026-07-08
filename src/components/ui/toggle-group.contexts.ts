import * as React from "react";

import type { ToggleGroupState } from "./toggle-group.types";

export const ToggleGroupContext = React.createContext<ToggleGroupState>({
  orientation: "horizontal",
  size: "default",
  spacing: 2,
  variant: "default",
});
