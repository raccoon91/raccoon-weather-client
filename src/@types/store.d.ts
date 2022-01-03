interface ICity {
  id: number;
  name: string;
  korName: string;
}

interface IWeatherData {
  city: ICity;
  date: string;
  humid: number;
  id: number;
  rain: number;
  rainType: number;
  temp: number;
  wind: number;
  windDirection: number;
  pm10: number;
  pm25: number;
}

interface IForecastData {
  date: string;
  sky: number;
  temp: number;
  rain: number;
  rainType: number;
  rainProb: number;
  humid: number;
  wind: number;
  windDirection: number;
}

interface ITodayForecast {
  date: string;
  sky: number;
  temp: number;
  feel: number;
  rain: number;
  wind: number;
  humid: number;
}

interface ITodayWeather {
  search: string;
  city: ICity | null;
  today: string;
  sky: number;
  temp: number;
  feel: number;
  humid: number;
  rain: number;
  pm10: number;
  pm25: number;
  wind: number;
  windDirection: number;
  todayForcast: ITodayForecast[];
}

interface IClimate {
  years: string[];
  tempClimates: number[][];
  rainClimates: number[];
}
