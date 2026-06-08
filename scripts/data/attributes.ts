import { AttributeIds } from "../../src/enums/attributes";
import type { Attribute } from "../../src/types/attributes";

const image = (value: string) => `images/attributes/${value}`;

export default {
  Agility: {
    id: AttributeIds.Agility,
    name: "Ловкость",
    description: "Влияет на физическую СОПР оперативника.",
    image: image("agility.png"),
  },
  Intellect: {
    id: AttributeIds.Intellect,
    name: "Интеллект",
    description: "Влияет на сопротивляемость искусствам оперативника.",
    image: image("intellect.png"),
  },
  Strength: {
    id: AttributeIds.Strength,
    name: "Сила",
    description: "Влияет на макс. ОЗ оперативника.",
    image: image("strength.png"),
  },
  Will: {
    id: AttributeIds.Will,
    name: "Воля",
    description: "Влияет на получаемое оперативником лечение.",
    image: image("will.png"),
  },
} as Record<keyof typeof AttributeIds, Attribute>;
