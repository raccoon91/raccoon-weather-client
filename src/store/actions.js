import axios from 'axios';
import * as types from './mutation-types';

export const setWeather = async ({ commit }) => {
  const response = await axios.get('http://52.192.38.17:3000/weather');

  commit(types.CURRENT_WEATHER, response.data);
};

export const setForecast = async ({ commit }) => {
  const response = await axios.get('http://52.192.38.17:3000/weather/forecast');

  commit(types.CATEGORIES, response.data.categories);
  commit(types.RAIN_PROPBABILITY, response.data.rainProbData);
  commit(types.TEMPERATURE, response.data.tempData);
  commit(types.HUMIDITY, response.data.humidityData);
  commit(types.CONDITION, response.data.condition);
};
