interface ICity {
  id: number;
  name: string;
  korName: string;
}

interface IWeatherData {
  city: ICity;
  date: string;
  sky: number;
  temp: number;
  rain: number;
  rainType: number;
  wind: number;
  windDirection: number;
  humid: number;
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

interface IForecast {
  date: string;
  sky: number;
  temp: number;
  feel: number;
  rain: number;
  rainType: number;
  humid: number;
  wind: number;
  windDirection: number;
}

interface IWeather {
  city: ICity;
  today: string;
  sky: number;
  temp: number;
  feel: number;
  humid: number;
  rain: number;
  rainType: number;
  pm10: number;
  pm25: number;
  wind: number;
  windDirection: number;
}

interface ITodayWeather {
  search: string;
  weather: IWeather | null;
  forecasts: IForecast[] | null;
}

interface IClimate {
  years: string[] | null;
  tempClimates: number[][] | null;
  feelTempClimates: number[][] | null;
  rainClimates: number[] | null;
}
