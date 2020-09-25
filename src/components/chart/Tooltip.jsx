import React, { useEffect, useRef } from "react";
import { select, min, max, scaleLinear, mouse } from "d3";

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
        .attr("y", (_, index) => `${index * 14}`)
        .style("font-weight", (_, index) => (index ? null : "bold"))
        .text((data) => data)
    );

  const { y, width: w, height: h } = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr("d", `M${-w / 2 - 10},10 H${w / 2 + 10} v${h + 10} h-${w + 20} z`);
};

export const Tooltip = (props) => {
  const { chartId, width, chartDataList, unit } = props;
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!chartDataList || !chartDataList.length) return;

    const xScale = scaleLinear()
      .domain([
        min(chartDataList, (data) => data.x),
        max(chartDataList, (data) => data.x),
      ])
      .range([0, width]);

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
        let xPosition = x + 40;
        let yPosition = y + 10;

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
          .call(
            tooltipBox,
            `year: ${selected.x}\nvalue: ${selected.value}${unit}`
          );
      }
    });

    svg.on("mouseleave", function () {
      tooltip.call(tooltipBox, null);
    });
  }, [chartId, width, chartDataList, unit]);

  return <g ref={tooltipRef} />;
};
