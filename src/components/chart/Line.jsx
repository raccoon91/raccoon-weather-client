import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, line, curveBundle } from "d3";

export const Line = (props) => {
  const { chartId, width, height, chartDataList, lineColor } = props;
  const contentRef = useRef(null);

  useEffect(() => {
    if (!chartDataList || !chartDataList.length) return;

    const content = select(contentRef.current);

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

    const lineGenerator = line()
      .x((data) => xScale(data.x))
      .y((data) => yScale(data.value))
      .curve(curveBundle);

    const lineChart = content.selectAll(".line").data([chartDataList]);

    lineChart
      .enter()
      .append("path")
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
      .duration(2000)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength();

        return `${length}, ${length}`;
      });

    lineChart.transition().duration(1000).attr("d", lineGenerator);

    lineChart.exit().remove();
  }, [chartId, width, height, chartDataList, lineColor]);

  return (
    <>
      <defs>
        <clipPath id={`${chartId}-line`}>
          <rect x="0" y="0" width="100%" height="100%" />
        </clipPath>
      </defs>
      <g
        ref={contentRef}
        className="content"
        clipPath={`url(#${chartId}-line)`}
      />
    </>
  );
};
