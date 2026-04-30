import fs from "fs/promises";
import path from "path";
import { loadEnv } from "vite";

import { AttributeIds } from "../src/enums/attributes";
import { ElementIds } from "../src/enums/elements";
import { GearSetIds } from "../src/enums/gear-sets";
import { GearTypeIds } from "../src/enums/gear-types";
import { GearIds } from "../src/enums/gears";
import { OperatorRoleIds } from "../src/enums/operator-roles";
import { OperatorIds } from "../src/enums/operators";
import { WeaponTypeIds } from "../src/enums/weapon-types";
import { WeaponIds } from "../src/enums/weapons";
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

const env = loadEnv("development", process.cwd(), "");

const BASE_URL = env.VITE_BASE_URL || "/";
const OUTPUT_DIR = path.resolve("public/data");

const Attributes: Record<keyof typeof AttributeIds, Attribute> = {
  Agility: {
    id: AttributeIds.Agility,
    image: BASE_URL + "images/attributes/agility.png",
    name: "Ловкость",
    description: "Влияет на физическую СОПР оперативника.",
  },
  Intellect: {
    id: AttributeIds.Intellect,
    image: BASE_URL + "images/attributes/intellect.png",
    name: "Интеллект",
    description: "Влияет на сопротивляемость искусствам оперативника.",
  },
  Strength: {
    id: AttributeIds.Strength,
    image: BASE_URL + "images/attributes/strength.png",
    name: "Сила",
    description: "Влияет на макс. ОЗ оперативника.",
  },
  Will: {
    id: AttributeIds.Will,
    image: BASE_URL + "images/attributes/will.png",
    name: "Воля",
    description: "Влияет на получаемое оперативником лечение.",
  },
};
const EssenceCharacteristics = {
  AttackBoost: "Увелич. атаки",
  Detonate: "Детонация",
  Infliction: "Поражение",
  IntellectBoost: "Увелич. интеллекта",
  StrengthBoost: "Увелич. силы",
  TreatmentEfficiencyBoost: "Увелич. эффективности лечения",
  Twilight: "Сумерки",
};
const WeaponSkillsMax = {
  AgilityBoost: {
    L: { title: "Agility Boost [бол.]", text: "Agility +156" },
    M: { title: "Agility Boost (M)", text: "Agility +124" },
    S: { title: "Agility Boost (S)", text: "Agility +93" },
  },
  ArtsBoost: {
    L: { title: "Arts Boost [бол.]", text: "Arts DMG Dealt +43.3%" },
    M: { title: "Arts Boost (M)", text: "Arts DMG Dealt +34.7%" },
    S: { title: "Arts Boost (S)", text: "Arts DMG Dealt +26.0%" },
  },
  ArtsIntensityBoost: {
    L: { title: "Arts Intensity Boost [бол.]", text: "Arts Intensity +78" },
    M: { title: "Arts Intensity Boost (M)", text: "Arts Intensity +62" },
  },
  AttackBoost: {
    L: { title: `${EssenceCharacteristics.AttackBoost} [бол.]`, text: "Атака +39.0%" },
    M: { title: "ATK Boost (M)", text: "Attack +31.2%" },
    S: { title: "ATK Boost (S)", text: "Attack +23.4%" },
  },
  CriticalRateBoost: { L: { title: "Critical Rate Boost [бол.]", text: "Critical Rate +19.5%" } },
  CryoDMGBoost: {
    L: { title: "Cryo DMG Boost [бол.]", text: "Cryo DMG Dealt +43.3%" },
    M: { title: "Cryo DMG Boost (M)", text: "Cryo DMG Dealt +34.7%" },
  },
  ElectricDMGBoost: { M: { title: "Electric DMG Boost (M)", text: "Electric DMG Dealt +34.7%" } },
  HeatDMGBoost: {
    L: { title: "Heat DMG Boost [бол.]", text: "Heat DMG Dealt +43.3%" },
    M: { title: "Heat DMG Boost (M)", text: "Heat DMG Dealt +34.7%" },
  },
  HPBoost: {
    L: { title: "HP Boost [бол.]", text: "Max HP +78.0%" },
    M: { title: "HP Boost (M)", text: "Max HP +62.4%" },
    S: { title: "HP Boost (S)", text: "Max HP +46.8%" },
  },
  IntellectBoost: {
    L: { title: `${EssenceCharacteristics.IntellectBoost} [бол.]`, text: `${Attributes.Intellect.name} +156` },
    M: { title: "Intellect Boost (M)", text: "Intellect +124" },
    S: { title: "Intellect Boost (S)", text: "Intellect +93" },
  },
  MainAttributeBoost: {
    L: { title: "Main Attribute Boost [бол.]", text: "Main Attribute +132" },
    S: { title: "Main Attribute Boost (S)", text: "Main Attribute +79" },
  },
  NatureDMGBoost: { L: { title: "Nature DMG Boost [бол.]", text: "Nature DMG Dealt+43.3%" } },
  PhysicalDMGBoost: {
    L: { title: "Physical DMG Boost [бол.]", text: "Physical DMG Dealt +43.3%" },
    M: { title: "Physical DMG Boost (M)", text: "Physical DMG Dealt +34.7%" },
    S: { title: "Physical DMG Boost (S)", text: "Physical DMG Dealt +26.0%" },
  },
  StrengthBoost: {
    L: { title: `${EssenceCharacteristics.StrengthBoost} [бол.]`, text: `${Attributes.Strength.name} +156` },
    M: { title: "Strength Boost (M)", text: "Strength +124" },
    S: { title: "Strength Boost (S)", text: "Strength +93" },
  },
  TreatmentEfficiencyBoost: {
    L: { title: `${EssenceCharacteristics.TreatmentEfficiencyBoost} [бол.]`, text: "Эффективность лечения +46.4%" },
    M: { title: "Treatment Efficiency Boost (M)", text: "Treatment Efficiency +37.1%" },
  },
  UltimateGainEfficiencyBoost: {
    L: { title: "Ultimate Gain Efficiency Boost [бол.]", text: "Ultimate Gain Efficiency +46.4%" },
    M: { title: "Ultimate Gain Efficiency Boost (M)", text: "Ultimate Gain Efficiency +37.1%" },
  },
  WillBoost: {
    L: { title: "Will Boost [бол.]", text: "Will +156" },
    M: { title: "Will Boost (M)", text: "Will +124" },
    S: { title: "Will Boost (S)", text: "Will +93" },
  },
};

