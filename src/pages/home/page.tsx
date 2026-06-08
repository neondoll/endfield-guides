import type { ComponentProps, FC } from "react";
import { Link } from "react-router";

import { PuzzleIcon, SwordsIcon, UsersRoundIcon } from "@/components/ui/icon";
import type { IconProps } from "@/components/ui/icon.types";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import PATHS from "@/paths";

interface Section {
  icon: IconProps;
  title: string;
  description?: string;
  to: ComponentProps<typeof Link>["to"];
}

const SECTIONS: Array<Section> = [
  { icon: UsersRoundIcon, title: "Операторы", description: "Список всех персонажей", to: PATHS.Operators },
  { icon: SwordsIcon, title: "Оружие", description: "Список всего оружия", to: PATHS.Weapons },
  {
    icon: PuzzleIcon,
    title: "Снаряжение",
    description: "Список всего снаряжения и эффектов комплектов",
    to: PATHS.Gears,
  },
];

const HomePage: FC = () => {
  return (
    <ItemGroup>
      {SECTIONS.map(section => (
        <Item asChild className="bg-background [a]:hover:bg-background/50" key={section.title}>
          <Link to={section.to}>
            <ItemMedia variant="icon">
              <section.icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle children={section.title} />
              {section.description && <ItemDescription children={section.description} />}
            </ItemContent>
          </Link>
        </Item>
      ))}
    </ItemGroup>
  );
};

export default HomePage;
