import { FC } from "react";
import dayjs from "dayjs";
import { DashboardGrid, Text, Span, ProgressChart, WindIndicator } from "components/atoms";
import { GridCard, ForecastChart } from "components/molecules";
import {
  desktopTodayGrid,
  mobileTodayGrid,
  tempChartOptions,
  percentChartOptions,
  pm10ChartOptions,
  pm25ChartOptions,
} from "configs";

interface ITodayDashboardProps {
  weather: IWeather | null;
  forecasts: IForecast[] | null;
}

export const TodayDashboard: FC<ITodayDashboardProps> = ({ weather, forecasts }) => {
  return (
    <DashboardGrid
      o="hidden auto"
      w="100%"
      h="100%"
      desktopGridItems={desktopTodayGrid}
      mobileGridItems={mobileTodayGrid}
    >
      <GridCard
        isLoad={!!weather}
        title="체감온도"
        unit="°C"
        value={weather?.feel}
        chart={<ProgressChart chartData={weather?.feel} chartOptions={tempChartOptions} />}
      />
      <GridCard
        isLoad={!!weather}
        title="강수확률"
        unit="%"
        value={weather?.rainProb}
        chart={<ProgressChart chartData={weather?.rainProb} chartOptions={percentChartOptions} />}
      />
      <GridCard
        isLoad={!!weather}
        title={`${weather?.city?.korName} 확진자`}
        caption={weather?.caseDate ? `${dayjs(weather.caseDate).format("MM월 DD일")} 기준 정보` : null}
        unit="명"
        value={weather?.caseIncrement?.toLocaleString()}
        chart={
          <Text size="xs" align="right">
            누적 확진자 <Span weight="bold">{weather?.case?.toLocaleString()}</Span>명
          </Text>
        }
      />
      <GridCard
        isLoad={!!weather}
        title="미세먼지(PM10)"
        unit="㎍/㎥"
        value={weather?.pm10}
        chart={<ProgressChart chartData={weather?.pm10} chartOptions={pm10ChartOptions} />}
      />
      <GridCard
        isLoad={!!weather}
        title="미세먼지(PM25)"
        unit="㎍/㎥"
        value={weather?.pm25}
        chart={<ProgressChart chartData={weather?.pm25} chartOptions={pm25ChartOptions} />}
      />
      <GridCard
        isLoad={!!weather}
        title="바람"
        unit="m/s"
        value={weather?.wind}
        chart={<WindIndicator windDirection={weather?.windDirection} />}
      />
      <GridCard isLoad={!!forecasts} title="오늘의 날씨" chart={<ForecastChart datasets={forecasts} />} />
    </DashboardGrid>
  );
};
