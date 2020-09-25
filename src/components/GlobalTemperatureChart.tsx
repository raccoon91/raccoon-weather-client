import React, { FC, useRef, useEffect } from "react";
import { useObserver } from "mobx-react";
import { useStores, useResizeObserver } from "src/hooks";
import { Card } from "src/components";
import {
  Chart,
  GradientLine,
  Dot,
  XAxis,
  YAxis,
  HorizontalAxis,
} from "src/components/chart";

const useStoreData = () => {
  const {
    store: { weatherStore },
  } = useStores();

  return useObserver(() => ({
    getGlobalTemperature: weatherStore.getGlobalTemperature,
    globalTempChartDataList: weatherStore.globalTempChartDataList?.slice(),
  }));
};

export const GlobalTemperatureChart: FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useResizeObserver(wrapperRef);
  const { getGlobalTemperature, globalTempChartDataList } = useStoreData();

  const width = dimensions?.width || 0;
  const height = dimensions?.height || 0;

  useEffect(() => {
    getGlobalTemperature();
  }, [getGlobalTemperature]);

  return (
    <Card title="전세계 평균 온도">
      <div
        ref={wrapperRef}
        style={{ height: "180px", padding: "10px 10px 25px 20px" }}
      >
        <Chart
          chartId="global-temp-line"
          width={width}
          height={height}
          chartDataList={globalTempChartDataList}
        >
          <Dot dotColor="#cccccc" />
          <HorizontalAxis position="0" />
          <GradientLine startColor="#3182bd" endColor="#de2d26" />
          <XAxis />
          <YAxis />
        </Chart>
      </div>
    </Card>
  );
};
