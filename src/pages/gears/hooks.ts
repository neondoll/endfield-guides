import { useEffect, useMemo } from "react";

import type { GearData } from "./columns";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchGearSetList } from "@/store/gear-sets";
import { fetchGearTypeList } from "@/store/gear-types";
import { fetchGearList } from "@/store/gears";

export const useGears = () => {
  const dispatch = useAppDispatch();

  const gearSets = useAppSelector(state => state.gearSets.list);
  const gearSetsLoading = useAppSelector(state => state.gearSets.listLoading);
  const gearTypes = useAppSelector(state => state.gearTypes.list);
  const gearTypesLoading = useAppSelector(state => state.gearTypes.listLoading);
  const gears = useAppSelector(state => state.gears.list);
  const gearsLoading = useAppSelector(state => state.gears.listLoading);

  const data = useMemo<GearData[]>(() => {
    if (!gearSets.length || !gearTypes.length) {
      return [];
    }

    return gears
      .map((gear) => {
        const set = gearSets.find(gearSet => gearSet.id === gear.setId)!;
        const type = gearTypes.find(gearType => gearType.id === gear.typeId)!;

        return { ...gear, set, type };
      })
      .sort((a, b) => {
        if (a.level !== b.level) {
          return b.level - a.level;
        }

        if (a.setId !== b.setId) {
          return a.set.name.localeCompare(b.set.name);
        }

        if (a.typeId !== b.typeId) {
          return a.type.order - b.type.order;
        }

        return a.name.localeCompare(b.name);
      });
  }, [gearSets, gearTypes, gears]);

  useEffect(() => {
    dispatch(fetchGearList());
    dispatch(fetchGearSetList());
    dispatch(fetchGearTypeList());
  }, [dispatch]);

  return { data, gearSets, gearSetsLoading, gearTypes, gearTypesLoading, gears, gearsLoading };
};
