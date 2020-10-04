import React from "react";

export const Chart = (props) => {
  const { chartId, width, height, overflow, chartDataList, children } = props;

  return (
    <svg
      id={chartId}
      width={width}
      height={height}
      overflow={overflow || "visible"}
    >
      {children &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              chartId,
              width,
              height,
              chartDataList,
            });
          }
        })}
    </svg>
  );
};
