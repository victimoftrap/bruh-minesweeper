export default class GameLevel {
  constructor(
    private readonly _name: string,
    private readonly _rows: number,
    private readonly _columns: number,
    private readonly _mines: number,
  ) {
  }

  get name(): string {
    return this._name;
  }

  get rows(): number {
    return this._rows;
  }

  get columns(): number {
    return this._columns;
  }

  get mines(): number {
    return this._mines;
  }
}
