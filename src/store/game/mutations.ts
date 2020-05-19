import * as types from '@/store/game/mutationTypes';

import Point from '@/engine/models/cell/Point';
import GameEngine from '@/engine/GameEngine';

export default {
  [types.START_NEW_GAME](state: any, levelName: string) {
    const game = GameEngine.newGame(levelName);
    state.game = game;
    state.battlefieldArray = game.field.fieldArray;
  },

  [types.OPEN_CELL](state: any, point: Point) {
    GameEngine.openCell(state.game, point);
  },

  [types.FLAG_CELL](state: any, point: Point) {
    GameEngine.flagCell(state.game, point);
  },

  [types.UNKNOWN_CELL](state: any, point: Point) {
    GameEngine.unknownCell(state.game, point);
  },

  [types.UNMARK_CELL](state: any, point: Point) {
    GameEngine.unmarkCell(state.game, point);
  },
};
