import { useEffect, useMemo } from "react";

import type { WeaponData } from "./columns";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchWeaponTypeList } from "@/store/weapon-types";
import { fetchWeaponList } from "@/store/weapons";

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
