import { OperatorRoleIds } from "../../src/enums/operator-roles";
import type { OperatorRole } from "../../src/types/operator-roles";

const image = (value: string) => `images/operator-roles/${value}`;

export default {
  Caster: {
    id: OperatorRoleIds.Caster,
    name: "Заклинатель",
    description: "Заклинатели накладывают поражение искусствами и реакции искусств. Также они наносят мощный урон.",
    image: image("caster.png"),
  },
  Defender: {
    id: OperatorRoleIds.Defender,
    name: "Защитник",
    description: "Защитники очень выносливы. Они надежно прикрывают и лечат товарищей, а также мастерски отвечают на атаки врагов.",
    image: image("defender.png"),
  },
  Guard: {
    id: OperatorRoleIds.Guard,
    name: "Страж",
    description: "Стражи накладывают на врагов уязвимости и физические состояния. Также они наносят мощный урон.",
    image: image("guard.png"),
  },
  Striker: {
    id: OperatorRoleIds.Striker,
    name: "Штурмовик",
    description: "Штурмовики наносят сокрушительный урон, используя физические эффекты и эффекты искусств, наложенные другими оперативниками.",
    image: image("striker.png"),
  },
  Supporter: {
    id: OperatorRoleIds.Supporter,
    name: "Поддержка",
    description: "Оперативники поддержки контролируют и ослабляют врагов посредством различных эффектов. Также они оказывают поддержку товарищам и усиливают их.",
    image: image("supporter.png"),
  },
  Vanguard: {
    id: OperatorRoleIds.Vanguard,
    name: "Авангард",
    description: "Отлично восстанавливают очки навыков (ОН), чтобы команда могла чаще применять навыки.",
    image: image("vanguard.png"),
  },
} as Record<keyof typeof OperatorRoleIds, OperatorRole>;
