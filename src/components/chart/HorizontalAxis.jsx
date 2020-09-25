import React, { useRef, useEffect } from "react";
import { select, min, max, scaleLinear } from "d3";

export const HorizontalAxis = (props) => {
  const { position, width, height, chartDataList } = props;
  const contentRef = useRef(null);

  useEffect(() => {
    if (!chartDataList || !chartDataList.length) return;

    const yScale = scaleLinear()
      .domain([
        min(chartDataList, (data) => data.value),
        max(chartDataList, (data) => data.value),
      ])
      .range([height, 0]);

    select(contentRef.current)
      .attr("d", `M 0 ${yScale(position)} H ${width}`)
      .attr("stroke", "darkgray")
      .attr("shape-rendering", "crispedges");
  }, [width, height, chartDataList, position]);

  return <path ref={contentRef} className="vertical-axis" />;
};
