import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, line, curveBundle } from "d3";

export const Line = ({ width, height, lineColor, lineData }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!lineData) return;

    const content = select(contentRef.current);

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

    const lineGenerator = line()
      .x((data) => xScale(data.x))
      .y((data) => yScale(data.value))
      .curve(curveBundle.beta(1));

    content
      .selectAll(".line")
      .data([lineData])
      .join("path")
      .attr("class", "line")
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength();

        return `${length} ${length}`;
      })
      .attr("stroke-dashoffset", function () {
        return this.getTotalLength();
      })
      .transition()
      .duration(3000)
      .attr("stroke-dashoffset", 0);
  }, [width, height, lineData, lineColor]);

  return <g ref={contentRef}></g>;
};
