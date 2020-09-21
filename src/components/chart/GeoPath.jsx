import React, { useRef, useEffect } from "react";
import { select, geoPath, geoMercator, scaleThreshold } from "d3";

export const GeoPath = ({
  width,
  height,
  geoJson,
  geoClimateData,
  selectGeoCountry,
  selectedCountry,
  selectedCategory,
  colorDomain,
  colorRange,
}) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!geoJson || !geoClimateData) return;

    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || geoJson)
      .precision(100);

    const pathGenerator = geoPath().projection(projection);

    const colorScale = scaleThreshold()
      .domain(colorDomain.slice(1))
      .range(colorRange);

    select(contentRef.current)
      .selectAll(".country")
      .data(geoJson.features)
      .join("path")
      .on("click", (feature) => {
        selectGeoCountry(feature);
      })
      .attr("class", "country")
      .transition()
      .duration(1000)
      .attr("d", (feature) => pathGenerator(feature))
      .attr("fill", (data) => {
        const city = data.properties.CTP_KOR_NM;
        const localClimateData = geoClimateData[city];
        const value = localClimateData[selectedCategory];

        return value ? colorScale(value) : "#fff";
      });
  }, [
    width,
    height,
    geoJson,
    geoClimateData,
    selectGeoCountry,
    selectedCountry,
    selectedCategory,
    colorDomain,
    colorRange,
  ]);

  return (
    <g ref={contentRef} className="countries">
      <path className="country" />
    </g>
  );
};