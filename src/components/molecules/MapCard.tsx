import { FC } from "react";
import { Card, Box, Title3, MapChart } from "components/atoms";

interface IMapCardProps {
  title: string;
}

export const MapCard: FC<IMapCardProps> = ({ title }) => {
  return (
    <Card w="100%" h="100%" p="3rem 4rem">
      <Box h="1.6rem">
        <Title3 size="sm">{title}</Title3>
      </Box>

      <Box f="1" m="1rem 0 0">
        <MapChart />
      </Box>
    </Card>
  );
};
