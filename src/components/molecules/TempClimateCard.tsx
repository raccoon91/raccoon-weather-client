import { FC } from "react";
import { Card, Box, Title3, ScatterPlot } from "components/atoms";

interface ITempClimateCardProps {
  title: string;
  datasets: IChartData[];
}

export const TempClimateCard: FC<ITempClimateCardProps> = ({ title, datasets }) => {
  return (
    <Card w="49%" h="34rem" p="3rem 4rem">
      <Box h="1.6rem">
        <Title3 size="sm">{title}</Title3>
      </Box>

      <Box f="1" m="1rem 0 0">
        <ScatterPlot datasets={datasets} />
      </Box>
    </Card>
  );
};
