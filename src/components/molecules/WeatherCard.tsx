import React, { FC } from "react";
import { Box, Flex, Title3, Text } from "components/atoms";

interface IWeatherCardProps {
  title: string;
  value: string;
  unit: string;
  chart: React.ReactNode;
  w?: string;
  h?: string;
  m?: string;
  p?: string;
}

export const WeatherCard: FC<IWeatherCardProps> = ({ title, value, unit, chart, w, h, m, p = "3rem" }) => {
  return (
    <Box w={w} h={h} m={m} p={p} br="3rem" bgc="white">
      <Title3 size="sm">{title}</Title3>

      <Flex d="column" h="calc(100% - 2.6rem)" m="1rem 0 0">
        <Flex a="flex-end" j="center" h="4rem">
          <Text size="4xl" weight="bold">
            {value}
          </Text>
          <Text size="xl" weight="bold" m="0 0 0.2rem 0.5rem">
            {unit}
          </Text>
        </Flex>

        <Box m="auto 0 0">{chart}</Box>
      </Flex>
    </Box>
  );
};
