import Cell from '@/engine/models/cell/Cell';
import Point from '@/engine/models/cell/Point';

class GameField {
  private readonly _fieldArray: Array<Array<Cell>>

  constructor(
    private _rows: number,
    private _columns: number,
  ) {
    this._fieldArray = new Array<Array<Cell>>(_rows);
    for (let i = 0; i < _rows; i += 1) {
      this._fieldArray[i] = new Array<Cell>(_columns);
    }
  }

  get rows(): number {
    return this._rows;
  }

  get columns(): number {
    return this._columns;
  }

  get fieldArray(): Array<Array<Cell>> {
    return this._fieldArray;
  }

  public getCell(point: Point): Cell {
    return this._fieldArray[point.x][point.y];
  }

  public setCell(cell: Cell) {
    this._fieldArray[cell.point.x][cell.point.y] = cell;
  }
}

export default GameField;
