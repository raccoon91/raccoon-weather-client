import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, axisLeft } from "d3";

export const Yaxis = ({ width, height, axisDatalist }) => {
  const axisRef = useRef();

  useEffect(() => {
    if (!axisDatalist) return;

    const yScale = scaleLinear()
      .domain([
        min(axisDatalist, (data) => data),
        max(axisDatalist, (data) => data),
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
  }, [width, height, axisDatalist]);

  return <g ref={axisRef} />;
};
