import Point from '@/engine/models/cell/Point';
import Cell from '@/engine/models/cell/Cell';

export default {
  getBattlefieldRows: (state: any): number => state.game.field.rows,

  getBattlefieldColumns: (state: any): number => state.game.field.columns,

  getCell: (state: any, point: Point): Cell => state.game.field.getCell(point),

  getPlantedMines: (state: any): number => state.game.level.mines,

  getFlaggedMines: (state: any): number => state.game.minesFlagged,
};
