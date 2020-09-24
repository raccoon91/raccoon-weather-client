import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear } from "d3";

export const Dot = (props) => {
  const { chartId, width, height, dotColor, chartDataList } = props;
  const contentRef = useRef(null);

  useEffect(() => {
    if (!chartDataList || !chartDataList.length) return;

    const xScale = scaleLinear()
      .domain([
        min(chartDataList, (data) => data.x),
        max(chartDataList, (data) => data.x),
      ])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([
        min(chartDataList, (data) => data.value),
        max(chartDataList, (data) => data.value),
      ])
      .range([height, 0]);

    const dotChart = select(contentRef.current)
      .selectAll(".dot")
      .data(chartDataList);

    dotChart
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 2)
      .attr("fill", dotColor)
      .attr("cx", (data) => xScale(data.x))
      .attr("cy", (data) => yScale(data.value));

    dotChart
      .transition()
      .duration(1000)
      .attr("cx", (data) => xScale(data.x))
      .attr("cy", (data) => yScale(data.value));

    dotChart.exit().remove();
  }, [width, height, dotColor, chartDataList]);

  return (
    <>
      <defs>
        <clipPath id={`${chartId}-dot`}>
          <rect x="0" y="0" width="100%" height="100%" />
        </clipPath>
      </defs>
      <g
        ref={contentRef}
        className="content"
        clipPath={`url(#${chartId}-dot)`}
      />
    </>
  );
};
