import { ElementIds } from "../../src/enums/elements";
import type { Element } from "../../src/types/elements";

const image = (value: string) => `images/elements/${value}`;

export default {
  Cryo: { id: ElementIds.Cryo, name: "Крио", image: image("cryo.png") },
  Electric: { id: ElementIds.Electric, name: "Электричество", image: image("electric.png") },
  Heat: { id: ElementIds.Heat, name: "Жар", image: image("heat.png") },
  Nature: { id: ElementIds.Nature, name: "Природа", image: image("nature.png") },
  Physical: { id: ElementIds.Physical, name: "Физика", image: image("physical.png") },
} as Record<keyof typeof ElementIds, Element>;