const CATEGORIES = {
  "attributes": {
    data: Object.values(Attributes),
    transformList: item => ({ id: item.id, image: item.image, name: item.name }),
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
  "gear-sets": {
    data: [
      {
        id: GearSetIds.AburreysLegacy,
        name: "Aburrey's Legacy",
        bonusStat: "Wearer's Skill DMG +24%",
        effect: "When the wearer casts a battle skill, combo skill, or ultimate, gain ATK +5% for 15s. The buff from each of the three skill types is unique and does not stack with itself.",
      },
      {
        id: GearSetIds.AICHeavy,
        name: "AIC Heavy",
        bonusStat: "Wearer's HP +500",
        effect: "When the wearer defeats an enemy, restore 100 HP. Effect trigger cooldown: 5s.",
      },
      {
        id: GearSetIds.AICLight,
        name: "AIC Light",
        bonusStat: "Wearer's HP +500",
        effect: "When the wearer defeats an enemy, ATK +20 for 5s.",
      },
      {
        id: GearSetIds.ArmoredMSGR,
        name: "Armored MSGR",
        bonusStat: "Wearer's Strength +50",
        effect: "When the wearer's HP is below 50%, the wearer gains 30% DMG Reduction against all types of DMG.",
      },
      { id: GearSetIds.BasicGearPack, name: "Basic Gear Pack" },
      {
        id: GearSetIds.Catastrophe,
        name: "Catastrophe",
        bonusStat: "Wearer's Ultimate Gain Efficiency +20%.",
        effect: "At the start of battle, the wearer immediately recovers 50 SP.",
      },
      { id: GearSetIds.MinerAGearPack, name: "Miner α Gear Pack" },
      { id: GearSetIds.MinerBGearPack, name: "Miner β Gear Pack" },
      {
        id: GearSetIds.MordvoltInsulation,
        name: "Mordvolt Insulation",
        bonusStat: "Wearer's Intellect +50",
        effect: "When the wearer's HP is above 80%, Arts DMG +20%.",
      },
      {
        id: GearSetIds.MordvoltResistant,
        name: "Mordvolt Resistant",
        bonusStat: "Wearer's Will +50",
        effect: "When the wearer's HP is below 50%, Treatment Effect +30%.",
      },
      {
        id: GearSetIds.RovingMSGR,
        name: "Roving MSGR",
        bonusStat: "Wearer's Agility +50",
        effect: "When the wearer's HP is above 80%, Physical DMG +20%",
      },
    ],
    transformList: item => item,
  },
  "gear-types": {
    data: [
      { id: GearTypeIds.Armor, name: "Armor" },
      { id: GearTypeIds.Gloves, name: "Gloves" },
      { id: GearTypeIds.Kit, name: "Kit" },
    ],
    transformList: item => item,
  },
  "gears": {
    data: [
      {
        id: GearIds.AburreyHeavyArmor,
        image: BASE_URL + "images/gears/aburrey-heavy-armor.png",
        name: "Aburrey Heavy Armor",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [
          { text: "Strength", value: 61 },
          { text: "Agility", value: 41 },
          { text: "All Skill DMG", value: "9.8%" },
        ],
        setId: GearSetIds.AburreysLegacy,
      },
      {
        id: GearIds.AburreyHeavyArmorT1,
        image: BASE_URL + "images/gears/aburrey-heavy-armor-t1.png",
        name: "Aburrey Heavy Armor T1",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [
          { text: "Strength", value: 41 },
          { text: "Agility", value: 61 },
          { text: "Combo Skill DMG Bonus", value: "14.7%" },
        ],
        setId: GearSetIds.AburreysLegacy,
      },
      {
        id: GearIds.AburreyLightArmor,
        image: BASE_URL + "images/gears/aburrey-light-armor.png",
        name: "Aburrey Light Armor",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [
          { text: "Strength", value: 41 },
          { text: "Intellect", value: 61 },
          { text: "Ultimate Gain Efficiency", value: "8.8%" },
        ],
        setId: GearSetIds.AburreysLegacy,
      },
      {
        id: GearIds.AburreyLightArmorT1,
        image: BASE_URL + "images/gears/aburrey-light-armor-t1.png",
        name: "Aburrey Light Armor T1",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [
          { text: "Agility", value: 41 },
          { text: "Will", value: 61 },
          { text: "Battle Skill DMG Bonus", value: "14.7%" },
        ],
        setId: GearSetIds.AburreysLegacy,
      },
      {
        id: GearIds.AICAlloyPlate,
        image: BASE_URL + "images/gears/aic-alloy-plate.png",
        name: "AIC Alloy Plate",
        typeId: GearTypeIds.Kit,
        level: 28,
        rarity: "green",
        defense: 8,
        substats: [{ text: "Agility", value: 16 }, { text: "Final DMG Reduction", value: "7.5%" }],
        setId: GearSetIds.AICHeavy,
      },
      {
        id: GearIds.AICCeramicPlate,
        image: BASE_URL + "images/gears/aic-ceramic-plate.png",
        name: "AIC Ceramic Plate",
        typeId: GearTypeIds.Kit,
        level: 28,
        rarity: "green",
        defense: 8,
        substats: [{ text: "Will", value: 16 }, { text: "Battle Skill DMG Bonus", value: "16.20%" }],
        setId: GearSetIds.AICLight,
      },
      {
        id: GearIds.AICGauntlets,
        image: BASE_URL + "images/gears/aic-gauntlets.png",
        name: "AIC Gauntlets",
        typeId: GearTypeIds.Gloves,
        level: 28,
        rarity: "green",
        defense: 16,
        substats: [
          { text: "Strength", value: 23 },
          { text: "Will", value: 23 },
          { text: "Final DMG Reduction", value: "6.30%" },
        ],
        setId: GearSetIds.AICHeavy,
      },
      {
        id: GearIds.AICHeavyArmor,
        image: BASE_URL + "images/gears/aic-heavy-armor.png",
        name: "AIC Heavy Armor",
        typeId: GearTypeIds.Armor,
        level: 28,
        rarity: "green",
        defense: 22,
        substats: [
          { text: "Strength", value: 30 },
          { text: "Agility", value: 30 },
          { text: "Final DMG Reduction", value: "3.90%" },
        ],
        setId: GearSetIds.AICHeavy,
      },
      {
        id: GearIds.AICHeavyPlate,
        image: BASE_URL + "images/gears/aic-heavy-plate.png",
        name: "AIC Heavy Plate",
        typeId: GearTypeIds.Kit,
        level: 28,
        rarity: "green",
        defense: 8,
        substats: [{ text: "Strength", value: 16 }, { text: "Final DMG Reduction", value: "7.5%" }],
        setId: GearSetIds.AICHeavy,
      },
      {
        id: GearIds.AICLightArmor,
        image: BASE_URL + "images/gears/aic-light-armor.png",
        name: "AIC Light Armor",
        typeId: GearTypeIds.Armor,
        level: 28,
        rarity: "green",
        defense: 22,
        substats: [
          { text: "Intellect", value: 30 },
          { text: "Will", value: 30 },
          { text: "Battle Skill DMG Bonus", value: "8.10%" },
        ],
        setId: GearSetIds.AICLight,
      },
      {
        id: GearIds.AICLightPlate,
        image: BASE_URL + "images/gears/aic-light-plate.png",
        name: "AIC Light Plate",
        typeId: GearTypeIds.Kit,
        level: 28,
        rarity: "green",
        defense: 8,
        substats: [{ text: "Intellect", value: 16 }, { text: "Combo Skill DMG Bonus", value: "16.20%" }],
        setId: GearSetIds.AICLight,
      },
      {
        id: GearIds.AICTacticalGloves,
        image: BASE_URL + "images/gears/aic-tactical-gloves.png",
        name: "AIC Tactical Gloves",
        typeId: GearTypeIds.Gloves,
        level: 28,
        rarity: "green",
        defense: 16,
        substats: [
          { text: "Agility", value: 23 },
          { text: "Intellect", value: 23 },
          { text: "Combo Skill DMG Bonus", value: "13.50%" },
        ],
        setId: GearSetIds.AICLight,
      },
      {
        id: GearIds.ArmoredMSGRFlashlight,
        image: BASE_URL + "images/gears/armored-msgr-flashlight.png",
        name: "Armored MSGR Flashlight",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Strength", value: 21 }, { text: "HP", value: "21.0%" }],
        setId: GearSetIds.ArmoredMSGR,
      },
      {
        id: GearIds.ArmoredMSGRGloves,
        image: BASE_URL + "images/gears/armored-msgr-gloves.png",
        name: "Armored MSGR Gloves",
        typeId: GearTypeIds.Gloves,
        level: 36,
        rarity: "blue",
        defense: 21,
        substats: [
          { text: "Strength", value: 33 },
          { text: "Will", value: 22 },
          { text: "Final DMG Reduction", value: "8.0%" },
        ],
        setId: GearSetIds.ArmoredMSGR,
      },
      {
        id: GearIds.ArmoredMSGRGyro,
        image: BASE_URL + "images/gears/armored-msgr-gyro.png",
        name: "Armored MSGR Gyro",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Strength", value: 21 }, { text: "Attack", value: "10.5%" }],
        setId: GearSetIds.ArmoredMSGR,
      },
      {
        id: GearIds.ArmoredMSGRJacket,
        image: BASE_URL + "images/gears/armored-msgr-jacket.png",
        name: "Armored MSGR Jacket",
        typeId: GearTypeIds.Armor,
        level: 36,
        rarity: "blue",
        defense: 28,
        substats: [{ text: "Strength", value: 44 }, { text: "Agility", value: 29 }, { text: "HP", value: "10.5%" }],
        setId: GearSetIds.ArmoredMSGR,
      },
      {
        id: GearIds.ArmoredMSGRJacketT1,
        image: BASE_URL + "images/gears/armored-msgr-jacket-t1.png",
        name: "Armored MSGR Jacket T1",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [{ text: "Strength", value: 61 }, { text: "Will", value: 41 }, { text: "HP", value: "14.7%" }],
        setId: GearSetIds.ArmoredMSGR,
      },
      {
        id: GearIds.BasicArmor,
        image: BASE_URL + "images/gears/basic-armor.png",
        name: "Basic Armor",
        typeId: GearTypeIds.Armor,
        level: 10,
        rarity: "white",
        defense: 8,
        substats: [{ text: "Strength", value: 15 }, { text: "Agility", value: 10 }, { text: "HP", value: 46 }],
        setId: GearSetIds.BasicGearPack,
      },
      {
        id: GearIds.BasicGauntlets,
        image: BASE_URL + "images/gears/basic-gauntlets.png",
        name: "Basic Gauntlets",
        typeId: GearTypeIds.Gloves,
        level: 10,
        rarity: "white",
        defense: 6,
        substats: [{ text: "Strength", value: 11 }, { text: "Agility", value: 7 }, { text: "HP", value: 77 }],
        setId: GearSetIds.BasicGearPack,
      },
      {
        id: GearIds.BasicGloves,
        image: BASE_URL + "images/gears/basic-gloves.png",
        name: "Basic Gloves",
        typeId: GearTypeIds.Gloves,
        level: 10,
        rarity: "white",
        defense: 6,
        substats: [{ text: "Intellect", value: 11 }, { text: "Will", value: 7 }, { text: "HP", value: 77 }],
        setId: GearSetIds.BasicGearPack,
      },
      {
        id: GearIds.BasicPPE,
        image: BASE_URL + "images/gears/basic-ppe.png",
        name: "Basic PPE",
        typeId: GearTypeIds.Armor,
        level: 10,
        rarity: "white",
        defense: 8,
        substats: [{ text: "Intellect", value: 15 }, { text: "Will", value: 10 }, { text: "HP", value: 46 }],
        setId: GearSetIds.BasicGearPack,
      },
      {
        id: GearIds.CatastropheFilter,
        image: BASE_URL + "images/gears/catastrophe-filter.png",
        name: "Catastrophe Filter",
        typeId: GearTypeIds.Kit,
        level: 50,
        rarity: "purple",
        defense: 15,
        substats: [
          { text: "Intellect", value: 15 },
          { text: "Will", value: 23 },
          { text: "Arts Intensity", value: 29 },
        ],
        setId: GearSetIds.Catastrophe,
      },
      {
        id: GearIds.CatastropheGloves,
        image: BASE_URL + "images/gears/catastrophe-gloves.png",
        name: "Catastrophe Gloves",
        typeId: GearTypeIds.Gloves,
        level: 50,
        rarity: "purple",
        defense: 30,
        substats: [
          { text: "Intellect", value: 30 },
          { text: "Will", value: 46 },
          { text: "Arts Intensity", value: 24 },
        ],
        setId: GearSetIds.Catastrophe,
      },
      {
        id: GearIds.CatastropheHeavyArmor,
        image: BASE_URL + "images/gears/catastrophe-heavy-armor.png",
        name: "Catastrophe Heavy Armor",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [
          { text: "Strength", value: 61 },
          { text: "Intellect", value: 41 },
          { text: "Ultimate DMG Bonus", value: "18.4%" },
        ],
        setId: GearSetIds.Catastrophe,
      },
      {
        id: GearIds.CatastropheHeavyArmorT1,
        image: BASE_URL + "images/gears/catastrophe-heavy-armor-t1.png",
        name: "Catastrophe Heavy Armor T1",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [
          { text: "Strength", value: 61 },
          { text: "Will", value: 41 },
          { text: "Ultimate Gain Efficiency", value: "8.8%" },
        ],
        setId: GearSetIds.Catastrophe,
      },
      {
        id: GearIds.EmergencyComm,
        image: BASE_URL + "images/gears/emergency-comm.png",
        name: "Emergency Comm",
        typeId: GearTypeIds.Kit,
        level: 20,
        rarity: "green",
        defense: 6,
        substats: [{ text: "Critical Rate", value: "6.6%" }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.EmergencyCompressionCore,
        image: BASE_URL + "images/gears/emergency-compression-core.png",
        name: "Emergency Compression Core",
        typeId: GearTypeIds.Kit,
        level: 20,
        rarity: "green",
        defense: 6,
        substats: [{ text: "Attack", value: "13.2%" }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.MinerArmor,
        image: BASE_URL + "images/gears/miner-armor.png",
        name: "Miner Armor",
        typeId: GearTypeIds.Armor,
        level: 20,
        rarity: "green",
        defense: 16,
        substats: [{ text: "Strength", value: 27 }, { text: "Intellect", value: 18 }, { text: "HP", value: 125 }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.MinerCleansuit,
        image: BASE_URL + "images/gears/miner-cleansuit.png",
        name: "Miner Cleansuit",
        typeId: GearTypeIds.Armor,
        level: 28,
        rarity: "green",
        defense: 22,
        substats: [{ text: "Agility", value: 25 }, { text: "Will", value: 37 }, { text: "HP", value: "9.0%" }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.MinerComm,
        image: BASE_URL + "images/gears/miner-comm.png",
        name: "Miner Comm",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Will", value: 22 }, { text: "HP", value: "22.8%" }],
        setId: GearSetIds.MinerBGearPack,
      },
      {
        id: GearIds.MinerCompressionCore,
        image: BASE_URL + "images/gears/miner-compression-core.png",
        name: "Miner Compression Core",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Intellect", value: 22 }, { text: "Critical Rate", value: "5.7%" }],
        setId: GearSetIds.MinerBGearPack,
      },
      {
        id: GearIds.MinerDriverWheel,
        image: BASE_URL + "images/gears/miner-driver-wheel.png",
        name: "Miner Driver Wheel",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Agility", value: 22 }, { text: "Critical Rate", value: "5.7%" }],
        setId: GearSetIds.MinerBGearPack,
      },
      {
        id: GearIds.MinerFists,
        image: BASE_URL + "images/gears/miner-fists.png",
        name: "Miner Fists",
        typeId: GearTypeIds.Gloves,
        level: 28,
        rarity: "green",
        defense: 16,
        substats: [{ text: "Agility", value: 18 }, { text: "Will", value: 28 }, { text: "HP", value: "15%" }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.MinerGauntlets,
        image: BASE_URL + "images/gears/miner-gauntlets.png",
        name: "Miner Gauntlets",
        typeId: GearTypeIds.Gloves,
        level: 20,
        rarity: "green",
        defense: 12,
        substats: [{ text: "Strength", value: 20 }, { text: "Agility", value: 13 }, { text: "HP", value: "11%" }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.MinerGauntletsT1,
        image: BASE_URL + "images/gears/miner-gauntlets-t1.png",
        name: "Miner Gauntlets T1",
        typeId: GearTypeIds.Gloves,
        level: 36,
        rarity: "blue",
        defense: 21,
        substats: [{ text: "Strength", value: 36 }, { text: "Will", value: 24 }, { text: "Attack", value: "9.5%" }],
        setId: GearSetIds.MinerBGearPack,
      },
      {
        id: GearIds.MinerGloves,
        image: BASE_URL + "images/gears/miner-gloves.png",
        name: "Miner Gloves",
        typeId: GearTypeIds.Gloves,
        level: 20,
        rarity: "green",
        defense: 12,
        substats: [{ text: "Intellect", value: 20 }, { text: "Will", value: 13 }, { text: "HP", value: "11%" }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.MinerGlovesT1,
        image: BASE_URL + "images/gears/miner-gloves-t1.png",
        name: "Miner Gloves T1",
        typeId: GearTypeIds.Gloves,
        level: 36,
        rarity: "blue",
        defense: 21,
        substats: [{ text: "Agility", value: 24 }, { text: "Intellect", value: 36 }, { text: "HP", value: "19.0%" }],
        setId: GearSetIds.MinerBGearPack,
      },
      {
        id: GearIds.MinerOveralls,
        image: BASE_URL + "images/gears/miner-overalls.png",
        name: "Miner Overalls",
        typeId: GearTypeIds.Armor,
        level: 20,
        rarity: "green",
        defense: 16,
        substats: [{ text: "Intellect", value: 27 }, { text: "Will", value: 18 }, { text: "HP", value: 125 }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.MinerTurbine,
        image: BASE_URL + "images/gears/miner-turbine.png",
        name: "Miner Turbine",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Strength", value: 22 }, { text: "Combo Skill DMG", value: "22.8%" }],
        setId: GearSetIds.MinerBGearPack,
      },
      {
        id: GearIds.MinerVest,
        image: BASE_URL + "images/gears/miner-vest.png",
        name: "Miner Vest",
        typeId: GearTypeIds.Armor,
        level: 28,
        rarity: "green",
        defense: 22,
        substats: [{ text: "Agility", value: 37 }, { text: "Intellect", value: 25 }, { text: "HP", value: "9.0%" }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.MinerWrists,
        image: BASE_URL + "images/gears/miner-wrists.png",
        name: "Miner Wrists",
        typeId: GearTypeIds.Gloves,
        level: 28,
        rarity: "green",
        defense: 16,
        substats: [{ text: "Strength", value: 18 }, { text: "Agility", value: 28 }, { text: "HP", value: "15%" }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.MordvoltInsulationBattery,
        image: BASE_URL + "images/gears/mordvolt-insulation-battery.png",
        name: "Mordvolt Insulation Battery",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Intellect", value: 21 }, { text: "Critical Rate", value: "5.3%" }],
        setId: GearSetIds.MordvoltInsulation,
      },
      {
        id: GearIds.MordvoltInsulationGloves,
        image: BASE_URL + "images/gears/mordvolt-insulation-gloves.png",
        name: "Mordvolt Insulation Gloves",
        typeId: GearTypeIds.Gloves,
        level: 36,
        rarity: "blue",
        defense: 21,
        substats: [
          { text: "Intellect", value: 33 },
          { text: "Will", value: 22 },
          { text: "Arts DMG Dealt Bonus", value: "9.2%" },
        ],
        setId: GearSetIds.MordvoltInsulation,
      },
      {
        id: GearIds.MordvoltInsulationVest,
        image: BASE_URL + "images/gears/mordvolt-insulation-vest.png",
        name: "Mordvolt Insulation Vest",
        typeId: GearTypeIds.Armor,
        level: 36,
        rarity: "blue",
        defense: 28,
        substats: [{ text: "Strength", value: 29 }, { text: "Intellect", value: 44 }, { text: "Attack", value: 16 }],
        setId: GearSetIds.MordvoltInsulation,
      },
      {
        id: GearIds.MordvoltInsulationVestT1,
        image: BASE_URL + "images/gears/mordvolt-insulation-vest-t1.png",
        name: "Mordvolt Insulation Vest T1",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [
          { text: "Agility", value: 41 },
          { text: "Intellect", value: 61 },
          { text: "Basic Attack DMG Bonus", value: "9.8%" },
        ],
        setId: GearSetIds.MordvoltInsulation,
      },
      {
        id: GearIds.MordvoltInsulationVestT2,
        image: BASE_URL + "images/gears/mordvolt-insulation-vest-t2.png",
        name: "Mordvolt Insulation Vest T2",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [{ text: "Intellect", value: 61 }, { text: "Will", value: 41 }, { text: "HP", value: "14.7%" }],
        setId: GearSetIds.MordvoltInsulation,
      },
      {
        id: GearIds.MordvoltInsulationWrench,
        image: BASE_URL + "images/gears/mordvolt-insulation-wrench.png",
        name: "Mordvolt Insulation Wrench",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Intellect", value: 21 }, { text: "Attack", value: "10.50%" }],
        setId: GearSetIds.MordvoltInsulation,
      },
      {
        id: GearIds.MordvoltInsulationWrenchT1,
        image: BASE_URL + "images/gears/mordvolt-insulation-wrench-t1.png",
        name: "Mordvolt Insulation Wrench T1",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Intellect", value: 21 }, { text: "Cryo and Electric DMG Dealt Bonus", value: "11.7%" }],
        setId: GearSetIds.MordvoltInsulation,
      },
      {
        id: GearIds.MordvoltResistantBattery,
        image: BASE_URL + "images/gears/mordvolt-resistant-battery.png",
        name: "Mordvolt Resistant Battery",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Will", value: 21 }, { text: "Treatment Bonus", value: "10.50%" }],
        setId: GearSetIds.MordvoltResistant,
      },
      {
        id: GearIds.MordvoltResistantGloves,
        image: BASE_URL + "images/gears/mordvolt-resistant-gloves.png",
        name: "Mordvolt Resistant Gloves",
        typeId: GearTypeIds.Gloves,
        level: 36,
        rarity: "blue",
        defense: 21,
        substats: [
          { text: "Intellect", value: 22 },
          { text: "Will", value: 33 },
          { text: "Treatment Bonus", value: "8.8%" },
        ],
        setId: GearSetIds.MordvoltResistant,
      },
      {
        id: GearIds.MordvoltResistantVest,
        image: BASE_URL + "images/gears/mordvolt-resistant-vest.png",
        name: "Mordvolt Resistant Vest",
        typeId: GearTypeIds.Armor,
        level: 36,
        rarity: "blue",
        defense: 28,
        substats: [{ text: "Agility", value: 29 }, { text: "Will", value: 44 }, { text: "HP", value: "10.5%" }],
        setId: GearSetIds.MordvoltResistant,
      },
      {
        id: GearIds.MordvoltResistantVestT1,
        image: BASE_URL + "images/gears/mordvolt-resistant-vest-t1.png",
        name: "Mordvolt Resistant Vest T1",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [{ text: "Intellect", value: 41 }, { text: "Will", value: 61 }, { text: "HP", value: "14.7%" }],
        setId: GearSetIds.MordvoltResistant,
      },
      {
        id: GearIds.MordvoltResistantWrench,
        image: BASE_URL + "images/gears/mordvolt-resistant-wrench.png",
        name: "Mordvolt Resistant Wrench",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Will", value: 21 }, { text: "Attack", value: "10.5%" }],
        setId: GearSetIds.MordvoltResistant,
      },
      {
        id: GearIds.PrototypeHeavyArmor,
        image: BASE_URL + "images/gears/prototype-heavy-armor.png",
        name: "Prototype Heavy Armor",
        typeId: GearTypeIds.Armor,
        level: 28,
        rarity: "green",
        defense: 22,
        substats: [{ text: "Strength", value: 37 }, { text: "Intellect", value: 25 }, { text: "Attack", value: 11 }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.PrototypeHeavyArmorT1,
        image: BASE_URL + "images/gears/prototype-heavy-armor-t1.png",
        name: "Prototype Heavy Armor T1",
        typeId: GearTypeIds.Armor,
        level: 28,
        rarity: "green",
        defense: 22,
        substats: [{ text: "Agility", value: 37 }, { text: "Will", value: 25 }, { text: "Attack", value: 11 }],
        setId: GearSetIds.MinerAGearPack,
      },
      {
        id: GearIds.RovingMSGRFists,
        image: BASE_URL + "images/gears/roving-msgr-fists.png",
        name: "Roving MSGR Fists",
        typeId: GearTypeIds.Gloves,
        level: 36,
        rarity: "blue",
        defense: 21,
        substats: [
          { text: "Strength", value: 22 },
          { text: "Agility", value: 33 },
          { text: "Physical DMG Bonus", value: "9.7%" },
        ],
        setId: GearSetIds.RovingMSGR,
      },
      {
        id: GearIds.RovingMSGRFlashlight,
        image: BASE_URL + "images/gears/roving-msgr-flashlight.png",
        name: "Roving MSGR Flashlight",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Agility", value: 21 }, { text: "Combo Skill DMG", value: "21.0%" }],
        setId: GearSetIds.RovingMSGR,
      },
      {
        id: GearIds.RovingMSGRGyro,
        image: BASE_URL + "images/gears/roving-msgr-gyro.png",
        name: "Roving MSGR Gyro",
        typeId: GearTypeIds.Kit,
        level: 36,
        rarity: "blue",
        defense: 10,
        substats: [{ text: "Agility", value: 21 }, { text: "Attack", value: "10.5%" }],
        setId: GearSetIds.RovingMSGR,
      },
      {
        id: GearIds.RovingMSGRJacket,
        image: BASE_URL + "images/gears/roving-msgr-jacket.png",
        name: "Roving MSGR Jacket",
        typeId: GearTypeIds.Armor,
        level: 36,
        rarity: "blue",
        defense: 28,
        substats: [{ text: "Agility", value: 44 }, { text: "Intellect", value: 29 }, { text: "Attack", value: 16 }],
        setId: GearSetIds.RovingMSGR,
      },
      {
        id: GearIds.RovingMSGRJacketT1,
        image: BASE_URL + "images/gears/roving-msgr-jacket-t1.png",
        name: "Roving MSGR Jacket T1",
        typeId: GearTypeIds.Armor,
        level: 50,
        rarity: "purple",
        defense: 40,
        substats: [{ text: "Agility", value: 61 }, { text: "Intellect", value: 41 }, { text: "HP", value: "14.7%" }],
        setId: GearSetIds.RovingMSGR,
      },
    ],
    transformList: item => item,
  },
  "operator-roles": {
    data: [
      {
        id: OperatorRoleIds.Caster,
        image: BASE_URL + "images/operator-roles/caster.png",
        name: "Заклинатель",
        description: "Заклинатели накладывают поражение искусствами и реакции искусств. Также они наносят мощный урон.",
      },
      {
        id: OperatorRoleIds.Defender,
        image: BASE_URL + "images/operator-roles/defender.png",
        name: "Защитник",
        description: "Защитники очень выносливы. Они надежно прикрывают и лечат товарищей, а также мастерски отвечают на атаки врагов.",
      },
      {
        id: OperatorRoleIds.Guard,
        image: BASE_URL + "images/operator-roles/guard.png",
        name: "Страж",
        description: "Стражи накладывают на врагов уязвимости и физические состояния. Также они наносят мощный урон.",
      },
      {
        id: OperatorRoleIds.Striker,
        image: BASE_URL + "images/operator-roles/striker.png",
        name: "Штурмовик",
        description: "Штурмовики наносят сокрушительный урон, используя физические эффекты и эффекты искусств, наложенные другими оперативниками.",
      },
      {
        id: OperatorRoleIds.Supporter,
        image: BASE_URL + "images/operator-roles/supporter.png",
        name: "Поддержка",
        description: "Оперативники поддержки контролируют и ослабляют врагов посредством различных эффектов. Также они оказывают поддержку товарищам и усиливают их.",
      },
      {
        id: OperatorRoleIds.Vanguard,
        image: BASE_URL + "images/operator-roles/vanguard.png",
        name: "Авангард",
        description: "Отлично восстанавливают очки навыков (ОН), чтобы команда могла чаще применять навыки.",
      },
    ],
    transformList: item => ({ id: item.id, image: item.image, name: item.name }),
  },
  "operators": {
    data: [
      {
        id: OperatorIds.Akekuri,
        image: BASE_URL + "images/operators/akekuri.png",
        name: "Акэкури",
        rarity: 4,
        elementId: ElementIds.Heat,
        weaponId: WeaponTypeIds.Sword,
        roleId: OperatorRoleIds.Vanguard,
        mainAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: OperatorIds.Alesh,
        image: BASE_URL + "images/operators/alesh.png",
        name: "Алеш",
        rarity: 5,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Sword,
        roleId: OperatorRoleIds.Vanguard,
        mainAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: OperatorIds.Antal,
        image: BASE_URL + "images/operators/antal.png",
        name: "Антал",
        rarity: 4,
        elementId: ElementIds.Electric,
        weaponId: WeaponTypeIds.ArtsUnit,
        roleId: OperatorRoleIds.Supporter,
        mainAttributeId: AttributeIds.Intellect,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: OperatorIds.Arclight,
        image: BASE_URL + "images/operators/arclight.png",
        name: "Арклайт",
        rarity: 5,
        elementId: ElementIds.Electric,
        weaponId: WeaponTypeIds.Sword,
        roleId: OperatorRoleIds.Vanguard,
        mainAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: OperatorIds.Ardelia,
        image: BASE_URL + "images/operators/ardelia.png",
        name: "Арделия",
        rarity: 6,
        elementId: ElementIds.Nature,
        weaponId: WeaponTypeIds.ArtsUnit,
        roleId: OperatorRoleIds.Supporter,
        mainAttributeId: AttributeIds.Intellect,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: OperatorIds.Avywenna,
        image: BASE_URL + "images/operators/avywenna.png",
        name: "Авивенна",
        rarity: 5,
        elementId: ElementIds.Electric,
        weaponId: WeaponTypeIds.Polearm,
        roleId: OperatorRoleIds.Striker,
        mainAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Agility,
        version: "1.0",
      },
      {
        id: OperatorIds.Catcher,
        image: BASE_URL + "images/operators/catcher.png",
        name: "Кэтчер",
        rarity: 4,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Greatsword,
        roleId: OperatorRoleIds.Defender,
        mainAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: OperatorIds.ChenQianyu,
        image: BASE_URL + "images/operators/chen-qianyu.png",
        name: "Чэнь Цяньюй",
        rarity: 5,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Sword,
        roleId: OperatorRoleIds.Guard,
        mainAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: OperatorIds.DaPan,
        image: BASE_URL + "images/operators/da-pan.png",
        name: "Да Пан",
        rarity: 5,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Greatsword,
        roleId: OperatorRoleIds.Striker,
        mainAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: OperatorIds.Ember,
        image: BASE_URL + "images/operators/ember.png",
        name: "Эмбер",
        rarity: 6,
        elementId: ElementIds.Heat,
        weaponId: WeaponTypeIds.Greatsword,
        roleId: OperatorRoleIds.Defender,
        mainAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: OperatorIds.Endministrator,
        image: BASE_URL + "images/operators/endministrator.png",
        name: "Эндминистратор",
        rarity: 6,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Sword,
        roleId: OperatorRoleIds.Guard,
        mainAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: OperatorIds.Estella,
        image: BASE_URL + "images/operators/estella.png",
        name: "Эстелла",
        rarity: 4,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Polearm,
        roleId: OperatorRoleIds.Guard,
        mainAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: OperatorIds.Fluorite,
        image: BASE_URL + "images/operators/fluorite.png",
        name: "Флюорит",
        rarity: 4,
        elementId: ElementIds.Nature,
        weaponId: WeaponTypeIds.Handcannon,
        roleId: OperatorRoleIds.Caster,
        mainAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: OperatorIds.Gilberta,
        image: BASE_URL + "images/operators/gilberta.png",
        name: "Гилберта",
        rarity: 6,
        elementId: ElementIds.Nature,
        weaponId: WeaponTypeIds.ArtsUnit,
        roleId: OperatorRoleIds.Supporter,
        mainAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: OperatorIds.Laevatain,
        image: BASE_URL + "images/operators/laevatain.png",
        name: "Лэватейн",
        rarity: 6,
        elementId: ElementIds.Heat,
        weaponId: WeaponTypeIds.Sword,
        roleId: OperatorRoleIds.Striker,
        mainAttributeId: AttributeIds.Intellect,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: OperatorIds.LastRite,
        image: BASE_URL + "images/operators/last-rite.png",
        name: "Панихида",
        rarity: 6,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Greatsword,
        roleId: OperatorRoleIds.Striker,
        mainAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: OperatorIds.Lifeng,
        image: BASE_URL + "images/operators/lifeng.png",
        name: "Лифэн",
        rarity: 6,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Polearm,
        roleId: OperatorRoleIds.Guard,
        mainAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.0",
      },
      {
        id: OperatorIds.Perlica,
        image: BASE_URL + "images/operators/perlica.png",
        name: "Перлика",
        rarity: 5,
        elementId: ElementIds.Electric,
        weaponId: WeaponTypeIds.ArtsUnit,
        roleId: OperatorRoleIds.Caster,
        mainAttributeId: AttributeIds.Intellect,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: OperatorIds.Pogranichnik,
        image: BASE_URL + "images/operators/pogranichnik.png",
        name: "Пограничник",
        rarity: 6,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Sword,
        roleId: OperatorRoleIds.Vanguard,
        mainAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Agility,
        version: "1.0",
      },
      {
        id: OperatorIds.Rossi,
        image: BASE_URL + "images/operators/rossi.png",
        name: "Росси",
        rarity: 6,
        elementId: ElementIds.Physical,
        weaponId: WeaponTypeIds.Sword,
        roleId: OperatorRoleIds.Guard,
        mainAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.1",
      },
      {
        id: OperatorIds.Snowshine,
        image: BASE_URL + "images/operators/snowshine.png",
        name: "Светоснежка",
        rarity: 5,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Greatsword,
        roleId: OperatorRoleIds.Defender,
        mainAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Will,
        version: "1.0",
      },
      {
        id: OperatorIds.Tangtang,
        image: BASE_URL + "images/operators/tangtang.png",
        name: "Тантан",
        rarity: 6,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Handcannon,
        roleId: OperatorRoleIds.Caster,
        mainAttributeId: AttributeIds.Agility,
        secondaryAttributeId: AttributeIds.Strength,
        version: "1.1",
      },
      {
        id: OperatorIds.Wulfgard,
        image: BASE_URL + "images/operators/wulfgard.png",
        name: "Вулфгард",
        rarity: 5,
        elementId: ElementIds.Heat,
        weaponId: WeaponTypeIds.Handcannon,
        roleId: OperatorRoleIds.Caster,
        mainAttributeId: AttributeIds.Strength,
        secondaryAttributeId: AttributeIds.Agility,
        version: "1.0",
      },
      {
        id: OperatorIds.Xaihi,
        image: BASE_URL + "images/operators/xaihi.png",
        name: "Сайхи",
        rarity: 5,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.ArtsUnit,
        roleId: OperatorRoleIds.Supporter,
        mainAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.0",
      },
      {
        id: OperatorIds.Yvonne,
        image: BASE_URL + "images/operators/yvonne.png",
        name: "Ивонна",
        rarity: 6,
        elementId: ElementIds.Cryo,
        weaponId: WeaponTypeIds.Handcannon,
        roleId: OperatorRoleIds.Striker,
        mainAttributeId: AttributeIds.Intellect,
        secondaryAttributeId: AttributeIds.Agility,
        version: "1.0",
      },
      {
        id: OperatorIds.ZhuangFangyi,
        image: BASE_URL + "images/operators/zhuang-fangyi.png",
        name: "Чжуан Фанъи",
        rarity: 6,
        elementId: ElementIds.Electric,
        weaponId: WeaponTypeIds.ArtsUnit,
        roleId: OperatorRoleIds.Striker,
        mainAttributeId: AttributeIds.Will,
        secondaryAttributeId: AttributeIds.Intellect,
        version: "1.2",
      },
    ],
    transformList: item => ({ id: item.id, image: item.image, name: item.name, rarity: item.rarity }),
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
        skillsMax: [
          WeaponSkillsMax.WillBoost.S,
          WeaponSkillsMax.ArtsBoost.S,
          {
            title: "Suppression: Emergency Boost",
            text: "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.AncientCanal,
        image: BASE_URL + "images/weapons/ancient-canal.png",
        name: "Ancient Canal",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.M,
          WeaponSkillsMax.ArtsIntensityBoost.M,
          {
            title: "Brutality: Lands of Yore",
            text: "Arts Intensity +28\n"
              + "After the wielder consumes Vulnerable stack(s), the wielder gains Physical DMG Dealt +(14.0% x Stacks Consumed) for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.ArtzyTyrannical,
        image: BASE_URL + "images/weapons/artzy-tyrannical.png",
        name: "Artzy Tyrannical",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 505,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.L,
          WeaponSkillsMax.CriticalRateBoost.L,
          {
            title: "Fracture: Artzy Exaggeration",
            text: "Cryo DMG Dealt +44.8%\n"
              + "After the wielder scores a critical hit with a battle skill or combo skill, the wielder gains Cryo DMG Dealt +39.2% for 30s.\n"
              + "Max stacks of the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
          },
        ],
      },
      {
        id: WeaponIds.Aspirant,
        image: BASE_URL + "images/weapons/aspirant.png",
        name: "Aspirant",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.M,
          WeaponSkillsMax.PhysicalDMGBoost.M,
          {
            title: "Twilight: Imposing Peak",
            text: "Ultimate DMG Dealt 44.8%\n"
              + "After the wielder applies Lifted, during the next ultimate cast within 30s, the wielder gains Physical DMG Dealt +33.6%.\n"
              + "Max stacks for effects of the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.5s.",
          },
        ],
      },
      {
        id: WeaponIds.BrigandsCalling,
        image: BASE_URL + "images/weapons/brigands-calling.png",
        name: "Brigand’s Calling",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 505,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.L,
          WeaponSkillsMax.AttackBoost.L,
          {
            title: "Detonate: Brigand's Bane",
            text: "Cryo DMG Dealt +44.8%.\n"
              + "When the wielder applies skill or ultimate applies Cryo Infliction via battle skills or ultimates, the wielder gains Cryo DMG Dealt +56.0% for 20s. When the wielder's battle skill or ultimate applies Arts Susceptibility, the target enemy suffers Arts DMG Taken +16.8% for 20s.\n"
              + "The two effects apply separately and do not stack with themselves.",
          },
        ],
      },
      {
        id: WeaponIds.ChimericJustice,
        image: BASE_URL + "images/weapons/chimeric-justice.png",
        name: "Chimeric Justice",
        typeId: WeaponTypeIds.Polearm,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.M,
          WeaponSkillsMax.UltimateGainEfficiencyBoost.M,
          {
            title: "Brutality: Cemented Fury",
            text: "Critical Rate +8.4%\n"
              + "When the wielder applies Vulnerable to an enemy with no Vulnerable stacks, ATK +42.0% for 15s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.ChivalricVirtues,
        image: BASE_URL + "images/weapons/chivalric-virtues.png",
        name: "Chivalric Virtues",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 485,
        skillsMax: [
          WeaponSkillsMax.WillBoost.L,
          WeaponSkillsMax.HPBoost.L,
          {
            title: "Medicant: Blight Fervor",
            text: "Treatment Efficiency +28.0%\n"
              + "After the wielder gives HP treatment with their own skill, the entire team gains ATK +25.2% for 15s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.Clannibal,
        image: BASE_URL + "images/weapons/clannibal.png",
        name: "Clannibal",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 490,
        skillsMax: [
          WeaponSkillsMax.MainAttributeBoost.L,
          WeaponSkillsMax.ArtsBoost.L,
          {
            title: "Infliction: Vicious Purge",
            text: "Arts DMG +33.6%\n"
              + "After the wielder consumes an Arts Reaction, target enemy suffers Arts DMG Taken +28.0% (for the specified element) for 15s.\n"
              + "Effect only triggers once every 25s.",
          },
        ],
      },
      {
        id: WeaponIds.CohesiveTraction,
        image: BASE_URL + "images/weapons/cohesive-traction.png",
        name: "Cohesive Traction",
        typeId: WeaponTypeIds.Polearm,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.WillBoost.M,
          WeaponSkillsMax.ElectricDMGBoost.M,
          {
            title: "Suppression: Concentric Circles",
            text: "Combo Skill DMG Dealt +28.0%\n"
              + "When the wielder casts a combo skill, during the next battle skill cast within 30s, the wielder gains Electric DMG Dealt +28.0%.\n"
              + "Max stacks of the same name: 3. Duration of each stack is counted separately.",
          },
        ],
      },
      {
        id: WeaponIds.Darhoff7,
        image: BASE_URL + "images/weapons/darhoff-7.png",
        name: "Darhoff 7",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 3,
        baseATK90: 283,
        skillsMax: [WeaponSkillsMax.MainAttributeBoost.S, { title: "Assault: Armament Prep", text: "ATK +34" }],
      },
      {
        id: WeaponIds.DeliveryGuaranteed,
        image: BASE_URL + "images/weapons/delivery-guaranteed.png",
        name: "Delivery Guaranteed",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 500,
        skillsMax: [
          WeaponSkillsMax.WillBoost.L,
          WeaponSkillsMax.UltimateGainEfficiencyBoost.L,
          {
            title: "Pursuit: Duty Fulfilled",
            text: "Nature DMG Dealt +44.8%\n"
              + "After the wielder's combo skill applies Lifted, the team gains Arts DMG Dealt +28.0% for 15s. For every enemy Lifted, the team gains bonus Arts DMG Dealt +5.6%, up to a max of 22.4%.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.DetonationUnit,
        image: BASE_URL + "images/weapons/detonation-unit.png",
        name: "Detonation Unit",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 490,
        skillsMax: [
          WeaponSkillsMax.MainAttributeBoost.L,
          WeaponSkillsMax.ArtsIntensityBoost.L,
          {
            title: "Detonate: Imposing Champion",
            text: "Secondary Attribute +28.0%\n"
              + "When the wielder applies an Arts Burst, target enemy suffers Arts DMG Taken +25.2% for 15s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.DreamsOfTheStarryBeach,
        image: BASE_URL + "images/weapons/dreams-of-the-starry-beach.png",
        name: "Мечта о звездном береге",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 495,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.L,
          WeaponSkillsMax.TreatmentEfficiencyBoost.L,
          {
            title: `${EssenceCharacteristics.Infliction}: шепот прилива`,
            text: "+44.8% к побочному показателю.\n"
              + "Когда владелец поглощает коррозию, цель получает на 28.0% больше УРН от искусств в течение 25 сек.\n"
              + "Одноименные эффекты не суммируются.",
          },
        ],
      },
      {
        id: WeaponIds.EminentRepute,
        image: BASE_URL + "images/weapons/eminent-repute.png",
        name: "Eminent Repute",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 490,
        skillsMax: [
          WeaponSkillsMax.MainAttributeBoost.L,
          WeaponSkillsMax.PhysicalDMGBoost.L,
          {
            title: "Brutality: Disciplinarian",
            text: "ATK +28.0%\n"
              + "After the wielder consumes Vulnerable stack(s), ATK +(14.0% + 7.0% x Stacks Consumed) while other operators in the team gain half of this buff for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.Exemplar,
        image: BASE_URL + "images/weapons/exemplar.png",
        name: "Exemplar",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 6,
        baseATK90: 500,
        skillsMax: [
          WeaponSkillsMax.MainAttributeBoost.L,
          WeaponSkillsMax.AttackBoost.L,
          {
            title: "Suppression: Stacked Hew",
            text: "Physical DMG Dealt +28.0%\n"
              + "When the wielder's battle skill hits an enemy, the wielder gains Physical DMG Dealt +28.0% for 30s.\n"
              + "Max stacks for the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
          },
        ],
      },
      {
        id: WeaponIds.Finchaser30,
        image: BASE_URL + "images/weapons/finchaser-3-0.png",
        name: "Finchaser 3.0",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.M,
          WeaponSkillsMax.CryoDMGBoost.M,
          {
            title: "Suppression: Fin Chaser's Intent",
            text: "ATK +14.0%\n"
              + "When the wielder's battle skill applies Solidification, target enemy suffers Cryo DMG Taken +19.6% for 15s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.FinishingCall,
        image: BASE_URL + "images/weapons/finishing-call.png",
        name: "Finishing Call",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.M,
          WeaponSkillsMax.HPBoost.M,
          {
            title: "Medicant: Glory of Knighthood",
            text: "Secondary Attribute +14.0%\n"
              + "Combo skill HP treatment effect +56.0%",
          },
        ],
      },
      {
        id: WeaponIds.FlickersInTheMist,
        image: BASE_URL + "images/weapons/flickers-in-the-mist.png",
        name: "Flickers in the Mist",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 490,
        skillsMax: [
          WeaponSkillsMax.WillBoost.L,
          WeaponSkillsMax.ElectricDMGBoost.M,
          {
            title: "Efficacy: Overlapping Borders",
            text: "ATK +19.6%.\n"
              + "When the wielder gains Electric Amp, the wielder also gains Electric DMG Dealt +15.4% for 30s.\n"
              + "Max stacks for effects of the same name: 3. Duration of each stack is counted separately. This effect only triggers once every 0.1s.",
          },
        ],
      },
      {
        id: WeaponIds.FluorescentRoc,
        image: BASE_URL + "images/weapons/fluorescent-roc.png",
        name: "Fluorescent Roc",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 4,
        baseATK90: 341,
        skillsMax: [
          WeaponSkillsMax.WillBoost.S,
          WeaponSkillsMax.AttackBoost.S,
          {
            title: "Suppression: Emergency Boost",
            text: "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.ForgebornScathe,
        image: BASE_URL + "images/weapons/forgeborn-scathe.png",
        name: "Гнев кузни",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 510,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.L,
          WeaponSkillsMax.AttackBoost.L,
          {
            title: `${EssenceCharacteristics.Twilight}: пламенеющий вопль`,
            text: "+44.8% к наносимому тепловому УРН.\n"
              + "Когда владелец применяет супернавык, то получает +210.0% к наносимому УРН от базовой атаки на 20 сек.\n"
              + "Одноименные эффекты не суммируются.",
          },
        ],
      },
      {
        id: WeaponIds.FormerFinery,
        image: BASE_URL + "images/weapons/former-finery.png",
        name: "Former Finery",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 6,
        baseATK90: 495,
        skillsMax: [
          WeaponSkillsMax.WillBoost.L,
          WeaponSkillsMax.HPBoost.L,
          {
            title: "Efficacy: Mincing Therapy",
            text: "Treatment Efficiency +28.0%\n"
              + "After a Protected operator takes DMG, the wielder restores the said operator's HP by (235 + Will x 1.96)\n"
              + "Effect only triggers once every 15s.",
          },
        ],
      },
      {
        id: WeaponIds.Fortmaker,
        image: BASE_URL + "images/weapons/fortmaker.png",
        name: "Fortmaker",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.M,
          WeaponSkillsMax.UltimateGainEfficiencyBoost.M,
          { title: "Inspiring: Back to the Broken City", text: "ATK +14.0%\nArts Intensity +70" },
        ],
      },
      {
        id: WeaponIds.FreedomToProselytize,
        image: BASE_URL + "images/weapons/freedom-to-proselytize.png",
        name: "Freedom to Proselytize",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.WillBoost.M,
          WeaponSkillsMax.TreatmentEfficiencyBoost.M,
          {
            title: "Medicant: Redemption of Faith",
            text: "Main Attribute +14.0%\n"
              + "When the wielder's battle skill provides HP treatment, the controlled operator is restored for another (168 + Will x 1.40) HP.\n"
              + "Effect only triggers once every 15s.",
          },
        ],
      },
      {
        id: WeaponIds.GloriousMemory,
        image: BASE_URL + "images/weapons/glorious-memory.png",
        name: "Glorious Memory",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 490,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.L,
          WeaponSkillsMax.CriticalRateBoost.L,
          {
            title: "Twilight: Lingering Glow",
            text: "When the wielder's skill applies Vulnerability, during the next ultimate cast within 30s, the wielder gains DMG Dealt +33.6%.\n"
              + "Max stacks for effects of the same name: 3. Duration of each stack is counted separately. Effect is only triggered every 0.5s.",
          },
        ],
      },
      {
        id: WeaponIds.GrandVision,
        image: BASE_URL + "images/weapons/grand-vision.png",
        name: "Grand Vision",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 500,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.L,
          WeaponSkillsMax.AttackBoost.L,
          {
            title: "Infliction: Long Time Wish",
            text: "Arts Intensity +84\n"
              + "When the wielder applies Originium Crystals or Solidification, during the next battle skill or ultimate cast within 20s, the wielder gains Physical DMG Dealt +100.8%.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.HomeLonging,
        // TODO: Картинки нет
        image: BASE_URL + "images/weapons/home-longing.png",
        name: "Home Longing",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 490,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.L,
          WeaponSkillsMax.CryoDMGBoost.L,
          {
            title: "Suppression: Olden Moon",
            text: "ATK +19.6%.\n"
              + "For 20s after the wielder casts a combo skill, the wielder's next battle skill gains Cryo and Nature DMG Dealt +22.4%.\n"
              + "Max stacks for effects of the same name: 2. Duration of each stack is counted separately.",
          },
        ],
      },
      {
        id: WeaponIds.HowlingGuard,
        image: BASE_URL + "images/weapons/howling-guard.png",
        name: "Howling Guard",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 4,
        baseATK90: 341,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.S,
          WeaponSkillsMax.AttackBoost.S,
          {
            title: "Suppression: Emergency Boost",
            text: "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.HypernovaAuto,
        image: BASE_URL + "images/weapons/hypernova-auto.png",
        name: "Hypernova Auto",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 4,
        baseATK90: 341,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.S,
          WeaponSkillsMax.ArtsBoost.S,
          { title: "Inspiring: Start of a Saga", text: "When the wielder's HP is above 80%, ATK +42.0%." },
        ],
      },
      {
        id: WeaponIds.Industry01,
        image: BASE_URL + "images/weapons/industry-0-1.png",
        name: "Industry 0.1",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 4,
        baseATK90: 341,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.S,
          WeaponSkillsMax.AttackBoost.S,
          {
            title: "Suppression: Emergency Boost",
            text: "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.JET,
        image: BASE_URL + "images/weapons/jet.png",
        name: "JET",
        typeId: WeaponTypeIds.Polearm,
        rarity: 6,
        baseATK90: 500,
        skillsMax: [
          WeaponSkillsMax.MainAttributeBoost.L,
          WeaponSkillsMax.AttackBoost.L,
          {
            title: "Suppression: Astrophysics",
            text: "Arts DMG Dealt +33.6%\n"
              + "When the wielder casts a battle skill, the wielder gains Arts DMG Dealt +33.6% for 15s. When the wielder casts a combo skill, Arts DMG Dealt +33.6% for 15s.\n"
              + "The two effects apply separately and do not stack with themselves.",
          },
        ],
      },
      {
        id: WeaponIds.Jiminy12,
        image: BASE_URL + "images/weapons/jiminy-12.png",
        name: "Jiminy 12",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 3,
        baseATK90: 283,
        skillsMax: [WeaponSkillsMax.MainAttributeBoost.S, { title: "Assault: Armament Prep", text: "ATK +34" }],
      },
      {
        id: WeaponIds.Khravengger,
        image: BASE_URL + "images/weapons/khravengger.png",
        name: "Хравенгер",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 6,
        baseATK90: 505,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.L,
          WeaponSkillsMax.AttackBoost.L,
          {
            title: `${EssenceCharacteristics.Detonate}: пробирающий холод`,
            text: "+56.0% к наносимому УРН от навыков (за каждый навык).\n"
              + "Когда боевой навык накладывает криогенное поражение, владелец получает +28.0% к наносимому криогенному УРН на 15 сек. "
              + "Когда владелец наносит УРН от комбонавыков врагу с криогенным поражением, то получает +56.0% к наносимому криогенному УРН на 15 сек. "
              + "Эффекты накладываются независимо друг от друга. "
              + "Накопить несколько зарядов нельзя.",
          },
        ],
      },
      {
        id: WeaponIds.LoneBarge,
        image: BASE_URL + "images/weapons/lone-barge.png",
        name: "Lone Barge",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 510,
        skillsMax: [
          WeaponSkillsMax.WillBoost.L,
          WeaponSkillsMax.AttackBoost.L,
          {
            title: "Suppression: Streaming Blitz",
            text: "Electric DMG Dealt +44.8%.\n"
              + "When the wielder's battle skill consumes Arts Reactions, the wielder gains Battle Skill Electric DMG Dealt +56.0% for 20s. This effect can reach a max of 2 stacks and can only trigger once every 0.1s. Duration of each stack is counted separately. After the wielder casts an ultimate, the wielder gains Battle Skill Electric DMG Dealt +112.0% for 25s. This effect cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.LongRoad,
        image: BASE_URL + "images/weapons/long-road.png",
        name: "Long Road",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 4,
        baseATK90: 341,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.S,
          WeaponSkillsMax.ArtsBoost.S,
          {
            title: "Pursuit: Unending Cycle",
            text: "When the wielder casts a combo skill, the wielder gains ATK +33.6% for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.LupineScarlet,
        image: BASE_URL + "images/weapons/lupine-scarlet.png",
        name: "Lupine Scarlet",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 505,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.L,
          WeaponSkillsMax.CriticalRateBoost.L,
          {
            title: "Fracture: Gnashing Wolves",
            text: "ATK +44.8%.\n"
              + "After the wielder's skill deals Critical DMG, the wielder gains 1 stack of Wolven Blood that grants Physical and Heat DMG Dealth +2.8%. Wolven Blood can reach 16 stacks. After reaching 16 stacks, the wielder gains another Physical and Heat DMG Dealt +67.2% for 20s. After the duration ends, all Wolven Blood stacks are removed.",
          },
        ],
      },
      {
        id: WeaponIds.Monaihe,
        // TODO: Картинки нет
        image: BASE_URL + "images/weapons/monaihe.png",
        name: "Monaihe",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.WillBoost.M,
          WeaponSkillsMax.UltimateGainEfficiencyBoost.M,
          { title: "Inspiring: Mortise-and-Tenon Analysis", text: "Main Attribute +14.0%\nArts Intensity +70" },
        ],
      },
      {
        id: WeaponIds.MountainBearer,
        // TODO: Картинки нет
        image: BASE_URL + "images/weapons/mountain-bearer.png",
        name: "Mountain Bearer",
        typeId: WeaponTypeIds.Polearm,
        rarity: 6,
        baseATK90: 500,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.L,
          WeaponSkillsMax.PhysicalDMGBoost.L,
          {
            title: "Efficacy: Weight of Mountain",
            text: "Against Vulnerable enemies, the wielder gains DMG Dealt +56.0%\n"
              + "When the wielder's battle skill applies Vulnerability, the wielder gains all attributes +22.4% for 15s. When the wielder's battle skill applies Physical Susceptibility, the wielder gains all attributes +22.4% for 15s.\n"
              + "Max stacks of the same name: 2. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
          },
        ],
      },
      {
        id: WeaponIds.Navigator,
        image: BASE_URL + "images/weapons/navigator.png",
        name: "Navigator",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 490,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.L,
          WeaponSkillsMax.CryoDMGBoost.L,
          {
            title: "Infliction: Lone and Distant Sail",
            text: "Critical Rate +9.8%\n"
              + "When Solidification or Corrosion is applied to enemies, the wielder gains Cryo DMG Dealt and Nature DMG Dealt +9.8%, and Critical Rate +5.6% for 15s. If this effect is triggered by the wielder, double the increase gained.\n"
              + "Effects of the same name cannot stack. Effect only triggers once every 20s.",
          },
        ],
      },
      {
        id: WeaponIds.NeverRest,
        image: BASE_URL + "images/weapons/never-rest.png",
        name: "Never Rest",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 500,
        skillsMax: [
          WeaponSkillsMax.WillBoost.L,
          WeaponSkillsMax.AttackBoost.L,
          {
            title: "Flow: Reincarnation",
            text: "Physical DMG Dealt +44.8%\n"
              + "After the wielder's skill recovers SP, the wielder gains Physical DMG Dealt +14.0% while the other operators in the team gain Physical DMG Dealt +7.0% for 30s.\n"
              + "Max stacks for effects of the same name: 5. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
          },
        ],
      },
      {
        id: WeaponIds.OBJArtsIdentifier,
        image: BASE_URL + "images/weapons/obj-arts-identifier.png",
        name: "OBJ Arts Identifier",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.M,
          WeaponSkillsMax.ArtsIntensityBoost.M,
          {
            title: "Pursuit: Transcendent Arts",
            text: "Max HP +28.0%\n"
              + "When the wielder's combo skill applies Arts Burst or Physical Status, the entire team gains Heat DMG Dealt and Electric DMG Dealt +22.4% for 15s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.OBJEdgeOfLightness,
        image: BASE_URL + "images/weapons/obj-edge-of-lightness.png",
        name: "OBJ Edge of Lightness",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.M,
          WeaponSkillsMax.AttackBoost.M,
          {
            title: "Flow: Unbridled Edge",
            text: "Secondary Attribute +14.0%\n"
              + "After the wielder recovers SP by their own skill, the entire team gains Heat DMG Dealt and Electric DMG Dealt +8.4% for 20s.\n"
              + "Max stacks for effects of the same name: 3. Duration of each stack is counted separately.",
          },
        ],
      },
      {
        id: WeaponIds.OBJHeavyBurden,
        image: BASE_URL + "images/weapons/obj-heavy-burden.png",
        name: "OBJ Heavy Burden",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.M,
          WeaponSkillsMax.HPBoost.M,
          {
            title: "Efficacy: Tenacious Will",
            text: "Secondary Attribute +14.0%\n"
              + "When the wielder applies Knocked Down or Weakened, DEF +50.4% for 15s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.OBJRazorhorn,
        image: BASE_URL + "images/weapons/obj-razorhorn.png",
        name: "OBJ Razorhorn",
        typeId: WeaponTypeIds.Polearm,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.WillBoost.M,
          WeaponSkillsMax.PhysicalDMGBoost.M,
          {
            title: "Infliction: Conquest of Icy Peaks",
            text: "To enemies with Cryo Infliction or Solidification, the wielder gains DMG Dealt +22.4%. After consuming Solidification, ATK +33.6% for 15s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.OBJVelocitous,
        image: BASE_URL + "images/weapons/obj-velocitous.png",
        name: "OBJ Velocitous",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.M,
          WeaponSkillsMax.UltimateGainEfficiencyBoost.M,
          {
            title: "Detonate: Rapid Strike",
            text: "ATK +14.0%\n"
              + "After the wielder consumes an Arts Infliction, the wielder gains Nature DMG Dealt +(14.0% x Stacks Consumed) for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.Oblivion,
        image: BASE_URL + "images/weapons/oblivion.png",
        name: "Oblivion",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 495,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.L,
          WeaponSkillsMax.ArtsBoost.L,
          {
            title: "Twilight: Humiliation",
            text: "Critical Rate +14.0%\n"
              + "When the wielder casts an ultimate, the wielder gains Arts DMG Dealt +67.2% for 15s. When the wielder casts a combo skill, the wielder gains Arts DMG Dealt +33.6% for 15s.\n"
              + "The two effects apply separately and do not stack with themselves.",
          },
        ],
      },
      {
        id: WeaponIds.Opero77,
        image: BASE_URL + "images/weapons/opero-77.png",
        name: "Opero 77",
        typeId: WeaponTypeIds.Polearm,
        rarity: 3,
        baseATK90: 283,
        skillsMax: [WeaponSkillsMax.MainAttributeBoost.S, { title: "Assault: Armament Prep", text: "ATK +34" }],
      },
      {
        id: WeaponIds.OpusEtchFigure,
        // TODO: Картинки нет
        image: BASE_URL + "images/weapons/opus-etch-figure.png",
        name: "Opus: Etch Figure",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 6,
        baseATK90: 485,
        skillsMax: [
          WeaponSkillsMax.WillBoost.L,
          WeaponSkillsMax.NatureDMGBoost.L,
          {
            title: "Suppression: Tillite Etchings",
            text: "ATK +19.6%\n"
              + "When the wielder's battle skill applies Nature Infliction, other operators in the team gain Arts DMG Dealt +14.0% for 15s. For every enemy suffering from Nature Infliction applied by the said battle skill, the team gains Arts DMG Dealt +5.6%, up to a max of 16.8%.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.OpusTheLiving,
        image: BASE_URL + "images/weapons/opus-the-living.png",
        name: "Opus: The Living",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.M,
          WeaponSkillsMax.ArtsBoost.M,
          {
            title: "Infliction: Road Home for All Life",
            text: "Critical Rate +8.4%\n"
              + "When the wielder applies an Arts Reaction, the wielder gains ATK +21.0% for 20s.\n"
              + "Max stacks of the same name: 2. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
          },
        ],
      },
      {
        id: WeaponIds.PathfindersBeacon,
        image: BASE_URL + "images/weapons/pathfinders-beacon.png",
        name: "Pathfinder's Beacon",
        typeId: WeaponTypeIds.Polearm,
        rarity: 4,
        baseATK90: 341,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.S,
          WeaponSkillsMax.AttackBoost.S,
          { title: "Inspiring: Start of a Saga", text: "When the wielder's HP is above 80%, ATK +42.0%." },
        ],
      },
      {
        id: WeaponIds.Peco5,
        image: BASE_URL + "images/weapons/peco-5.png",
        name: "Peco 5",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 3,
        baseATK90: 283,
        skillsMax: [WeaponSkillsMax.MainAttributeBoost.S, { title: "Assault: Armament Prep", text: "ATK +34" }],
      },
      {
        id: WeaponIds.ProminentEdge,
        image: BASE_URL + "images/weapons/prominent-edge.png",
        name: "Prominent Edge",
        typeId: WeaponTypeIds.Sword,
        rarity: 4,
        baseATK90: 341,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.S,
          WeaponSkillsMax.PhysicalDMGBoost.S,
          {
            title: "Suppression: Emergency Boost",
            text: "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.Quencher,
        image: BASE_URL + "images/weapons/quencher.png",
        name: "Quencher",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 4,
        baseATK90: 341,
        skillsMax: [
          WeaponSkillsMax.WillBoost.S,
          WeaponSkillsMax.HPBoost.S,
          {
            title: "Crusher: Honed into Legion",
            text: "When the wielder performs a Final Strike on the enemy, ATK +33.6% for 10s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.RapidAscent,
        image: BASE_URL + "images/weapons/rapid-ascent.png",
        name: "Rapid Ascent",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 495,
        skillsMax: [
          WeaponSkillsMax.MainAttributeBoost.L,
          WeaponSkillsMax.CriticalRateBoost.L,
          {
            title: "Twilight: Azure Clouds",
            text: "Battle skills and ultimates gain Physical DMG Dealt +42.0%\n"
              + "Against Staggered enemies, battle skills and ultimates also gain DMG Dealt +98.0%.",
          },
        ],
      },
      {
        id: WeaponIds.RationalFarewell,
        image: BASE_URL + "images/weapons/rational-farewell.png",
        name: "Rational Farewell",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.M,
          WeaponSkillsMax.HeatDMGBoost.M,
          {
            title: "Pursuit: Aid from the Past",
            text: "Battle Skill DMG Dealt +28.0%\n"
              + "When the wielder's combo skill applies Arts Burst or Combusted, ATK +44.8% for 15s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.SeekerOfDarkLung,
        image: BASE_URL + "images/weapons/seeker-of-dark-lung.png",
        name: "Seeker of Dark Lung",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.M,
          WeaponSkillsMax.UltimateGainEfficiencyBoost.M,
          {
            title: "Detonate: Seeker of the Esoteric",
            text: "Main Attribute +14.0%\n"
              + "When the wielder applies an Arts Burst, ATK +16.8% for 30s.\n"
              + "Max stacks for the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
          },
        ],
      },
      {
        id: WeaponIds.StanzaOfMemorials,
        image: BASE_URL + "images/weapons/stanza-of-memorials.png",
        name: "Stanza of Memorials",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.M,
          WeaponSkillsMax.AttackBoost.M,
          {
            title: "Twilight: Lustrous Pyre",
            text: "Max HP +28.0%\n"
              + "When the wielder casts an ultimate, operators whose elements differ from the wielder gain ATK +22.4% for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.SunderedPrince,
        image: BASE_URL + "images/weapons/sundered-prince.png",
        name: "Sundered Prince",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 6,
        baseATK90: 490,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.L,
          WeaponSkillsMax.CriticalRateBoost.L,
          {
            title: "Crusher: Princely Deterrence",
            text: "When the wielder performs a Final Strike on the enemy, ATK +28.0% for 8s.\n"
              + "If the wielder is also the controlled operator, Final Strike deals Stagger +33.6% to the enemy.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.SunderingSteel,
        image: BASE_URL + "images/weapons/sundering-steel.png",
        name: "Sundering Steel",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.M,
          WeaponSkillsMax.PhysicalDMGBoost.M,
          {
            title: "Combative: Anthem of Cinder",
            text: "ATK +14.0%\n"
              + "When the wielder deals a Physical Status, ATK +21.0% for 20s.\n"
              + "Max stacks of the same name: 2. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
          },
        ],
      },
      {
        id: WeaponIds.Tarr11,
        image: BASE_URL + "images/weapons/tarr-11.png",
        name: "Tarr 11",
        typeId: WeaponTypeIds.Sword,
        rarity: 3,
        baseATK90: 283,
        skillsMax: [WeaponSkillsMax.MainAttributeBoost.S, { title: "Assault: Armament Prep", text: "ATK +34" }],
      },
      {
        id: WeaponIds.ThermiteCutter,
        image: BASE_URL + "images/weapons/thermite-cutter.png",
        name: "Thermite Cutter",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 490,
        skillsMax: [
          WeaponSkillsMax.WillBoost.L,
          WeaponSkillsMax.AttackBoost.L,
          {
            title: "Flow: Thermal Release",
            text: "ATK+28.0%\n"
              + "After the wielder's skill recovers SP or grants a Link state, the entire team gains ATK +14.0% for 20s.\n"
              + "Max stacks for effects of the same name: 2. Duration of each stack is counted separately.",
          },
        ],
      },
      {
        id: WeaponIds.Thunderberge,
        image: BASE_URL + "images/weapons/thunderberge.png",
        name: "Thunderberge",
        typeId: WeaponTypeIds.Greatsword,
        rarity: 6,
        baseATK90: 495,
        skillsMax: [
          WeaponSkillsMax.StrengthBoost.L,
          WeaponSkillsMax.HPBoost.L,
          {
            title: "Medicant: Eye of Talos",
            text: "Shield applied +67.2%\n"
              + "After the wielder's combo skill provides HP treatment, the controlled operator gains an additional (19.6% x Wielder's Max HP) Shield for 15s.\n"
              + "Effect only triggers once every 15s.",
          },
        ],
      },
      {
        id: WeaponIds.TwelveQuestions,
        image: BASE_URL + "images/weapons/twelve-questions.png",
        name: "Twelve Questions",
        typeId: WeaponTypeIds.Sword,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.M,
          WeaponSkillsMax.AttackBoost.M,
          {
            title: "Infliction: Sincere Interrogation",
            text: "Secondary Attribute +14.0%%\n"
              + "After the wielder consumes an Arts Reaction, ATK +21.0% for 20s.\n"
              + "Max stacks for effects of the same name: 2. Duration of each stack is counted separately.",
          },
        ],
      },
      {
        id: WeaponIds.UmbralTorch,
        image: BASE_URL + "images/weapons/umbral-torch.png",
        name: "Umbral Torch",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 490,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.L,
          WeaponSkillsMax.HeatDMGBoost.L,
          {
            title: "Infliction: Covetous Buildup",
            text: "ATK +19.6%\n"
              + "Whenever Combustion or Corrosion is applied to an enemy, the wielder gains Heat DMG Dealt and Nature DMG Dealt +22.4%\n"
              + "Max stacks for effects with the same name: 3.",
          },
        ],
      },
      {
        id: WeaponIds.Valiant,
        image: BASE_URL + "images/weapons/valiant.png",
        name: "Valiant",
        typeId: WeaponTypeIds.Polearm,
        rarity: 6,
        baseATK90: 495,
        skillsMax: [
          WeaponSkillsMax.AgilityBoost.L,
          WeaponSkillsMax.PhysicalDMGBoost.L,
          {
            title: "Combative: Virtuous Gain",
            text: "ATK +28.0%\n"
              + "After the wielder applies a Physical Statuses, the wielder also deals another hit of Physical DMG equal to 336.0% of the wielder's ATK.",
          },
        ],
      },
      {
        id: WeaponIds.WaveTide,
        image: BASE_URL + "images/weapons/wave-tide.png",
        name: "Wave Tide",
        typeId: WeaponTypeIds.Sword,
        rarity: 4,
        baseATK90: 341,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.S,
          WeaponSkillsMax.AttackBoost.S,
          {
            title: "Pursuit: Unending Cycle",
            text: "When the wielder casts a combo skill, the wielder gains ATK +33.6% for 20s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.Wedge,
        image: BASE_URL + "images/weapons/wedge.png",
        name: "Wedge",
        typeId: WeaponTypeIds.Handcannon,
        rarity: 6,
        baseATK90: 500,
        skillsMax: [
          WeaponSkillsMax.MainAttributeBoost.L,
          WeaponSkillsMax.CriticalRateBoost.L,
          {
            title: "Infliction: Wedge of Civilization",
            text: "Arts DMG Dealt +33.6%\n"
              + "When the wielder casts a battle skill, the wielder gains Arts DMG Dealt +22.4% for 15s. When the wielder's battle skill applies an Arts Reaction, the wielder gains Arts DMG Dealt +44.8% for 15s.\n"
              + "The two effects apply separately and do not stack with themselves.",
          },
        ],
      },
      {
        id: WeaponIds.WhiteNightNova,
        image: BASE_URL + "images/weapons/white-night-nova.png",
        name: "White Night Nova",
        typeId: WeaponTypeIds.Sword,
        rarity: 6,
        baseATK90: 505,
        skillsMax: [
          WeaponSkillsMax.MainAttributeBoost.L,
          WeaponSkillsMax.ArtsIntensityBoost.L,
          {
            title: "Infliction: White Night Nova",
            text: "Arts DMG Dealt +33.6%\n"
              + "After the wielder applies Combustion or Electrification, the wielder gains Arts DMG Dealt +33.6% and Arts Intensity +70 for 15s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
      {
        id: WeaponIds.WildWanderer,
        image: BASE_URL + "images/weapons/wild-wanderer.png",
        name: "Wild Wanderer",
        typeId: WeaponTypeIds.ArtsUnit,
        rarity: 5,
        baseATK90: 411,
        skillsMax: [
          WeaponSkillsMax.IntellectBoost.M,
          WeaponSkillsMax.ElectricDMGBoost.M,
          {
            title: "Infliction: Wilderness Cluster",
            text: "Arts Intensity +28\n"
              + "When the wielder applies Electrification, the team gains Physical DMG Dealt and Electric DMG Dealt +22.4% for 15s.\n"
              + "Effects of the same name cannot stack.",
          },
        ],
      },
    ],
    transformList: item => item,
  },
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
