import { FC } from "react";
import { Card, Box, Title3, GradientLineChart } from "components/atoms";
import { globalSurfaceAirTemp } from "configs";

interface IGlobalSurfaceAirTempCardProps {
  title: string;
}

export const GlobalSurfaceAirTempCard: FC<IGlobalSurfaceAirTempCardProps> = ({ title }) => {
  return (
    <Card w="100%" h="32rem" p="3rem 4rem">
      <Box h="1.6rem">
        <Title3 size="sm">{title}</Title3>
      </Box>

      <Box f="1" m="1rem 0 0">
        <GradientLineChart datasets={globalSurfaceAirTemp} />
      </Box>
    </Card>
  );
};
