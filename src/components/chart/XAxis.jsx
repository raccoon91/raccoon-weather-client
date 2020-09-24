import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, axisBottom } from "d3";

export const XAxis = (props) => {
  const { width, height, chartDataList } = props;
  const axisRef = useRef();

  useEffect(() => {
    if (!chartDataList || !chartDataList.length) return;

    const xScale = scaleLinear()
      .domain([
        min(chartDataList, (data) => data.x),
        max(chartDataList, (data) => data.x),
      ])
      .range([0, width])
      .nice();

    const xAxis = axisBottom(xScale)
      .ticks(width / 60)
      .tickSizeOuter(0)
      .tickFormat((data) => String(data));

    select(axisRef.current)
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("line")
      .attr("display", "none");
  }, [width, height, chartDataList]);

  return <g ref={axisRef} />;
};
