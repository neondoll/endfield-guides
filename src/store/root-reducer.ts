import { combineReducers } from "@reduxjs/toolkit";

import { attributesReducer } from "./attributes";
import { elementsReducer } from "./elements";
import { factionsReducer } from "./factions";
import { gearPacksReducer } from "./gear-packs";
import { gearTypesReducer } from "./gear-types";
import { gearsReducer } from "./gears";
import { operatorRolesReducer } from "./operator-roles";
import { operatorsReducer } from "./operators";
import { racesReducer } from "./races";
import { weaponTypesReducer } from "./weapon-types";
import { weaponsReducer } from "./weapons";

export const rootReducer = combineReducers({
  attributes: attributesReducer,
  elements: elementsReducer,
  factions: factionsReducer,
  gearPacks: gearPacksReducer,
  gearTypes: gearTypesReducer,
  gears: gearsReducer,
  operatorRoles: operatorRolesReducer,
  operators: operatorsReducer,
  races: racesReducer,
  weaponTypes: weaponTypesReducer,
  weapons: weaponsReducer,
});
