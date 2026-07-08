import { useEffect, useMemo } from "react";

// import type { GearData } from "./columns";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchGearPackList } from "@/store/gear-packs";
import { fetchGearTypeList } from "@/store/gear-types";
import { fetchGearList } from "@/store/gears";

export const useGears = () => {
  const dispatch = useAppDispatch();

  const gearPacks = useAppSelector(state => state.gearPacks.list);
  const gearPacksLoading = useAppSelector(state => state.gearPacks.listLoading);
  const gearTypes = useAppSelector(state => state.gearTypes.list);
  const gearTypesLoading = useAppSelector(state => state.gearTypes.listLoading);
  const gears = useAppSelector(state => state.gears.list);
  const gearsLoading = useAppSelector(state => state.gears.listLoading);

  /* const data = useMemo<GearData[]>(() => {
    if (!gearPacks.length || !gearTypes.length) {
      return [];
    }

    return gears
      .map((gear) => {
        const pack = gearPacks.find(gearPack => gearPack.id === gear.packId)!;
        const type = gearTypes.find(gearType => gearType.id === gear.typeId)!;

        return { ...gear, pack, type };
      })
      .sort((a, b) => {
        if (a.level !== b.level) {
          return b.level - a.level;
        }

        if (a.packId !== b.packId) {
          return a.pack.name.localeCompare(b.pack.name);
        }

        if (a.typeId !== b.typeId) {
          return a.type.order - b.type.order;
        }

        return a.name.localeCompare(b.name);
      });
  }, [gearPacks, gearTypes, gears]); */
  const data = useMemo(() => {
    if (!gears.length || !gearPacks.length || !gearTypes.length) {
      return [];
    }

    const uGear = gears
      .map((gear) => {
        const type = gearTypes.find(gearType => gearType.id === gear.typeId)!;

        return { ...gear, type };
      })
      .sort((a, b) => {
        if (a.level !== b.level) {
          return b.level - a.level;
        }

        if (a.typeId !== b.typeId) {
          return a.type.order - b.type.order;
        }

        return a.name.localeCompare(b.name);
      });

    return gearPacks.map((gearPack) => {
      return { ...gearPack, gears: uGear.filter(gear => gear.packId === gearPack.id) };
    });
  }, [gearPacks, gearTypes, gears]);

  useEffect(() => {
    dispatch(fetchGearList());
    dispatch(fetchGearPackList());
    dispatch(fetchGearTypeList());
  }, [dispatch]);

  return { data, gearPacks, gearPacksLoading, gearTypes, gearTypesLoading, gears, gearsLoading };
};
