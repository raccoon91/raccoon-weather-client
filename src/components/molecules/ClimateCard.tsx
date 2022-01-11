import { FC } from "react";
import { Box, Title3, Skeleton } from "components/atoms";

interface IClimateCardProps {
  isLoad: boolean;
  title: string;
  chart: React.ReactNode;
  w?: string;
  h?: string;
  m?: string;
  p?: string;
}

export const ClimateCard: FC<IClimateCardProps> = ({ isLoad, title, chart, w, h, m, p = "3rem" }) => {
  return (
    <Box w={w} h={h} m={m} p={p} br="3rem" bgc="white">
      {isLoad ? <Title3 size="sm">{title}</Title3> : <Skeleton w="10rem" h="1.6rem" />}

      <Box h="calc(100% - 2.6rem)" m="1rem 0 0">
        {isLoad ? chart : <Skeleton h="100%" />}
      </Box>
    </Box>
  );
};
