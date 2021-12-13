import { FC } from "react";
import { Box } from "components/atoms";
import { Navigation, MapCard, TempClimateCard, RainClimateCard } from "components/molecules";

type IClimateDashboardProps = IClimate;

export const ClimateDashboard: FC<IClimateDashboardProps> = ({ tempChartDataList, rainChartDataList }) => {
  return (
    <Box o="hidden auto" f="1" h="100%" p="4rem 6rem" bgc="skyBlue" btlr="3rem">
      <Navigation />

      <Box fd="row" j="space-between" h="64rem" m="3rem 0 0">
        <Box w="50%" h="100%" m="0 1rem 0 0">
          <MapCard title="지역" />
        </Box>

        <Box fd="column" j="space-between" w="50%" m="0 0 0 1rem">
          <TempClimateCard title="온도" datasets={tempChartDataList} />
          <RainClimateCard title="강수량" datasets={rainChartDataList} />
        </Box>
      </Box>
    </Box>
  );
};
