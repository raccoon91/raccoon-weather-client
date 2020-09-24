import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, line, curveBundle, mouse } from "d3";

const tooltipBox = (tooltip, value) => {
  if (!value) return tooltip.style("display", "none");

  tooltip
    .style("display", null)
    .style("pointer-events", "none")
    .style("font", "10px sans-serif");

  const path = tooltip
    .selectAll("path")
    .data([null])
    .join("path")
    .attr("fill", "white")
    .attr("stroke", "black");

  const text = tooltip
    .selectAll("text")
    .data([null])
    .join("text")
    .call((text) =>
      text
        .selectAll("tspan")
        .data((value + "").split(/\n/))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .style("font-weight", (_, i) => (i ? null : "bold"))
        .text((d) => d)
    );

  const { y, width: w, height: h } = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr("d", `M${-w / 2 - 10},5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
};

export const Line = (props) => {
  const { chartId, width, height, chartDataList, lineColor, tooltip } = props;
  const contentRef = useRef(null);
  const tooltipRef = useRef(null);

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

    if (tooltip) {
      const svg = select(`#${chartId}`);
      const tooltip = select(tooltipRef.current);

      svg.on("mousemove", function () {
        const [x, y] = mouse(this);
        const xValue = Math.round(xScale.invert(x));

        let selected;

        chartDataList.forEach((data) => {
          if (data.x === xValue) {
            selected = data;
          }
        });

        if (selected) {
          let xPosition = x;
          let yPosition = y;

          if (xPosition < 25) {
            xPosition = 25;
          }

          if (xPosition > width - 25) {
            xPosition = width - 25;
          }

          if (yPosition > 90) {
            yPosition = 90;
          }

          tooltip
            .attr("transform", `translate(${xPosition},${yPosition})`)
            .call(tooltipBox, `${selected.x}\n${selected.value}`);
        }
      });

      svg.on("mouseleave", function () {
        tooltip.call(tooltipBox, null);
      });
    }
  }, [chartId, width, height, chartDataList, lineColor, tooltip]);

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
      <g ref={tooltipRef} />
    </>
  );
};
