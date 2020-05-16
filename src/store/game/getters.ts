import VuexGameState from '@/store/game/VuexGameState';

import Point from '@/engine/models/cell/Point';
import Cell from '@/engine/models/cell/Cell';

export default {
  getBattlefieldRows: (state: VuexGameState): number => {
    return state.game.field.rows;
  },

  getBattlefieldColumns: (state: VuexGameState): number => {
    return state.game.field.columns;
  },

  getCell: (state: VuexGameState, point: Point): Cell => {
    return state.game.field.getCell(point);
  },

  getPlantedMines: (state: VuexGameState): number => {
    return state.game.level.mines;
  },

  getFlaggedMines: (state: VuexGameState): number => {
    return state.game.minesFlagged;
  }
}
