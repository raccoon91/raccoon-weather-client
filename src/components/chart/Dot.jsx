import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear } from "d3";

export const Dot = ({ width, height, dotColor, lineData }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!lineData || !lineData.length) return;

    const xScale = scaleLinear()
      .domain([
        min(lineData, (data) => data.x),
        max(lineData, (data) => data.x),
      ])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([
        min(lineData, (data) => data.value),
        max(lineData, (data) => data.value),
      ])
      .range([height, 0]);

    select(contentRef.current)
      .selectAll(".dot")
      .data(lineData)
      .join("circle")
      .attr("class", "dot")
      .attr("r", 2)
      .attr("fill", dotColor)
      .attr("cx", (data) => xScale(data.x))
      .attr("cy", (data) => yScale(data.value));
  }, [width, height, dotColor, lineData]);

  return <g ref={contentRef} />;
};
