import React, { useState, useEffect, useRef } from "react";
import { csv, select, scaleLinear, min, max, axisBottom } from "d3";

const url =
  "https://gist.githubusercontent.com/raccoon91/b9da66f767d228e21729d926c0aefe12/raw/46d8062a215923c5d1d58189374ad1935673feb1/globalTemperature.csv";

const width = 400;
const height = 400;

const App = () => {
  const [data, setData] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    csv(url).then(setData);
  }, []);

  useEffect(() => {
    if (!data) return;

    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([
        min(data, (data) => Number(data.Year)),
        max(data, (data) => Number(data.Year)),
      ])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([
        min(data, (data) => Number(data.Jan)),
        max(data, (data) => Number(data.Jan)),
      ])
      .range([height, 0]);

    const xAxis = axisBottom(xScale).tickFormat((value) => value);

    svg
      .selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("r", 1)
      .attr("cx", (data) => xScale(data.Year))
      .attr("cy", (data) => yScale(data.Jan));

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);
  }, [data]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default App;
