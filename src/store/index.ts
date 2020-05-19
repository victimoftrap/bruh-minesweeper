import Vue from 'vue';
import Vuex from 'vuex';

import game from '@/store/game/game';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    game,
  },
});
