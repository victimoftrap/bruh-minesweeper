import Cell from '@/engine/models/cell/Cell';
import Point from '@/engine/models/cell/Point';

class GameField {
  private readonly _fieldArray: Array<Cell>

  constructor(
    private _rows: number,
    private _columns: number,
  ) {
    this._fieldArray = new Array<Cell>(_rows * _columns);
  }

  get rows(): number {
    return this._rows;
  }

  get columns(): number {
    return this._columns;
  }

  get fieldArray(): Array<Cell> {
    return this._fieldArray;
  }

  public getCell(point: Point): Cell {
    return this._fieldArray[point.x * this._rows + point.y];
  }

  public setCell(cell: Cell) {
    this._fieldArray[cell.point.x * this._rows + cell.point.y] = cell;
  }
}

export default GameField;
