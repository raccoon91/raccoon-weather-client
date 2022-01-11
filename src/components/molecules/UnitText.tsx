import { FC } from "react";
import { Flex, Title4, Text } from "components/atoms";

interface IUnitTextProps {
  value?: string | number;
  unit: string;
  w?: string;
  h?: string;
  m?: string;
  vSize?: TTitleSize;
  uSize?: TTextSize;
  color?: TColor;
}

export const UnitText: FC<IUnitTextProps> = ({
  value,
  unit,
  w = "100%",
  h,
  m,
  vSize = "2xl",
  uSize = "xl",
  color = "black",
}) => {
  return (
    <Flex a="flex-end" j="center" w={w} h={h} m={m}>
      <Title4 color={color} size={vSize}>
        {value}
      </Title4>
      <Text color={color} size={uSize} m="0 0 0.5rem 1rem">
        {unit}
      </Text>
    </Flex>
  );
};
