import { FC } from "react";
import { Card, Box, Title3, GradientLineChart } from "components/atoms";
import { globalSurfaceAirTemp } from "configs";

interface IGlobalSurfaceAirTempCardProps {
  title: string;
  w?: string;
  h?: string;
  m?: string;
}

export const GlobalSurfaceAirTempCard: FC<IGlobalSurfaceAirTempCardProps> = ({ title, w, h, m }) => {
  return (
    <Card w={w} h={h} m={m} p="3rem 4rem">
      <Box h="1.6rem">
        <Title3 size="sm">{title}</Title3>
      </Box>

      <Box f="1" m="1rem 0 0">
        <GradientLineChart datasets={globalSurfaceAirTemp} />
      </Box>
    </Card>
  );
};