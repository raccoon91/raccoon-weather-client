import { FC } from "react";
import { Box, ScatterPlot, BarChart, GradientLineChart } from "components/atoms";
import { ClimateCard } from "components/molecules";
import { globalSurfaceAirTemp } from "configs";

type IMobileClimateDashboardProps = IClimate;

export const MobileClimateDashboard: FC<IMobileClimateDashboardProps> = ({ years, tempClimates, rainClimates }) => {
  return (
    <Box o="hidden auto" w="100%" h="100%" p="1rem 3rem 2rem">
      <ClimateCard title="온도" h="32rem" p="2.5rem" chart={<ScatterPlot labels={years} datasets={tempClimates} />} />

      <ClimateCard
        title="강수량"
        h="30rem"
        m="2rem 0 0"
        p="2.5rem"
        chart={<BarChart labels={years} datasets={rainClimates} />}
      />

      <ClimateCard
        title="기후 변화"
        h="26rem"
        m="2rem 0 0"
        p="2.5rem"
        chart={<GradientLineChart labels={globalSurfaceAirTemp.x} datasets={globalSurfaceAirTemp.y} />}
      />
    </Box>
  );
};
