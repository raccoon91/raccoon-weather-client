import React, { useRef, useEffect } from "react";
import { select, scaleQuantize } from "d3";

export const Legend = ({ colorDomain, colorRange, unit }) => {
  const legendRef = useRef(null);

  useEffect(() => {
    const colorScale = scaleQuantize().domain(colorDomain).range(colorRange);

    select(".legend-unit")
      .text(() => `(${unit})`)
      .attr("font-size", "12px")
      .attr("transform", "translate(0, 10)");

    const legend = select(legendRef.current).attr(
      "transform",
      "translate(0, 20)"
    );

    legend
      .selectAll(".legend-color")
      .data(colorRange)
      .join("rect")
      .attr("class", "legend-color")
      .attr("x", 0)
      .attr("y", (data, index) => index * 20)
      .attr("width", 20)
      .attr("height", 20)
      .transition()
      .duration(1000)
      .attr("fill", (data) => data);

    legend
      .selectAll(".legend-line")
      .data(colorRange.slice(0, -1))
      .join("path")
      .attr("class", "legend-path")
      .attr("d", (data, index) => `M 0 ${index * 20 + 20} H 25`)
      .attr("stroke", "#636363")
      .attr("stroke-width", 0.5)
      .attr("shape-rendering", "crispedges");

    legend
      .selectAll(".legend-text")
      .data(colorRange.slice(0, -1))
      .join("text")
      .attr("class", "legend-text")
      .text((data) => colorScale.invertExtent(data)[1])
      .attr("x", 30)
      .attr("y", (data, index) => index * 20 + 25)
      .attr("font-size", "12px");
  }, [colorDomain, colorRange, unit]);

  return (
    <>
      <text className="legend-unit" />
      <g ref={legendRef} className="legend" />
    </>
  );
};
