import mutations from '@/store/game/mutations';
import getters from '@/store/game/getters';
import actions from '@/store/game/actions';

const state: any = {
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
