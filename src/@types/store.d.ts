interface ICurrentWeather {
  city: string;
  today: string;
  temp: string;
  sky: string;
}

interface ITodayForecast {
  date: string;
  sky: string;
  temp: string;
  feel: string;
  rain: string;
  wind: string;
  humid: string;
}

interface ITodayWeather {
  feel: string;
  humid: string;
  rain: string;
  pm10: string;
  pm25: string;
  wind: string;
  todayForcast: ITodayForecast[];
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
