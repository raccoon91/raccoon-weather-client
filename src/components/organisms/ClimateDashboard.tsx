import { FC } from "react";
import styled from "styled-components";
import { Grid, MapChart, ScatterPlot, BarChart, GradientLineChart } from "components/atoms";
import { ClimateCard } from "components/molecules";
import { globalSurfaceAirTemp } from "configs";

const ClimateDashboardContainer = styled(Grid)`
  @media ${({ theme }) => theme.device.desktop} {
    gap: 2rem;
    grid-template-columns: repeat(2, minmax(48%, 1fr));
    grid-template-rows: 32rem 26rem 26rem;
    grid-template-areas:
      "  map     feel  "
      "  map     rain  "
      "climate climate";
    padding: 2rem 10rem 4rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    gap: 2rem;
    grid-template-columns: 100%;
    grid-template-rows: 32rem 26rem 26rem;
    grid-template-areas:
      "  feel "
      "  rain "
      "climate";
    padding: 1rem 3rem 3rem;
  }
`;

interface IClimateDashboardProps {
  climate: IClimate;
}

export const ClimateDashboard: FC<IClimateDashboardProps> = ({
  climate: { years, feelTempClimates, rainClimates },
}) => {
  return (
    <ClimateDashboardContainer o="hidden auto" w="100%" h="100%">
      <ClimateCard area="map" isLoad={years !== null ? true : false} title="지역" chart={<MapChart />} desktopOnly />
      <ClimateCard
        area="feel"
        isLoad={years !== null ? true : false}
        title="체감온도"
        chart={<ScatterPlot labels={years} datasets={feelTempClimates} />}
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
