import { FC } from "react";
import { Box, Card, Title3, TempChart, PercentChart, WindIndicator } from "components/atoms";
import { Navigation, WeatherCard } from "components/molecules";
import { percentRange, pm10Range, pm25Range, airChartColor } from "configs";

type IMobileTodayDashboardProps = ITodayWeather;

export const MobileTodayDashboard: FC<IMobileTodayDashboardProps> = ({ feel, humid, rain, pm10, pm25, wind }) => {
  return (
    <Box w="100%" h="100%">
      <Box w="100%" h="4rem" p="0 3rem 2rem">
        <Navigation />
      </Box>

      <Box o="hidden auto" w="100%" h="calc(100% - 4rem)" p="1rem 3rem 3rem">
        <Box fd="row" j="space-between" m="1rem 0 0">
          <WeatherCard
            title="체감온도"
            value={feel}
            unit="°C"
            chart={<TempChart chartData={Number(feel)} />}
            w="48%"
            h="17rem"
            p="3rem"
          />
          <WeatherCard
            title="강수확률"
            value={humid}
            unit="%"
            chart={<PercentChart chartData={Number(humid)} chartRange={percentRange} />}
            w="48%"
            h="17rem"
            p="3rem"
          />
        </Box>

        <Box fd="row" j="space-between" m="3rem 0 0">
          <WeatherCard
            title="습도"
            value={rain}
            unit="%"
            chart={<PercentChart chartData={Number(rain)} chartRange={percentRange} />}
            w="48%"
            h="17rem"
            p="3rem"
          />
          <WeatherCard
            title="미세먼지(PM10)"
            value={pm10}
            unit="㎍/㎥"
            chart={<PercentChart chartData={Number(pm10)} chartRange={pm10Range} chartColor={airChartColor} />}
            w="48%"
            h="17rem"
            p="3rem"
          />
        </Box>

        <Box fd="row" j="space-between" m="2rem 0 0">
          <WeatherCard
            title="미세먼지(PM25)"
            value={pm25}
            unit="㎍/㎥"
            chart={<PercentChart chartData={Number(pm25)} chartRange={pm25Range} chartColor={airChartColor} />}
            w="48%"
            h="17rem"
            p="3rem"
          />
          <WeatherCard title="바람" value={wind} unit="m/s" chart={<WindIndicator />} w="48%" h="17rem" p="3rem" />
        </Box>

        <Card w="100%" h="32rem" m="3rem 0 0" p="3rem">
          <Title3 size="sm">오늘의 날씨</Title3>
        </Card>
      </Box>
    </Box>
  );
};
