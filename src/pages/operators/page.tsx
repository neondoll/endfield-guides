import type { FC } from "react";
import { Link } from "react-router";

import { useOperators } from "./hooks";
import OperatorsLayout from "./layout";
import { OperatorImage } from "@/components/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PATHS from "@/paths";

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
        {operators.map(operator => (
          <Card
            className={cn([
              "relative z-0 transition-colors duration-100 pointer-events-none has-[a:focus-visible]:ring-[3px]",
              "has-[a:focus-visible]:ring-ring/50 has-[a:hover]:bg-card/50",
            ])}
            key={operator.id}
            size="sm"
          >
            <CardContent>
              <OperatorImage alt={operator.name} className="mx-auto size-37.5" src={operator.image} />
            </CardContent>
            <CardHeader>
              <CardTitle className="text-sm text-center whitespace-normal">
                <Link
                  children={operator.name}
                  className="outline-none pointer-events-auto before:absolute before:inset-0 before:-z-1"
                  to={PATHS.Operator(operator.id)}
                />
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </OperatorsLayout>
  );
};

export default OperatorsPage;
