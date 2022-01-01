interface IWeatherData {
  date: string;
  humid: number;
  id: number;
  rain: number;
  rainType: number;
  temp: number;
  wind: number;
  windDirection: number;
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
  city: string;
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
