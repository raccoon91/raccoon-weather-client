import React, { FC } from "react";
import { Card, Box, Title3, Text } from "components/atoms";

interface IWeatherCardProps {
  title: string;
  value: string;
  unit: string;
  chart: React.ReactNode;
}

export const WeatherCard: FC<IWeatherCardProps> = ({ title, value, unit, chart }) => {
  return (
    <Card w="32%" h="17rem" p="3rem 4rem">
      <Box h="1.6rem">
        <Title3 size="sm">{title}</Title3>
      </Box>

      <Box f="1" a="center" m="0.8rem 0 0">
        <Box fd="row" a="flex-end" h="3.8rem">
          <Text size="4xl" weight="bold">
            {value}
          </Text>
          <Text size="2xl" weight="bold" m="0 0 0.2rem 0.5rem">
            {unit}
          </Text>
        </Box>

        <Box w="100%" m="auto 0 0">
          {chart}
        </Box>
      </Box>
    </Card>
  );
};
