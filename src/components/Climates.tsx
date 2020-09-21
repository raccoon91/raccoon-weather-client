import React, { FC, useEffect } from "react";
import { useObserver } from "mobx-react";
import { useStores } from "src/hooks";
import { Card, ClimateChart } from "src/components";

const useStoreData = () => {
  const {
    store: { climateStore },
  } = useStores();

  return useObserver(() => ({
    getLocalClimate: climateStore.getLocalClimate,
    climateYearList: climateStore.climateYearList?.slice(),
    climateTempList: climateStore.climateTempList?.slice(),
    climateRainList: climateStore.climateRainList?.slice(),
    climateHumidList: climateStore.climateHumidList?.slice(),
  }));
};

export const Climates: FC = () => {
  const {
    getLocalClimate,
    climateYearList,
    climateTempList,
    climateRainList,
    climateHumidList,
  } = useStoreData();

  useEffect(() => {
    getLocalClimate();
  }, [getLocalClimate]);

  return (
    <>
      <Card title="기온">
        <ClimateChart
          chartId="temp-chart"
          lineColor="#31a354"
          chartDataList={climateTempList}
          axisDataList={climateYearList}
        />
      </Card>
      <Card title="강수량">
        <ClimateChart
          chartId="rainProb-chart"
          lineColor="#3182bd"
          chartDataList={climateRainList}
          axisDataList={climateYearList}
        />
      </Card>
      <Card title="습도">
        <ClimateChart
          chartId="humidity-chart"
          lineColor="#636363"
          chartDataList={climateHumidList}
          axisDataList={climateYearList}
        />
      </Card>
    </>
  );
};
