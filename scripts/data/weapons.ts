import attributes from "./attributes";
import { WeaponTypeIds } from "../../src/enums/weapon-types";
import { WeaponIds } from "../../src/enums/weapons";
import type { Weapon } from "../../src/types/weapons";

const EssenceAttributes = {
  AgilityBoost: "Увелич. ловкости",
  Assault: "Натиск",
  AttackBoost: "Увелич. атаки",
  Detonate: "Детонация",
  Infliction: "Поражение",
  IntellectBoost: "Увелич. интеллекта",
  MainAttributeBoost: "Увелич. основ. показателя",
  PhysicalDMGBoost: "Увелич. физического УРН",
  StrengthBoost: "Увелич. силы",
  Suppression: "Подавление",
  TreatmentEfficiencyBoost: "Увелич. эффективности лечения",
  Twilight: "Сумерки",
};
const WeaponSkillsMax = {
  AgilityBoost: {
    L: { title: `${EssenceAttributes.AgilityBoost} [бол.]`, text: `${attributes.Agility.name} +156` },
    M: { title: `${EssenceAttributes.AgilityBoost} (M)`, text: `${attributes.Agility.name} +124` },
    S: { title: `${EssenceAttributes.AgilityBoost} [мал.]`, text: `${attributes.Agility.name} +93` },
  },
  ArtsBoost: {
    L: { title: "Arts Boost [бол.]", text: "Arts DMG Dealt +43.3%" },
    M: { title: "Arts Boost (M)", text: "Arts DMG Dealt +34.7%" },
    S: { title: "Arts Boost [мал.]", text: "Arts DMG Dealt +26.0%" },
  },
  ArtsIntensityBoost: {
    L: { title: "Arts Intensity Boost [бол.]", text: "Arts Intensity +78" },
    M: { title: "Arts Intensity Boost (M)", text: "Arts Intensity +62" },
  },
  AttackBoost: {
    L: { title: `${EssenceAttributes.AttackBoost} [бол.]`, text: "Атака +39.0%" },
    M: { title: `${EssenceAttributes.AttackBoost} (M)`, text: "Атака +31.2%" },
    S: { title: `${EssenceAttributes.AttackBoost} [мал.]`, text: "Атака +23.4%" },
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
    S: { title: "HP Boost [мал.]", text: "Max HP +46.8%" },
  },
  IntellectBoost: {
    L: { title: `${EssenceAttributes.IntellectBoost} [бол.]`, text: `${attributes.Intellect.name} +156` },
    M: { title: `${EssenceAttributes.IntellectBoost} (M)`, text: `${attributes.Intellect.name} +124` },
    S: { title: `${EssenceAttributes.IntellectBoost} [мал.]`, text: `${attributes.Intellect.name} +93` },
  },
  MainAttributeBoost: {
    L: { title: `${EssenceAttributes.MainAttributeBoost} [бол.]`, text: "Основной показатель +132" },
    S: { title: `${EssenceAttributes.MainAttributeBoost} [мал.]`, text: "Основной показатель +79" },
  },
  NatureDMGBoost: { L: { title: "Nature DMG Boost [бол.]", text: "Nature DMG Dealt +43.3%" } },
  PhysicalDMGBoost: {
    L: { title: `${EssenceAttributes.PhysicalDMGBoost} [бол.]`, text: "Наносимый физичекий УРН +43.3%" },
    M: { title: `${EssenceAttributes.PhysicalDMGBoost} (M)`, text: "Наносимый физичекий УРН +34.7%" },
    S: { title: `${EssenceAttributes.PhysicalDMGBoost} [мал.]`, text: "Наносимый физичекий УРН +26.0%" },
  },
  StrengthBoost: {
    L: { title: `${EssenceAttributes.StrengthBoost} [бол.]`, text: `${attributes.Strength.name} +156` },
    M: { title: `${EssenceAttributes.StrengthBoost} (M)`, text: `${attributes.Strength.name} +124` },
    S: { title: `${EssenceAttributes.StrengthBoost} [мал.]`, text: `${attributes.Strength.name} +93` },
  },
  TreatmentEfficiencyBoost: {
    L: { title: `${EssenceAttributes.TreatmentEfficiencyBoost} [бол.]`, text: "Эффективность лечения +46.4%" },
    M: { title: `${EssenceAttributes.TreatmentEfficiencyBoost} (M)`, text: "Эффективность лечения +37.1%" },
  },
  UltimateGainEfficiencyBoost: {
    L: { title: "Ultimate Gain Efficiency Boost [бол.]", text: "Ultimate Gain Efficiency +46.4%" },
    M: { title: "Ultimate Gain Efficiency Boost (M)", text: "Ultimate Gain Efficiency +37.1%" },
  },
  WillBoost: {
    L: { title: "Will Boost [бол.]", text: "Will +156" },
    M: { title: "Will Boost (M)", text: "Will +124" },
    S: { title: "Will Boost [мал.]", text: "Will +93" },
  },
};

const image = (value: string) => `images/weapons/${value}`;

