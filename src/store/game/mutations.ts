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

  [types.CELL_RIGHT_ACTION](state: any, point: Point) {
    GameEngine.cellRightAction(state.game, point);
  },
};
