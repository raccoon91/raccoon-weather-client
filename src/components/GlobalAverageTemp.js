import React, { useState, useEffect, useRef } from "react";
import {
  csv,
  select,
  max,
  scaleLinear,
  axisBottom,
  axisLeft,
  line,
  curveBundle,
} from "d3";
import useResizeObserver from "../hooks/useResizeObserver";

const url =
  "https://gist.githubusercontent.com/raccoon91/b9da66f767d228e21729d926c0aefe12/raw/0d0f47ecc775a443efc45bbedf2d804dcc1bfb75/globalAnnuallyTemperature.csv";

const margin = { top: 10, right: 10, bottom: 25, left: 25 };

export const GlobalAverageTemp = () => {
  const [data, setData] = useState(null);
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    csv(url).then(setData);
  }, []);

  useEffect(() => {
    if (!data) return;

    const { width: innerWidth, height: innerHeight } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const width = innerWidth - margin.right - margin.left;
    const height = innerHeight - margin.top - margin.bottom;

    const svg = select(svgRef.current);

    svg
      .attr("overflow", "visible")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const content = select(".content");

    const lineGenerator = line()
      .x((data) => xScale(data.YEAR))
      .y((data) => yScale(data.VALUE))
      .curve(curveBundle.beta(1));

    const xScale = scaleLinear().domain([1880, 2020]).range([0, width]);

    const yScale = scaleLinear()
      .domain([-0.5, max(data, (data) => Number(data.VALUE))])
      .range([height, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(5)
      .tickSizeOuter(0)
      .tickFormat((value) => value);

    const yAxis = axisLeft(yScale)
      .ticks(4)
      .tickSizeOuter(0)
      .tickFormat((value) => String(value));

    content
      .selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("r", 2)
      .attr("fill", "none")
      .attr("stroke", "darkgray")
      .attr("stroke-width", 1)
      .attr("cx", (data) => xScale(Number(data.YEAR)))
      .attr("cy", (data) => yScale(Number(data.VALUE)));

    content
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#E74C3C")
      .attr("stroke-width", 3)
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
      .attr("stroke", "darkgray")
      .attr("shape-rendering", "crispedges");
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} className="svg-wrapper">
      <svg ref={svgRef}>
        <defs>
          <clipPath id="global-temp">
            <rect x="0" y="0" width="100%" height="100%" />
          </clipPath>
        </defs>
        <g className="x-axis" />
        <g className="y-axis" />
        <path className="vertical-line" />
        <g className="content" clipPath="url(#global-temp)" />
      </svg>
    </div>
  );
};
