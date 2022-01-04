import { FC } from "react";
import styled from "styled-components";
import { Box, Flex, Title3, Text, WeatherIcon, WindIndicator, LineChart } from "components/atoms";
import { formatDate } from "utils";

const ForecastIndex = styled(Flex)`
  border-right: 0.1rem solid darkgray;
`;

const Forecast = styled(Flex)`
  border-right: 0.1rem dashed black;

  &:last-child {
    border-right: none;
  }
`;

interface IForecastCardProps {
  title: string;
  datasets: ITodayForecast[];
  w?: string;
  h?: string;
  m?: string;
  p?: string;
}

export const ForecastCard: FC<IForecastCardProps> = ({ title, datasets, w, h, m, p = "3rem 4rem 2rem" }) => {
  return (
    <Box w={w} h={h} m={m} p={p} br="3rem" bgc="white">
      <Title3 size="sm">{title}</Title3>

      <Flex w="100%" h="calc(100% - 2.6rem)" m="1rem 0 0" p="0 0 1rem">
        <ForecastIndex d="column" a="center" w="20rem" h="100%">
          <Box h="2rem">
            <Text size="xs" weight="bold" m="1rem 0 0">
              시간
            </Text>
          </Box>

          <Flex f="1" a="center">
            <Text size="xs" weight="bold">
              온도
            </Text>
          </Flex>

          <Flex d="column" a="center" j="space-around" h="12rem" m="auto 0 0" p="0 0 0.6rem">
            <Box h="2rem">
              <Text size="xs" weight="bold">
                날씨
              </Text>
            </Box>
            <Text size="xs" weight="bold">
              체감
            </Text>
            <Text size="xs" weight="bold">
              강수
            </Text>
            <Text size="xs" weight="bold">
              습도
            </Text>
            <Text size="xs" weight="bold">
              바람
            </Text>
            <Text size="xs" weight="bold">
              방향
            </Text>
          </Flex>
        </ForecastIndex>

        <Flex po="relative" o="auto hidden" w="(100% - 20rem)" h="100%" z="2">
          <Box po="absolute" t="5rem" w={`${12 * datasets.length}rem`} h="calc(100% - 20rem)" z="1">
            <LineChart datasets={datasets.map((data) => data.temp)} />
          </Box>

          {datasets.map((data) => (
            <Forecast key={data.date} f="0 0 12rem" d="column" a="center" w="12rem">
              <Box h="2rem" m="1rem 0 0">
                <Text>{formatDate(data.date, "HH")}</Text>
              </Box>

              <Flex d="column" a="center" j="space-around" h="12rem" m="auto 0 0">
                <WeatherIcon sky={data.sky} rainType={data.rainType} date={data.date} size={3} />
                <Text size="xs">{data.feel} °C</Text>
                <Text size="xs">{data.rain} %</Text>
                <Text size="xs">{data.humid} %</Text>
                <Text size="xs">{data.wind} m/s</Text>
                <WindIndicator windDirection={data.windDirection} size={1.4} onlyIcon />
              </Flex>
            </Forecast>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
