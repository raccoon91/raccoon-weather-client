import React, { useRef, useEffect, useState } from "react";
import { json, select, geoPath, geoMercator } from "d3";
import { useResizeObserver } from "src/hooks";

const margin = { top: 10, right: 10, bottom: 10, left: 10 };

export const GeoPath = () => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const [geoData, setGeoData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    json("./GeoChart.korea.geo.json").then(setGeoData);
  }, []);

  useEffect(() => {
    if (!geoData) return;

    const { width: innerWidth, height: innerHeight } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const width = innerWidth - margin.right - margin.left;
    const height = innerHeight - margin.top - margin.bottom;

    const svg = select(svgRef.current);

    svg
      .attr("overflow", "hidden")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || geoData)
      .precision(100);

    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll(".country")
      .data(geoData.features)
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
  }, [geoData, dimensions, selectedCountry]);

  return (
    <div ref={wrapperRef} className="svg-wrapper">
      <svg ref={svgRef}></svg>
    </div>
  );
};
