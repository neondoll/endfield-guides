import type { FC } from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useWeapons } from "./hooks";
import WeaponsLayout from "./layout";

const WeaponsPage: FC = () => {
  const { data, weaponTypesLoading, weaponsLoading } = useWeapons();

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
