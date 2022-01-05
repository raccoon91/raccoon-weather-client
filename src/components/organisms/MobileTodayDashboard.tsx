import { FC } from "react";
import { Box, Flex, ProgressChart, WindIndicator } from "components/atoms";
import { WeatherCard, ForecastCard } from "components/molecules";
import { tempChartOptions, percentChartOptions, pm10ChartOptions, pm25ChartOptions } from "configs";

interface IMobileTodayDashboardProps {
  weather: IWeather | null;
  forecasts: IForecast[] | null;
}

export const MobileTodayDashboard: FC<IMobileTodayDashboardProps> = ({ weather, forecasts }) => {
  return (
    <Box o="hidden auto" w="100%" h="100%" p="1rem 3rem 2rem">
      <Flex j="space-between">
        <WeatherCard
          isLoad={weather ? true : false}
          title="체감온도"
          w="calc(50% - 1rem)"
          h="17rem"
          p="3rem"
          unit="°C"
          value={weather?.feel}
          chart={<ProgressChart chartData={weather?.feel} chartOptions={tempChartOptions} />}
        />
        <WeatherCard
          isLoad={weather ? true : false}
          title="습도"
          w="calc(50% - 1rem)"
          h="17rem"
          p="3rem"
          unit="%"
          value={weather?.humid}
          chart={<ProgressChart chartData={weather?.humid} chartOptions={percentChartOptions} />}
        />
      </Flex>

      <Flex j="space-between" m="2rem 0 0">
        <WeatherCard
          isLoad={weather ? true : false}
          title="미세먼지(PM10)"
          w="calc(50% - 1rem)"
          h="17rem"
          p="3rem"
          unit="㎍/㎥"
          value={weather?.pm10}
          chart={<ProgressChart chartData={weather?.pm10} chartOptions={pm10ChartOptions} />}
        />
        <WeatherCard
          isLoad={weather ? true : false}
          title="미세먼지(PM25)"
          w="calc(50% - 1rem)"
          h="17rem"
          p="3rem"
          unit="㎍/㎥"
          value={weather?.pm25}
          chart={<ProgressChart chartData={weather?.pm25} chartOptions={pm25ChartOptions} />}
        />
      </Flex>

      <Flex j="space-between" m="2rem 0 0">
        <WeatherCard
          isLoad={weather ? true : false}
          title="강수확률"
          w="calc(50% - 1rem)"
          h="17rem"
          p="3rem"
          unit="%"
          value={weather?.rain}
          chart={<ProgressChart chartData={weather?.rain} chartOptions={percentChartOptions} />}
        />
        <WeatherCard
          isLoad={weather ? true : false}
          title="바람"
          w="calc(50% - 1rem)"
          h="17rem"
          p="3rem"
          unit="m/s"
          value={weather?.wind}
          chart={<WindIndicator windDirection={weather?.windDirection} />}
        />
      </Flex>

      <ForecastCard isLaod={forecasts ? true : false} title="오늘의 날씨" datasets={forecasts} h="38rem" m="2rem 0 0" />
    </Box>
  );
};
