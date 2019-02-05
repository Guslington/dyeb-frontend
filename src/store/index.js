import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist'

import user from '@/store/user';
import beers from '@/store/beers';
import competitions from '@/store/competitions';
import scorecards from '@/store/scorecards';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'dyeb',
  storage: localStorage
})

const store = new Vuex.Store({
  plugins: [vuexPersist.plugin],

  state: {},

  modules: {
    user,
    competitions,
    scorecards,
    beers
  }
});

export default store;
