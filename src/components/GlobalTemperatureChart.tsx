import React, { FC, useRef, useEffect } from "react";
import { useObserver } from "mobx-react";
import { useStores, useResizeObserver } from "src/hooks";
import { Card } from "src/components";
import {
  GradientLine,
  Dot,
  XAxis,
  YAxis,
  VerticalAxis,
} from "src/components/chart";

const useStoreData = () => {
  const {
    store: { weatherStore },
  } = useStores();

  return useObserver(() => ({
    getGlobalTemperature: weatherStore.getGlobalTemperature,
    globalTempYearList: weatherStore.globalTempYearList?.slice(),
    globalTempDataList: weatherStore.globalTempDataList?.slice(),
    globalTempChartDataList: weatherStore.globalTempChartDataList?.slice(),
  }));
};

export const GlobalTemperatureChart: FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useResizeObserver(wrapperRef);
  const {
    getGlobalTemperature,
    globalTempYearList,
    globalTempDataList,
    globalTempChartDataList,
  } = useStoreData();

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
        <svg width={width} height={height} overflow="visible">
          <Dot
            dotColor="#cccccc"
            width={width}
            height={height}
            lineData={globalTempChartDataList}
          />
          <VerticalAxis
            width={width}
            height={height}
            axisDataList={globalTempDataList}
          />
          <GradientLine
            chartId="global-temp-chart"
            startColor="#3182bd"
            endColor="#de2d26"
            width={width}
            height={height}
            lineData={globalTempChartDataList}
          />
          <XAxis
            width={width}
            height={height}
            axisDataList={globalTempYearList}
          />
          <YAxis
            width={width}
            height={height}
            axisDataList={globalTempDataList}
          />
        </svg>
      </div>
    </Card>
  );
};
