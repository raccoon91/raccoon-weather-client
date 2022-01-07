export const chartTheme = {
  blue: "#4d99f0",
  green: "#31a354",
  yellow: "#ffd60a",
  red: "#dc2f02",
  black: "#000000",
};

const tempRange = [-20, 35];
const percentRange = [0, 20, 40, 60, 80, 100];
const pm10Range = [0, 30, 80, 150, 200];
const pm25Range = [0, 15, 35, 75, 100];

const percentChartColor = chartTheme.blue;
const airChartColor = [chartTheme.blue, chartTheme.green, chartTheme.yellow, chartTheme.red];

export const tempChartOptions = {
  range: tempRange,
  colors: percentChartColor,
  defaultTicks: [0],
};

export const percentChartOptions = {
  range: percentRange,
  colors: percentChartColor,
};

export const pm10ChartOptions = {
  range: pm10Range,
  colors: airChartColor,
};

export const pm25ChartOptions = {
  range: pm25Range,
  colors: airChartColor,
};
