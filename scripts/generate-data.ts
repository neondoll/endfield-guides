import fs from "fs/promises";
import path from "path";
import { loadEnv } from "vite";

import { AttributeIds } from "../src/enums/attributes";
import { CharacterClassIds } from "../src/enums/character-classes";
import { CharacterIds } from "../src/enums/characters";
import { ElementIds } from "../src/enums/elements";
import { WeaponTypeIds } from "../src/enums/weapon-types";
import { WeaponIds } from "../src/enums/weapons";
import type { Attribute, AttributeListItem } from "../src/types/attributes";
import type { CharacterClass, CharacterClassListItem } from "../src/types/character-classes";
import type { Character, CharacterListItem } from "../src/types/characters";
import type { Element, ElementListItem } from "../src/types/elements";
import type { WeaponType, WeaponTypeListItem } from "../src/types/weapon-types";
import type { Weapon, WeaponListItem } from "../src/types/weapons";

type CategoryType = "attributes" | "character-classes" | "characters" | "elements" | "weapon-types" | "weapons";
type DataItem<T extends CategoryType>
  = T extends "attributes" ? Attribute
    : T extends "character-classes" ? CharacterClass
      : T extends "characters" ? Character
        : T extends "elements" ? Element
          : T extends "weapon-types" ? WeaponType
            : T extends "weapons" ? Weapon
              : never;
