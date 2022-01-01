import { FC } from "react";
import { Box, Flex, ProgressChart, WindIndicator } from "components/atoms";
import { WeatherCard, ForecastCard } from "components/molecules";
import { tempChartOptions, percentChartOptions, pm10ChartOptions, pm25ChartOptions } from "configs";

type ITodayDashboardProps = ITodayWeather;

export const TodayDashboard: FC<ITodayDashboardProps> = ({ feel, humid, rain, pm10, pm25, wind, todayForcast }) => {
  return (
    <Box o="hidden auto" w="100%" h="100%" p="2rem 10rem 4rem">
      <Flex j="space-between">
        <WeatherCard
          title="체감온도"
          w="calc((100% - 4rem) / 3)"
          h="17rem"
          unit="°C"
          value={feel}
          chart={<ProgressChart chartData={feel} chartOptions={tempChartOptions} />}
        />
        <WeatherCard
          title="습도"
          w="calc((100% - 4rem) / 3)"
          h="17rem"
          unit="%"
          value={humid}
          chart={<ProgressChart chartData={humid} chartOptions={percentChartOptions} />}
        />
        <WeatherCard
          title="강수확률"
          w="calc((100% - 4rem) / 3)"
          h="17rem"
          unit="%"
          value={rain}
          chart={<ProgressChart chartData={rain} chartOptions={percentChartOptions} />}
        />
      </Flex>

      <Flex j="space-between" m="2rem 0 0">
        <WeatherCard
          title="미세먼지(PM10)"
          w="calc((100% - 4rem) / 3)"
          h="17rem"
          unit="㎍/㎥"
          value={pm10}
          chart={<ProgressChart chartData={pm10} chartOptions={pm10ChartOptions} />}
        />
        <WeatherCard
          title="미세먼지(PM25)"
          w="calc((100% - 4rem) / 3)"
          h="17rem"
          unit="㎍/㎥"
          value={pm25}
          chart={<ProgressChart chartData={pm25} chartOptions={pm25ChartOptions} />}
        />
        <WeatherCard
          title="바람"
          value={wind}
          unit="m/s"
          chart={<WindIndicator />}
          w="calc((100% - 4rem) / 3)"
          h="17rem"
        />
      </Flex>

      <ForecastCard title="오늘의 날씨" datasets={todayForcast} h="40rem" m="2rem 0 0" />
    </Box>
  );
};