export default {
  Aggeloslayer: {
    id: WeaponIds.Aggeloslayer,
    name: "Aggeloslayer",
    typeId: WeaponTypeIds.Polearm,
    rarity: 4,
    baseATK90: 341,
    skillsMax: [
      WeaponSkillsMax.WillBoost.S,
      WeaponSkillsMax.ArtsBoost.S,
      {
        title: "Suppression: Emergency Boost",
        text: [
          "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("aggeloslayer.png"),
  },
  AmaranthineTassel: {
    id: WeaponIds.AmaranthineTassel,
    name: "Amaranthine Tassel",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 6,
    baseATK90: 510,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.L,
      WeaponSkillsMax.AttackBoost.L,
      {
        title: "Combative: Amaranthine Cleave",
        text: [
          "Physical DMG Dealt +44.8%.",
          "When the wielder applies Physical Susceptibility, the wielder gains Arts Intensity +84 for 20s. When the wielder applies Crush, the wielder gains Physical DMG Dealt +(25.2% + (8.4% x Max number of Vulnerability stacks consumed from one enemy)) for 30s.",
          "The two effects apply separately and do not stack with themselves.",
        ].join("\n"),
      },
    ],
    image: image("amaranthine-tassel.png"),
  },
  AncientCanal: {
    id: WeaponIds.AncientCanal,
    name: "Ancient Canal",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.M,
      WeaponSkillsMax.ArtsIntensityBoost.M,
      {
        title: "Brutality: Lands of Yore",
        text: [
          "Arts Intensity +28",
          "After the wielder consumes Vulnerable stack(s), the wielder gains Physical DMG Dealt +(14.0% x Stacks Consumed) for 20s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("ancient-canal.png"),
  },
  ArtzyTyrannical: {
    id: WeaponIds.ArtzyTyrannical,
    name: "Artzy Tyrannical",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 6,
    baseATK90: 505,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.L,
      WeaponSkillsMax.CriticalRateBoost.L,
      {
        title: "Fracture: Artzy Exaggeration",
        text: [
          "Cryo DMG Dealt +44.8%",
          "After the wielder scores a critical hit with a battle skill or combo skill, the wielder gains Cryo DMG Dealt +39.2% for 30s.",
          "Max stacks of the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        ].join("\n"),
      },
    ],
    image: image("artzy-tyrannical.png"),
  },
  Aspirant: {
    id: WeaponIds.Aspirant,
    name: "Aspirant",
    typeId: WeaponTypeIds.Sword,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.M,
      WeaponSkillsMax.PhysicalDMGBoost.M,
      {
        title: "Twilight: Imposing Peak",
        text: [
          "Ultimate DMG Dealt 44.8%",
          "After the wielder applies Lifted, during the next ultimate cast within 30s, the wielder gains Physical DMG Dealt +33.6%.",
          "Max stacks for effects of the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.5s.",
        ].join("\n"),
      },
    ],
    image: image("aspirant.png"),
  },
  BeaconOfDuty: {
    id: WeaponIds.BeaconOfDuty,
    name: "Beacon of Duty",
    typeId: WeaponTypeIds.Polearm,
    rarity: 6,
    baseATK90: 485,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.L,
      WeaponSkillsMax.UltimateGainEfficiencyBoost.L,
      {
        title: "Efficacy: Fuel for the Torch",
        text: [
          "Heat DMG Dealt +19.6%.",
          "When the wielder's skill applies Heat Infliction, the wielder gains Physical and Heat DMG Dealt +22.4% for 20s. When the wielder's skill applies Heat Susceptibility, the entire team gains Physical and Heat DMG Dealt +11.2% for 30s.",
          "The two effects apply separately and do not stack with themselves.",
        ].join("\n"),
      },
    ],
    image: image("beacon-of-duty.png"),
  },
  BlessingOfLustrousCarmine: {
    id: WeaponIds.BlessingOfLustrousCarmine,
    name: "Blessing of Lustrous Carmine",
    typeId: WeaponTypeIds.Polearm,
    rarity: 6,
    baseATK90: 500,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.L,
      WeaponSkillsMax.HeatDMGBoost.L,
      {
        title: "Flow: Absolver of Guilt",
        text: [
          "Ultimate Gain Efficiency +50.4%.",
          "When the wielder's skill recovers SP, the entire team gains ATK +16.8% for 20s. When the wielder's skill applies Heat Infliction, the entire team gains Heat DMG Dealt +16.8% for 20s.",
          "The two effects apply separately and do not stack with themselves.",
        ].join("\n"),
      },
    ],
    image: image("blessing-of-lustrous-carmine.png"),
  },
  BrigandsCalling: {
    id: WeaponIds.BrigandsCalling,
    name: "Brigand’s Calling",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 6,
    baseATK90: 505,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.L,
      WeaponSkillsMax.AttackBoost.L,
      {
        title: "Detonate: Brigand's Bane",
        text: [
          "Cryo DMG Dealt +44.8%.",
          "When the wielder applies skill or ultimate applies Cryo Infliction via battle skills or ultimates, the wielder gains Cryo DMG Dealt +56.0% for 20s. When the wielder's battle skill or ultimate applies Arts Susceptibility, the target enemy suffers Arts DMG Taken +16.8% for 20s.",
          "The two effects apply separately and do not stack with themselves.",
        ].join("\n"),
      },
    ],
    image: image("brigands-calling.png"),
  },
  ChimericJustice: {
    id: WeaponIds.ChimericJustice,
    name: "Chimeric Justice",
    typeId: WeaponTypeIds.Polearm,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.M,
      WeaponSkillsMax.UltimateGainEfficiencyBoost.M,
      {
        title: "Brutality: Cemented Fury",
        text: [
          "Critical Rate +8.4%",
          "When the wielder applies Vulnerable to an enemy with no Vulnerable stacks, ATK +42.0% for 15s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("chimeric-justice.png"),
  },
  ChivalricVirtues: {
    id: WeaponIds.ChivalricVirtues,
    name: "Chivalric Virtues",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 6,
    baseATK90: 485,
    skillsMax: [
      WeaponSkillsMax.WillBoost.L,
      WeaponSkillsMax.HPBoost.L,
      {
        title: "Medicant: Blight Fervor",
        text: [
          "Treatment Efficiency +28.0%",
          "After the wielder gives HP treatment with their own skill, the entire team gains ATK +25.2% for 15s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("chivalric-virtues.png"),
  },
  Clannibal: {
    id: WeaponIds.Clannibal,
    name: "Clannibal",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.MainAttributeBoost.L,
      WeaponSkillsMax.ArtsBoost.L,
      {
        title: "Infliction: Vicious Purge",
        text: [
          "Arts DMG +33.6%",
          "After the wielder consumes an Arts Reaction, target enemy suffers Arts DMG Taken +28.0% (for the specified element) for 15s.",
          "Effect only triggers once every 25s.",
        ].join("\n"),
      },
    ],
    image: image("clannibal.png"),
  },
  CohesiveTraction: {
    id: WeaponIds.CohesiveTraction,
    name: "Cohesive Traction",
    typeId: WeaponTypeIds.Polearm,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.WillBoost.M,
      WeaponSkillsMax.ElectricDMGBoost.M,
      {
        title: "Suppression: Concentric Circles",
        text: [
          "Combo Skill DMG Dealt +28.0%",
          "When the wielder casts a combo skill, during the next battle skill cast within 30s, the wielder gains Electric DMG Dealt +28.0%.",
          "Max stacks of the same name: 3. Duration of each stack is counted separately.",
        ].join("\n"),
      },
    ],
    image: image("cohesive-traction.png"),
  },
  Darhoff7: {
    id: WeaponIds.Darhoff7,
    name: "Darhoff 7",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 3,
    baseATK90: 283,
    skillsMax: [WeaponSkillsMax.MainAttributeBoost.S, { title: "Assault: Armament Prep", text: "ATK +34" }],
    image: image("darhoff-7.png"),
  },
  DeliveryGuaranteed: {
    id: WeaponIds.DeliveryGuaranteed,
    name: "Delivery Guaranteed",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 6,
    baseATK90: 500,
    skillsMax: [
      WeaponSkillsMax.WillBoost.L,
      WeaponSkillsMax.UltimateGainEfficiencyBoost.L,
      {
        title: "Pursuit: Duty Fulfilled",
        text: [
          "Nature DMG Dealt +44.8%",
          "After the wielder's combo skill applies Lifted, the team gains Arts DMG Dealt +28.0% for 15s. For every enemy Lifted, the team gains bonus Arts DMG Dealt +5.6%, up to a max of 22.4%.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("delivery-guaranteed.png"),
  },
  DetonationUnit: {
    id: WeaponIds.DetonationUnit,
    name: "Detonation Unit",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.MainAttributeBoost.L,
      WeaponSkillsMax.ArtsIntensityBoost.L,
      {
        title: "Detonate: Imposing Champion",
        text: [
          "Secondary Attribute +28.0%",
          "When the wielder applies an Arts Burst, target enemy suffers Arts DMG Taken +25.2% for 15s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("detonation-unit.png"),
  },
  DreamsOfTheStarryBeach: {
    id: WeaponIds.DreamsOfTheStarryBeach,
    name: "Мечта о звездном береге",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 6,
    baseATK90: 495,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.L,
      WeaponSkillsMax.TreatmentEfficiencyBoost.L,
      {
        title: `${EssenceAttributes.Infliction}: шепот прилива`,
        text: [
          "+44.8% к побочному показателю.",
          "Когда владелец поглощает коррозию, цель получает на 28.0% больше УРН от искусств в течение 25 сек.",
          "Одноименные эффекты не суммируются.",
        ].join("\n"),
      },
    ],
    image: image("dreams-of-the-starry-beach.png"),
  },
  EminentRepute: {
    id: WeaponIds.EminentRepute,
    name: "Eminent Repute",
    typeId: WeaponTypeIds.Sword,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.MainAttributeBoost.L,
      WeaponSkillsMax.PhysicalDMGBoost.L,
      {
        title: "Brutality: Disciplinarian",
        text: [
          "ATK +28.0%",
          "After the wielder consumes Vulnerable stack(s), ATK +(14.0% + 7.0% x Stacks Consumed) while other operators in the team gain half of this buff for 20s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("eminent-repute.png"),
  },
  Exemplar: {
    id: WeaponIds.Exemplar,
    name: "Exemplar",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 6,
    baseATK90: 500,
    skillsMax: [
      WeaponSkillsMax.MainAttributeBoost.L,
      WeaponSkillsMax.AttackBoost.L,
      {
        title: "Suppression: Stacked Hew",
        text: [
          "Physical DMG Dealt +28.0%",
          "When the wielder's battle skill hits an enemy, the wielder gains Physical DMG Dealt +28.0% for 30s.",
          "Max stacks for the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        ].join("\n"),
      },
    ],
    image: image("exemplar.png"),
  },
  Finchaser30: {
    id: WeaponIds.Finchaser30,
    name: "Finchaser 3.0",
    typeId: WeaponTypeIds.Sword,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.M,
      WeaponSkillsMax.CryoDMGBoost.M,
      {
        title: "Suppression: Fin Chaser's Intent",
        text: [
          "ATK +14.0%",
          "When the wielder's battle skill applies Solidification, target enemy suffers Cryo DMG Taken +19.6% for 15s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("finchaser-3-0.png"),
  },
  FinishingCall: {
    id: WeaponIds.FinishingCall,
    name: "Finishing Call",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.M,
      WeaponSkillsMax.HPBoost.M,
      {
        title: "Medicant: Glory of Knighthood",
        text: ["Secondary Attribute +14.0%", "Combo skill HP treatment effect +56.0%"].join("\n"),
      },
    ],
    image: image("finishing-call.png"),
  },
  FlickersInTheMist: {
    id: WeaponIds.FlickersInTheMist,
    name: "Flickers in the Mist",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.WillBoost.L,
      WeaponSkillsMax.ElectricDMGBoost.M,
      {
        title: "Efficacy: Overlapping Borders",
        text: [
          "ATK +19.6%.",
          "When the wielder gains Electric Amp, the wielder also gains Electric DMG Dealt +15.4% for 30s.",
          "Max stacks for effects of the same name: 3. Duration of each stack is counted separately. This effect only triggers once every 0.1s.",
        ].join("\n"),
      },
    ],
    image: image("flickers-in-the-mist.png"),
  },
  FluorescentRoc: {
    id: WeaponIds.FluorescentRoc,
    name: "Fluorescent Roc",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 4,
    baseATK90: 341,
    skillsMax: [
      WeaponSkillsMax.WillBoost.S,
      WeaponSkillsMax.AttackBoost.S,
      {
        title: "Suppression: Emergency Boost",
        text: [
          "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("fluorescent-roc.png"),
  },
  ForgebornScathe: {
    id: WeaponIds.ForgebornScathe,
    name: "Гнев кузни",
    typeId: WeaponTypeIds.Sword,
    rarity: 6,
    baseATK90: 510,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.L,
      WeaponSkillsMax.AttackBoost.L,
      {
        title: `${EssenceAttributes.Twilight}: пламенеющий вопль`,
        text: [
          "+44.8% к наносимому тепловому УРН.",
          "Когда владелец применяет супернавык, то получает +210.0% к наносимому УРН от базовой атаки на 20 сек.",
          "Одноименные эффекты не суммируются.",
        ].join("\n"),
      },
    ],
    image: image("forgeborn-scathe.png"),
  },
  FormerFinery: {
    id: WeaponIds.FormerFinery,
    name: "Former Finery",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 6,
    baseATK90: 495,
    skillsMax: [
      WeaponSkillsMax.WillBoost.L,
      WeaponSkillsMax.HPBoost.L,
      {
        title: "Efficacy: Mincing Therapy",
        text: [
          "Treatment Efficiency +28.0%",
          "After a Protected operator takes DMG, the wielder restores the said operator's HP by (235 + Will x 1.96)",
          "Effect only triggers once every 15s.",
        ].join("\n"),
      },
    ],
    image: image("former-finery.png"),
  },
  Fortmaker: {
    id: WeaponIds.Fortmaker,
    name: "Fortmaker",
    typeId: WeaponTypeIds.Sword,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.M,
      WeaponSkillsMax.UltimateGainEfficiencyBoost.M,
      { title: "Inspiring: Back to the Broken City", text: ["ATK +14.0%", "Arts Intensity +70"].join("\n") },
    ],
    image: image("fortmaker.png"),
  },
  FreedomToProselytize: {
    id: WeaponIds.FreedomToProselytize,
    name: "Freedom to Proselytize",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.WillBoost.M,
      WeaponSkillsMax.TreatmentEfficiencyBoost.M,
      {
        title: "Medicant: Redemption of Faith",
        text: [
          "Main Attribute +14.0%",
          "When the wielder's battle skill provides HP treatment, the controlled operator is restored for another (168 + Will x 1.40) HP.",
          "Effect only triggers once every 15s.",
        ].join("\n"),
      },
    ],
    image: image("freedom-to-proselytize.png"),
  },
  GloriousMemory: {
    id: WeaponIds.GloriousMemory,
    name: "Glorious Memory",
    typeId: WeaponTypeIds.Sword,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.L,
      WeaponSkillsMax.CriticalRateBoost.L,
      {
        title: "Twilight: Lingering Glow",
        text: [
          "When the wielder's skill applies Vulnerability, during the next ultimate cast within 30s, the wielder gains DMG Dealt +33.6%.",
          "Max stacks for effects of the same name: 3. Duration of each stack is counted separately. Effect is only triggered every 0.5s.",
        ].join("\n"),
      },
    ],
    image: image("glorious-memory.png"),
  },
  GrandVision: {
    id: WeaponIds.GrandVision,
    name: "Grand Vision",
    typeId: WeaponTypeIds.Sword,
    rarity: 6,
    baseATK90: 500,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.L,
      WeaponSkillsMax.AttackBoost.L,
      {
        title: "Infliction: Long Time Wish",
        text: [
          "Arts Intensity +84",
          "When the wielder applies Originium Crystals or Solidification, during the next battle skill or ultimate cast within 20s, the wielder gains Physical DMG Dealt +100.8%.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("grand-vision.png"),
  },
  HomeLonging: {
    id: WeaponIds.HomeLonging,
    name: "Home Longing",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.L,
      WeaponSkillsMax.CryoDMGBoost.L,
      {
        title: "Suppression: Olden Moon",
        text: [
          "ATK +19.6%.",
          "For 20s after the wielder casts a combo skill, the wielder's next battle skill gains Cryo and Nature DMG Dealt +22.4%.",
          "Max stacks for effects of the same name: 2. Duration of each stack is counted separately.",
        ].join("\n"),
      },
    ],
    image: image("home-longing.png"),
  },
  HowlingGuard: {
    id: WeaponIds.HowlingGuard,
    name: "Howling Guard",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 4,
    baseATK90: 341,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.S,
      WeaponSkillsMax.AttackBoost.S,
      {
        title: "Suppression: Emergency Boost",
        text: [
          "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("howling-guard.png"),
  },
  HypernovaAuto: {
    id: WeaponIds.HypernovaAuto,
    name: "Hypernova Auto",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 4,
    baseATK90: 341,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.S,
      WeaponSkillsMax.ArtsBoost.S,
      { title: "Inspiring: Start of a Saga", text: "When the wielder's HP is above 80%, ATK +42.0%." },
    ],
    image: image("hypernova-auto.png"),
  },
  Industry01: {
    id: WeaponIds.Industry01,
    name: "Industry 0.1",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 4,
    baseATK90: 341,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.S,
      WeaponSkillsMax.AttackBoost.S,
      {
        title: "Suppression: Emergency Boost",
        text: [
          "When the wielder's battle skill hits the enemy, ATK +33.6% for 20s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("industry-0-1.png"),
  },
  JET: {
    id: WeaponIds.JET,
    name: "JET",
    typeId: WeaponTypeIds.Polearm,
    rarity: 6,
    baseATK90: 500,
    skillsMax: [
      WeaponSkillsMax.MainAttributeBoost.L,
      WeaponSkillsMax.AttackBoost.L,
      {
        title: "Suppression: Astrophysics",
        text: [
          "Arts DMG Dealt +33.6%",
          "When the wielder casts a battle skill, the wielder gains Arts DMG Dealt +33.6% for 15s. When the wielder casts a combo skill, Arts DMG Dealt +33.6% for 15s.",
          "The two effects apply separately and do not stack with themselves.",
        ].join("\n"),
      },
    ],
    image: image("jet.png"),
  },
  Jiminy12: {
    id: WeaponIds.Jiminy12,
    name: "Jiminy 12",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 3,
    baseATK90: 283,
    skillsMax: [WeaponSkillsMax.MainAttributeBoost.S, { title: "Assault: Armament Prep", text: "ATK +34" }],
    image: image("jiminy-12.png"),
  },
  Khravengger: {
    id: WeaponIds.Khravengger,
    name: "Хравенгер",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 6,
    baseATK90: 505,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.L,
      WeaponSkillsMax.AttackBoost.L,
      {
        title: `${EssenceAttributes.Detonate}: пробирающий холод`,
        text: [
          "+56.0% к наносимому УРН от навыков (за каждый навык).",
          "Когда боевой навык накладывает криогенное поражение, владелец получает +28.0% к наносимому криогенному УРН на 15 сек. "
          + "Когда владелец наносит УРН от комбонавыков врагу с криогенным поражением, то получает +56.0% к наносимому криогенному УРН на 15 сек. "
          + "Эффекты накладываются независимо друг от друга. "
          + "Накопить несколько зарядов нельзя.",
        ].join("\n"),
      },
    ],
    image: image("khravengger.png"),
  },
  LoneBarge: {
    id: WeaponIds.LoneBarge,
    name: "Lone Barge",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 6,
    baseATK90: 510,
    skillsMax: [
      WeaponSkillsMax.WillBoost.L,
      WeaponSkillsMax.AttackBoost.L,
      {
        title: "Suppression: Streaming Blitz",
        text: [
          "Electric DMG Dealt +44.8%.",
          "When the wielder's battle skill consumes Arts Reactions, the wielder gains Battle Skill Electric DMG Dealt +56.0% for 20s. This effect can reach a max of 2 stacks and can only trigger once every 0.1s. Duration of each stack is counted separately. After the wielder casts an ultimate, the wielder gains Battle Skill Electric DMG Dealt +112.0% for 25s. This effect cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("lone-barge.png"),
  },
  LongRoad: {
    id: WeaponIds.LongRoad,
    name: "Long Road",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 4,
    baseATK90: 341,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.S,
      WeaponSkillsMax.ArtsBoost.S,
      {
        title: "Pursuit: Unending Cycle",
        text: [
          "When the wielder casts a combo skill, the wielder gains ATK +33.6% for 20s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("long-road.png"),
  },
  LupineScarlet: {
    id: WeaponIds.LupineScarlet,
    name: "Lupine Scarlet",
    typeId: WeaponTypeIds.Sword,
    rarity: 6,
    baseATK90: 505,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.L,
      WeaponSkillsMax.CriticalRateBoost.L,
      {
        title: "Fracture: Gnashing Wolves",
        text: [
          "ATK +44.8%.",
          "After the wielder's skill deals Critical DMG, the wielder gains 1 stack of Wolven Blood that grants Physical and Heat DMG Dealth +2.8%. Wolven Blood can reach 16 stacks. After reaching 16 stacks, the wielder gains another Physical and Heat DMG Dealt +67.2% for 20s. After the duration ends, all Wolven Blood stacks are removed.",
        ].join("\n"),
      },
    ],
    image: image("lupine-scarlet.png"),
  },
  Monaihe: {
    id: WeaponIds.Monaihe,
    name: "Monaihe",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.WillBoost.M,
      WeaponSkillsMax.UltimateGainEfficiencyBoost.M,
      {
        title: "Inspiring: Mortise-and-Tenon Analysis",
        text: ["Main Attribute +14.0%", "Arts Intensity +70"].join("\n"),
      },
    ],
    image: image("monaihe.png"),
  },
  MountainBearer: {
    id: WeaponIds.MountainBearer,
    name: "Mountain Bearer",
    typeId: WeaponTypeIds.Polearm,
    rarity: 6,
    baseATK90: 500,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.L,
      WeaponSkillsMax.PhysicalDMGBoost.L,
      {
        title: "Efficacy: Weight of Mountain",
        text: [
          "Against Vulnerable enemies, the wielder gains DMG Dealt +56.0%",
          "When the wielder's battle skill applies Vulnerability, the wielder gains all attributes +22.4% for 15s. When the wielder's battle skill applies Physical Susceptibility, the wielder gains all attributes +22.4% for 15s.",
          "Max stacks of the same name: 2. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        ].join("\n"),
      },
    ],
    image: image("mountain-bearer.png"),
  },
  Navigator: {
    id: WeaponIds.Navigator,
    name: "Navigator",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.L,
      WeaponSkillsMax.CryoDMGBoost.L,
      {
        title: "Infliction: Lone and Distant Sail",
        text: [
          "Critical Rate +9.8%",
          "When Solidification or Corrosion is applied to enemies, the wielder gains Cryo DMG Dealt and Nature DMG Dealt +9.8%, and Critical Rate +5.6% for 15s. If this effect is triggered by the wielder, double the increase gained.",
          "Effects of the same name cannot stack. Effect only triggers once every 20s.",
        ].join("\n"),
      },
    ],
    image: image("navigator.png"),
  },
  NeverRest: {
    id: WeaponIds.NeverRest,
    name: "Never Rest",
    typeId: WeaponTypeIds.Sword,
    rarity: 6,
    baseATK90: 500,
    skillsMax: [
      WeaponSkillsMax.WillBoost.L,
      WeaponSkillsMax.AttackBoost.L,
      {
        title: "Flow: Reincarnation",
        text: [
          "Physical DMG Dealt +44.8%",
          "After the wielder's skill recovers SP, the wielder gains Physical DMG Dealt +14.0% while the other operators in the team gain Physical DMG Dealt +7.0% for 30s.",
          "Max stacks for effects of the same name: 5. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        ].join("\n"),
      },
    ],
    image: image("never-rest.png"),
  },
  OBJArtsIdentifier: {
    id: WeaponIds.OBJArtsIdentifier,
    name: "OBJ Arts Identifier",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.M,
      WeaponSkillsMax.ArtsIntensityBoost.M,
      {
        title: "Pursuit: Transcendent Arts",
        text: [
          "Max HP +28.0%",
          "When the wielder's combo skill applies Arts Burst or Physical Status, the entire team gains Heat DMG Dealt and Electric DMG Dealt +22.4% for 15s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("obj-arts-identifier.png"),
  },
  OBJEdgeOfLightness: {
    id: WeaponIds.OBJEdgeOfLightness,
    name: "OBJ Edge of Lightness",
    typeId: WeaponTypeIds.Sword,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.M,
      WeaponSkillsMax.AttackBoost.M,
      {
        title: "Flow: Unbridled Edge",
        text: [
          "Secondary Attribute +14.0%",
          "After the wielder recovers SP by their own skill, the entire team gains Heat DMG Dealt and Electric DMG Dealt +8.4% for 20s.",
          "Max stacks for effects of the same name: 3. Duration of each stack is counted separately.",
        ].join("\n"),
      },
    ],
    image: image("obj-edge-of-lightness.png"),
  },
  OBJHeavyBurden: {
    id: WeaponIds.OBJHeavyBurden,
    name: "OBJ Heavy Burden",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.M,
      WeaponSkillsMax.HPBoost.M,
      {
        title: "Efficacy: Tenacious Will",
        text: [
          "Secondary Attribute +14.0%",
          "When the wielder applies Knocked Down or Weakened, DEF +50.4% for 15s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("obj-heavy-burden.png"),
  },
  OBJRazorhorn: {
    id: WeaponIds.OBJRazorhorn,
    name: "OBJ Razorhorn",
    typeId: WeaponTypeIds.Polearm,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.WillBoost.M,
      WeaponSkillsMax.PhysicalDMGBoost.M,
      {
        title: "Infliction: Conquest of Icy Peaks",
        text: [
          "To enemies with Cryo Infliction or Solidification, the wielder gains DMG Dealt +22.4%. After consuming Solidification, ATK +33.6% for 15s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("obj-razorhorn.png"),
  },
  OBJVelocitous: {
    id: WeaponIds.OBJVelocitous,
    name: "OBJ Velocitous",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.M,
      WeaponSkillsMax.UltimateGainEfficiencyBoost.M,
      {
        title: "Detonate: Rapid Strike",
        text: [
          "ATK +14.0%",
          "After the wielder consumes an Arts Infliction, the wielder gains Nature DMG Dealt +(14.0% x Stacks Consumed) for 20s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("obj-velocitous.png"),
  },
  Oblivion: {
    id: WeaponIds.Oblivion,
    name: "Oblivion",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 6,
    baseATK90: 495,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.L,
      WeaponSkillsMax.ArtsBoost.L,
      {
        title: "Twilight: Humiliation",
        text: [
          "Critical Rate +14.0%",
          "When the wielder casts an ultimate, the wielder gains Arts DMG Dealt +67.2% for 15s. When the wielder casts a combo skill, the wielder gains Arts DMG Dealt +33.6% for 15s.",
          "The two effects apply separately and do not stack with themselves.",
        ].join("\n"),
      },
    ],
    image: image("oblivion.png"),
  },
  Opero77: {
    id: WeaponIds.Opero77,
    name: "Opero 77",
    typeId: WeaponTypeIds.Polearm,
    rarity: 3,
    baseATK90: 283,
    skillsMax: [WeaponSkillsMax.MainAttributeBoost.S, { title: "Assault: Armament Prep", text: "ATK +34" }],
    image: image("opero-77.png"),
  },
  OpusEtchFigure: {
    id: WeaponIds.OpusEtchFigure,
    name: "Opus: Etch Figure",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 6,
    baseATK90: 485,
    skillsMax: [
      WeaponSkillsMax.WillBoost.L,
      WeaponSkillsMax.NatureDMGBoost.L,
      {
        title: "Suppression: Tillite Etchings",
        text: [
          "ATK +19.6%",
          "When the wielder's battle skill applies Nature Infliction, other operators in the team gain Arts DMG Dealt +14.0% for 15s. For every enemy suffering from Nature Infliction applied by the said battle skill, the team gains Arts DMG Dealt +5.6%, up to a max of 16.8%.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("opus-etch-figure.png"),
  },
  OpusTheLiving: {
    id: WeaponIds.OpusTheLiving,
    name: "Opus: The Living",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.M,
      WeaponSkillsMax.ArtsBoost.M,
      {
        title: "Infliction: Road Home for All Life",
        text: [
          "Critical Rate +8.4%",
          "When the wielder applies an Arts Reaction, the wielder gains ATK +21.0% for 20s.",
          "Max stacks of the same name: 2. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        ].join("\n"),
      },
    ],
    image: image("opus-the-living.png"),
  },
  PathfindersBeacon: {
    id: WeaponIds.PathfindersBeacon,
    name: "Pathfinder's Beacon",
    typeId: WeaponTypeIds.Polearm,
    rarity: 4,
    baseATK90: 341,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.S,
      WeaponSkillsMax.AttackBoost.S,
      { title: "Inspiring: Start of a Saga", text: "When the wielder's HP is above 80%, ATK +42.0%." },
    ],
    image: image("pathfinders-beacon.png"),
  },
  Peco5: {
    id: WeaponIds.Peco5,
    name: "Peco 5",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 3,
    baseATK90: 283,
    skillsMax: [WeaponSkillsMax.MainAttributeBoost.S, { title: "Assault: Armament Prep", text: "ATK +34" }],
    image: image("peco-5.png"),
  },
  PhantomPain: {
    id: WeaponIds.PhantomPain,
    name: "Phantom Pain",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.L,
      WeaponSkillsMax.ArtsIntensityBoost.L,
      {
        title: "Suppression: Layered Suffering",
        text: [
          "Physical DMG Dealt +19.6%.",
          "When the wielder casts battle skills or combo skills, the wielder gains Physical DMG Dealt +15.4% for 20s.",
          "Max stacks for effects of the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        ].join("\n"),
      },
    ],
    image: image("phantom-pain.png"),
  },
  ProminentEdge: {
    id: WeaponIds.ProminentEdge,
    name: "Выдающийся клинок",
    typeId: WeaponTypeIds.Sword,
    rarity: 4,
    baseATK90: 341,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.S,
      WeaponSkillsMax.PhysicalDMGBoost.S,
      {
        title: `${EssenceAttributes.Suppression}: срочная поддержка`,
        text: [
          "Когда владелец попадает боевым навком по врагу, то получает +33.6% к АТК на 20 сек.",
          "Одноименные эффекты не суммируются.",
        ].join("\n"),
      },
    ],
    image: image("prominent-edge.png"),
  },
  Quencher: {
    id: WeaponIds.Quencher,
    name: "Quencher",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 4,
    baseATK90: 341,
    skillsMax: [
      WeaponSkillsMax.WillBoost.S,
      WeaponSkillsMax.HPBoost.S,
      {
        title: "Crusher: Honed into Legion",
        text: [
          "When the wielder performs a Final Strike on the enemy, ATK +33.6% for 10s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("quencher.png"),
  },
  RapidAscent: {
    id: WeaponIds.RapidAscent,
    name: "Rapid Ascent",
    typeId: WeaponTypeIds.Sword,
    rarity: 6,
    baseATK90: 495,
    skillsMax: [
      WeaponSkillsMax.MainAttributeBoost.L,
      WeaponSkillsMax.CriticalRateBoost.L,
      {
        title: "Twilight: Azure Clouds",
        text: [
          "Battle skills and ultimates gain Physical DMG Dealt +42.0%",
          "Against Staggered enemies, battle skills and ultimates also gain DMG Dealt +98.0%.",
        ].join("\n"),
      },
    ],
    image: image("rapid-ascent.png"),
  },
  RationalFarewell: {
    id: WeaponIds.RationalFarewell,
    name: "Rational Farewell",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.M,
      WeaponSkillsMax.HeatDMGBoost.M,
      {
        title: "Pursuit: Aid from the Past",
        text: [
          "Battle Skill DMG Dealt +28.0%",
          "When the wielder's combo skill applies Arts Burst or Combusted, ATK +44.8% for 15s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("rational-farewell.png"),
  },
  SeekerOfDarkLung: {
    id: WeaponIds.SeekerOfDarkLung,
    name: "Seeker of Dark Lung",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.M,
      WeaponSkillsMax.UltimateGainEfficiencyBoost.M,
      {
        title: "Detonate: Seeker of the Esoteric",
        text: [
          "Main Attribute +14.0%",
          "When the wielder applies an Arts Burst, ATK +16.8% for 30s.",
          "Max stacks for the same name: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        ].join("\n"),
      },
    ],
    image: image("seeker-of-dark-lung.png"),
  },
  StanzaOfMemorials: {
    id: WeaponIds.StanzaOfMemorials,
    name: "Stanza of Memorials",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.M,
      WeaponSkillsMax.AttackBoost.M,
      {
        title: "Twilight: Lustrous Pyre",
        text: [
          "Max HP +28.0%",
          "When the wielder casts an ultimate, operators whose elements differ from the wielder gain ATK +22.4% for 20s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("stanza-of-memorials.png"),
  },
  SunderedPrince: {
    id: WeaponIds.SunderedPrince,
    name: "Sundered Prince",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.L,
      WeaponSkillsMax.CriticalRateBoost.L,
      {
        title: "Crusher: Princely Deterrence",
        text: [
          "When the wielder performs a Final Strike on the enemy, ATK +28.0% for 8s.",
          "If the wielder is also the controlled operator, Final Strike deals Stagger +33.6% to the enemy.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("sundered-prince.png"),
  },
  SunderingSteel: {
    id: WeaponIds.SunderingSteel,
    name: "Sundering Steel",
    typeId: WeaponTypeIds.Sword,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.M,
      WeaponSkillsMax.PhysicalDMGBoost.M,
      {
        title: "Combative: Anthem of Cinder",
        text: [
          "ATK +14.0%",
          "When the wielder deals a Physical Status, ATK +21.0% for 20s.",
          "Max stacks of the same name: 2. Duration of each stack is counted separately. Effect only triggers once every 0.1s.",
        ].join("\n"),
      },
    ],
    image: image("sundering-steel.png"),
  },
  Tarr11: {
    id: WeaponIds.Tarr11,
    name: "Тарр 11",
    typeId: WeaponTypeIds.Sword,
    rarity: 3,
    baseATK90: 283,
    skillsMax: [
      WeaponSkillsMax.MainAttributeBoost.S,
      { title: `${EssenceAttributes.Assault}: боеготовность`, text: "АТК +34" },
    ],
    image: image("tarr-11.png"),
  },
  ThermiteCutter: {
    id: WeaponIds.ThermiteCutter,
    name: "Thermite Cutter",
    typeId: WeaponTypeIds.Sword,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.WillBoost.L,
      WeaponSkillsMax.AttackBoost.L,
      {
        title: "Flow: Thermal Release",
        text: [
          "ATK+28.0%",
          "After the wielder's skill recovers SP or grants a Link state, the entire team gains ATK +14.0% for 20s.",
          "Max stacks for effects of the same name: 2. Duration of each stack is counted separately.",
        ].join("\n"),
      },
    ],
    image: image("thermite-cutter.png"),
  },
  Thunderberge: {
    id: WeaponIds.Thunderberge,
    name: "Thunderberge",
    typeId: WeaponTypeIds.Greatsword,
    rarity: 6,
    baseATK90: 495,
    skillsMax: [
      WeaponSkillsMax.StrengthBoost.L,
      WeaponSkillsMax.HPBoost.L,
      {
        title: "Medicant: Eye of Talos",
        text: [
          "Shield applied +67.2%",
          "After the wielder's combo skill provides HP treatment, the controlled operator gains an additional (19.6% x Wielder's Max HP) Shield for 15s.",
          "Effect only triggers once every 15s.",
        ].join("\n"),
      },
    ],
    image: image("thunderberge.png"),
  },
  TwelveQuestions: {
    id: WeaponIds.TwelveQuestions,
    name: "Twelve Questions",
    typeId: WeaponTypeIds.Sword,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.M,
      WeaponSkillsMax.AttackBoost.M,
      {
        title: "Infliction: Sincere Interrogation",
        text: [
          "Secondary Attribute +14.0%%",
          "After the wielder consumes an Arts Reaction, ATK +21.0% for 20s.",
          "Max stacks for effects of the same name: 2. Duration of each stack is counted separately.",
        ].join("\n"),
      },
    ],
    image: image("twelve-questions.png"),
  },
  UmbralTorch: {
    id: WeaponIds.UmbralTorch,
    name: "Umbral Torch",
    typeId: WeaponTypeIds.Sword,
    rarity: 6,
    baseATK90: 490,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.L,
      WeaponSkillsMax.HeatDMGBoost.L,
      {
        title: "Infliction: Covetous Buildup",
        text: [
          "ATK +19.6%",
          "Whenever Combustion or Corrosion is applied to an enemy, the wielder gains Heat DMG Dealt and Nature DMG Dealt +22.4%",
          "Max stacks for effects with the same name: 3.",
        ].join("\n"),
      },
    ],
    image: image("umbral-torch.png"),
  },
  Valiant: {
    id: WeaponIds.Valiant,
    name: "Valiant",
    typeId: WeaponTypeIds.Polearm,
    rarity: 6,
    baseATK90: 495,
    skillsMax: [
      WeaponSkillsMax.AgilityBoost.L,
      WeaponSkillsMax.PhysicalDMGBoost.L,
      {
        title: "Combative: Virtuous Gain",
        text: [
          "ATK +28.0%",
          "After the wielder applies a Physical Statuses, the wielder also deals another hit of Physical DMG equal to 336.0% of the wielder's ATK.",
        ].join("\n"),
      },
    ],
    image: image("valiant.png"),
  },
  WaveTide: {
    id: WeaponIds.WaveTide,
    name: "Wave Tide",
    typeId: WeaponTypeIds.Sword,
    rarity: 4,
    baseATK90: 341,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.S,
      WeaponSkillsMax.AttackBoost.S,
      {
        title: "Pursuit: Unending Cycle",
        text: [
          "When the wielder casts a combo skill, the wielder gains ATK +33.6% for 20s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("wave-tide.png"),
  },
  Wedge: {
    id: WeaponIds.Wedge,
    name: "Wedge",
    typeId: WeaponTypeIds.Handcannon,
    rarity: 6,
    baseATK90: 500,
    skillsMax: [
      WeaponSkillsMax.MainAttributeBoost.L,
      WeaponSkillsMax.CriticalRateBoost.L,
      {
        title: "Infliction: Wedge of Civilization",
        text: [
          "Arts DMG Dealt +33.6%",
          "When the wielder casts a battle skill, the wielder gains Arts DMG Dealt +22.4% for 15s. When the wielder's battle skill applies an Arts Reaction, the wielder gains Arts DMG Dealt +44.8% for 15s.",
          "The two effects apply separately and do not stack with themselves.",
        ].join("\n"),
      },
    ],
    image: image("wedge.png"),
  },
  WhiteNightNova: {
    id: WeaponIds.WhiteNightNova,
    name: "White Night Nova",
    typeId: WeaponTypeIds.Sword,
    rarity: 6,
    baseATK90: 505,
    skillsMax: [
      WeaponSkillsMax.MainAttributeBoost.L,
      WeaponSkillsMax.ArtsIntensityBoost.L,
      {
        title: "Infliction: White Night Nova",
        text: [
          "Arts DMG Dealt +33.6%",
          "After the wielder applies Combustion or Electrification, the wielder gains Arts DMG Dealt +33.6% and Arts Intensity +70 for 15s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("white-night-nova.png"),
  },
  WildWanderer: {
    id: WeaponIds.WildWanderer,
    name: "Wild Wanderer",
    typeId: WeaponTypeIds.ArtsUnit,
    rarity: 5,
    baseATK90: 411,
    skillsMax: [
      WeaponSkillsMax.IntellectBoost.M,
      WeaponSkillsMax.ElectricDMGBoost.M,
      {
        title: "Infliction: Wilderness Cluster",
        text: [
          "Arts Intensity +28",
          "When the wielder applies Electrification, the team gains Physical DMG Dealt and Electric DMG Dealt +22.4% for 15s.",
          "Effects of the same name cannot stack.",
        ].join("\n"),
      },
    ],
    image: image("wild-wanderer.png"),
  },
} as Record<keyof typeof WeaponIds, Weapon>;
