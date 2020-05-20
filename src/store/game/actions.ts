import * as types from '@/store/game/mutationTypes';

import Point from '@/engine/models/cell/Point';

export default {
  startNewGame(context: any, levelName: string): void {
    context.commit(types.START_NEW_GAME, levelName);
  },

  openCell(context: any, point: Point): void {
    context.commit(types.OPEN_CELL, point);
  },

  cellRightAction(context: any, point: Point): void {
    context.commit(types.CELL_RIGHT_ACTION, point);
  },
};
