import axios from 'axios';
import * as types from './mutation-types';

export const setWeather = async ({ commit }) => {
  const response = await axios.get('http://localhost:3000/weather');

  commit(types.CURRENT_WEATHER, response.data);
};

export const setRainProb = async ({ commit }) => {
  const response = await axios.get('http://localhost:3000/weather/rain');

  commit(types.RAIN_PROPBABILITY, response.data);
};
