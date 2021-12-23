import { FC } from "react";
import { Box } from "components/atoms";
import { TempClimateCard, RainClimateCard, GlobalSurfaceAirTempCard } from "components/molecules";

type IMobileClimateDashboardProps = IClimate;

export const MobileClimateDashboard: FC<IMobileClimateDashboardProps> = ({ tempChartDataList, rainChartDataList }) => {
  return (
    <Box o="hidden auto" d="block" w="100%" h="100%" p="0 3rem" m="0 0 1rem">
      <TempClimateCard title="온도" datasets={tempChartDataList} w="100%" h="32rem" m="0 0 1rem" p="2.5rem" />

      <RainClimateCard title="강수량" datasets={rainChartDataList} w="100%" h="30rem" m="1rem 0 1rem" p="2.5rem" />

      <GlobalSurfaceAirTempCard title="기후 변화" w="100%" h="26rem" m="1rem 0 0" p="2.5rem" />
    </Box>
  );
};
