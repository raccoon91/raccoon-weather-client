import { FC } from "react";
import { Box, ProgressChart, WindIndicator } from "components/atoms";
import { WeatherCard, ForecastCard } from "components/molecules";
import { tempChartOptions, percentChartOptions, pm10ChartOptions, pm25ChartOptions } from "configs";

type ITodayDashboardProps = ITodayWeather;

export const TodayDashboard: FC<ITodayDashboardProps> = ({ feel, humid, rain, pm10, pm25, wind, todayForcast }) => {
  return (
    <Box o="hidden auto" d="block" w="100%" h="100%" p="2rem 10rem 4rem">
      <Box fd="row" j="space-between" m="1rem 0 0">
        <WeatherCard
          title="체감온도"
          w="32%"
          h="17rem"
          unit="°C"
          value={feel}
          chart={<ProgressChart chartData={Number(humid)} chartOptions={tempChartOptions} />}
        />
        <WeatherCard
          title="습도"
          w="32%"
          h="17rem"
          unit="%"
          value={humid}
          chart={<ProgressChart chartData={Number(humid)} chartOptions={percentChartOptions} />}
        />
        <WeatherCard
          title="강수확률"
          unit="%"
          w="32%"
          h="17rem"
          value={rain}
          chart={<ProgressChart chartData={Number(rain)} chartOptions={percentChartOptions} />}
        />
      </Box>

      <Box fd="row" j="space-between" m="2rem 0 0">
        <WeatherCard
          title="미세먼지(PM10)"
          w="32%"
          h="17rem"
          unit="㎍/㎥"
          value={pm10}
          chart={<ProgressChart chartData={Number(pm10)} chartOptions={pm10ChartOptions} />}
        />
        <WeatherCard
          title="미세먼지(PM25)"
          w="32%"
          h="17rem"
          unit="㎍/㎥"
          value={pm25}
          chart={<ProgressChart chartData={Number(pm25)} chartOptions={pm25ChartOptions} />}
        />
        <WeatherCard title="바람" value={wind} unit="m/s" chart={<WindIndicator />} w="32%" h="17rem" />
      </Box>

      <ForecastCard title="오늘의 날씨" datasets={todayForcast} w="100%" h="40rem" m="3rem 0 0" />
    </Box>
  );
};
