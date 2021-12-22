import { FC } from "react";
import { Card, Box, Title3, ScatterPlot } from "components/atoms";

interface ITempClimateCardProps {
  title: string;
  datasets: IChartData[];
  w?: string;
  h?: string;
  m?: string;
  p?: string;
}

export const TempClimateCard: FC<ITempClimateCardProps> = ({ title, datasets, w, h, m, p = "3rem 4rem" }) => {
  return (
    <Card w={w} h={h} m={m} p={p}>
      <Box h="1.6rem">
        <Title3 size="sm">{title}</Title3>
      </Box>

      <Box h="calc(100% - 2.6rem)" m="1rem 0 0">
        <ScatterPlot datasets={datasets} />
      </Box>
    </Card>
  );
};
