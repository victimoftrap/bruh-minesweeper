import * as types from '@/store/game/mutationTypes';

import VuexGameState from "@/store/game/VuexGameState";
import GameLevel from '@/engine/models/level/GameLevel';
import Point from '@/engine/models/cell/Point';
import GameEngine from '@/engine/GameEngine';

export default {
  [types.START_NEW_GAME](state: VuexGameState, level: GameLevel) {
    state.game = GameEngine.newGame(level);
  },

  [types.OPEN_CELL](state: VuexGameState, point: Point) {
    GameEngine.openCell(state.game, point);
  },

  [types.FLAG_CELL](state: VuexGameState, point: Point) {
    GameEngine.flagCell(state.game, point);
  },

  [types.UNKNOWN_CELL](state: VuexGameState, point: Point) {
    GameEngine.unknownCell(state.game, point);
  },

  [types.UNMARK_CELL](state: VuexGameState, point: Point) {
    GameEngine.unmarkCell(state.game, point);
  }
};
