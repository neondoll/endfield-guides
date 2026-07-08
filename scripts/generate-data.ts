import fs from "fs/promises";
import path from "path";
// import { loadEnv } from "vite";

import attributes from "./data/attributes";
import elements from "./data/elements";
import factions from "./data/factions";
import gearPacks from "./data/gear-packs";
import gearTypes from "./data/gear-types";
import gears from "./data/gears";
import operatorRoles from "./data/operator-roles";
import operators from "./data/operators";
import races from "./data/races";
import weaponTypes from "./data/weapon-types";
import weapons from "./data/weapons";
import type { Attribute, AttributeListItem } from "../src/types/attributes";
import type { Element, ElementListItem } from "../src/types/elements";
import type { Faction } from "../src/types/factions";
import type { GearPack, GearPackListItem } from "../src/types/gear-packs";
import type { GearType, GearTypeListItem } from "../src/types/gear-types";
import type { Gear, GearListItem } from "../src/types/gears";
import type { OperatorRole, OperatorRoleListItem } from "../src/types/operator-roles";
import type { Operator, OperatorListItem } from "../src/types/operators";
import type { Race } from "../src/types/races";
import type { WeaponType, WeaponTypeListItem } from "../src/types/weapon-types";
import type { Weapon, WeaponListItem } from "../src/types/weapons";

type CategoryConfig<T extends CategoryType> = {
  data: DataItem<T>[];
  transformList: (item: DataItem<T>) => DataListItem<T>;
};
type CategoryType = "attributes" | "elements" | "factions" | "gear-packs" | "gear-types" | "gears" | "operator-roles"
  | "operators" | "races" | "weapon-types" | "weapons";
type DataItem<T extends CategoryType>
  = T extends "attributes" ? Attribute
    : T extends "elements" ? Element
      : T extends "factions" ? Faction
        : T extends "gear-packs" ? GearPack
          : T extends "gear-types" ? GearType
            : T extends "gears" ? Gear
              : T extends "operator-roles" ? OperatorRole
                : T extends "operators" ? Operator
                  : T extends "races" ? Race
                    : T extends "weapon-types" ? WeaponType
                      : T extends "weapons" ? Weapon
                        : never;
type DataListItem<T extends CategoryType>
  = T extends "attributes" ? AttributeListItem
    : T extends "elements" ? ElementListItem
      : T extends "factions" ? Faction
        : T extends "gear-packs" ? GearPackListItem
          : T extends "gear-types" ? GearTypeListItem
            : T extends "gears" ? GearListItem
              : T extends "operator-roles" ? OperatorRoleListItem
                : T extends "operators" ? OperatorListItem
                  : T extends "races" ? Race
                    : T extends "weapon-types" ? WeaponTypeListItem
                      : T extends "weapons" ? WeaponListItem
                        : never;

// const env = loadEnv("development", process.cwd(), "");

// const BASE_URL = env.VITE_BASE_URL || "/";
const OUTPUT_DIR = path.resolve("public/data");

const CATEGORIES = {
  "attributes": {
    data: Object.values(attributes),
    transformList: item => ({ id: item.id, name: item.name, image: item.image }),
  },
  "elements": { data: Object.values(elements), transformList: item => item },
  "factions": { data: Object.values(factions), transformList: item => item },
  "gear-packs": { data: Object.values(gearPacks), transformList: item => item },
  "gear-types": { data: Object.values(gearTypes), transformList: item => item },
  "gears": { data: Object.values(gears), transformList: item => item },
  "operator-roles": {
    data: Object.values(operatorRoles),
    transformList: item => ({ id: item.id, name: item.name, image: item.image }),
  },
  "operators": {
    data: Object.values(operators),
    transformList: item => ({ id: item.id, name: item.name, rarity: item.rarity, image: item.image }),
  },
  "races": { data: Object.values(races), transformList: item => item },
  "weapon-types": { data: Object.values(weaponTypes), transformList: item => item },
  "weapons": { data: Object.values(weapons), transformList: item => item },
} satisfies {
  "attributes": CategoryConfig<"attributes">;
  "elements": CategoryConfig<"elements">;
  "factions": CategoryConfig<"factions">;
  "gear-packs": CategoryConfig<"gear-packs">;
  "gear-types": CategoryConfig<"gear-types">;
  "gears": CategoryConfig<"gears">;
  "operator-roles": CategoryConfig<"operator-roles">;
  "operators": CategoryConfig<"operators">;
  "races": CategoryConfig<"races">;
  "weapon-types": CategoryConfig<"weapon-types">;
  "weapons": CategoryConfig<"weapons">;
};

async function ensureDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  }
  catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "EEXIST") {
      return;
    }

    throw err;
  }
}

async function generateCategory<T extends CategoryType>(categoryName: T, config: CategoryConfig<T>) {
  console.log(`Генерация данных для ${categoryName}...`);

  const categoryDir = path.join(OUTPUT_DIR, categoryName);
  await ensureDir(categoryDir);

  const indexData = config.data.map(item => config.transformList(item));
  await fs.writeFile(path.join(categoryDir, "index.json"), JSON.stringify(indexData, null, 2));

  const detailsDir = path.join(categoryDir, "details");
  await ensureDir(detailsDir);

  for (const item of config.data) {
    await fs.writeFile(path.join(detailsDir, `${item.id}.json`), JSON.stringify(item, null, 2));
  }

  console.log(`✓ ${categoryName} – ${config.data.length} элементов`);
}

async function main() {
  try {
    console.log("Начинаем генерацию статических данных...");
    await ensureDir(OUTPUT_DIR);

    await generateCategory("attributes", CATEGORIES["attributes"]);
    await generateCategory("elements", CATEGORIES["elements"]);
    await generateCategory("factions", CATEGORIES["factions"]);
    await generateCategory("gear-packs", CATEGORIES["gear-packs"]);
    await generateCategory("gear-types", CATEGORIES["gear-types"]);
    await generateCategory("gears", CATEGORIES["gears"]);
    await generateCategory("operator-roles", CATEGORIES["operator-roles"]);
    await generateCategory("operators", CATEGORIES["operators"]);
    await generateCategory("races", CATEGORIES["races"]);
    await generateCategory("weapon-types", CATEGORIES["weapon-types"]);
    await generateCategory("weapons", CATEGORIES["weapons"]);

    console.log("✅ Генерация завершена!");
  }
  catch (err) {
    console.error("❌ Ошибка генерации:", err);
    process.exit(1);
  }
}

main();
