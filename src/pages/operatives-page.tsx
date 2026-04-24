import { type FC, useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OperativeListItem } from "@/types/operatives";
import { fetchJson } from "@/utils/api";

const useOperatives = () => {
  const [data, setData] = useState<OperativeListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOperatives = async () => {
    setLoading(true);

    try {
      const data = await fetchJson<OperativeListItem[]>(import.meta.env.BASE_URL + `data/operatives/index.json`);

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

  return { data, fetchOperatives, loading };
};

const OperativesPage: FC = () => {
  const { data, fetchOperatives, loading } = useOperatives();

  useEffect(() => {
    fetchOperatives();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};
export default OperativesPage;
