import { FC } from "react";
import { Card, Box, Title3, BarChart } from "components/atoms";

interface IRainClimateCardProps {
  title: string;
  datasets: IChartData[];
}

export const RainClimateCard: FC<IRainClimateCardProps> = ({ title, datasets }) => {
  return (
    <Card w="49%" h="34rem" p="3rem 4rem">
      <Box h="1.6rem">
        <Title3 size="sm">{title}</Title3>
      </Box>

      <Box f="1" m="1rem 0 0">
        <BarChart datasets={datasets} />
      </Box>
    </Card>
  );
};