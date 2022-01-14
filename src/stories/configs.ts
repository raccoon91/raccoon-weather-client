export const colorOptions = ["black", "white", "blue", "skyBlue", "gray", "darkGray", "background"];

export const textSizeOptions = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];

export const titleSizeOptions = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"];

export const variantOptions = ["primary", "primary-outline"];

export const weatherOptions: { [key: string]: { sky: number; rainType: number; date: string } } = {
  Day: { sky: 1, rainType: 0, date: "2022-01-01 08:00" },
  Night: { sky: 1, rainType: 0, date: "2022-01-01 20:00" },
  CloudDay: { sky: 3, rainType: 0, date: "2022-01-01 08:00" },
  CloudNight: { sky: 3, rainType: 0, date: "2022-01-01 20:00" },
  Cloud: { sky: 2, rainType: 0, date: "2022-01-01 08:00" },
  RainyDay: { sky: 3, rainType: 1, date: "2022-01-01 08:00" },
  RainyNight: { sky: 3, rainType: 1, date: "2022-01-01 20:00" },
  RainDrop: { sky: 3, rainType: 4, date: "2022-01-01 20:00" },
  SnowyDay: { sky: 3, rainType: 2, date: "2022-01-01 08:00" },
  SnowyNight: { sky: 3, rainType: 2, date: "2022-01-01 20:00" },
};

export const labelsMockData = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"];

export const lineChartMockData = [10, 12, 11, 10, 9, 8, 8, 10];

export const barChartMockData = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

export const scatterPlotMockData = [
  [30, 31, 32, 33, 34, 35],
  [34, 35, 36],
  [30, 31, 33, 34, 35, 36],
  [31, 35, 36],
  [31, 33, 34],
  [31, 33, 34],
  [30, 31, 32, 33, 34, 34.5, 35],
  [31, 32, 33, 34, 35],
  [31, 32, 33, 34, 35],
  [31, 32, 33, 33.5, 34, 35],
];

export const gradientLineChartMockData = [-0.4, 0, 0.2, 0.3, -0.2, 0, -0.1, 0.2, 0.5, 0.6];
