import { type FC, type ReactNode, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { columns, type WeaponData } from "./columns";
import { DataTable } from "./data-table";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PATHS from "@/paths";
import type { WeaponTypeListItem } from "@/types/weapon-types";
import type { WeaponListItem } from "@/types/weapons";
import { fetchJson } from "@/utils/api";

const useWeaponTypes = () => {
  const [data, setData] = useState<WeaponTypeListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWeaponTypes = async () => {
    setLoading(true);

    try {
      const data = await fetchJson<WeaponTypeListItem[]>(import.meta.env.BASE_URL + `data/weapon-types/index.json`);

      setData(data.sort((a, b) => a.name.localeCompare(b.name)));
    }
    catch (error) {
      console.error("Ошибка при получении списка типов оружия:", error);
    }
    finally {
      setLoading(false);
    }
  };

  return { data, fetchWeaponTypes, loading };
};
const useWeapons = () => {
  const [data, setData] = useState<WeaponListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWeapons = async () => {
    setLoading(true);

    try {
      const data = await fetchJson<WeaponListItem[]>(import.meta.env.BASE_URL + `data/weapons/index.json`);

      setData(data.sort((a, b) => {
        if (a.rarity !== b.rarity) {
          return a.rarity - b.rarity;
        }

        return a.name.localeCompare(b.name);
      }));
    }
    catch (error) {
      console.error("Ошибка при получении списка оружия:", error);
    }
    finally {
      setLoading(false);
    }
  };

  return { data, fetchWeapons, loading };
};

const WeaponsLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={PATHS.Home}>Главная</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Оружие</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </div>
  );
};
const WeaponsPage: FC = () => {
  const { data: weaponTypes, fetchWeaponTypes, loading: weaponTypesLoading } = useWeaponTypes();
  const { data: weapons, fetchWeapons, loading: weaponsLoading } = useWeapons();

  const data = useMemo<WeaponData[]>(() => {
    return weapons.map((weapon) => {
      const type = weaponTypes.find(weaponType => weaponType.id === weapon.typeId)!;

      return { ...weapon, type };
    });
  }, [weaponTypes, weapons]);

  useEffect(() => {
    fetchWeaponTypes();
    fetchWeapons();
  }, []);

  if (weaponTypesLoading || weaponsLoading) {
    return (
      <WeaponsLayout>
        <div>Loading...</div>
      </WeaponsLayout>
    );
  }

  return (
    <WeaponsLayout>
      <DataTable columns={columns} data={data} />
    </WeaponsLayout>
  );
};

export default WeaponsPage;
