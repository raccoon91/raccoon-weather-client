import React, { useState, useEffect, useRef } from "react";
import {
  csv,
  select,
  min,
  max,
  scaleLinear,
  axisBottom,
  axisLeft,
  line,
  curveBundle,
} from "d3";
import useResizeObserver from "../hooks/useResizeObserver";

const url =
  "https://gist.githubusercontent.com/raccoon91/b9da66f767d228e21729d926c0aefe12/raw/46d8062a215923c5d1d58189374ad1935673feb1/globalTemperature.csv";

const GlobalAverageTemp = () => {
  const [data, setData] = useState(null);
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    csv(url).then((response) => {
      const data = response.map((annual) => {
        const temp = { year: null, avg: 0 };

        Object.keys(annual).forEach((key) => {
          if (key !== "Year" && annual[key]) {
            temp.avg =
              Math.round(temp.avg + parseFloat(annual[key]) * 100) / 100;
          } else if (key === "Year") {
            temp.year = Number(annual[key]);
          }
        });

        return temp;
      });

      setData(data);
    });
  }, []);

  useEffect(() => {
    if (!data) return;

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const svg = select(svgRef.current);
    const content = select(".content");

    const lineGenerator = line()
      .x((data) => xScale(data.year))
      .y((data) => yScale(data.avg))
      .curve(curveBundle.beta(0.8));

    const xScale = scaleLinear()
      .domain([min(data, (data) => data.year), max(data, (data) => data.year)])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([-0.7, max(data, (data) => data.avg)])
      .range([height, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(5)
      .tickSizeOuter(0)
      .tickFormat((value) => value);

    const yAxis = axisLeft(yScale).ticks(4).tickSizeOuter(0);

    content
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#15dae3")
      .attr("stroke-width", 4)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength();

        return `${length} ${length}`;
      })
      .attr("stroke-dashoffset", function () {
        return this.getTotalLength();
      })
      .transition()
      .duration(3000)
      .attr("stroke-dashoffset", 0);

    content
      .selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("r", 2)
      .attr("fill", "#1034a6")
      .attr("opacity", 0)
      .attr("cx", (data) => xScale(data.year))
      .attr("cy", (data) => yScale(data.avg))
      .transition()
      .duration(1000)
      .delay(2000)
      .attr("opacity", 0.3);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("line")
      .attr("display", "none");

    svg.select(".y-axis").call(yAxis).selectAll("line").attr("display", "none");

    svg
      .select(".vertical-line")
      .attr("d", `M 0 ${yScale(0)} H ${width}`)
      .attr("fill", "none")
      .attr("stroke", "darkgrey");
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} className="global-temp-container">
      <svg ref={svgRef}>
        <defs>
          <clipPath id="global-temp">
            <rect x="0" y="0" width="100%" height="100%" />
          </clipPath>
        </defs>
        <g className="content" clipPath="url(#global-temp)" />
        <g className="x-axis" />
        <g className="y-axis" />
        <path className="vertical-line" />
      </svg>
    </div>
  );
};

export default GlobalAverageTemp;
