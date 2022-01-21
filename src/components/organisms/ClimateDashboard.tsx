import { FC } from "react";
import styled from "styled-components";
import { Grid, ScatterPlot, LineChart, BarChart, GradientLineChart } from "components/atoms";
import { ClimateCard } from "components/molecules";
import { globalSurfaceAirTemp, covidChartOptions } from "configs";

const ClimateDashboardContainer = styled(Grid)`
  @media ${({ theme }) => theme.device.desktop} {
    gap: 2rem;
    grid-template-columns: 42% calc(100% - 42% - 2rem);
    grid-template-rows: 22rem 22rem 26rem;
    grid-template-areas:
      "  feel    covid  "
      "  feel     rain  "
      "climate  climate ";
    padding: 2rem 10rem 4rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    gap: 2rem;
    grid-template-columns: 100%;
    grid-template-rows: 32rem 26rem 26rem 26rem;
    grid-template-areas:
      "  feel  "
      "  covid "
      "  rain  "
      " climate";
    padding: 1rem 3rem 3rem;
  }
`;

interface IClimateDashboardProps {
  climate: IClimate;
}

export const ClimateDashboard: FC<IClimateDashboardProps> = ({
  climate: { years, maxTempClimates, rainClimates, covidDates, caseIncrements },
}) => {
  return (
    <ClimateDashboardContainer o="hidden auto" w="100%" h="100%">
      <ClimateCard
        area="feel"
        isLoad={years !== null ? true : false}
        title="최고온도"
        chart={<ScatterPlot labels={years} datasets={maxTempClimates} />}
      />
      <ClimateCard
        area="covid"
        isLoad={covidDates !== null ? true : false}
        title="확진자"
        chart={<LineChart labels={covidDates} datasets={caseIncrements} options={covidChartOptions} />}
      />
      <ClimateCard
        area="rain"
        isLoad={years !== null ? true : false}
        title="강수량"
        chart={<BarChart labels={years} datasets={rainClimates} />}
      />
      <ClimateCard
        area="climate"
        isLoad={years !== null ? true : false}
        title="기후 변화"
        chart={<GradientLineChart labels={globalSurfaceAirTemp.x} datasets={globalSurfaceAirTemp.y} />}
      />
    </ClimateDashboardContainer>
  );
};
