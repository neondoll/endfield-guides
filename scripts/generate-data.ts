import fs from "fs/promises";
import path from "path";
// import { loadEnv } from "vite";

import attributes from "./data/attributes";
import elements from "./data/elements";
import gearSets from "./data/gear-sets";
import gearTypes from "./data/gear-types";
import gears from "./data/gears";
import operatorRoles from "./data/operator-roles";
import operators from "./data/operators";
import weaponTypes from "./data/weapon-types";
import weapons from "./data/weapons";
import type { Attribute, AttributeListItem } from "../src/types/attributes";
import type { Element, ElementListItem } from "../src/types/elements";
import type { GearSet, GearSetListItem } from "../src/types/gear-sets";
import type { GearType, GearTypeListItem } from "../src/types/gear-types";
import type { Gear, GearListItem } from "../src/types/gears";
import type { OperatorRole, OperatorRoleListItem } from "../src/types/operator-roles";
import type { Operator, OperatorListItem } from "../src/types/operators";
import type { WeaponType, WeaponTypeListItem } from "../src/types/weapon-types";
import type { Weapon, WeaponListItem } from "../src/types/weapons";

type CategoryType = "attributes" | "elements" | "gear-sets" | "gear-types" | "gears" | "operator-roles" | "operators"
  | "weapon-types" | "weapons";
type DataItem<T extends CategoryType>
  = T extends "attributes" ? Attribute
    : T extends "elements" ? Element
      : T extends "gear-sets" ? GearSet
        : T extends "gear-types" ? GearType
          : T extends "gears" ? Gear
            : T extends "operator-roles" ? OperatorRole
              : T extends "operators" ? Operator
                : T extends "weapon-types" ? WeaponType
                  : T extends "weapons" ? Weapon
                    : never;
type DataListItem<T extends CategoryType>
  = T extends "attributes" ? AttributeListItem
    : T extends "elements" ? ElementListItem
      : T extends "gear-sets" ? GearSetListItem
        : T extends "gear-types" ? GearTypeListItem
          : T extends "gears" ? GearListItem
            : T extends "operator-roles" ? OperatorRoleListItem
              : T extends "operators" ? OperatorListItem
                : T extends "weapon-types" ? WeaponTypeListItem
                  : T extends "weapons" ? WeaponListItem
                    : never;

interface CategoryConfig<T extends CategoryType> {
  data: DataItem<T>[];
  transformList: (item: DataItem<T>) => DataListItem<T>;
}

// const env = loadEnv("development", process.cwd(), "");

// const BASE_URL = env.VITE_BASE_URL || "/";
const OUTPUT_DIR = path.resolve("public/data");

const CATEGORIES = {
  "attributes": {
    data: Object.values(attributes),
    transformList: item => ({ id: item.id, name: item.name, image: item.image }),
  },
  "elements": { data: Object.values(elements), transformList: item => item },
  "gear-sets": { data: Object.values(gearSets), transformList: item => item },
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
  "weapon-types": { data: Object.values(weaponTypes), transformList: item => item },
  "weapons": { data: Object.values(weapons), transformList: item => item },
} satisfies {
  "attributes": CategoryConfig<"attributes">;
  "elements": CategoryConfig<"elements">;
  "gear-sets": CategoryConfig<"gear-sets">;
  "gear-types": CategoryConfig<"gear-types">;
  "gears": CategoryConfig<"gears">;
  "operator-roles": CategoryConfig<"operator-roles">;
  "operators": CategoryConfig<"operators">;
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
    await generateCategory("gear-sets", CATEGORIES["gear-sets"]);
    await generateCategory("gear-types", CATEGORIES["gear-types"]);
    await generateCategory("gears", CATEGORIES["gears"]);
    await generateCategory("operator-roles", CATEGORIES["operator-roles"]);
    await generateCategory("operators", CATEGORIES["operators"]);
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
