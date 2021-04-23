import * as types from '@/store/game/mutationTypes';

import Point from '@/engine/models/cell/Point';
import { MinesGeneration } from '@/engine/models/game/MinesGeneration';

export default {
  chooseGameLevel(context: any, levelName: string): void {
    context.commit(types.CHOOSE_GAME_LEVEL, levelName);
  },

  chooseMinesGeneration(context: any, mines: MinesGeneration): void {
    context.commit(types.CHOOSE_MINES_GENERATION, mines);
  },

  startNewGame(context: any): void {
    context.commit(types.START_NEW_GAME);
  },

  openCell(context: any, point: Point): void {
    context.commit(types.OPEN_CELL, point);
  },

  cellRightAction(context: any, point: Point): void {
    context.commit(types.CELL_RIGHT_ACTION, point);
  },
};
