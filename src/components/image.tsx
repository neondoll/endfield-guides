import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/utils";

type ImageProps = ComponentProps<"img">;

const Image: FC<ImageProps> = ({ alt, className, ...props }) => {
  return (
    <img
      alt={alt}
      className={cn("aspect-square max-w-(--max-size) max-h-(--max-size)", className)}
      {...props}
    />
  );
};

export const AttributeImage: FC<ImageProps> = ({ className, ...props }) => {
  return <Image className={cn("[--max-size:50px]", className)} {...props} />;
};
export const ElementImage: FC<ImageProps> = ({ className, ...props }) => {
  return <Image className={cn("[--max-size:437px]", className)} {...props} />;
};
export const GearImage: FC<ImageProps> = ({ className, ...props }) => {
  return <Image className={cn("[--max-size:437px]", className)} {...props} />;
};
export const OperatorImage: FC<ImageProps> = ({ className, ...props }) => {
  return <Image className={cn("[--max-size:437px]", className)} {...props} />;
};
export const OperatorRoleImage: FC<ImageProps> = ({ className, ...props }) => {
  return <Image className={cn("[--max-size:437px]", className)} {...props} />;
};
export const RarityImage: FC<Omit<ImageProps, "alt" | "src">> = ({ className, ...props }) => {
  return (
    <Image
      alt="Звезда"
      className={cn("aspect-61/67 max-w-15.25 max-h-16.75", className)}
      src="images/rarity.png"
      {...props}
    />
  );
};
export const WeaponImage: FC<ImageProps> = ({ className, ...props }) => {
  return <Image className={cn("[--max-size:437px]", className)} {...props} />;
};
export const WeaponTypeImage: FC<ImageProps> = ({ className, ...props }) => {
  return <Image className={cn("[--max-size:437px]", className)} {...props} />;
};
