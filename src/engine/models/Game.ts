import GameLevel from '@/engine/models/level/GameLevel';
import GameField from '@/engine/models/GameField';

export default class Game {
  constructor(
        private _level: GameLevel,
        private _field: GameField,
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

  get minesFlagged(): number {
    return this._minesFlagged;
  }

  set minesFlagged(minesFlagged: number) {
    this._minesFlagged = minesFlagged;
  }
}
