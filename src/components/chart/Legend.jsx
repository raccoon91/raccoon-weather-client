import React, { useRef, useEffect } from "react";
import { select, scaleThreshold } from "d3";

export const Legend = ({ colorDomain, colorRange }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const colorScale = scaleThreshold()
      .domain(colorDomain.slice(1))
      .range(colorRange);

    const legends = select(contentRef.current)
      .selectAll(".legends")
      .data(colorDomain)
      .join("g")
      .attr("class", "legends")
      .attr("transform", (data, index) => `translate(0, ${index * 20})`);

    legends
      .selectAll(".legend-color")
      .data((data) => [data])
      .join("rect")
      .attr("class", "legend-color")
      .attr("fill", (data) => colorScale(data))
      .attr("width", 20)
      .attr("height", 20);

    legends
      .selectAll(".legend-text")
      .data((data) => [data])
      .join("text")
      .attr("class", "legend-text")
      .text((data) => data)
      .attr("x", 30)
      .attr("y", 20 - 4)
      .attr("font-size", "12px");
  }, [colorDomain, colorRange]);

  return <g ref={contentRef} className="legend" />;
};
