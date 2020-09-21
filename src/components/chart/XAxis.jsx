import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, axisBottom } from "d3";

export const XAxis = ({ width, height, axisDatalist }) => {
  const axisRef = useRef();

  useEffect(() => {
    if (!axisDatalist || !axisDatalist.length) return;

    const xScale = scaleLinear()
      .domain([
        min(axisDatalist, (data) => data),
        max(axisDatalist, (data) => data),
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
  }, [width, height, axisDatalist]);

  return <g ref={axisRef} />;
};
