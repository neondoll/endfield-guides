import { FactionIds } from "../../src/enums/factions";
import type { Faction } from "../../src/types/factions";

export default {
  CabalOfTranquility: { id: FactionIds.CabalOfTranquility, name: "Секта умиротворения" },
  EndfieldIndustries: { id: FactionIds.EndfieldIndustries, name: "Компания Endfield" },
  HannabitCircuit: { id: FactionIds.HannabitCircuit, name: "Братство Ханнабит" },
  HongshanAcademyOfSciences: { id: FactionIds.HongshanAcademyOfSciences, name: "Академия наук Хуншаня (АНХ)" },
  OrderOfSteelOath: { id: FactionIds.OrderOfSteelOath, name: "Орден Стальной клятвы" },
  RhodesIsland: { id: FactionIds.RhodesIsland, name: "Родос Айленд" },
  Sesqa: { id: FactionIds.Sesqa, name: "Сеш’ка" },
  Talos2GeneralChamberOfCommerce: {
    id: FactionIds.Talos2GeneralChamberOfCommerce,
    name: "Генеральная торговая палата Талоса II (ГТПТ)",
  },
  UnitedWorkersSyndicatesOfTalos2: {
    id: FactionIds.UnitedWorkersSyndicatesOfTalos2,
    name: "Синдикаты объединенных рабочих Талоса II",
  },
} as Record<keyof typeof FactionIds, Faction>;
