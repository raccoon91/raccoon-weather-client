import React, { FC, useRef } from "react";
import { useResizeObserver } from "src/hooks";
import { Line, XAxis, YAxis } from "src/components/chart";

interface IClimateCartProps {
  chartId: string;
  lineColor: string;
  chartDataList: number[];
  axisDataList: number[];
}

export const ClimateChart: FC<IClimateCartProps> = ({
  chartId,
  lineColor,
  chartDataList,
  axisDataList,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useResizeObserver(wrapperRef);

  const width = dimensions?.width || 0;
  const height = dimensions?.height || 0;

  const lineData =
    chartDataList?.map((data, index) => ({
      value: data,
      x: axisDataList[index],
    })) || [];

  return (
    <div
      ref={wrapperRef}
      style={{ height: "180px", padding: "10px 10px 25px 25px" }}
    >
      <svg width={width} height={height} overflow="visible">
        <Line
          chartId={chartId}
          width={width}
          height={height}
          lineColor={lineColor}
          lineData={lineData}
        />
        <XAxis width={width} height={height} axisDataList={axisDataList} />
        <YAxis width={width} height={height} axisDataList={chartDataList} />
      </svg>
    </div>
  );
};
