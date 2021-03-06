import GameField from '@/engine/models/game/GameField';
import GameConfiguration from '@/engine/models/level/GameConfiguration';
import { GameState } from './GameState';
import { MinesGeneration } from './MinesGeneration';

export default class Game {
  constructor(
    private _level: GameConfiguration,
    private _minesGeneration: MinesGeneration,
    private _field: GameField,
    private _state: GameState = 'RUNNING',
    private _cellsFlagged: number = 0,
    private _minesFlagged: number = 0,
  ) {
  }

  get level(): GameConfiguration {
    return this._level;
  }

  set level(level: GameConfiguration) {
    this._level = level;
  }

  get minesGeneration(): MinesGeneration {
    return this._minesGeneration;
  }

  set minesGeneration(generation: MinesGeneration) {
    this._minesGeneration = generation;
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

  get state(): GameState {
    return this._state;
  }

  set state(gameState: GameState) {
    this._state = gameState;
  }
}
