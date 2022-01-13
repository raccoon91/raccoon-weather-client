import { FC } from "react";
import styled from "styled-components";
import { Grid, ProgressChart, WindIndicator } from "components/atoms";
import { WeatherCard, ForecastCard } from "components/molecules";
import { tempChartOptions, percentChartOptions, pm10ChartOptions, pm25ChartOptions } from "configs";

const TodayDashboardContainer = styled(Grid)`
  @media ${({ theme }) => theme.device.desktop} {
    gap: 2rem;
    grid-template-columns: repeat(3, minmax(31%, 1fr));
    grid-template-rows: 17rem 17rem 40rem;
    grid-template-areas:
      "  feel    humid    rain   "
      "  pm10    pm25     wind   "
      "forecast forecast forecast";
    padding: 2rem 10rem 4rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    gap: 2rem;
    grid-template-columns: repeat(2, minmax(48%, 1fr));
    grid-template-rows: 17rem 17rem 17rem 40rem;
    grid-template-areas:
      "   feel    rain  "
      "   humid   wind  "
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
        area="humid"
        isLoad={weather ? true : false}
        title="습도"
        unit="%"
        value={weather?.humid}
        chart={<ProgressChart chartData={weather?.humid} chartOptions={percentChartOptions} />}
      />
      <WeatherCard
        area="rain"
        isLoad={weather ? true : false}
        title="강수확률"
        unit="%"
        value={weather?.rain}
        chart={<ProgressChart chartData={weather?.rain} chartOptions={percentChartOptions} />}
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
