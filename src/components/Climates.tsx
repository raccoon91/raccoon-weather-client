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
    tempDataList: climateStore.tempDataList?.slice(),
    rainDataList: climateStore.rainDataList?.slice(),
    humidDataList: climateStore.humidDataList?.slice(),
  }));
};

export const Climates: FC = () => {
  const {
    getLocalClimate,
    tempDataList,
    rainDataList,
    humidDataList,
  } = useStoreData();

  useEffect(() => {
    getLocalClimate();
  }, [getLocalClimate]);

  return (
    <>
      <Card title="기온">
        <ClimateChart
          chartId="climate-temp-chart"
          lineColor="#31a354"
          chartDataList={tempDataList}
          tooltip
        />
      </Card>
      <Card title="강수량">
        <ClimateChart
          chartId="climate-rainProb-chart"
          lineColor="#3182bd"
          chartDataList={rainDataList}
          tooltip
        />
      </Card>
      <Card title="습도">
        <ClimateChart
          chartId="climate-humidity-chart"
          lineColor="#636363"
          chartDataList={humidDataList}
          tooltip
        />
      </Card>
    </>
  );
};
