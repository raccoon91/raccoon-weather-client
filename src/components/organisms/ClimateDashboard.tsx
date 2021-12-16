import { FC } from "react";
import { Box } from "components/atoms";
import { Navigation, MapCard, TempClimateCard, RainClimateCard, GlobalSurfaceAirTempCard } from "components/molecules";

type IClimateDashboardProps = IClimate;

export const ClimateDashboard: FC<IClimateDashboardProps> = ({ tempChartDataList, rainChartDataList }) => {
  return (
    <Box>
      <Navigation />

      <Box fd="row" j="space-between" w="100%" h="60rem" m="3rem 0 1rem">
        <MapCard title="지역" w="calc(48% - 1rem)" h="60rem" m="0 1rem 0 0" />

        <Box fd="column" j="space-between" w="calc(52% - 1rem)" h="100%" m="0 0 0 1rem">
          <TempClimateCard title="온도" datasets={tempChartDataList} w="100%" h="32rem" m="0 0 1rem" />

          <RainClimateCard title="강수량" datasets={rainChartDataList} w="100%" h="26rem" m="1rem 0 0" />
        </Box>
      </Box>

      <GlobalSurfaceAirTempCard title="기후 변화" w="100%" h="24rem" m="1rem 0 0" />
    </Box>
  );
};
