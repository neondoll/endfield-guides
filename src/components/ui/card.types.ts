import type { ComponentProps } from "react";

export interface CardProps extends ComponentProps<"div"> {
  size?: "default" | "sm";
}
export type CardActionProps = ComponentProps<"div">;
export type CardContentProps = ComponentProps<"div">;
export type CardDescriptionProps = ComponentProps<"div">;
export type CardFooterProps = ComponentProps<"div">;
export type CardHeaderProps = ComponentProps<"div">;
export type CardTitleProps = ComponentProps<"div">;
