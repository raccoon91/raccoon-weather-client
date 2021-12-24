import { FC } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { Box, Flex, Title3, Text, WeatherIcon, WindIndicator, LineChart } from "components/atoms";

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

      <Flex po="relative" o="auto hidden" d="row" h="calc(100% - 2.6rem)" m="1rem 0 0" p="0 0 1rem" z="2">
        <Box po="absolute" t="3rem" w={`${12 * datasets.length}rem`} h="calc(100% - 14rem)" z="1">
          <LineChart
            datasets={datasets.map((data) => ({ x: dayjs(data.date).hour(), value: Number(data.temp) }))}
            canvasOptions={{
              canvasPadding: 60,
              yAxisWidth: 0,
              xAxisHeight: 0,
              chartPadding: 0,
            }}
          />
        </Box>

        {datasets.map((data) => (
          <Forecast key={data.date} f="0 0 12rem" d="column" a="center" w="12rem">
            <Box h="2rem" m="1rem 0 0">
              <Text>{dayjs(data.date).format("HH")}</Text>
            </Box>

            <Flex d="column" a="center" j="space-around" h="12rem" m="auto 0 0">
              <Flex a="center" j="center" w="3rem" h="3rem">
                <WeatherIcon type={data.sky} size={6} />
              </Flex>

              <Text size="xs">{data.feel} °C</Text>
              <Text size="xs">{data.rain} %</Text>
              <Text size="xs">{data.humid} %</Text>
              <Text size="xs">{data.wind} m/s</Text>
              <WindIndicator size={1.2} onlyIcon />
            </Flex>
          </Forecast>
        ))}
      </Flex>
    </Box>
  );
};
