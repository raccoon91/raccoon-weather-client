import { FC } from "react";
import { Box, ProgressChart, WindIndicator } from "components/atoms";
import { WeatherCard, ForecastCard } from "components/molecules";
import { tempChartOptions, percentChartOptions, pm10ChartOptions, pm25ChartOptions } from "configs";

type IMobileTodayDashboardProps = ITodayWeather;

export const MobileTodayDashboard: FC<IMobileTodayDashboardProps> = ({
  feel,
  humid,
  rain,
  pm10,
  pm25,
  wind,
  todayForcast,
}) => {
  return (
    <Box o="hidden auto" d="block" w="100%" h="100%" p="0 3rem" m="0 0 1rem">
      <Box fd="row" j="space-between">
        <WeatherCard
          title="체감온도"
          w="48%"
          h="17rem"
          p="3rem"
          unit="°C"
          value={feel}
          chart={<ProgressChart chartData={Number(humid)} chartOptions={tempChartOptions} />}
        />
        <WeatherCard
          title="습도"
          w="48%"
          h="17rem"
          p="3rem"
          unit="%"
          value={humid}
          chart={<ProgressChart chartData={Number(humid)} chartOptions={percentChartOptions} />}
        />
      </Box>

      <Box fd="row" j="space-between" m="3rem 0 0">
        <WeatherCard
          title="미세먼지(PM10)"
          w="48%"
          h="17rem"
          p="3rem"
          unit="㎍/㎥"
          value={pm10}
          chart={<ProgressChart chartData={Number(pm10)} chartOptions={pm10ChartOptions} />}
        />
        <WeatherCard
          title="미세먼지(PM25)"
          w="48%"
          h="17rem"
          p="3rem"
          unit="㎍/㎥"
          value={pm25}
          chart={<ProgressChart chartData={Number(pm25)} chartOptions={pm25ChartOptions} />}
        />
      </Box>

      <Box fd="row" j="space-between" m="2rem 0 0">
        <WeatherCard
          title="강수확률"
          w="48%"
          h="17rem"
          p="3rem"
          unit="%"
          value={rain}
          chart={<ProgressChart chartData={Number(rain)} chartOptions={percentChartOptions} />}
        />
        <WeatherCard title="바람" value={wind} unit="m/s" chart={<WindIndicator />} w="48%" h="17rem" p="3rem" />
      </Box>

      <ForecastCard title="오늘의 날씨" datasets={todayForcast} w="100%" h="32rem" m="3rem 0 0" />
    </Box>
  );
};
