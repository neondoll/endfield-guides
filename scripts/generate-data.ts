import fs from "fs/promises";
import path from "path";
import { loadEnv } from "vite";

import { AttributeIds } from "../src/enums/attributes";
import { CharacterClassIds } from "../src/enums/character-classes";
import { CharacterIds } from "../src/enums/characters";
import { ElementIds } from "../src/enums/elements";
import { WeaponTypeIds } from "../src/enums/weapon-types";
import type { Attribute, AttributeListItem } from "../src/types/attributes";
import type { CharacterClass, CharacterClassListItem } from "../src/types/character-classes";
import type { Character, CharacterListItem } from "../src/types/characters";
import type { Element, ElementListItem } from "../src/types/elements";
import type { WeaponType, WeaponTypeListItem } from "../src/types/weapon-types";

type CategoryType = "attributes" | "character-classes" | "characters" | "elements" | "weapon-types";
type DataItem<T extends CategoryType>
  = T extends "attributes" ? Attribute
    : T extends "character-classes" ? CharacterClass
      : T extends "characters" ? Character
        : T extends "elements" ? Element
          : T extends "weapon-types" ? WeaponType
            : never;
type DataListItem<T extends CategoryType>
  = T extends "attributes" ? AttributeListItem
    : T extends "character-classes" ? CharacterClassListItem
      : T extends "characters" ? CharacterListItem
        : T extends "elements" ? ElementListItem
          : T extends "weapon-types" ? WeaponTypeListItem
            : never;

interface CategoryConfig<T extends CategoryType> {
  data: DataItem<T>[];
  transformList: (item: DataItem<T>) => DataListItem<T>;
}

const env = loadEnv("development", process.cwd(), "");

const BASE_URL = env.VITE_BASE_URL || "/";
const OUTPUT_DIR = path.resolve("public/data");

