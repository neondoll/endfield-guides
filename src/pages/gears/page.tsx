import { type FC, type ReactNode, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { columns, type GearData } from "./columns";
import { DataTable } from "./data-table";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PATHS from "@/paths";
import type { GearSetListItem } from "@/types/gear-sets";
import type { GearTypeListItem } from "@/types/gear-types";
import type { GearListItem } from "@/types/gears";
import { fetchJson } from "@/utils/api";

const useGearSets = () => {
  const [data, setData] = useState<GearSetListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGearSets = async () => {
    setLoading(true);

    try {
      const data = await fetchJson<GearSetListItem[]>(import.meta.env.BASE_URL + `data/gear-sets/index.json`);

      setData(data.sort((a, b) => a.name.localeCompare(b.name)));
    }
    catch (error) {
      console.error("Ошибка при получении списка комплектов снаряжения:", error);
    }
    finally {
      setLoading(false);
    }
  };

  return { data, fetchGearSets, loading };
};
const useGearTypes = () => {
  const [data, setData] = useState<GearTypeListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGearTypes = async () => {
    setLoading(true);

    try {
      const data = await fetchJson<GearTypeListItem[]>(import.meta.env.BASE_URL + `data/gear-types/index.json`);

      setData(data.sort((a, b) => a.name.localeCompare(b.name)));
    }
    catch (error) {
      console.error("Ошибка при получении списка типов снаряжения:", error);
    }
    finally {
      setLoading(false);
    }
  };

  return { data, fetchGearTypes, loading };
};
const useGears = () => {
  const [data, setData] = useState<GearListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGears = async () => {
    setLoading(true);

    try {
      const data = await fetchJson<GearListItem[]>(import.meta.env.BASE_URL + `data/gears/index.json`);

      setData(data.sort((a, b) => {
        if (a.level !== b.level) {
          return a.level - b.level;
        }

        return a.name.localeCompare(b.name);
      }));
    }
    catch (error) {
      console.error("Ошибка при получении списка снаряжения:", error);
    }
    finally {
      setLoading(false);
    }
  };

  return { data, fetchGears, loading };
};

const GearsLayout: FC<{ children?: ReactNode }> = ({ children }) => {
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
            <BreadcrumbPage>Снаряжение</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </div>
  );
};
const GearsPage: FC = () => {
  const { data: gearSets, fetchGearSets, loading: gearSetsLoading } = useGearSets();
  const { data: gearTypes, fetchGearTypes, loading: gearTypesLoading } = useGearTypes();
  const { data: gears, fetchGears, loading: gearsLoading } = useGears();

  const data = useMemo<GearData[]>(() => {
    return gears.map((gear) => {
      const set = gearSets.find(gearSet => gearSet.id === gear.setId)!;
      const type = gearTypes.find(gearType => gearType.id === gear.typeId)!;

      return { ...gear, set, type };
    });
  }, [gearSets, gearTypes, gears]);

  useEffect(() => {
    fetchGearSets();
    fetchGearTypes();
    fetchGears();
  }, []);

  if (gearSetsLoading || gearTypesLoading || gearsLoading) {
    return (
      <GearsLayout>
        <div>Loading...</div>
      </GearsLayout>
    );
  }

  return (
    <GearsLayout>
      <DataTable columns={columns} data={data} />
    </GearsLayout>
  );
};

export default GearsPage;
