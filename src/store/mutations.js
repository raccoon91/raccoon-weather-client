import * as types from './mutation-types';

export default {
  [types.CURRENT_WEATHER](state, payload) {
    state.weather = payload;
  },
  [types.RAIN_PROPBABILITY](state, payload) {
    state.rainProb = payload;
  },
  [types.HUMIDITY](state, payload) {
    state.humidity = payload;
  },
  [types.TEMPERATURE](state, payload) {
    state.temp = payload;
  },
  [types.CATEGORIES](state, payload) {
    state.categories = payload;
  },
  [types.CONDITION](state, payload) {
    state.condition = payload;
  },
};
