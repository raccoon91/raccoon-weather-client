import { FC } from "react";
import { Box, Title3 } from "components/atoms";

interface IClimateCardProps {
  title: string;
  chart: React.ReactNode;
  w?: string;
  h?: string;
  m?: string;
  p?: string;
}

export const ClimateCard: FC<IClimateCardProps> = ({ title, chart, w, h, m, p = "3rem" }) => {
  return (
    <Box w={w} h={h} m={m} p={p} br="3rem" bgc="white">
      <Title3 size="sm">{title}</Title3>

      <Box h="calc(100% - 2.6rem)" m="1rem 0 0">
        {chart}
      </Box>
    </Box>
  );
};
