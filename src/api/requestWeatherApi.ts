import axios from "axios";

const { REACT_APP_WEATHER_SERVER_URL } = process.env;

export const requestWeatherApi = axios.create({
  baseURL: REACT_APP_WEATHER_SERVER_URL,
});
