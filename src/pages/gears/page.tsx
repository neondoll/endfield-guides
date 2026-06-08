import type { FC } from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGears } from "./hooks";
import GearsLayout from "./layout";

const GearsPage: FC = () => {
  const { data, gearSetsLoading, gearTypesLoading, gearsLoading } = useGears();

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
