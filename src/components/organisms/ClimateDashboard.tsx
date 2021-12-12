import { FC } from "react";
import { Box } from "components/atoms";
import { Navigation, TempClimateCard, RainClimateCard } from "components/molecules";

type IClimateDashboardProps = IClimate;

export const ClimateDashboard: FC<IClimateDashboardProps> = ({ tempChartDataList, rainChartDataList }) => {
  return (
    <Box o="hidden auto" f="1" h="100%" p="4rem 6rem" bgc="skyBlue" btlr="3rem">
      <Navigation />

      <Box fd="row" j="space-between" m="3rem 0 0">
        <TempClimateCard title="온도" datasets={tempChartDataList} />
        <RainClimateCard title="강수량" datasets={rainChartDataList} />
      </Box>
    </Box>
  );
};
