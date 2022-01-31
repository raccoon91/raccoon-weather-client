import dayjs from "dayjs";

export const chartTheme = {
  white: "#ffffff",
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

export const lineChartDefaultOptions = {
  chart: {
    paddingX: 0,
    paddingY: 5,
    yAxisWidth: 0,
    xAxisHeight: 0,
    displayYAxis: false,
    displayXAxis: false,
  },
  tick: {},
  draw: {
    paddingX: 0,
    paddingY: 0,
    dot: true,
    dotColor: chartTheme.blue,
    lineColor: chartTheme.blue,
  },
  data: {},
  animation: {
    on: true,
    duration: 3,
  },
  tooltip: {
    on: true,
    yLabel: "온도",
    xLabel: "시간",
    yFormatter: (value: number) => `${value}°C`,
    xFormatter: (label: string) => `${label}시`,
  },
};

export const barChartDefaultOptions = {
  chart: {
    paddingX: 5,
    paddingY: 8,
    yAxisWidth: 25,
    xAxisHeight: 10,
    displayYAxis: true,
    displayXAxis: true,
  },
  tick: {
    xTickMax: 10,
    xTickMin: 8,
    yTickIncrement: 500,
    yTickFormatter: (value: number) => value.toFixed(0),
  },
  draw: {
    paddingX: 1,
    paddingY: 1,
    barColor: chartTheme.blue,
  },
  data: {
    min: 0,
  },
  animation: {
    on: true,
    duration: 3,
  },
  tooltip: {
    on: true,
    yLabel: "강수량",
    xLabel: "년도",
    yFormatter: (value: number) => `${value}mm`,
    xFormatter: (label: string) => `${label}년`,
  },
};

export const scatterPlotDefaultOptions = {
  chart: {
    paddingX: 5,
    paddingY: 8,
    yAxisWidth: 25,
    xAxisHeight: 10,
    displayYAxis: true,
    displayXAxis: true,
  },
  tick: {
    xTickMax: 8,
    xTickMin: 6,
    yTickIncrement: 5,
  },
  draw: {
    paddingX: 5,
    paddingY: 5,
  },
  data: {
    min: 32,
    max: 40,
    range: 55,
  },
  animation: {
    on: true,
    duration: 3,
  },
  tooltip: {
    on: true,
    yLabel: "온도",
    xLabel: "년도",
    yFormatter: (value: number) => `${value}°C`,
    xFormatter: (label: string) => `${label}년`,
  },
};

export const gradientLineChartDefaultOptions = {
  chart: {
    paddingX: 5,
    paddingY: 8,
    yAxisWidth: 25,
    xAxisHeight: 10,
    displayYAxis: true,
    displayXAxis: true,
  },
  tick: {
    xTickMax: 16,
    xTickMin: 10,
    yTickIncrement: 0.5,
  },
  draw: {
    paddingX: 0,
    paddingY: 10,
  },
  data: {
    min: -0.5,
    max: 1,
  },
  animation: {
    on: true,
    duration: 3,
  },
  tooltip: {
    on: true,
    yLabel: "온도",
    xLabel: "년도",
    yFormatter: (value: number) => `${value}°C`,
    xFormatter: (label: string) => `${label}년`,
  },
};

export const covidChartOptions = {
  chart: {
    yAxisWidth: 35,
    xAxisHeight: 12,
    displayYAxis: true,
    displayXAxis: true,
  },
  tick: {
    xTickMax: 10,
    xTickMin: 8,
    yTickIncrement: 5000,
    xTickFormatter: (label: string) => dayjs(label).format("MM"),
  },
  draw: {
    paddingX: 3,
    paddingY: 0,
    dot: false,
  },
  animation: { duration: 2 },
  tooltip: {
    on: true,
    yLabel: "확진자",
    xLabel: "날짜",
    yFormatter: (value: number) => `${value}명`,
    xFormatter: (label: string) => dayjs(label).format("YYYY-MM-DD"),
  },
};

export const axisDefaultOptions = {
  alpha: 1,
  style: chartTheme.black,
};

export const tickDefaultOptions = {
  textAlpha: 1,
  textStyle: chartTheme.black,
  strokeAlpha: 1,
  strokeStyle: chartTheme.black,
};

export const dotDefaultOptions = {
  size: 3,
  color: chartTheme.blue,
  alpha: 0.5,
};

export const barDefaultOptions = {
  barColor: chartTheme.blue,
  barAlpha: 0.3,
  strokeColor: chartTheme.blue,
  strokeAlpha: 0.5,
  strokeWidth: 0.5,
};

export const lineDefaultOptions = {
  color: chartTheme.blue,
};
