import Point from '@/engine/models/cell/Point';
import Cell from '@/engine/models/cell/Cell';
import CellState from '@/engine/models/cell/CellState';
import Game from '@/engine/models/Game';
import GameLevel from '@/engine/models/level/GameLevel';
import GameField from '@/engine/models/GameField';

export default class GameEngine {
  private static readonly cellPointCircle: Array<Point> = [
    {x: -1, y: -1},
    {x: 0, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 0},
    {x: 1, y: 0},
    {x: -1, y: 1},
    {x: 0, y: 1},
    {x: 1, y: 1},
  ];

  private static game: Game;

  private static initGameField(rows: number, columns: number): GameField {
    const gameField: GameField = new GameField(rows, columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        gameField.setCell(
          new Cell({x: i, y: j}, CellState.CLOSED),
        );
      }
    }
    return gameField;
  }

  private static generateMinesOnField(level: GameLevel, gameField: GameField) {
    for (let i = 0; i < level.mines; i++) {
      const xCoordinate: number = Math.random() * level.rows;
      const yCoordinate: number = Math.random() * level.columns;

      gameField.getCell({
        x: xCoordinate,
        y: yCoordinate,
      })
        .isMine = true;
    }
  }

  private static getPointsAround(point: Point, rows: number, columns: number): Array<Point> {
    return this.cellPointCircle
      .map((pointAround: Point) => ({
        x: point.x + pointAround.x,
        y: point.y + pointAround.y,
      }))
      .filter((pointAround: Point) => () => pointAround.x >= 0
        && pointAround.x < rows
        && pointAround.y >= 0
        && pointAround.y < columns
      );
  }

  private static setMinesAround(gameField: GameField) {
    for (let i = 0; i < gameField.rows; i++) {
      for (let j = 0; j < gameField.columns; j++) {
        const cell: Cell = gameField.getCell({x: i, y: j});

        this.getPointsAround(cell.point, gameField.rows, gameField.columns)
          .forEach((pointAround: Point) => {
            let minesAround = 0;
            if (gameField.getCell(pointAround).isMine) {
              minesAround += 1;
            }
            cell.minesAround = minesAround;
          });
      }
    }
  }

  public static newGame(level: GameLevel): Game {
    const gameField: GameField = this.initGameField(level.rows, level.columns);

    this.generateMinesOnField(level, gameField);
    this.setMinesAround(gameField);
    this.game = new Game(level, gameField);
    return this.game;
  }

  public static openCell(point: Point) {
    const cell: Cell = this.game.field.getCell(point);
    if (cell.state === CellState.FLAGGED) {
      return;
    }
    if (cell.isMine) {
      this.game.field.fieldArray
        .filter((aCell: Cell) => aCell.isMine)
        .forEach((minedCell: Cell) => minedCell.state = CellState.EXPLODED);
    }

    cell.state = CellState.OPENED;
    this.recursiveCellOpening(point);
  }

  private static recursiveCellOpening(startPoint: Point) {
    const gameField: GameField = this.game.field;

    this.getPointsAround(startPoint, gameField.rows, gameField.columns)
      .forEach((pointAround: Point) => {
        const cell: Cell = gameField.getCell(pointAround);
        if (cell.state === CellState.CLOSED && !cell.isMine) {
          cell.state = CellState.OPENED;
        }
        if (cell.minesAround !== 0) {
          return;
        }
        this.recursiveCellOpening(cell.point);
      });
  }

  public static flagCell(point: Point) {
    const cell: Cell = this.game.field.getCell(point);
    if (cell.state === CellState.CLOSED) {
      cell.state = CellState.FLAGGED;

      if (cell.isMine) {
        this.game.minesFlagged++;
      }
    }
  }

  public static unknownCell(point: Point) {
    const cell: Cell = this.game.field.getCell(point);
    if (cell.state === CellState.FLAGGED) {
      cell.state = CellState.UNKNOWN;
    }
  }

  public static isMinesCovered(): boolean {
    return this.game.minesFlagged === this.game.level.mines;
  }
}
