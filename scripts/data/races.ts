import { RaceIds } from "../../src/enums/races";
import type { Race } from "../../src/types/races";

export default {
  Anasa: { id: RaceIds.Anasa, name: "Анаса" },
  Anaty: { id: RaceIds.Anaty, name: "Анати" },
  Caprinae: { id: RaceIds.Caprinae, name: "Капринэ" },
  Cautus: { id: RaceIds.Cautus, name: "Каут" },
  Feline: { id: RaceIds.Feline, name: "Фелин" },
  Kuranta: { id: RaceIds.Kuranta, name: "Куранта" },
  Kylin: { id: RaceIds.Kylin, name: "Цилинь" },
  Liberi: { id: RaceIds.Liberi, name: "Либери" },
  Lung: { id: RaceIds.Lung, name: "Лун" },
  Lupo: { id: RaceIds.Lupo, name: "Люпо" },
  Perro: { id: RaceIds.Perro, name: "Перро" },
  Phidia: { id: RaceIds.Phidia, name: "Фидиа" },
  Sankta: { id: RaceIds.Sankta, name: "Санкта" },
  Sarkaz: { id: RaceIds.Sarkaz, name: "Сарказ" },
  Savra: { id: RaceIds.Savra, name: "Савра" },
  Undisclosed: { id: RaceIds.Undisclosed, name: "Неизвестно" },
  Ursus: { id: RaceIds.Ursus, name: "Урсин" },
  Vouivre: { id: RaceIds.Vouivre, name: "Вуивра" },
  Vulpo: { id: RaceIds.Vulpo, name: "Вульпо" },
} as Record<keyof typeof RaceIds, Race>;
