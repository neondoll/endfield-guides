import { WeaponTypeIds } from "../../src/enums/weapon-types";
import type { WeaponType } from "../../src/types/weapon-types";

const image = (value: string) => `images/weapon-types/${value}`;

export default {
  ArtsUnit: { id: WeaponTypeIds.ArtsUnit, name: "Модуль искусств", image: image("arts-unit.png") },
  Greatsword: { id: WeaponTypeIds.Greatsword, name: "Двуручный меч", image: image("greatsword.png") },
  Handcannon: { id: WeaponTypeIds.Handcannon, name: "Пушка", image: image("handcannon.png") },
  Polearm: { id: WeaponTypeIds.Polearm, name: "Древковое оружие", image: image("polearm.png") },
  Sword: { id: WeaponTypeIds.Sword, name: "Меч", image: image("sword.png") },
} as Record<keyof typeof WeaponTypeIds, WeaponType>;
