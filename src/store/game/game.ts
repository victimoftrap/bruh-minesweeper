import mutations from '@/store/game/mutations';
import getters from '@/store/game/getters';
import actions from '@/store/game/actions';

const state: any = {
  levelConfig: {},
  minesGeneration: 'OnStart',
  game: {},
  battlefieldArray: [],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
