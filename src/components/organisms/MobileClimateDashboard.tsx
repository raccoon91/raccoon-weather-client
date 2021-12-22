import { FC } from "react";
import { Box } from "components/atoms";
import { Navigation, MapCard, TempClimateCard, RainClimateCard, GlobalSurfaceAirTempCard } from "components/molecules";

type IMobileClimateDashboardProps = IClimate;

export const MobileClimateDashboard: FC<IMobileClimateDashboardProps> = ({ tempChartDataList, rainChartDataList }) => {
  return (
    <Box w="100%" h="100%">
      <Box w="100%" h="4rem" p="0 3rem 2rem">
        <Navigation />
      </Box>

      <Box o="hidden auto" w="100%" h="calc(100% - 4rem)" p="1rem 3rem 3rem">
        <TempClimateCard title="온도" datasets={tempChartDataList} w="100%" h="32rem" m="0 0 1rem" p="2.5rem" />

        <Box fd="row" j="space-between" w="100%" h="30rem" m="1rem 0 1rem">
          <MapCard title="지역" w="calc(50% - 1rem)" h="100%" m="0 1rem 0 0" p="2.5rem" />

          <RainClimateCard
            title="강수량"
            datasets={rainChartDataList}
            w="calc(50% - 1rem)"
            h="100%"
            m="0 0 0 1rem"
            p="2.5rem"
          />
        </Box>

        <GlobalSurfaceAirTempCard title="기후 변화" w="100%" h="24rem" m="1rem 0 0" p="2.5rem" />
      </Box>
    </Box>
  );
};
