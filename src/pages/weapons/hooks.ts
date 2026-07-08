import { useEffect, useMemo, useState } from "react";

import type { WeaponData } from "./columns";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchWeaponTypeList } from "@/store/weapon-types";
import { fetchWeaponList } from "@/store/weapons";
import type { WeaponTypeId } from "@/types/weapon-types";

export const useWeapons = () => {
  const dispatch = useAppDispatch();

  const weaponTypes = useAppSelector(state => state.weaponTypes.list);
  const weaponTypesLoading = useAppSelector(state => state.weaponTypes.listLoading);
  const weapons = useAppSelector(state => state.weapons.list);
  const weaponsLoading = useAppSelector(state => state.weapons.listLoading);

  const data = useMemo<WeaponData[]>(() => {
    return weapons.map((weapon) => {
      const type = weaponTypes.find(weaponType => weaponType.id === weapon.typeId)!;

      return { ...weapon, type };
    });
  }, [weaponTypes, weapons]);

  useEffect(() => {
    dispatch(fetchWeaponList());
    dispatch(fetchWeaponTypeList());
  }, [dispatch]);

  return { data, weaponTypes, weaponTypesLoading, weapons, weaponsLoading };
};
export const useWeaponsFilter = (weaponData: WeaponData[]) => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<{
    rarities: NonNullable<WeaponData["rarity"]>[];
    weaponTypeIds: WeaponTypeId[];
  }>({ rarities: [], weaponTypeIds: [] });

  const weaponTypes = useAppSelector(state => state.weaponTypes.list);
  const weaponTypesLoading = useAppSelector(state => state.weaponTypes.listLoading);

  useEffect(() => {
    dispatch(fetchWeaponTypeList());
  }, [dispatch]);

  return {
    filter,
    filteredData: useMemo(() => {
      let data = weaponData;

      if (filter.rarities.length) {
        data = data.filter(item => filter.rarities.includes(item.rarity));
      }

      if (filter.weaponTypeIds.length) {
        data = data.filter(item => filter.weaponTypeIds.includes(item.typeId));
      }

      return data;
    }, [filter.rarities, filter.weaponTypeIds, weaponData]),
    handleFilterChange: setFilter,
    rarities: useMemo(() => {
      const items: NonNullable<WeaponData["rarity"]>[] = [];

      weaponData.forEach((weapon) => {
        if (!items.includes(weapon.rarity)) {
          items.push(weapon.rarity);
        }
      });

      return items.sort((a, b) => a - b);
    }, [weaponData]),
    weaponTypes, weaponTypesLoading,
  };
};
