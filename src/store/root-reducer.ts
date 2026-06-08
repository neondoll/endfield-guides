import { combineReducers } from "@reduxjs/toolkit";

import { attributesReducer } from "./attributes";
import { elementsReducer } from "./elements";
import { gearSetsReducer } from "./gear-sets";
import { gearTypesReducer } from "./gear-types";
import { gearsReducer } from "./gears";
import { operatorRolesReducer } from "./operator-roles";
import { operatorsReducer } from "./operators";
import { weaponTypesReducer } from "./weapon-types";
import { weaponsReducer } from "./weapons";

export const rootReducer = combineReducers({
  attributes: attributesReducer,
  elements: elementsReducer,
  gearSets: gearSetsReducer,
  gearTypes: gearTypesReducer,
  gears: gearsReducer,
  operatorRoles: operatorRolesReducer,
  operators: operatorsReducer,
  weaponTypes: weaponTypesReducer,
  weapons: weaponsReducer,
});
