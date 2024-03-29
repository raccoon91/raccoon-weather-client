import { FC, memo } from "react";
import styled from "styled-components";
import { Box, Flex, Text, WeatherIcon, WindIndicator, LineChart } from "components/atoms";
import { formatDate } from "utils";

const ForecastIndex = styled(Flex)`
  border-right: ${({ theme }) => `0.1rem solid ${theme.color.gray}`};
`;

const ForecastBox = styled(Flex)`
  border-right: ${({ theme }) => `0.1rem dashed ${theme.color.darkGray}`};

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.background};
  }
`;

interface IForecastChartProps {
  datasets?: IForecast[] | null;
}

const ForecastChartComponent: FC<IForecastChartProps> = ({ datasets }) => {
  return (
    <Flex w="100%" h="100%" p="0 0 1rem">
      <ForecastIndex d="column" a="center" w="6rem" h="100%">
        <Box h="2rem">
          <Text size="xs" m="1rem 0 0">
            시간
          </Text>
        </Box>

        <Flex f="1" a="center">
          <Text size="xs">온도</Text>
        </Flex>

        <Flex d="column" a="center" j="space-around" h="14rem" m="auto 0 0" p="0 0 0.6rem">
          <Box h="2rem">
            <Text size="xs">날씨</Text>
          </Box>
          <Text size="xs">체감</Text>
          <Text size="xs">강수</Text>
          <Text size="xs">습도</Text>
          <Text size="xs">바람</Text>
          <Text size="xs">방향</Text>
        </Flex>
      </ForecastIndex>

      <Flex po="relative" o="auto hidden" f="1" h="100%" z="2">
        <Box
          po="absolute"
          t="4rem"
          w={datasets?.length ? `${datasets.length * 10}rem` : "100%"}
          h="calc(100% - 20rem)"
          z="1"
        >
          <LineChart
            labels={datasets?.map((data) => formatDate(data.date, "HH"))}
            datasets={datasets?.map((data) => data.temp)}
          />
        </Box>

        {datasets?.map((data) => (
          <ForecastBox key={data.date} f="0 0 10rem" d="column" a="center" w="10rem">
            <Box h="2rem" m="1rem 0 0">
              <Text>{formatDate(data.date, "HH")}</Text>
            </Box>

            <Flex d="column" a="center" j="space-around" h="14rem" m="auto 0 0">
              <WeatherIcon sky={data.sky} rainType={data.rainType} date={data.date} size={3} />
              <Text size="xs">{data.feel} °C</Text>
              <Text size="xs">{data.rain} %</Text>
              <Text size="xs">{data.humid} %</Text>
              <Text size="xs">{data.wind} m/s</Text>
              <WindIndicator windDirection={data.windDirection} size={1.4} onlyIcon />
            </Flex>
          </ForecastBox>
        ))}
      </Flex>
    </Flex>
  );
};

export const ForecastChart = memo(ForecastChartComponent);
