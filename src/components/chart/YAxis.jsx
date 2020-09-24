import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, axisLeft } from "d3";

export const YAxis = (props) => {
  const { width, height, chartDataList } = props;
  const axisRef = useRef();

  useEffect(() => {
    if (!chartDataList || !chartDataList.length) return;

    const yScale = scaleLinear()
      .domain([
        min(chartDataList, (data) => data.value),
        max(chartDataList, (data) => data.value),
      ])
      .range([height, 0])
      .nice();

    const yAxis = axisLeft(yScale)
      .ticks(4)
      .tickSizeOuter(0)
      .tickFormat((value) => String(value));

    select(axisRef.current)
      .call(yAxis)
      .selectAll("line")
      .attr("display", "none");
  }, [width, height, chartDataList]);

  return <g ref={axisRef} />;
};
