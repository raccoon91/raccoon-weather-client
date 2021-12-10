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

interface IClimate {
  tempChartDataList: IChartData[];
}
