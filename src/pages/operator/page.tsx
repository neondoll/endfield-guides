import type { FC } from "react";
import { useParams } from "react-router";

import { useOperator } from "./hooks";
import OperatorLayout from "./layout";
import {
  AttributeImage, ElementImage, OperatorImage, OperatorRoleImage, RarityImage, WeaponTypeImage,
} from "@/components/image";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import type { OperatorId } from "@/types/operators";

const OperatorPage: FC = () => {
  const params = useParams<{ operatorId: OperatorId }>();
  const {
    element, faction, loading, mainAttribute, operator, operatorRole, race, secondaryAttribute, weapon,
  } = useOperator(params.operatorId!);

  if (loading || !element || !operator || !operatorRole || !weapon) {
    return (
      <OperatorLayout>
        <div>Loading...</div>
      </OperatorLayout>
    );
  }

  return (
    <OperatorLayout title={operator.name}>
      <Table className="text-card-foreground bg-card shadow-sm ring-1 ring-foreground/5 table-fixed">
        <TableBody>
          <TableRow>
            <TableHead children={operator.name} className="space-y-1 text-center" colSpan={3} />
          </TableRow>
          <TableRow>
            <TableCell>
              <OperatorImage alt={operator.name} className="mx-auto size-25" src={operator.image} />
            </TableCell>
            <TableCell colSpan={2}>
              {faction && (
                <p>
                  <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Фракция:</span>
                  {` ${faction.name}`}
                </p>
              )}
              {race && (
                <p>
                  <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Раса:</span>
                  {` ${race.name}`}
                </p>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-center">Редкость</TableHead>
            <TableHead className="text-center">Элемент</TableHead>
            <TableHead className="text-center">Оружие</TableHead>
          </TableRow>
          <TableRow>
            <TableCell className="space-y-1 text-center">
              <RarityImage className="mx-auto w-5 h-auto" />
              <span children={`${operator.rarity}-Звезд`} />
            </TableCell>
            <TableCell className="space-y-1 text-center">
              <ElementImage alt={element.name} className="mx-auto size-5" src={element.image} />
              <span children={element.name} />
            </TableCell>
            <TableCell className="space-y-1 text-center">
              <WeaponTypeImage alt={weapon.name} className="mx-auto size-5" src={weapon.image} />
              <span children={weapon.name} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-center">Класс</TableHead>
            <TableHead className="text-center">Основной показатель</TableHead>
            <TableHead className="text-center">Побочный показатель</TableHead>
          </TableRow>
          <TableRow>
            <TableCell className="space-y-1 text-center">
              <OperatorRoleImage alt={operatorRole.name} className="mx-auto size-5" src={operatorRole.image} />
              <span children={operatorRole.name} />
            </TableCell>
            <TableCell className="space-y-1 text-center">
              {mainAttribute
                ? (
                    <>
                      <AttributeImage alt={mainAttribute.name} className="mx-auto size-5" src={mainAttribute.image} />
                      <span children={mainAttribute.name} />
                    </>
                  )
                : (
                    <span className="text-destructive">Подлежит определению</span>
                  )}
            </TableCell>
            <TableCell className="space-y-1 text-center">
              {secondaryAttribute
                ? (
                    <>
                      <AttributeImage
                        alt={secondaryAttribute.name}
                        className="mx-auto size-5"
                        src={secondaryAttribute.image}
                      />
                      <span children={secondaryAttribute.name} />
                    </>
                  )
                : (
                    <span className="text-destructive">Подлежит определению</span>
                  )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </OperatorLayout>
  );
};

export default OperatorPage;
