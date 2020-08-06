import * as types from '@/store/game/mutationTypes';

import Point from '@/engine/models/cell/Point';

export default {
  chooseGameLevel(context: any, levelName: string): void {
    context.commit(types.CHOOSE_GAME_LEVEL, levelName);
  },

  startNewGame(context: any, levelName: string): void {
    context.commit(types.START_NEW_GAME);
  },

  openCell(context: any, point: Point): void {
    context.commit(types.OPEN_CELL, point);
  },

  cellRightAction(context: any, point: Point): void {
    context.commit(types.CELL_RIGHT_ACTION, point);
  },
};
