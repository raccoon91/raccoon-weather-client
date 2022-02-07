import { FC } from "react";
import { DashboardGrid, ScatterPlot, LineChart, BarChart, GradientLineChart } from "components/atoms";
import { GridCard } from "components/molecules";
import { desktopClimateGrid, mobileClimateGrid, globalSurfaceAirTemp, covidChartOptions } from "configs";

interface IClimateDashboardProps {
  climate: IClimate;
}

export const ClimateDashboard: FC<IClimateDashboardProps> = ({
  climate: { city, years, maxTempClimates, rainClimates, covidDates, caseIncrements },
}) => {
  return (
    <DashboardGrid
      o="hidden auto"
      w="100%"
      h="100%"
      desktopGridItems={desktopClimateGrid}
      mobileGridItems={mobileClimateGrid}
    >
      <GridCard
        isLoad={years !== null ? true : false}
        title={city?.korName ? `${city.korName} 최고온도` : "최고온도"}
        chart={<ScatterPlot labels={years} datasets={maxTempClimates} />}
      />
      <GridCard
        isLoad={covidDates !== null ? true : false}
        title="전국 확진자"
        chart={<LineChart labels={covidDates} datasets={caseIncrements} options={covidChartOptions} />}
      />
      <GridCard
        isLoad={years !== null ? true : false}
        title={city?.korName ? `${city.korName} 강수량` : "강수량"}
        chart={<BarChart labels={years} datasets={rainClimates} />}
      />
      <GridCard
        isLoad={years !== null ? true : false}
        title="지구 표면 온도 변화"
        caption="출처 : NASA - https://data.giss.nasa.gov/gistemp"
        chart={<GradientLineChart labels={globalSurfaceAirTemp.x} datasets={globalSurfaceAirTemp.y} />}
      />
    </DashboardGrid>
  );
};
