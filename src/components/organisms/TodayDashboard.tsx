import { FC } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { Grid, Text, Span, ProgressChart, WindIndicator } from "components/atoms";
import { WeatherCard, ForecastCard } from "components/molecules";
import { tempChartOptions, percentChartOptions, pm10ChartOptions, pm25ChartOptions } from "configs";

const TodayDashboardContainer = styled(Grid)`
  @media ${({ theme }) => theme.device.desktop} {
    gap: 2rem;
    grid-template-columns: repeat(3, minmax(31%, 1fr));
    grid-template-rows: 17rem 17rem 40rem;
    grid-template-areas:
      "  feel    rainProb  covid "
      "  pm10    pm25      wind  "
      "forecast forecast forecast";
    padding: 2rem 10rem 4rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    gap: 2rem;
    grid-template-columns: repeat(2, minmax(48%, 1fr));
    grid-template-rows: 17rem 17rem 17rem 40rem;
    grid-template-areas:
      "   feel    covid "
      " rainProb  wind  "
      "   pm10    pm25  "
      "forecast forecast";
    padding: 1rem 3rem 3rem;
  }
`;

interface ITodayDashboardProps {
  weather: IWeather | null;
  forecasts: IForecast[] | null;
}

export const TodayDashboard: FC<ITodayDashboardProps> = ({ weather, forecasts }) => {
  return (
    <TodayDashboardContainer o="hidden auto" w="100%" h="100%">
      <WeatherCard
        area="feel"
        isLoad={weather ? true : false}
        title="체감온도"
        unit="°C"
        value={weather?.feel}
        chart={<ProgressChart chartData={weather?.feel} chartOptions={tempChartOptions} />}
      />
      <WeatherCard
        area="rainProb"
        isLoad={weather ? true : false}
        title="강수확률"
        unit="%"
        value={weather?.rainProb}
        chart={<ProgressChart chartData={weather?.rainProb} chartOptions={percentChartOptions} />}
      />
      <WeatherCard
        area="covid"
        isLoad={weather ? true : false}
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
      <WeatherCard
        area="pm10"
        isLoad={weather ? true : false}
        title="미세먼지(PM10)"
        unit="㎍/㎥"
        value={weather?.pm10}
        chart={<ProgressChart chartData={weather?.pm10} chartOptions={pm10ChartOptions} />}
      />
      <WeatherCard
        area="pm25"
        isLoad={weather ? true : false}
        title="미세먼지(PM25)"
        unit="㎍/㎥"
        value={weather?.pm25}
        chart={<ProgressChart chartData={weather?.pm25} chartOptions={pm25ChartOptions} />}
      />
      <WeatherCard
        area="wind"
        isLoad={weather ? true : false}
        title="바람"
        unit="m/s"
        value={weather?.wind}
        chart={<WindIndicator windDirection={weather?.windDirection} />}
      />
      <ForecastCard area="forecast" isLoad={forecasts ? true : false} title="오늘의 날씨" datasets={forecasts} />
    </TodayDashboardContainer>
  );
};
