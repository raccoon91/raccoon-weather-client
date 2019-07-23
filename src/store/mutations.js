import * as types from './mutation-types';

export default {
  [types.CURRENT_WEATHER](state, payload) {
    state.weather = payload;
  },
  [types.RAIN_PROPBABILITY](state, payload) {
    state.rainProb = payload;
  },
};
