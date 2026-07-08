import { type FC, Fragment } from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useWeapons, useWeaponsFilter } from "./hooks";
import WeaponsLayout from "./layout";
import { WeaponTypeImage } from "@/components/image";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";
import { useComboboxAnchor } from "@/components/ui/combobox.hooks";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const WeaponsPage: FC = () => {
  const { data, weaponsLoading } = useWeapons();
  const {
    filter, filteredData, handleFilterChange, rarities, weaponTypes, weaponTypesLoading,
  } = useWeaponsFilter(data);
  const raritiesComboboxAnchor = useComboboxAnchor();

  if (weaponTypesLoading || weaponsLoading) {
    return (
      <WeaponsLayout>
        <div>Loading...</div>
      </WeaponsLayout>
    );
  }

  return (
    <WeaponsLayout>
      <Card size="sm">
        <CardHeader>
          <CardTitle>Фильтр</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="flex-row flex-wrap gap-x-5 gap-y-4 justify-evenly *:data-[slot=field]:gap-2">
            <Field className="w-auto">
              <FieldLabel>Тип</FieldLabel>
              <ToggleGroup
                onValueChange={value => handleFilterChange(prev => ({
                  ...prev,
                  weaponTypeIds: value as typeof filter.weaponTypeIds,
                }))}
                size="sm"
                type="multiple"
                value={filter.weaponTypeIds}
                variant="outline"
              >
                <ButtonGroup>
                  {weaponTypes.map(weaponType => (
                    <ToggleGroupItem aria-label={weaponType.name} key={weaponType.id} value={weaponType.id}>
                      <WeaponTypeImage alt={weaponType.name} className="shrink-0 size-6" src={weaponType.image} />
                    </ToggleGroupItem>
                  ))}
                </ButtonGroup>
              </ToggleGroup>
            </Field>
            <Field className="w-auto md:w-71.5">
              <FieldLabel>Редкость</FieldLabel>
              <Combobox
                items={rarities}
                multiple
                onValueChange={value => handleFilterChange(prev => ({
                  ...prev,
                  rarities: value as typeof filter.rarities,
                }))}
                value={filter.rarities}
              >
                <ComboboxChips
                  className={cn([
                    "px-4 py-1 min-h-9 border-input focus-within:border-ring focus-within:ring-3",
                    "focus-within:ring-ring/30 has-aria-invalid:border-destructive has-aria-invalid:ring-3",
                    "has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1",
                    "dark:has-aria-invalid:border-destructive/50",
                  ])}
                  ref={raritiesComboboxAnchor}
                >
                  <ComboboxValue>
                    {values => (
                      <Fragment>
                        {values.map((value: string) => <ComboboxChip children={value} key={value} />)}
                        <ComboboxChipsInput />
                      </Fragment>
                    )}
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={raritiesComboboxAnchor}>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {item => <ComboboxItem children={item} key={item} value={item} />}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
      <DataTable columns={columns} data={filteredData} />
    </WeaponsLayout>
  );
};

export default WeaponsPage;
