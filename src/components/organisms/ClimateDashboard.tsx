import { FC } from "react";
import { Box, Flex, MapChart, ScatterPlot, BarChart, GradientLineChart } from "components/atoms";
import { ClimateCard } from "components/molecules";
import { globalSurfaceAirTemp } from "configs";

type IClimateDashboardProps = IClimate;

export const ClimateDashboard: FC<IClimateDashboardProps> = ({ years, tempClimates, rainClimates }) => {
  return (
    <Box o="hidden auto" w="100%" h="100%" p="2rem 10rem 4rem">
      <Flex j="space-between">
        <ClimateCard title="지역" w="calc(48% - 1rem)" h="60rem" m="0 1rem 0 0" chart={<MapChart />} />

        <Flex d="column" j="space-between" w="calc(52% - 1rem)" h="60rem" m="0 0 0 1rem">
          <ClimateCard
            title="온도"
            h="32rem"
            m="0 0 1rem"
            chart={<ScatterPlot labels={years} datasets={tempClimates} />}
          />

          <ClimateCard
            title="강수량"
            h="26rem"
            m="1rem 0 0"
            chart={<BarChart labels={years} datasets={rainClimates} />}
          />
        </Flex>
      </Flex>

      <ClimateCard
        title="기후 변화"
        h="26rem"
        m="2rem 0 0"
        chart={<GradientLineChart labels={globalSurfaceAirTemp.x} datasets={globalSurfaceAirTemp.y} />}
      />
    </Box>
  );
};
