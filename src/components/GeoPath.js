import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, csv } from "d3";
import useResizeObserver from "../hooks/useResizeObserver";
import data from "../GeoChart.korea.geo.json";

const GeoPath = () => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (!data) return;

    const svg = select(svgRef.current);

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);

    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      .on("click", (feature) => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr("class", "country")
      .transition()
      .duration(1000)
      .attr("d", (feature) => pathGenerator(feature))
      .attr("fill", "#eee")
      .attr("stroke", "black");

    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text((feature) => feature && feature.properties.CTP_KOR_NM)
      .attr("x", 5)
      .attr("y", 15);
  }, [data, dimensions, selectedCountry]);

  return (
    <div ref={wrapperRef} className="geo-path-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GeoPath;
