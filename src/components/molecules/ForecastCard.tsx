import { FC } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { Card, Box, Title3, Text, WeatherIcon, WindIndicator, LineChart } from "components/atoms";

const Forecast = styled(Box)`
  border-right: 1px dashed black;

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

export const ForecastCard: FC<IForecastCardProps> = ({ title, datasets, w, h, m, p = "3rem 4rem 1rem" }) => {
  return (
    <Card w={w} h={h} m={m} p={p}>
      <Box h="1.6rem">
        <Title3 size="sm">{title}</Title3>
      </Box>

      <Box po="relative" o="auto" fd="row" w="100%" h="calc(100% - 3rem)" m="1.2rem 0 0" p="0 0 2rem" z="2">
        {datasets.map((data) => (
          <Forecast key={data.date} a="center" w="12rem" f="0 0 auto">
            <Box j="center" h="2rem" m="1rem 0 0">
              <Text>{dayjs(data.date).format("HH")}</Text>
            </Box>

            <Box a="center" w="100%" h="12rem" j="space-between" m="auto 0 0">
              <Box o="hidden" a="center" j="center" w="3rem" h="3rem">
                <WeatherIcon type={data.sky} size={6} />
              </Box>
              <Text size="xs">{data.feel} °C</Text>
              <Text size="xs">{data.rain} %</Text>
              <Text size="xs">{data.humid} %</Text>
              <Text size="xs">{data.wind} m/s</Text>
              <Box a="center" j="center" h="2rem">
                <WindIndicator size={1.2} onlyIcon />
              </Box>
            </Box>
          </Forecast>
        ))}

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
      </Box>
    </Card>
  );
};
