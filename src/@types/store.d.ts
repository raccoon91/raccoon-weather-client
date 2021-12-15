interface ICurrentWeather {
  city: string;
  today: string;
  temp: string;
  sky: string;
}

interface ITodayWeather {
  feel: string;
  humid: string;
  rain: string;
  pm10: string;
  pm25: string;
  wind: string;
}

interface IChartData {
  x: number;
  value: number;
}

interface IGlobalSurfaceAirTempData {
  x: number;
  value: number;
  lowess: number;
}

interface IClimate {
  tempChartDataList: IChartData[];
  rainChartDataList: IChartData[];
}
