import * as types from '@/store/game/mutationTypes';

import Point from '@/engine/models/cell/Point';
import GameEngine from '@/engine/GameEngine';

import { getDifficultyLevelByName } from '@/engine/models/level/levelResolvers';
import { MinesGeneration } from '@/engine/models/game/MinesGeneration';

export default {
  [types.CHOOSE_GAME_LEVEL](state: any, levelName: string) {
    const levelConfig = getDifficultyLevelByName(levelName);
    state.levelConfig = levelConfig;
  },

  [types.CHOOSE_MINES_GENERATION](state: any, mines: MinesGeneration) {
    state.minesGeneration = mines;
  },

  [types.START_NEW_GAME](state: any) {
    const game = GameEngine.newGame(state.levelConfig, state.minesGeneration);
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
