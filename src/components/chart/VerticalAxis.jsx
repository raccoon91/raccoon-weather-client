import React, { useRef, useEffect } from "react";
import { select, min, max, scaleLinear } from "d3";

export const VerticalAxis = ({ width, height, axisDataList }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!axisDataList || !axisDataList.length) return;

    const yScale = scaleLinear()
      .domain([
        min(axisDataList, (data) => data),
        max(axisDataList, (data) => data),
      ])
      .range([height, 0]);

    select(contentRef.current)
      .attr("d", `M 0 ${yScale(0)} H ${width}`)
      .attr("stroke", "darkgray")
      .attr("shape-rendering", "crispedges");
  }, [width, height, axisDataList]);

  return <path ref={contentRef} className="vertical-axis" />;
};
