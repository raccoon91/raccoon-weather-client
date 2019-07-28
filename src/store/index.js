import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: null,
    weather: null,
    rainProb: null,
    humidity: null,
    temp: null,
    categories: null,
    condition: null,
    tomorrow: null,
  },
  getters,
  mutations,
  actions,
});
