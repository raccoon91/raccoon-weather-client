import React, { useRef, useEffect } from "react";
import { select, min, max, scaleLinear } from "d3";

export const VerticalAxis = ({ width, height, axisDatalist }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!axisDatalist || !axisDatalist.length) return;

    const yScale = scaleLinear()
      .domain([
        min(axisDatalist, (data) => data),
        max(axisDatalist, (data) => data),
      ])
      .range([height, 0]);

    select(contentRef.current)
      .attr("d", `M 0 ${yScale(0)} H ${width}`)
      .attr("stroke", "darkgray")
      .attr("shape-rendering", "crispedges");
  }, [width, height, axisDatalist]);

  return <path ref={contentRef} className="vertical-axis" />;
};
