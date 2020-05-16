import mutations from '@/store/game/mutations';
import getters from '@/store/game/getters';

import VuexGameState from '@/store/game/VuexGameState';
import GameEngine from '@/engine/GameEngine';
import { levels } from '@/engine/models/level/Levels';

const state: VuexGameState = {
  game: GameEngine.newGame(levels.beginner),
};

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: {},
  getters: getters,
};