type DataListItem<T extends CategoryType>
  = T extends "attributes" ? AttributeListItem
    : T extends "character-classes" ? CharacterClassListItem
      : T extends "characters" ? CharacterListItem
        : T extends "elements" ? ElementListItem
          : T extends "weapon-types" ? WeaponTypeListItem
            : T extends "weapons" ? WeaponListItem
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
        mainAttributeId: AttributeIds.Agility,
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
        mainAttributeId: AttributeIds.Strength,
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
        mainAttributeId: AttributeIds.Intellect,
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
        mainAttributeId: AttributeIds.Agility,
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
        mainAttributeId: AttributeIds.Intellect,
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
        mainAttributeId: AttributeIds.Will,
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
        mainAttributeId: AttributeIds.Strength,
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
        mainAttributeId: AttributeIds.Agility,
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
        mainAttributeId: AttributeIds.Strength,
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
        mainAttributeId: AttributeIds.Strength,
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
        mainAttributeId: AttributeIds.Agility,
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
        mainAttributeId: AttributeIds.Will,
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
        mainAttributeId: AttributeIds.Agility,
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
        mainAttributeId: AttributeIds.Will,
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
        mainAttributeId: AttributeIds.Intellect,
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
        mainAttributeId: AttributeIds.Strength,
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
        mainAttributeId: AttributeIds.Agility,
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
        mainAttributeId: AttributeIds.Intellect,
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
        mainAttributeId: AttributeIds.Will,
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
        mainAttributeId: AttributeIds.Agility,
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
        mainAttributeId: AttributeIds.Strength,
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
        mainAttributeId: AttributeIds.Agility,
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
        mainAttributeId: AttributeIds.Strength,
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
        mainAttributeId: AttributeIds.Will,
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
        mainAttributeId: AttributeIds.Intellect,
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
        mainAttributeId: AttributeIds.Will,
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
  "weapons": {
    data: [
      {
        id: WeaponIds.Aggeloslayer,
        image: BASE_URL + "images/weapons/aggeloslayer.png",
        name: "Aggeloslayer",
        typeId: WeaponTypeIds.Polearm,
        rarity: 4,
        baseATK90: 341,
        skillsMax: {
          "Will Boost (S)": "Will +93",
          "Arts Boost (S)": "Arts DMG Dealt +26.0%",
          "Suppression: Emergency Boost": "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.AncientCanal,
        image: BASE_URL + "images/weapons/ancient-canal.png",
        name: "Ancient Canal",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Strength Boost (M)": "Strength +124",
          "Arts Intensity Boost (M)": "Arts Intensity +62",
          "Brutality: Lands of Yore": "Arts Intensity +28\n"
            + "After the wielder consumes Vulnerable stack(s), the wielder gains Physical DMG Dealt +(14.0% x Stacks Consumed) for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.ArtzyTyrannical,
        image: BASE_URL + "images/weapons/artzy-tyrannical.png",
        name: "Artzy Tyrannical",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 505,
        skillsMax: {
          "Intellect Boost (L)": "Intellect +156",
          "Critical Rate Boost (L)": "Critical Rate +19.5%",
          "Fracture: Artzy Exaggeration": "Cryo DMG Dealt +44.8%\n"
            + "After the wielder scores a critical hit with a battle skill or combo skill, the wielder gains Cryo DMG Dealt +39.2% for 30s.\n"
            + "Max stacks of the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        },
      },
      {
        id: WeaponIds.Aspirant,
        image: BASE_URL + "images/weapons/aspirant.png",
        name: "Aspirant",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Agility Boost (M)": "Agility +124",
          "Physical DMG Boost (M)": "Physical DMG Dealt +34.7%",
          "Twilight: Imposing Peak": "Ultimate DMG Dealt 44.8%\n"
            + "After the wielder applies Lifted, during the next ultimate cast within 30s, the wielder gains Physical DMG Dealt +33.6%.\n"
            + "Max stacks for effects of the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.5s.",
        },
      },
      {
        id: WeaponIds.BrigandsCalling,
        image: BASE_URL + "images/weapons/brigands-calling.png",
        name: "Brigand’s Calling",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 505,
        skillsMax: {
          "Agility Boost (L)": "Agility +156",
          "Attack Boost (L)": "Attack +39.0%",
          "Detonate: Brigand's Bane": "Cryo DMG Dealt +44.8%.\n"
            + "When the wielder applies skill or ultimate applies Cryo Infliction via battle skills or ultimates, the wielder gains Cryo DMG Dealt +56.0% for 20s. When the wielder's battle skill or ultimate applies Arts Susceptibility, the target enemy suffers Arts DMG Taken +16.8% for 20s.\n"
            + "The two effects apply separately and do not stack with themselves.",
        },
      },
      {
        id: WeaponIds.ChimericJustice,
        image: BASE_URL + "images/weapons/chimeric-justice.png",
        name: "Chimeric Justice",
        typeId: WeaponTypeIds.Polearm,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Strength Boost (M)": "Strength +124",
          "Ultimate Gain Efficiency Boost (M)": "Ultimate Gain Efficiency +37.1%",
          "Brutality: Cemented Fury": "Critical Rate +8.4%\n"
            + "When the wielder applies Vulnerable to an enemy with no Vulnerable stacks, ATK +42.0% for 15s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.ChivalricVirtues,
        image: BASE_URL + "images/weapons/chivalric-virtues.png",
        name: "Chivalric Virtues",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 485,
        skillsMax: {
          "Will Boost (L)": "Will +156",
          "HP Boost (L)": "Max HP +78.0%",
          "Medicant: Blight Fervor": "Treatment Efficiency +28.0%\n"
            + "After the wielder gives HP treatment with their own skill, the entire team gains ATK +25.2% for 15s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.Clannibal,
        image: BASE_URL + "images/weapons/clannibal.png",
        name: "Clannibal",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 490,
        skillsMax: {
          "Main Attribute Boost (L)": "Main Attribute +132",
          "Arts Boost (L)": "Arts DMG Dealt +43.3%",
          "Infliction: Vicious Purge": "Arts DMG +33.6%\n"
            + "After the wielder consumes an Arts Reaction, target enemy suffers Arts DMG Taken +28.0% (for the specified element) for 15s.\n"
            + "Effect only triggers once every 25s.",
        },
      },
      {
        id: WeaponIds.CohesiveTraction,
        image: BASE_URL + "images/weapons/cohesive-traction.png",
        name: "Cohesive Traction",
        typeId: WeaponTypeIds.Polearm,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Will Boost (M)": "Will +124",
          "Electric DMG Boost (M)": "Electric DMG Dealt +34.7%",
          "Suppression: Concentric Circles": "Combo Skill DMG Dealt +28.0%\n"
            + "When the wielder casts a combo skill, during the next battle skill cast within 30s, the wielder gains Electric DMG Dealt +28.0%.\n"
            + "Max stacks of the same name: 3. Duration of each stack is counted separately.",
        },
      },
      {
        id: WeaponIds.Darhoff7,
        image: BASE_URL + "images/weapons/darhoff-7.png",
        name: "Darhoff 7",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 3,
        baseATK90: 283,
        skillsMax: {
          "Main Attribute Boost (S)": "Main Attribute +79",
          "Assault: Armament Prep": "ATK +34",
        },
      },
      {
        id: WeaponIds.DeliveryGuaranteed,
        image: BASE_URL + "images/weapons/delivery-guaranteed.png",
        name: "Delivery Guaranteed",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 500,
        skillsMax: {
          "Will Boost (L)": "Will +156",
          "Ultimate Gain Efficiency Boost (L)": "Ultimate Gain Efficiency +46.4%",
          "Pursuit: Duty Fulfilled": "Nature DMG Dealt +44.8%\n"
            + "After the wielder's combo skill applies Lifted, the team gains Arts DMG Dealt +28.0% for 15s. For every enemy Lifted, the team gains bonus Arts DMG Dealt +5.6%, up to a max of 22.4%.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.DetonationUnit,
        image: BASE_URL + "images/weapons/detonation-unit.png",
        name: "Detonation Unit",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 490,
        skillsMax: {
          "Main Attribute Boost (L)": "Main Attribute +132",
          "Arts Intensity Boost (L)": "Arts Intensity +78",
          "Detonate: Imposing Champion": "Secondary Attribute +28.0%\n"
            + "When the wielder applies an Arts Burst, target enemy suffers Arts DMG Taken +25.2% for 15s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.DreamsOfTheStarryBeach,
        image: BASE_URL + "images/weapons/dreams-of-the-starry-beach.png",
        name: "Dreams of the Starry Beach",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 495,
        skillsMax: {
          "Intellect Boost (L)": "Intellect +156",
          "Treatment Efficiency Boost (L)": "Treatment Efficiency +46.4%",
          "Infliction: Tidal Murmurs": "Secondary Attribute +44.8%\n"
            + "After the wielder consumes Corrosion, target enemy suffers Arts DMG Taken +28.0% for 25s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.EminentRepute,
        image: BASE_URL + "images/weapons/eminent-repute.png",
        name: "Eminent Repute",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 490,
        skillsMax: {
          "Main Attribute Boost (L)": "Main Attribute +132",
          "Physical DMG Boost (L)": "Physical DMG Dealt +43.3%",
          "Brutality: Disciplinarian": "ATK +28.0%\n"
            + "After the wielder consumes Vulnerable stack(s), ATK +(14.0% + 7.0% x Stacks Consumed) while other operators in the team gain half of this buff for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.Exemplar,
        image: BASE_URL + "images/weapons/exemplar.png",
        name: "Exemplar",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 6,
        baseATK90: 500,
        skillsMax: {
          "Main Attribute Boost (L)": "Main Attribute +132",
          "Attack Boost (L)": "Attack +39.0%",
          "Suppression: Stacked Hew": "Physical DMG Dealt +28.0%\n"
            + "When the wielder's battle skill hits an enemy, the wielder gains Physical DMG Dealt +28.0% for 30s.\n"
            + "Max stacks for the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        },
      },
      {
        id: WeaponIds.Finchaser30,
        image: BASE_URL + "images/weapons/finchaser-3-0.png",
        name: "Finchaser 3.0",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Strength Boost (M)": "Strength +124",
          "Cryo DMG Boost (M)": "Cryo DMG Dealt +34.7%",
          "Suppression: Fin Chaser's Intent": "ATK +14.0%\n"
            + "When the wielder's battle skill applies Solidification, target enemy suffers Cryo DMG Taken +19.6% for 15s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.FinishingCall,
        image: BASE_URL + "images/weapons/finishing-call.png",
        name: "Finishing Call",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Strength Boost (M)": "Strength +124",
          "HP Boost (M)": "Max HP +62.4%",
          "Medicant: Glory of Knighthood": "Secondary Attribute +14.0%\n"
            + "Combo skill HP treatment effect +56.0%",
        },
      },
      {
        id: WeaponIds.FlickersInTheMist,
        image: BASE_URL + "images/weapons/flickers-in-the-mist.png",
        name: "Flickers in the Mist",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 490,
        skillsMax: {
          "Will Boost (L)": "Will +156",
          "Electric DMG Boost (M)": "Electric DMG Dealt +34.7%",
          "Efficacy: Overlapping Borders": "ATK +19.6%.\n"
            + "When the wielder gains Electric Amp, the wielder also gains Electric DMG Dealt +15.4% for 30s.\n"
            + "Max stacks for effects of the same name: 3. Duration of each stack is counted separately. This effect only triggers once every 0.1s.",
        },
      },
      {
        id: WeaponIds.FluorescentRoc,
        image: BASE_URL + "images/weapons/fluorescent-roc.png",
        name: "Fluorescent Roc",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 4,
        baseATK90: 341,
        skillsMax: {
          "Will Boost (S)": "Will +93",
          "ATK Boost (S)": "Attack +23.4%",
          "Suppression: Emergency Boost": "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.ForgebornScathe,
        image: BASE_URL + "images/weapons/forgeborn-scathe.png",
        name: "Forgeborn Scathe",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 510,
        skillsMax: {
          "Intellect Boost (L)": "Intellect +156",
          "Attack Boost (L)": "Attack +39.0%",
          "Twilight: Blazing Wail": "Heat DMG Dealt +44.8%\n"
            + "When the wielder casts an ultimate, the wielder gains Basic Attack DMG Dealt +210.0% for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.FormerFinery,
        image: BASE_URL + "images/weapons/former-finery.png",
        name: "Former Finery",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 6,
        baseATK90: 495,
        skillsMax: {
          "Will Boost (L)": "Will +156",
          "HP Boost (L)": "Max HP +78.0%",
          "Efficacy: Mincing Therapy": "Treatment Efficiency +28.0%\n"
            + "After a Protected operator takes DMG, the wielder restores the said operator's HP by (235 + Will x 1.96)\n"
            + "Effect only triggers once every 15s.",
        },
      },
      {
        id: WeaponIds.Fortmaker,
        image: BASE_URL + "images/weapons/fortmaker.png",
        name: "Fortmaker",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Intellect Boost (M)": "Intellect +124",
          "Ultimate Gain Efficiency Boost (M)": "Ultimate Gain Efficiency +37.1%",
          "Inspiring: Back to the Broken City": "ATK +14.0%\nArts Intensity +70",
        },
      },
      {
        id: WeaponIds.FreedomToProselytize,
        image: BASE_URL + "images/weapons/freedom-to-proselytize.png",
        name: "Freedom to Proselytize",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Will Boost (M)": "Will +124",
          "Treatment Efficiency Boost (M)": "Treatment Efficiency +37.1%",
          "Medicant: Redemption of Faith": "Main Attribute +14.0%\n"
            + "When the wielder's battle skill provides HP treatment, the controlled operator is restored for another (168 + Will x 1.40) HP.\n"
            + "Effect only triggers once every 15s.",
        },
      },
      {
        id: WeaponIds.GloriousMemory,
        image: BASE_URL + "images/weapons/glorious-memory.png",
        name: "Glorious Memory",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 490,
        skillsMax: {
          "Agility Boost (L)": "Agility +156",
          "Critical Rate Boost (L)": "Critical Rate +19.5%",
          "Twilight: Lingering Glow": "When the wielder's skill applies Vulnerability, during the next ultimate cast within 30s, the wielder gains DMG Dealt +33.6%.\n"
            + "Max stacks for effects of the same name: 3. Duration of each stack is counted separately. Effect is only triggered every 0.5s.",
        },
      },
      {
        id: WeaponIds.GrandVision,
        image: BASE_URL + "images/weapons/grand-vision.png",
        name: "Grand Vision",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 500,
        skillsMax: {
          "Agility Boost (L)": "Agility +156",
          "Attack Boost (L)": "Attack +39.0%",
          "Infliction: Long Time Wish": "Arts Intensity +84\n"
            + "When the wielder applies Originium Crystals or Solidification, during the next battle skill or ultimate cast within 20s, the wielder gains Physical DMG Dealt +100.8%.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.HomeLonging,
        // TODO: Картинки нет
        image: BASE_URL + "images/weapons/home-longing.png",
        name: "Home Longing",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 490,
        skillsMax: {
          "Agility Boost (L)": "Agility +156",
          "Cryo DMG Boost (L)": "Cryo DMG Dealt +43.3%",
          "Suppression: Olden Moon": "ATK +19.6%.\n"
            + "For 20s after the wielder casts a combo skill, the wielder's next battle skill gains Cryo and Nature DMG Dealt +22.4%.\n"
            + "Max stacks for effects of the same name: 2. Duration of each stack is counted separately.",
        },
      },
      {
        id: WeaponIds.HowlingGuard,
        image: BASE_URL + "images/weapons/howling-guard.png",
        name: "Howling Guard",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 4,
        baseATK90: 341,
        skillsMax: {
          "Intellect Boost (S)": "Intellect +93",
          "ATK Boost (S)": "Attack +23.4%",
          "Suppression: Emergency Boost": "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.HypernovaAuto,
        image: BASE_URL + "images/weapons/hypernova-auto.png",
        name: "Hypernova Auto",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 4,
        baseATK90: 341,
        skillsMax: {
          "Intellect Boost (S)": "Intellect +93",
          "Arts Boost (S)": "Arts DMG Dealt +26.0%",
          "Inspiring: Start of a Saga": "When the wielder's HP is above 80%, ATK +42.0%.",
        },
      },
      {
        id: WeaponIds.Industry01,
        image: BASE_URL + "images/weapons/industry-0-1.png",
        name: "Industry 0.1",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 4,
        baseATK90: 341,
        skillsMax: {
          "Strength Boost (S)": "Strength +93",
          "ATK Boost (S)": "Attack +23.4%",
          "Suppression: Emergency Boost": "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.JET,
        image: BASE_URL + "images/weapons/jet.png",
        name: "JET",
        typeId: WeaponTypeIds.Polearm,
        rarity: 6,
        baseATK90: 500,
        skillsMax: {
          "Main Attribute Boost (L)": "Main Attribute +132",
          "Attack Boost (L)": "Attack +39.0%",
          "Suppression: Astrophysics": "Arts DMG Dealt +33.6%\n"
            + "When the wielder casts a battle skill, the wielder gains Arts DMG Dealt +33.6% for 15s. When the wielder casts a combo skill, Arts DMG Dealt +33.6% for 15s.\n"
            + "The two effects apply separately and do not stack with themselves.",
        },
      },
      {
        id: WeaponIds.Jiminy12,
        image: BASE_URL + "images/weapons/jiminy-12.png",
        name: "Jiminy 12",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 3,
        baseATK90: 283,
        skillsMax: {
          "Main Attribute Boost (S)": "Main Attribute +79",
          "Assault: Armament Prep": "ATK +34",
        },
      },
      {
        id: WeaponIds.Khravengger,
        image: BASE_URL + "images/weapons/khravengger.png",
        name: "Khravengger",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 6,
        baseATK90: 505,
        skillsMax: {
          "Strength Boost (L)": "Strength +156",
          "Attack Boost (L)": "Attack +39.0%",
          "Detonate: Bonechilling": "Skill DMG Dealt +56.0% (for every skill).\n"
            + "When the wielder's battle skill applies Cryo Infliction, the wielder gains Cryo DMG Dealt +28.0% for 15s. When the wielder deals combo skill DMG to an enemy with Cryo Infliction, the wielder gains Cryo DMG Dealt +56.0% for 15s.",
        },
      },
      {
        id: WeaponIds.LoneBarge,
        image: BASE_URL + "images/weapons/lone-barge.png",
        name: "Lone Barge",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 510,
        skillsMax: {
          "Will Boost (L)": "Will +156",
          "Attack Boost (L)": "Attack +39.0%",
          "Suppression: Streaming Blitz": "Electric DMG Dealt +44.8%.\n"
            + "When the wielder's battle skill consumes Arts Reactions, the wielder gains Battle Skill Electric DMG Dealt +56.0% for 20s. This effect can reach a max of 2 stacks and can only trigger once every 0.1s. Duration of each stack is counted separately. After the wielder casts an ultimate, the wielder gains Battle Skill Electric DMG Dealt +112.0% for 25s. This effect cannot stack.",
        },
      },
      {
        id: WeaponIds.LongRoad,
        image: BASE_URL + "images/weapons/long-road.png",
        name: "Long Road",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 4,
        baseATK90: 341,
        skillsMax: {
          "Strength Boost (S)": "Strength +93",
          "Arts Boost (S)": "Arts DMG Dealt +26.0%",
          "Pursuit: Unending Cycle": "When the wielder casts a combo skill, the wielder gains ATK +33.6% for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.LupineScarlet,
        image: BASE_URL + "images/weapons/lupine-scarlet.png",
        name: "Lupine Scarlet",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 505,
        skillsMax: {
          "Agility Boost (L)": "Agility +156",
          "Critical Rate Boost (L)": "Critical Rate +19.5%",
          "Fracture: Gnashing Wolves": "ATK +44.8%.\n"
            + "After the wielder's skill deals Critical DMG, the wielder gains 1 stack of Wolven Blood that grants Physical and Heat DMG Dealth +2.8%. Wolven Blood can reach 16 stacks. After reaching 16 stacks, the wielder gains another Physical and Heat DMG Dealt +67.2% for 20s. After the duration ends, all Wolven Blood stacks are removed.",
        },
      },
      {
        id: WeaponIds.Monaihe,
        // TODO: Картинки нет
        image: BASE_URL + "images/weapons/monaihe.png",
        name: "Monaihe",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Will Boost (M)": "Will +124",
          "Ultimate Gain Efficiency Boost (M)": "Ultimate Gain Efficiency +37.1%",
          "Inspiring: Mortise-and-Tenon Analysis": "Main Attribute +14.0%\nArts Intensity +70",
        },
      },
      {
        id: WeaponIds.MountainBearer,
        // TODO: Картинки нет
        image: BASE_URL + "images/weapons/mountain-bearer.png",
        name: "Mountain Bearer",
        typeId: WeaponTypeIds.Polearm,
        rarity: 6,
        baseATK90: 500,
        skillsMax: {
          "Agility Boost (L)": "Agility +156",
          "Physical DMG Boost (L)": "Physical DMG Dealt +43.3%",
          "Efficacy: Weight of Mountain": "Against Vulnerable enemies, the wielder gains DMG Dealt +56.0%\n"
            + "When the wielder's battle skill applies Vulnerability, the wielder gains all attributes +22.4% for 15s. When the wielder's battle skill applies Physical Susceptibility, the wielder gains all attributes +22.4% for 15s.\n"
            + "Max stacks of the same name: 2. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        },
      },
      {
        id: WeaponIds.Navigator,
        image: BASE_URL + "images/weapons/navigator.png",
        name: "Navigator",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 490,
        skillsMax: {
          "Intellect Boost (L)": "Intellect +156",
          "Cryo DMG Boost (L)": "Cryo DMG Dealt +43.3%",
          "Infliction: Lone and Distant Sail": "Critical Rate +9.8%\n"
            + "When Solidification or Corrosion is applied to enemies, the wielder gains Cryo DMG Dealt and Nature DMG Dealt +9.8%, and Critical Rate +5.6% for 15s. If this effect is triggered by the wielder, double the increase gained.\n"
            + "Effects of the same name cannot stack. Effect only triggers once every 20s.",
        },
      },
      {
        id: WeaponIds.NeverRest,
        image: BASE_URL + "images/weapons/never-rest.png",
        name: "Never Rest",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 500,
        skillsMax: {
          "Will Boost (L)": "Will +156",
          "Attack Boost (L)": "Attack +39.0%",
          "Flow: Reincarnation": "Physical DMG Dealt +44.8%\n"
            + "After the wielder's skill recovers SP, the wielder gains Physical DMG Dealt +14.0% while the other operators in the team gain Physical DMG Dealt +7.0% for 30s.\n"
            + "Max stacks for effects of the same name: 5. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        },
      },
      {
        id: WeaponIds.OBJArtsIdentifier,
        image: BASE_URL + "images/weapons/obj-arts-identifier.png",
        name: "OBJ Arts Identifier",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Intellect Boost (M)": "Intellect +124",
          "Arts Intensity Boost (M)": "Arts Intensity +62",
          "Pursuit: Transcendent Arts": "Max HP +28.0%\n"
            + "When the wielder's combo skill applies Arts Burst or Physical Status, the entire team gains Heat DMG Dealt and Electric DMG Dealt +22.4% for 15s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.OBJEdgeOfLightness,
        image: BASE_URL + "images/weapons/obj-edge-of-lightness.png",
        name: "OBJ Edge of Lightness",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Agility Boost (M)": "Agility +124",
          "ATK Boost (M)": "Attack +31.2%",
          "Flow: Unbridled Edge": "Secondary Attribute +14.0%\n"
            + "After the wielder recovers SP by their own skill, the entire team gains Heat DMG Dealt and Electric DMG Dealt +8.4% for 20s.\n"
            + "Max stacks for effects of the same name: 3. Duration of each stack is counted separately.",
        },
      },
      {
        id: WeaponIds.OBJHeavyBurden,
        image: BASE_URL + "images/weapons/obj-heavy-burden.png",
        name: "OBJ Heavy Burden",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Strength Boost (M)": "Strength +124",
          "HP Boost (M)": "Max HP +62.4%",
          "Efficacy: Tenacious Will": "Secondary Attribute +14.0%\n"
            + "When the wielder applies Knocked Down or Weakened, DEF +50.4% for 15s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.OBJRazorhorn,
        image: BASE_URL + "images/weapons/obj-razorhorn.png",
        name: "OBJ Razorhorn",
        typeId: WeaponTypeIds.Polearm,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Will Boost (M)": "Will +124",
          "Physical DMG Boost (M)": "Physical DMG Dealt +34.7%",
          "Infliction: Conquest of Icy Peaks": "To enemies with Cryo Infliction or Solidification, the wielder gains DMG Dealt +22.4%. After consuming Solidification, ATK +33.6% for 15s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.OBJVelocitous,
        image: BASE_URL + "images/weapons/obj-velocitous.png",
        name: "OBJ Velocitous",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Agility Boost (M)": "Agility +124",
          "Ultimate Gain Efficiency Boost (M)": "Ultimate Gain Efficiency +37.1%",
          "Detonate: Rapid Strike": "ATK +14.0%\n"
            + "After the wielder consumes an Arts Infliction, the wielder gains Nature DMG Dealt +(14.0% x Stacks Consumed) for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.Oblivion,
        image: BASE_URL + "images/weapons/oblivion.png",
        name: "Oblivion",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 495,
        skillsMax: {
          "Intellect Boost (L)": "Intellect +156",
          "Arts Boost (L)": "Arts DMG Dealt +43.3%",
          "Twilight: Humiliation": "Critical Rate +14.0%\n"
            + "When the wielder casts an ultimate, the wielder gains Arts DMG Dealt +67.2% for 15s. When the wielder casts a combo skill, the wielder gains Arts DMG Dealt +33.6% for 15s.\n"
            + "The two effects apply separately and do not stack with themselves.",
        },
      },
      {
        id: WeaponIds.Opero77,
        image: BASE_URL + "images/weapons/opero-77.png",
        name: "Opero 77",
        typeId: WeaponTypeIds.Polearm,
        rarity: 3,
        baseATK90: 283,
        skillsMax: {
          "Main Attribute Boost (S)": "Main Attribute +79",
          "Assault: Armament Prep": "ATK +34",
        },
      },
      {
        id: WeaponIds.OpusEtchFigure,
        // TODO: Картинки нет
        image: BASE_URL + "images/weapons/opus-etch-figure.png",
        name: "Opus: Etch Figure",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 485,
        skillsMax: {
          "Will Boost (L)": "Will +156",
          "Nature DMG Boost (L)": "Nature DMG Dealt+43.3%",
          "Suppression: Tillite Etchings": "ATK +19.6%\n"
            + "When the wielder's battle skill applies Nature Infliction, other operators in the team gain Arts DMG Dealt +14.0% for 15s. For every enemy suffering from Nature Infliction applied by the said battle skill, the team gains Arts DMG Dealt +5.6%, up to a max of 16.8%.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.OpusTheLiving,
        image: BASE_URL + "images/weapons/opus-the-living.png",
        name: "Opus: The Living",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Agility Boost (M)": "Agility +124",
          "Arts Boost (M)": "Arts DMG Dealt +34.7%",
          "Infliction: Road Home for All Life": "Critical Rate +8.4%\n"
            + "When the wielder applies an Arts Reaction, the wielder gains ATK +21.0% for 20s.\n"
            + "Max stacks of the same name: 2. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        },
      },
      {
        id: WeaponIds.PathfindersBeacon,
        image: BASE_URL + "images/weapons/pathfinders-beacon.png",
        name: "Pathfinder's Beacon",
        typeId: WeaponTypeIds.Polearm,
        rarity: 4,
        baseATK90: 341,
        skillsMax: {
          "Agility Boost (S)": "Agility +93",
          "ATK Boost (S)": "Attack +23.4%",
          "Inspiring: Start of a Saga": "When the wielder's HP is above 80%, ATK +42.0%.",
        },
      },
      {
        id: WeaponIds.Peco5,
        image: BASE_URL + "images/weapons/peco-5.png",
        name: "Peco 5",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 3,
        baseATK90: 283,
        skillsMax: {
          "Main Attribute Boost (S)": "Main Attribute +79",
          "Assault: Armament Prep": "ATK +34",
        },
      },
      {
        id: WeaponIds.ProminentEdge,
        image: BASE_URL + "images/weapons/prominent-edge.png",
        name: "Prominent Edge",
        typeId: WeaponTypeIds.Sword,
        rarity: 4,
        baseATK90: 341,
        skillsMax: {
          "Agility Boost (S)": "Agility +93",
          "Physical DMG Boost (S)": "Physical DMG Dealt +26.0%",
          "Suppression: Emergency Boost": "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.Quencher,
        image: BASE_URL + "images/weapons/quencher.png",
        name: "Quencher",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 4,
        baseATK90: 341,
        skillsMax: {
          "Will Boost (S)": "Will +93",
          "HP Boost (S)": "Max HP +46.8%",
          "Crusher: Honed into Legion": "When the wielder performs a Final Strike on the enemy, ATK +33.6% for 10s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.RapidAscent,
        image: BASE_URL + "images/weapons/rapid-ascent.png",
        name: "Rapid Ascent",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 495,
        skillsMax: {
          "Main Attribute Boost (L)": "Main Attribute +132",
          "Critical Rate Boost (L)": "Critical Rate +19.5%",
          "Twilight: Azure Clouds": "Battle skills and ultimates gain Physical DMG Dealt +42.0%\n"
            + "Against Staggered enemies, battle skills and ultimates also gain DMG Dealt +98.0%.",
        },
      },
      {
        id: WeaponIds.RationalFarewell,
        image: BASE_URL + "images/weapons/rational-farewell.png",
        name: "Rational Farewell",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Strength Boost (M)": "Strength +124",
          "Heat DMG Boost (M)": "Heat DMG Dealt +34.7%",
          "Pursuit: Aid from the Past": "Battle Skill DMG Dealt +28.0%\n"
            + "When the wielder's combo skill applies Arts Burst or Combusted, ATK +44.8% for 15s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.SeekerOfDarkLung,
        image: BASE_URL + "images/weapons/seeker-of-dark-lung.png",
        name: "Seeker of Dark Lung",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Strength Boost (M)": "Strength +124",
          "Ultimate Gain Efficiency Boost (M)": "Ultimate Gain Efficiency +37.1%",
          "Detonate: Seeker of the Esoteric": "Main Attribute +14.0%\n"
            + "When the wielder applies an Arts Burst, ATK +16.8% for 30s.\n"
            + "Max stacks for the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        },
      },
      {
        id: WeaponIds.StanzaOfMemorials,
        image: BASE_URL + "images/weapons/stanza-of-memorials.png",
        name: "Stanza of Memorials",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Intellect Boost (M)": "Intellect +124",
          "ATK Boost (M)": "Attack +31.2%",
          "Twilight: Lustrous Pyre": "Max HP +28.0%\n"
            + "When the wielder casts an ultimate, operators whose elements differ from the wielder gain ATK +22.4% for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.SunderedPrince,
        image: BASE_URL + "images/weapons/sundered-prince.png",
        name: "Sundered Prince",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 6,
        baseATK90: 490,
        skillsMax: {
          "Strength Boost (L)": "Strength +156",
          "Critical Rate Boost (L)": "Critical Rate +19.5%",
          "Crusher: Princely Deterrence": "When the wielder performs a Final Strike on the enemy, ATK +28.0% for 8s.\n"
            + "If the wielder is also the controlled operator, Final Strike deals Stagger +33.6% to the enemy.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.SunderingSteel,
        image: BASE_URL + "images/weapons/sundering-steel.png",
        name: "Sundering Steel",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Agility Boost (M)": "Agility +124",
          "Physical DMG Boost (M)": "Physical DMG Dealt +34.7%",
          "Combative: Anthem of Cinder": "ATK +14.0%\n"
            + "When the wielder deals a Physical Status, ATK +21.0% for 20s.\n"
            + "Max stacks of the same name: 2. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        },
      },
      {
        id: WeaponIds.Tarr11,
        image: BASE_URL + "images/weapons/tarr-11.png",
        name: "Tarr 11",
        typeId: WeaponTypeIds.Sword,
        rarity: 3,
        baseATK90: 283,
        skillsMax: {
          "Main Attribute Boost (S)": "Main Attribute +79",
          "Assault: Armament Prep": "ATK +34",
        },
      },
      {
        id: WeaponIds.ThermiteCutter,
        image: BASE_URL + "images/weapons/thermite-cutter.png",
        name: "Thermite Cutter",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 490,
        skillsMax: {
          "Will Boost (L)": "Will +156",
          "Attack Boost (L)": "Attack +39.0%",
          "Flow: Thermal Release": "ATK+28.0%\n"
            + "After the wielder's skill recovers SP or grants a Link state, the entire team gains ATK +14.0% for 20s.\n"
            + "Max stacks for effects of the same name: 2. Duration of each stack is counted separately.",
        },
      },
      {
        id: WeaponIds.Thunderberge,
        image: BASE_URL + "images/weapons/thunderberge.png",
        name: "Thunderberge",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 6,
        baseATK90: 495,
        skillsMax: {
          "Strength Boost (L)": "Strength +156",
          "HP Boost (L)": "Max HP +78.0%",
          "Medicant: Eye of Talos": "Shield applied +67.2%\n"
            + "After the wielder's combo skill provides HP treatment, the controlled operator gains an additional (19.6% x Wielder's Max HP) Shield for 15s.\n"
            + "Effect only triggers once every 15s.",
        },
      },
      {
        id: WeaponIds.TwelveQuestions,
        image: BASE_URL + "images/weapons/twelve-questions.png",
        name: "Twelve Questions",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Agility Boost (M)": "Agility +124",
          "ATK Boost (M)": "Attack +31.2%",
          "Infliction: Sincere Interrogation": "Secondary Attribute +14.0%%\n"
            + "After the wielder consumes an Arts Reaction, ATK +21.0% for 20s.\n"
            + "Max stacks for effects of the same name: 2. Duration of each stack is counted separately.",
        },
      },
      {
        id: WeaponIds.UmbralTorch,
        image: BASE_URL + "images/weapons/umbral-torch.png",
        name: "Umbral Torch",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 490,
        skillsMax: {
          "Intellect Boost (L)": "Intellect +156",
          "Heat DMG Boost (L)": "Heat DMG Dealt +43.3%",
          "Infliction: Covetous Buildup": "ATK +19.6%\n"
            + "Whenever Combustion or Corrosion is applied to an enemy, the wielder gains Heat DMG Dealt and Nature DMG Dealt +22.4%\n"
            + "Max stacks for effects with the same name: 3.",
        },
      },
      {
        id: WeaponIds.Valiant,
        image: BASE_URL + "images/weapons/valiant.png",
        name: "Valiant",
        typeId: WeaponTypeIds.Polearm,
        rarity: 6,
        baseATK90: 495,
        skillsMax: {
          "Agility Boost (L)": "Agility +156",
          "Physical DMG Boost (L)": "Physical DMG Dealt +43.3%",
          "Combative: Virtuous Gain": "ATK +28.0%\n"
            + "After the wielder applies a Physical Statuses, the wielder also deals another hit of Physical DMG equal to 336.0% of the wielder's ATK.",
        },
      },
      {
        id: WeaponIds.WaveTide,
        image: BASE_URL + "images/weapons/wave-tide.png",
        name: "Wave Tide",
        typeId: WeaponTypeIds.Sword,
        rarity: 4,
        baseATK90: 341,
        skillsMax: {
          "Intellect Boost (S)": "Intellect +93",
          "ATK Boost (S)": "Attack +23.4%",
          "Pursuit: Unending Cycle": "When the wielder casts a combo skill, the wielder gains ATK +33.6% for 20s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.Wedge,
        image: BASE_URL + "images/weapons/wedge.png",
        name: "Wedge",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 500,
        skillsMax: {
          "Main Attribute Boost (L)": "Main Attribute +132",
          "Critical Rate Boost (L)": "Critical Rate +19.5%",
          "Infliction: Wedge of Civilization": "Arts DMG Dealt +33.6%\n"
            + "When the wielder casts a battle skill, the wielder gains Arts DMG Dealt +22.4% for 15s. When the wielder's battle skill applies an Arts Reaction, the wielder gains Arts DMG Dealt +44.8% for 15s.\n"
            + "The two effects apply separately and do not stack with themselves.",
        },
      },
      {
        id: WeaponIds.WhiteNightNova,
        image: BASE_URL + "images/weapons/white-night-nova.png",
        name: "White Night Nova",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 505,
        skillsMax: {
          "Main Attribute Boost (L)": "Main Attribute +132",
          "Arts Intensity Boost (L)": "Arts Intensity +78",
          "Infliction: White Night Nova": "Arts DMG Dealt +33.6%\n"
            + "After the wielder applies Combustion or Electrification, the wielder gains Arts DMG Dealt +33.6% and Arts Intensity +70 for 15s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
      {
        id: WeaponIds.WildWanderer,
        image: BASE_URL + "images/weapons/wild-wanderer.png",
        name: "Wild Wanderer",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 5,
        baseATK90: 411,
        skillsMax: {
          "Intellect Boost (M)": "Intellect +124",
          "Electric DMG Boost (M)": "Electric DMG Dealt +34.7%",
          "Infliction: Wilderness Cluster": "Arts Intensity +28\n"
            + "When the wielder applies Electrification, the team gains Physical DMG Dealt and Electric DMG Dealt +22.4% for 15s.\n"
            + "Effects of the same name cannot stack.",
        },
      },
    ],
    transformList: item => ({ id: item.id, image: item.image, name: item.name }),
  },
} satisfies {
  "attributes": CategoryConfig<"attributes">;
  "character-classes": CategoryConfig<"character-classes">;
  "characters": CategoryConfig<"characters">;
  "elements": CategoryConfig<"elements">;
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
    await generateCategory("character-classes", CATEGORIES["character-classes"]);
    await generateCategory("characters", CATEGORIES["characters"]);
    await generateCategory("elements", CATEGORIES["elements"]);
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
