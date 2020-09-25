import React, { FC, useRef } from "react";
import { useResizeObserver } from "src/hooks";
import { Chart, Line, XAxis, YAxis, Tooltip } from "src/components/chart";

interface IClimateCartProps {
  chartId: string;
  lineColor: string;
  chartDataList: { value: number; x: number }[];
  unit?: string;
}

export const ClimateChart: FC<IClimateCartProps> = ({
  chartId,
  lineColor,
  chartDataList,
  unit,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useResizeObserver(wrapperRef);

  const width = dimensions?.width || 0;
  const height = dimensions?.height || 0;

  return (
    <div
      ref={wrapperRef}
      style={{ height: "180px", padding: "10px 10px 25px 25px" }}
    >
      <Chart
        chartId={chartId}
        width={width}
        height={height}
        chartDataList={chartDataList}
      >
        <Line lineColor={lineColor} />
        <XAxis />
        <YAxis />
        <Tooltip unit={unit} />
      </Chart>
    </div>
  );
};
