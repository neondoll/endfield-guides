import { type FC, type ReactNode, useEffect, useState } from "react";
import { Link } from "react-router";

import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PATHS from "@/paths";
import type { OperatorListItem } from "@/types/operators";
import { fetchJson } from "@/utils/api";

const useOperators = () => {
  const [data, setData] = useState<OperatorListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOperators = async () => {
    setLoading(true);

    try {
      const data = await fetchJson<OperatorListItem[]>(import.meta.env.BASE_URL + `data/operators/index.json`);

      setData(data.sort((a, b) => {
        if (a.rarity !== b.rarity) {
          return b.rarity - a.rarity;
        }

        return a.name.localeCompare(b.name);
      }));
    }
    catch (error) {
      console.error("Ошибка при получении списка персонажей:", error);
    }
    finally {
      setLoading(false);
    }
  };

  return { data, fetchOperators, loading };
};

const OperatorsLayout: FC<{ children?: ReactNode }> = ({ children }) => {
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
            <BreadcrumbPage>Операторы</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </div>
  );
};
const OperatorsPage: FC = () => {
  const { data, fetchOperators, loading } = useOperators();

  useEffect(() => {
    fetchOperators();
  }, []);

  if (loading) {
    return (
      <OperatorsLayout>
        <div>Loading...</div>
      </OperatorsLayout>
    );
  }

  return (
    <OperatorsLayout>
      <div className="grid grid-cols-[repeat(auto-fit,--spacing(53))] gap-4 justify-center md:gap-6">
        {data.map(item => (
          <Card key={item.id} size="sm">
            <CardContent>
              <img alt={item.name} className="aspect-square size-43" src={item.image} />
            </CardContent>
            <CardHeader>
              <CardTitle className="text-base text-center">{item.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </OperatorsLayout>
  );
};

export default OperatorsPage;
