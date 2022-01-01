const tempRange = [-20, 35];
const percentRange = [0, 20, 40, 60, 80, 100];
const pm10Range = [0, 30, 80, 150, 200];
const pm25Range = [0, 15, 35, 75, 100];

const percentChartColor = "#4d99f0";
const airChartColor = ["#4d99f0", "#31a354", "#ffd60a", "#dc2f02"];

export const tempChartOptions = {
  range: tempRange,
  colors: percentChartColor,
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
