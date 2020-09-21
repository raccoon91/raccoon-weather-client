import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, line, curveBundle } from "d3";

export const Line = ({ chartId, width, height, lineColor, lineData }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!lineData || !lineData.length) return;

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

        return `0, ${length}`;
      })
      .transition()
      .duration(3000)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength();

        return `${length}, ${length}`;
      });
  }, [width, height, lineData, lineColor]);

  return (
    <>
      <defs>
        <clipPath id={chartId}>
          <rect x="0" y="0" width="100%" height="100%" />
        </clipPath>
      </defs>
      <g ref={contentRef} className="content" clipPath={`url(#${chartId})`} />
    </>
  );
};
