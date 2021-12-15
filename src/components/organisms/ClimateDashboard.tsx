import { FC } from "react";
import { Box } from "components/atoms";
import { Navigation, MapCard, TempClimateCard, RainClimateCard, GlobalSurfaceAirTempCard } from "components/molecules";

type IClimateDashboardProps = IClimate;

export const ClimateDashboard: FC<IClimateDashboardProps> = ({ tempChartDataList, rainChartDataList }) => {
  return (
    <Box o="hidden auto" f="1" h="100%" p="4rem 6rem" bgc="skyBlue" btlr="3rem">
      <Navigation />

      <Box fd="row" j="space-between" w="100%" h="60rem" m="3rem 0 1rem">
        <Box w="calc(48% - 1rem)" h="60rem" m="0 1rem 0 0">
          <MapCard title="지역" />
        </Box>

        <Box fd="column" j="space-between" w="calc(52% - 1rem)" h="100%" m="0 0 0 1rem">
          <Box w="100%" h="32rem" m="0 0 1rem">
            <TempClimateCard title="온도" datasets={tempChartDataList} />
          </Box>

          <Box w="100%" h="26rem" m="1rem 0 0">
            <RainClimateCard title="강수량" datasets={rainChartDataList} />
          </Box>
        </Box>
      </Box>

      <Box w="100%" h="24rem" m="1rem 0 0">
        <GlobalSurfaceAirTempCard title="기후 변화" />
      </Box>
    </Box>
  );
};
