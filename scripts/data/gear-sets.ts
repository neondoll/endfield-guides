import { GearSetIds } from "../../src/enums/gear-sets";
import type { GearSet } from "../../src/types/gear-sets";

export default {
  AburreysLegacy: {
    id: GearSetIds.AburreysLegacy,
    name: "Aburrey's Legacy",
    bonusStat: "Wearer's Skill DMG +24%",
    effect: "When the wearer casts a battle skill, combo skill, or ultimate, gain ATK +5% for 15s. The buff from each of the three skill types is unique and does not stack with itself.",
  },
  AICHeavy: {
    id: GearSetIds.AICHeavy,
    name: "AIC Heavy",
    bonusStat: "Wearer's HP +500",
    effect: "When the wearer defeats an enemy, restore 100 HP. Effect trigger cooldown: 5s.",
  },
  AICLight: {
    id: GearSetIds.AICLight,
    name: "AIC Light",
    bonusStat: "Wearer's HP +500",
    effect: "When the wearer defeats an enemy, ATK +20 for 5s.",
  },
  ArmoredMSGR: {
    id: GearSetIds.ArmoredMSGR,
    name: "Armored MSGR",
    bonusStat: "Wearer's Strength +50",
    effect: "When the wearer's HP is below 50%, the wearer gains 30% DMG Reduction against all types of DMG.",
  },
  BasicGearPack: { id: GearSetIds.BasicGearPack, name: "Basic Gear Pack" },
  Catastrophe: {
    id: GearSetIds.Catastrophe,
    name: "Catastrophe",
    bonusStat: "Wearer's Ultimate Gain Efficiency +20%.",
    effect: "At the start of battle, the wearer immediately recovers 50 SP.",
  },
  LYNX: {
    id: GearSetIds.LYNX,
    name: "LYNX",
    bonusStat: "Wearer's HP Treatment Efficiency +20%",
    effect: "After the wearer gives HP treatment to an allied target, that target also gains 15% DMG Reduction against all types of DMG for 10s. If the said treatment exceeds the target's Max HP, the target gains 30% DMG Reduction against all types of DMG. The aforementioned effects cannot stack.",
  },
  MinerAGearPack: { id: GearSetIds.MinerAGearPack, name: "Miner α Gear Pack" },
  MinerBGearPack: { id: GearSetIds.MinerBGearPack, name: "Miner β Gear Pack" },
  MinerYGearPack: { id: GearSetIds.MinerYGearPack, name: "Miner γ Gear Pack" },
  MordvoltInsulation: {
    id: GearSetIds.MordvoltInsulation,
    name: "Mordvolt Insulation",
    bonusStat: "Wearer's Intellect +50",
    effect: "When the wearer's HP is above 80%, Arts DMG +20%.",
  },
  MordvoltResistant: {
    id: GearSetIds.MordvoltResistant,
    name: "Mordvolt Resistant",
    bonusStat: "Wearer's Will +50",
    effect: "When the wearer's HP is below 50%, Treatment Effect +30%.",
  },
  RovingMSGR: {
    id: GearSetIds.RovingMSGR,
    name: "Roving MSGR",
    bonusStat: "Wearer's Agility +50",
    effect: "When the wearer's HP is above 80%, Physical DMG +20%",
  },
  Swordmancer: {
    id: GearSetIds.Swordmancer,
    name: "Swordmancer",
    bonusStat: "Wearer's Stagger Efficiency Bonus +20%",
    effect: "After the wearer applies a Physical Status, the wearer also performs 1 hit that deals 250% ATK of Physical DMG and [10 Stagger]. Effect trigger cooldown: 15s.",
  },
} as Record<keyof typeof GearSetIds, GearSet>;
