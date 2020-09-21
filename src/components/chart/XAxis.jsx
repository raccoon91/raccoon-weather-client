import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, axisBottom } from "d3";

export const XAxis = ({ width, height, axisDataList }) => {
  const axisRef = useRef();

  useEffect(() => {
    if (!axisDataList || !axisDataList.length) return;

    const xScale = scaleLinear()
      .domain([
        min(axisDataList, (data) => data),
        max(axisDataList, (data) => data),
      ])
      .range([0, width]);

    const xAxis = axisBottom(xScale)
      .ticks(5)
      .tickSizeOuter(0)
      .tickFormat((value) => value);

    select(axisRef.current)
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("line")
      .attr("display", "none");
  }, [width, height, axisDataList]);

  return <g ref={axisRef} />;
};
