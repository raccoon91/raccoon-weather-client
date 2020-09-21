import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, axisLeft } from "d3";

export const YAxis = ({ width, height, axisDataList }) => {
  const axisRef = useRef();

  useEffect(() => {
    if (!axisDataList || !axisDataList.length) return;

    const yScale = scaleLinear()
      .domain([
        min(axisDataList, (data) => data),
        max(axisDataList, (data) => data),
      ])
      .range([height, 0]);

    const yAxis = axisLeft(yScale)
      .ticks(4)
      .tickSizeOuter(0)
      .tickFormat((value) => String(value));

    select(axisRef.current)
      .call(yAxis)
      .selectAll("line")
      .attr("display", "none");
  }, [width, height, axisDataList]);

  return <g ref={axisRef} />;
};
