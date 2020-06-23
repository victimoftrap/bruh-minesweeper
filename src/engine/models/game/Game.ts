import GameField from '@/engine/models/game/GameField';
import GameLevel from '@/engine/models/level/GameLevel';

export default class Game {
  constructor(
    private _level: GameLevel,
    private _field: GameField,
    private _cellsFlagged: number = 0,
    private _minesFlagged: number = 0,
  ) {
  }

  get level(): GameLevel {
    return this._level;
  }

  set level(level: GameLevel) {
    this._level = level;
  }

  get field(): GameField {
    return this._field;
  }

  set field(field: GameField) {
    this._field = field;
  }

  get cellsFlagged(): number {
    return this._cellsFlagged;
  }

  set cellsFlagged(cellsFlagged: number) {
    this._cellsFlagged = cellsFlagged;
  }

  get minesFlagged(): number {
    return this._minesFlagged;
  }

  set minesFlagged(minesFlagged: number) {
    this._minesFlagged = minesFlagged;
  }
}
