import type { FC } from "react";

// import { columns } from "./columns";
// import { DataTable } from "./data-table";
import { useGears } from "./hooks";
import GearsLayout from "./layout";
import { GearImage } from "@/components/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
      <Accordion type="multiple">
        {data.map(set => (
          <AccordionItem key={set.id} value={set.id}>
            <AccordionTrigger children={`Набор снаряжения «${set.name}»`} />
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Снаряжение</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>LV</TableHead>
                    <TableHead>Качество</TableHead>
                    <TableHead>Характеристики</TableHead>
                    <TableHead>Эффект комплекта</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {set.gears.map((gear, index) => (
                    <TableRow key={gear.id}>
                      <TableCell className="space-y-1 text-center whitespace-normal">
                        <GearImage alt={gear.name} className="mx-auto size-12.5" src={gear.image} />
                        <p children={gear.name} />
                      </TableCell>
                      <TableCell children={gear.type.name} className="text-center whitespace-normal" />
                      <TableCell children={gear.level} className="text-center whitespace-normal" />
                      <TableCell className="space-y-1 text-center whitespace-normal">
                        <div
                          className={cn([
                            "mx-auto size-7.5 rounded-sm",
                            gear.rarity === "white" && "bg-gray-500",
                            gear.rarity === "green" && "bg-green-500",
                            gear.rarity === "blue" && "bg-blue-500",
                            gear.rarity === "purple" && "bg-purple-500",
                            gear.rarity === "gold" && "bg-yellow-500",
                          ])}
                        />
                        <p children={gear.rarity} className="sr-only" />
                      </TableCell>
                      <TableCell className="space-y-1 whitespace-pre-line">
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
                      </TableCell>
                      {index === 0 && (
                        <TableCell className="space-y-1 whitespace-pre-line" rowSpan={set.gears.length}>
                          {(set.bonusStat || set.effect)
                            ? (
                                <>
                                  <p>
                                    <span className="font-bold">Бонусная характеристика</span>
                                    {`: ${set.bonusStat}`}
                                  </p>
                                  <p>
                                    <span className="font-bold">Эффект комплекта</span>
                                    {`: ${set.effect}`}
                                  </p>
                                </>
                              )
                            : (
                                <p className="text-destructive">No 3-pc Set Effect</p>
                              )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {/* <DataTable columns={columns} data={data} /> */}
    </GearsLayout>
  );
};

export default GearsPage;
