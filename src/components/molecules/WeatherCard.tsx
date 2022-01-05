import React, { FC } from "react";
import { Box, Flex, Title3, Text, Skeleton } from "components/atoms";

interface IWeatherCardProps {
  isLoad: boolean;
  title: string;
  value?: number;
  unit: string;
  chart: React.ReactNode;
  w?: string;
  h?: string;
  m?: string;
  p?: string;
}

export const WeatherCard: FC<IWeatherCardProps> = ({ isLoad, title, value, unit, chart, w, h, m, p = "3rem" }) => {
  return (
    <Box w={w} h={h} m={m} p={p} br="3rem" bgc="white">
      {isLoad ? <Title3 size="sm">{title}</Title3> : <Skeleton w="10rem" h="1.6rem" />}

      <Flex d="column" h="calc(100% - 2.6rem)" m="1rem 0 0">
        <Flex a="flex-end" j="center" h="4rem">
          {isLoad ? (
            <>
              <Text size="4xl" weight="bold">
                {value}
              </Text>
              <Text size="xl" weight="bold" m="0 0 0.2rem 0.5rem">
                {unit}
              </Text>
            </>
          ) : (
            <Skeleton w="8rem" h="4rem" />
          )}
        </Flex>

        {isLoad ? <Box m="auto 0 0">{chart}</Box> : <Skeleton w="100%" h="2rem" m="auto 0 0" />}
      </Flex>
    </Box>
  );
};
