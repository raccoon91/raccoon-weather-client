import { FC } from "react";
import { Card, Box, Title3, BarChart } from "components/atoms";

interface IRainClimateCardProps {
  title: string;
  datasets: IChartData[];
  w?: string;
  h?: string;
  m?: string;
}

export const RainClimateCard: FC<IRainClimateCardProps> = ({ title, datasets, w, h, m }) => {
  return (
    <Card w={w} h={h} m={m} p="3rem 4rem">
      <Box h="1.6rem">
        <Title3 size="sm">{title}</Title3>
      </Box>

      <Box h="calc(100% - 2.6rem)" m="1rem 0 0">
        <BarChart datasets={datasets} />
      </Box>
    </Card>
  );
};
