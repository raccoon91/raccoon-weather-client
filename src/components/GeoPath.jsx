import React, { useRef, useEffect } from "react";
import { toJS } from "mobx";
import { useObserver } from "mobx-react";
import { select, geoPath, geoMercator, scaleThreshold } from "d3";
import { Card } from "src/components";
import { useStores, useResizeObserver } from "src/hooks";
import "./GeoPath.scss";

const useWeatherStore = () => {
  const { store } = useStores();

  return useObserver(() => ({
    getCurrentWeather: store.getCurrentWeather,
    getGeoJson: store.getGeoJson,
    getClimate: store.getClimate,
    selectGeoCountry: store.selectGeoCountry,
    geoJson: toJS(store.geoJson),
    climate: toJS(store.climate),
    selectedCountry: toJS(store.selectedCountry),
  }));
};

const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const colorDomain = [0, 50, 100, 150, 200, 250];
const colorRange = [
  "#ffffff",
  "#eff3ff",
  "#bdd7e7",
  "#6baed6",
  "#3182bd",
  "#08519c",
];

export const GeoPath = () => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const {
    getCurrentWeather,
    getGeoJson,
    getClimate,
    selectGeoCountry,
    geoJson,
    climate,
    selectedCountry,
  } = useWeatherStore();

  useEffect(() => {
    getCurrentWeather();
    getClimate();
    getGeoJson();
  }, [getCurrentWeather, getGeoJson, getClimate]);

  useEffect(() => {
    if (!geoJson || !climate) return;

    console.log("rerender");

    const { width: innerWidth, height: innerHeight } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const width = innerWidth - margin.right - margin.left;
    const height = innerHeight - margin.top - margin.bottom;

    const svg = select(svgRef.current);

    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || geoJson)
      .precision(100);

    const pathGenerator = geoPath().projection(projection);

    const colorScale = scaleThreshold()
      .domain(colorDomain.slice(1))
      .range(colorRange);

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .select(".countries")
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
        const values = climate[city];

        if (values) {
          return colorScale(values.rn1);
        } else {
          return "#fff";
        }
      });

    const legends = svg
      .select(".legend")
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
  }, [geoJson, dimensions, selectedCountry, climate, selectGeoCountry]);

  const selectedCity = selectedCountry?.properties.CTP_KOR_NM || "전국";

  return (
    <Card title={selectedCity}>
      <div ref={wrapperRef} className="geo-path-container">
        <svg ref={svgRef}>
          <g className="countries">
            <path className="country" />
          </g>
          <g className="legend" />
        </svg>
      </div>
    </Card>
  );
};