const CATEGORIES = {
  "attributes": {
    data: [
      {
        id: AttributeIds.Agility,
        image: BASE_URL + "images/attributes/agility.png",
        name: "Ловкость",
        description: "Влияет на физическую СОПР оперативника.",
      },
      {
        id: AttributeIds.Intellect,
        image: BASE_URL + "images/attributes/intellect.png",
        name: "Интеллект",
        description: "Влияет на сопротивляемость искусствам оперативника.",
      },
      {
        id: AttributeIds.Strength,
        image: BASE_URL + "images/attributes/strength.png",
        name: "Сила",
        description: "Влияет на макс. ОЗ оперативника.",
      },
      {
        id: AttributeIds.Will,
        image: BASE_URL + "images/attributes/will.png",
        name: "Воля",
        description: "Влияет на получаемое оперативником лечение.",
      },
    ],
    transformList: item => ({ id: item.id, image: item.image, name: item.name }),
  },
  "character-classes": {
    data: [
      {
        id: CharacterClassIds.Caster,
        image: BASE_URL + "images/character-classes/caster.png",
        name: "Заклинатель",
        description: "Заклинатели накладывают поражение искусствами и реакции искусств. Также они наносят мощный урон.",
      },
      {
        id: CharacterClassIds.Defender,
        image: BASE_URL + "images/character-classes/defender.png",
        name: "Защитник",
        description: "Защитники очень выносливы. Они надежно прикрывают и лечат товарищей, а также мастерски отвечают на атаки врагов.",
      },
      {
        id: CharacterClassIds.Guard,
        image: BASE_URL + "images/character-classes/guard.png",
        name: "Страж",
        description: "Стражи накладывают на врагов уязвимости и физические состояния. Также они наносят мощный урон.",
      },
      {
        id: CharacterClassIds.Striker,
        image: BASE_URL + "images/character-classes/striker.png",
        name: "Штурмовик",
        description: "Штурмовики наносят сокрушительный урон, используя физические эффекты и эффекты искусств, наложенные другими оперативниками.",
      },
      {
        id: CharacterClassIds.Supporter,
        image: BASE_URL + "images/character-classes/supporter.png",
        name: "Поддержка",
        description: "Оперативники поддержки контролируют и ослабляют врагов посредством различных эффектов. Также они оказывают поддержку товарищам и усиливают их.",
      },
      {
        id: CharacterClassIds.Vanguard,
        image: BASE_URL + "images/character-classes/vanguard.png",
        name: "Авангард",
        description: "Отлично восстанавливают очки навыков (ОН), чтобы команда могла чаще применять навыки.",
      },
    ],
    transformList: item => ({ id: item.id, image: item.image, name: item.name }),
  },
  "characters": {
    data: [
      {
        id: CharacterIds.Akekuri,
        image: BASE_URL + "images/characters/akekuri.png",
        name: "Акэкури",
        rarity: 4,
        elementId: ElementIds.Heat,
        weaponId: WeaponTypeIds.Sword,
        classId: CharacterClassIds.Vanguard,
        primaryAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: CharacterIds.Alesh,
        image: BASE_URL + "images/characters/alesh.png",
        name: "Алеш",
        rarity: 5,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Sword,
        classId: CharacterClassIds.Vanguard,
        primaryAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: CharacterIds.Antal,
        image: BASE_URL + "images/characters/antal.png",
        name: "Антал",
        rarity: 4,
        elementId: ElementIds.Electric,
        weaponId: WeaponTypeIds.ArtsUnit,
        classId: CharacterClassIds.Supporter,
        primaryAttributeId: AttributeIds.Intellect,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: CharacterIds.Arclight,
        image: BASE_URL + "images/characters/arclight.png",
        name: "Арклайт",
        rarity: 5,
        elementId: ElementIds.Electric,
        weaponId: WeaponTypeIds.Sword,
        classId: CharacterClassIds.Vanguard,
        primaryAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: CharacterIds.Ardelia,
        image: BASE_URL + "images/characters/ardelia.png",
        name: "Арделия",
        rarity: 6,
        elementId: ElementIds.Nature,
        weaponId: WeaponTypeIds.ArtsUnit,
        classId: CharacterClassIds.Supporter,
        primaryAttributeId: AttributeIds.Intellect,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: CharacterIds.Avywenna,
        image: BASE_URL + "images/characters/avywenna.png",
        name: "Авивенна",
        rarity: 5,
        elementId: ElementIds.Electric,
        weaponId: WeaponTypeIds.Polearm,
        classId: CharacterClassIds.Striker,
        primaryAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Agility,
        version: "1.0",
      },
      {
        id: CharacterIds.Catcher,
        image: BASE_URL + "images/characters/catcher.png",
        name: "Кэтчер",
        rarity: 4,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Greatsword,
        classId: CharacterClassIds.Defender,
        primaryAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: CharacterIds.ChenQianyu,
        image: BASE_URL + "images/characters/chen-qianyu.png",
        name: "Чэнь Цяньюй",
        rarity: 5,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Sword,
        classId: CharacterClassIds.Guard,
        primaryAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: CharacterIds.DaPan,
        image: BASE_URL + "images/characters/da-pan.png",
        name: "Да Пан",
        rarity: 5,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Greatsword,
        classId: CharacterClassIds.Striker,
        primaryAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: CharacterIds.Ember,
        image: BASE_URL + "images/characters/ember.png",
        name: "Эмбер",
        rarity: 6,
        elementId: ElementIds.Heat,
        weaponId: WeaponTypeIds.Greatsword,
        classId: CharacterClassIds.Defender,
        primaryAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: CharacterIds.Endministrator,
        image: BASE_URL + "images/characters/endministrator.png",
        name: "Эндминистратор",
        rarity: 6,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Sword,
        classId: CharacterClassIds.Guard,
        primaryAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: CharacterIds.Estella,
        image: BASE_URL + "images/characters/estella.png",
        name: "Эстелла",
        rarity: 4,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Polearm,
        classId: CharacterClassIds.Guard,
        primaryAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: CharacterIds.Fluorite,
        image: BASE_URL + "images/characters/fluorite.png",
        name: "Флюорит",
        rarity: 4,
        elementId: ElementIds.Nature,
        weaponId: WeaponTypeIds.Handcannon,
        classId: CharacterClassIds.Caster,
        primaryAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: CharacterIds.Gilberta,
        image: BASE_URL + "images/characters/gilberta.png",
        name: "Гилберта",
        rarity: 6,
        elementId: ElementIds.Nature,
        weaponId: WeaponTypeIds.ArtsUnit,
        classId: CharacterClassIds.Supporter,
        primaryAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: CharacterIds.Laevatain,
        image: BASE_URL + "images/characters/laevatain.png",
        name: "Лэватейн",
        rarity: 6,
        elementId: ElementIds.Heat,
        weaponId: WeaponTypeIds.Sword,
        classId: CharacterClassIds.Striker,
        primaryAttributeId: AttributeIds.Intellect,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: CharacterIds.LastRite,
        image: BASE_URL + "images/characters/last-rite.png",
        name: "Панихида",
        rarity: 6,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Greatsword,
        classId: CharacterClassIds.Striker,
        primaryAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: CharacterIds.Lifeng,
        image: BASE_URL + "images/characters/lifeng.png",
        name: "Лифэн",
        rarity: 6,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Polearm,
        classId: CharacterClassIds.Guard,
        primaryAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: CharacterIds.Perlica,
        image: BASE_URL + "images/characters/perlica.png",
        name: "Перлика",
        rarity: 5,
        elementId: ElementIds.Electric,
        weaponId: WeaponTypeIds.ArtsUnit,
        classId: CharacterClassIds.Caster,
        primaryAttributeId: AttributeIds.Intellect,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: CharacterIds.Pogranichnik,
        image: BASE_URL + "images/characters/pogranichnik.png",
        name: "Пограничник",
        rarity: 6,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Sword,
        classId: CharacterClassIds.Vanguard,
        primaryAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Agility,
        version: "1.0",
      },
      {
        id: CharacterIds.Rossi,
        image: BASE_URL + "images/characters/rossi.png",
        name: "Росси",
        rarity: 6,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Sword,
        classId: CharacterClassIds.Guard,
        primaryAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.1",
      },
      {
        id: CharacterIds.Snowshine,
        image: BASE_URL + "images/characters/snowshine.png",
        name: "Светоснежка",
        rarity: 5,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Greatsword,
        classId: CharacterClassIds.Defender,
        primaryAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: CharacterIds.Tangtang,
        image: BASE_URL + "images/characters/tangtang.png",
        name: "Тантан",
        rarity: 6,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Handcannon,
        classId: CharacterClassIds.Caster,
        primaryAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.1",
      },
      {
        id: CharacterIds.Wulfgard,
        image: BASE_URL + "images/characters/wulfgard.png",
        name: "Вулфгард",
        rarity: 5,
        elementId: ElementIds.Heat,
        weaponId: WeaponTypeIds.Handcannon,
        classId: CharacterClassIds.Caster,
        primaryAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Agility,
        version: "1.0",
      },
      {
        id: CharacterIds.Xaihi,
        image: BASE_URL + "images/characters/xaihi.png",
        name: "Сайхи",
        rarity: 5,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.ArtsUnit,
        classId: CharacterClassIds.Supporter,
        primaryAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: CharacterIds.Yvonne,
        image: BASE_URL + "images/characters/yvonne.png",
        name: "Ивонна",
        rarity: 6,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Handcannon,
        classId: CharacterClassIds.Striker,
        primaryAttributeId: AttributeIds.Intellect,
        secondaryAttributeId: AttributeIds.Agility,
        version: "1.0",
      },
      {
        id: CharacterIds.ZhuangFangyi,
        image: BASE_URL + "images/characters/zhuang-fangyi.png",
        name: "Чжуан Фанъи",
        rarity: 6,
        elementId: ElementIds.Electric,
        weaponId: WeaponTypeIds.ArtsUnit,
        classId: CharacterClassIds.Striker,
        primaryAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.2",
      },
    ],
    transformList: item => ({ id: item.id, image: item.image, name: item.name, rarity: item.rarity }),
  },
  "elements": {
    data: [
      { id: ElementIds.Cryo, image: BASE_URL + "images/elements/cryo.png", name: "Крио" },
      { id: ElementIds.Electric, image: BASE_URL + "images/elements/electric.png", name: "Электричество" },
      { id: ElementIds.Heat, image: BASE_URL + "images/elements/heat.png", name: "Жар" },
      { id: ElementIds.Nature, image: BASE_URL + "images/elements/nature.png", name: "Природа" },
      { id: ElementIds.Physical, image: BASE_URL + "images/elements/physical.png", name: "Физика" },
    ],
    transformList: item => item,
  },
  "weapon-types": {
    data: [
      { id: WeaponTypeIds.ArtsUnit, image: BASE_URL + "images/weapon-types/arts-unit.png", name: "Модуль искусств" },
      { id: WeaponTypeIds.Greatsword, image: BASE_URL + "images/weapon-types/greatsword.png", name: "Двуручный меч" },
      { id: WeaponTypeIds.Handcannon, image: BASE_URL + "images/weapon-types/handcannon.png", name: "Пушка" },
      { id: WeaponTypeIds.Polearm, image: BASE_URL + "images/weapon-types/polearm.png", name: "Древковое оружие" },
      { id: WeaponTypeIds.Sword, image: BASE_URL + "images/weapon-types/sword.png", name: "Меч" },
    ],
    transformList: item => item,
  },
} satisfies {
  "attributes": CategoryConfig<"attributes">;
  "character-classes": CategoryConfig<"character-classes">;
  "characters": CategoryConfig<"characters">;
  "elements": CategoryConfig<"elements">;
  "weapon-types": CategoryConfig<"weapon-types">;
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
    await generateCategory("character-classes", CATEGORIES["character-classes"]);
    await generateCategory("characters", CATEGORIES["characters"]);
    await generateCategory("elements", CATEGORIES["elements"]);
    await generateCategory("weapon-types", CATEGORIES["weapon-types"]);

    console.log("✅ Генерация завершена!");
  }
  catch (err) {
    console.error("❌ Ошибка генерации:", err);
    process.exit(1);
  }
}

main();
