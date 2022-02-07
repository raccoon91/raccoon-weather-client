export const desktopTodayGrid: IItemGrid[] = [
  { column: "1/7", row: "1/4" },
  { column: "7/13", row: "1/4" },
  { column: "13/19", row: "1/4" },
  { column: "1/7", row: "4/7" },
  { column: "7/13", row: "4/7" },
  { column: "13/19", row: "4/7" },
  { column: "1/19", row: "7/13" },
];

export const mobileTodayGrid: IItemGrid[] = [
  { column: "1/10", row: "1/4" },
  { column: "10/19", row: "1/4" },
  { column: "1/10", row: "4/7" },
  { column: "10/19", row: "4/7" },
  { column: "1/10", row: "7/10" },
  { column: "10/19", row: "7/10" },
  { column: "1/19", row: "10/18" },
];

export const desktopClimateGrid: IItemGrid[] = [
  { column: "1/9", row: "1/9" },
  { column: "9/19", row: "1/5" },
  { column: "9/19", row: "5/9" },
  { column: "1/19", row: "9/14" },
];

export const mobileClimateGrid: IItemGrid[] = [
  { column: "1/19", row: "1/5" },
  { column: "1/19", row: "5/9" },
  { column: "1/19", row: "9/13" },
  { column: "1/19", row: "13/17" },
];

export const dashboardItems: { [key: string]: IBoardItem } = {
  feel: {
    id: 1,
    category: "weather",
    name: "feel",
    title: "체감온도",
    unit: "°C",
    desktop: "6x3",
    mobile: "9x3",
  },
  rainProb: {
    id: 2,
    category: "weather",
    name: "rainProb",
    title: "강수확률",
    unit: "%",
    desktop: "6x3",
    mobile: "9x3",
  },
  covid: {
    id: 3,
    category: "weather",
    name: "covid",
    title: "확진자",
    unit: "명",
    desktop: "6x3",
    mobile: "9x3",
  },
  pm10: {
    id: 4,
    category: "weather",
    name: "pm10",
    title: "미세먼지(PM10)",
    unit: "㎍/㎥",
    desktop: "6x3",
    mobile: "9x3",
  },
  pm25: {
    id: 5,
    category: "weather",
    name: "pm25",
    title: "미세먼지(PM25)",
    unit: "㎍/㎥",
    desktop: "6x3",
    mobile: "9x3",
  },
  wind: {
    id: 6,
    category: "weather",
    name: "wind",
    title: "바람",
    unit: "m/s",
    desktop: "6x3",
    mobile: "9x3",
  },
  forecast: {
    id: 7,
    category: "forecast",
    name: "forecast",
    title: "오늘의 날씨",
    desktop: "18x6",
    mobile: "18x8",
  },
};

export const defaultDashboard = [
  dashboardItems.feel,
  dashboardItems.rainProb,
  dashboardItems.covid,
  dashboardItems.pm10,
  dashboardItems.pm25,
  dashboardItems.wind,
  dashboardItems.forecast,
];
