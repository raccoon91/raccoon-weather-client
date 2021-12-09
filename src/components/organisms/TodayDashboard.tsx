import { FC } from "react";
import { Box, Card, Title3, TempChart, PercentChart, WindIndicator } from "components/atoms";
import { Navigation, WeatherCard } from "components/molecules";
import { percentRange, pm10Range, pm25Range, airChartColor } from "configs";

type ITodayDashboardProps = ITodayWeather;

export const TodayDashboard: FC<ITodayDashboardProps> = ({ feel, humid, rain, pm10, pm25, wind }) => {
  return (
    <Box o="hidden auto" f="1" h="100%" p="4rem 6rem" bgc="skyBlue" btlr="3rem">
      <Navigation />

      <Box fd="row" j="space-between" m="3rem 0 0">
        <WeatherCard title="체감온도" value={feel} unit="°C" chart={<TempChart chartData={Number(feel)} />} />
        <WeatherCard
          title="강수확률"
          value={humid}
          unit="%"
          chart={<PercentChart chartData={Number(humid)} chartRange={percentRange} />}
        />
        <WeatherCard
          title="습도"
          value={rain}
          unit="%"
          chart={<PercentChart chartData={Number(rain)} chartRange={percentRange} />}
        />
      </Box>

      <Box fd="row" j="space-between" m="2rem 0 0">
        <WeatherCard
          title="미세먼지(PM10)"
          value={pm10}
          unit="㎍/㎥"
          chart={<PercentChart chartData={Number(pm10)} chartRange={pm10Range} chartColor={airChartColor} />}
        />
        <WeatherCard
          title="미세먼지(PM25)"
          value={pm25}
          unit="㎍/㎥"
          chart={<PercentChart chartData={Number(pm25)} chartRange={pm25Range} chartColor={airChartColor} />}
        />
        <WeatherCard title="바람" value={wind} unit="m/s" chart={<WindIndicator />} />
      </Box>

      <Box m="3rem 0 0">
        <Card w="100%" h="32rem" p="3rem">
          <Title3 size="sm">오늘의 날씨</Title3>
        </Card>
      </Box>
    </Box>
  );
};
