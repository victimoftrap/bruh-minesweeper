import * as types from '@/store/game/mutationTypes';

import Point from '@/engine/models/cell/Point';
import GameEngine from '@/engine/GameEngine';

import { getDifficultyLevelByName } from '@/engine/models/level/levelResolvers';

export default {
  [types.CHOOSE_GAME_LEVEL](state: any, levelName: string) {
    const gameConfig = getDifficultyLevelByName(levelName);
    state.gameConfig = gameConfig;
  },

  [types.START_NEW_GAME](state: any) {
    console.log('a');
    const game = GameEngine.newGame(state.gameConfig);
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
