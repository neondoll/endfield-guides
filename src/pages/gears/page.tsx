import type { FC } from "react";

// import { columns } from "./columns";
// import { DataTable } from "./data-table";
import { useGears } from "./hooks";
import GearsLayout from "./layout";
import { GearImage } from "@/components/image";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

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
      <div className="grid grid-cols-[repeat(5,auto)]">
        {data.map(set => (
          <Collapsible className="grid grid-cols-subgrid col-span-full" defaultOpen={true} key={set.id}>
            <CollapsibleTrigger asChild className="col-span-full">
              <Button
                className={cn([
                  "flex justify-between w-full text-left normal-case group/collapsible-trigger",
                  "**:data-[slot=collapsible-trigger-icon]:ml-auto",
                ])}
              >
                <span children={`Набор снаряжения «${set.name}»`} />
                <ChevronDownIcon
                  className="inline shrink-0 pointer-events-none group-aria-expanded/collapsible-trigger:hidden"
                  data-slot="collapsible-trigger-icon"
                />
                <ChevronUpIcon
                  className="hidden shrink-0 pointer-events-none group-aria-expanded/collapsible-trigger:inline"
                  data-slot="collapsible-trigger-icon"
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="grid grid-cols-subgrid col-span-full p-px">
              <div
                className={cn([
                  "grid grid-cols-subgrid col-span-full text-card-foreground bg-card shadow-sm ring-1 ring-foreground/5",
                ])}
              >
                {(set.bonusStat || set.effect) && (
                  <div className="col-span-full p-3 text-sm border-b">
                    <p>
                      <span className="font-bold">Эффект комплекта (3 шт.)</span>
                      {`: ${set.bonusStat}.`}
                    </p>
                    <p children={set.effect} />
                  </div>
                )}
                <div className="grid grid-cols-subgrid col-span-full text-sm" data-slot="table">
                  <div className="grid grid-cols-subgrid col-span-full [&_tr]:border-b" data-slot="table-header">
                    <div className="grid grid-cols-subgrid col-span-full border-b" data-slot="table-row">
                      <div
                        className={cn([
                          "inline-flex justify-center items-center px-3 h-12 text-xs font-medium tracking-wider",
                          "text-center text-muted-foreground uppercase whitespace-nowrap",
                        ])}
                        data-slot="table-head"
                      >
                        Снаряжение
                      </div>
                      <div
                        className={cn([
                          "inline-flex justify-center items-center px-3 h-12 text-xs font-medium tracking-wider",
                          "text-center text-muted-foreground uppercase whitespace-nowrap",
                        ])}
                        data-slot="table-head"
                      >
                        Тип
                      </div>
                      <div
                        className={cn([
                          "inline-flex justify-center items-center px-3 h-12 text-xs font-medium tracking-wider",
                          "text-center text-muted-foreground uppercase whitespace-nowrap",
                        ])}
                        data-slot="table-head"
                      >
                        LV
                      </div>
                      <div
                        className={cn([
                          "inline-flex justify-center items-center px-3 h-12 text-xs font-medium tracking-wider",
                          "text-center text-muted-foreground uppercase whitespace-nowrap",
                        ])}
                        data-slot="table-head"
                      >
                        Качество
                      </div>
                      <div
                        className={cn([
                          "inline-flex justify-center items-center px-3 h-12 text-xs font-medium tracking-wider",
                          "text-center text-muted-foreground uppercase whitespace-nowrap",
                        ])}
                        data-slot="table-head"
                      >
                        Характеристики
                      </div>
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-subgrid col-span-full [&_tr:last-child]:border-0"
                    data-slot="table-body"
                  >
                    {set.gears.map(gear => (
                      <div
                        className="grid grid-cols-subgrid col-span-full border-b"
                        data-slot="table-row"
                        key={gear.id}
                      >
                        <div
                          className="inline-flex flex-col gap-y-1 justify-center items-center p-3 text-center whitespace-normal"
                          data-slot="table-cell"
                        >
                          <GearImage alt={gear.name} className="size-12.5" src={gear.image} />
                          <p children={gear.name} />
                        </div>
                        <div
                          children={gear.type.name}
                          className="inline-flex flex-col justify-center items-center p-3 text-center whitespace-normal"
                          data-slot="table-cell"
                        />
                        <div
                          children={gear.level}
                          className="inline-flex flex-col justify-center items-center p-3 text-center whitespace-normal"
                          data-slot="table-cell"
                        />
                        <div
                          className="inline-flex flex-col gap-y-1 justify-center items-center p-3 text-center whitespace-normal"
                          data-slot="table-cell"
                        >
                          <div
                            className={cn([
                              "shrink-0 size-7.5 rounded-sm",
                              gear.rarity === "white" && "bg-gray-500",
                              gear.rarity === "green" && "bg-green-500",
                              gear.rarity === "blue" && "bg-blue-500",
                              gear.rarity === "purple" && "bg-purple-500",
                              gear.rarity === "gold" && "bg-yellow-500",
                            ])}
                          />
                          <p children={gear.rarity} className="sr-only" />
                        </div>
                        <div
                          className="inline-flex flex-col gap-y-1 justify-center p-3 whitespace-pre-line"
                          data-slot="table-cell"
                        >
                          <div>
                            <span className="font-bold">Защита</span>
                            <span children={`: +${gear.defense}`} />
                          </div>
                          <hr className="border-dashed" />
                          {gear.subStats.map(subStat => (
                            <div key={subStat.text}>
                              <span children={subStat.text} className="font-bold" />
                              <span children={`: +${subStat.value}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      {/* <DataTable columns={columns} data={data} /> */}
    </GearsLayout>
  );
};

export default GearsPage;
