import { useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchAttributeList } from "@/store/attributes";
import { fetchElement } from "@/store/elements";
import { fetchFaction } from "@/store/factions";
import { fetchOperatorRole } from "@/store/operator-roles";
import { fetchOperator } from "@/store/operators";
import { fetchRace } from "@/store/races";
import { fetchWeaponType } from "@/store/weapon-types";
import type { OperatorId } from "@/types/operators";

export const useOperator = (id: OperatorId) => {
  const dispatch = useAppDispatch();

  const attributes = useAppSelector(state => state.attributes.list);
  const attributesLoading = useAppSelector(state => state.attributes.listLoading);
  const elementLoading = useAppSelector(state => state.elements.detailsLoading);
  const elements = useAppSelector(state => state.elements.details);
  const factionLoading = useAppSelector(state => state.factions.detailsLoading);
  const factions = useAppSelector(state => state.factions.details);
  const operatorLoading = useAppSelector(state => state.operators.detailsLoading);
  const operatorRoleLoading = useAppSelector(state => state.operatorRoles.detailsLoading);
  const operatorRoles = useAppSelector(state => state.operatorRoles.details);
  const operators = useAppSelector(state => state.operators.details);
  const raceLoading = useAppSelector(state => state.races.detailsLoading);
  const races = useAppSelector(state => state.races.details);
  const weaponTypeLoading = useAppSelector(state => state.weaponTypes.detailsLoading);
  const weaponTypes = useAppSelector(state => state.weaponTypes.details);

  const loading = useMemo(() => {
    return attributesLoading || elementLoading || factionLoading || operatorLoading || operatorRoleLoading
      || raceLoading || weaponTypeLoading;
  }, [
    attributesLoading, elementLoading, factionLoading, operatorLoading, operatorRoleLoading, raceLoading,
    weaponTypeLoading,
  ]);

  const operator = useMemo(() => operators[id], [id, operators]);
  const element = useMemo(() => operator?.elementId ? elements[operator.elementId] : undefined, [elements, operator]);
  const faction = useMemo(() => operator?.factionId ? factions[operator.factionId] : undefined, [factions, operator]);
  const mainAttribute = useMemo(() => attributes.find(attribute => attribute.id === operator?.mainAttributeId), [attributes, operator]);
  const operatorRole = useMemo(() => operator?.roleId ? operatorRoles[operator.roleId] : undefined, [operator, operatorRoles]);
  const race = useMemo(() => operator?.raceId ? races[operator.raceId] : undefined, [operator, races]);
  const secondaryAttribute = useMemo(() => attributes.find(attribute => attribute.id === operator?.secondaryAttributeId), [attributes, operator]);
  const weapon = useMemo(() => operator?.weaponId ? weaponTypes[operator.weaponId] : undefined, [operator, weaponTypes]);

  useEffect(() => {
    dispatch(fetchOperator(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (operator) {
      dispatch(fetchAttributeList());
      dispatch(fetchElement(operator.elementId));
      dispatch(fetchFaction(operator.factionId));
      dispatch(fetchOperatorRole(operator.roleId));
      dispatch(fetchRace(operator.raceId));
      dispatch(fetchWeaponType(operator.weaponId));
    }
  }, [dispatch, operator]);

  return { element, faction, loading, mainAttribute, operator, operatorRole, race, secondaryAttribute, weapon };
};
