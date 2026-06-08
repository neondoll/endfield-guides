import type { FC } from "react";

import { useOperators } from "./hooks";
import OperatorsLayout from "./layout";
import { OperatorImage } from "@/components/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OperatorsPage: FC = () => {
  const { operators, operatorsLoading } = useOperators();

  if (operatorsLoading) {
    return (
      <OperatorsLayout>
        <div>Loading...</div>
      </OperatorsLayout>
    );
  }

  return (
    <OperatorsLayout>
      <div className="grid grid-cols-[repeat(auto-fit,--spacing(47.5))] gap-4 justify-center md:gap-6">
        {operators.map(item => (
          <Card key={item.id} size="sm">
            <CardContent>
              <OperatorImage alt={item.name} className="mx-auto size-37.5" src={item.image} />
            </CardContent>
            <CardHeader>
              <CardTitle children={item.name} className="text-sm text-center whitespace-normal" />
            </CardHeader>
          </Card>
        ))}
      </div>
    </OperatorsLayout>
  );
};

export default OperatorsPage;
