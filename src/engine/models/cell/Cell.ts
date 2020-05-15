import Point from '@/engine/models/cell/Point';
import CellState from '@/engine/models/cell/CellState';

export default class Cell {
  constructor(
    private _point: Point,
    private _state: CellState,
    private _minesAround: number = 0,
    private _isMine: boolean = false,
  ) {
  }

  get point(): Point {
    return this._point;
  }

  get state(): CellState {
    return this._state;
  }

  set state(state: CellState) {
    this._state = state;
  }

  get minesAround(): number {
    return this._minesAround;
  }

  set minesAround(minesAround: number) {
    this._minesAround = minesAround;
  }

  get isMine(): boolean {
    return this._isMine;
  }

  set isMine(isMine: boolean) {
    this._isMine = isMine;
  }
}
