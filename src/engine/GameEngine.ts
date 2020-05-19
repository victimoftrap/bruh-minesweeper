import Point from '@/engine/models/cell/Point';
import Cell from '@/engine/models/cell/Cell';
import CellState from '@/engine/models/cell/CellState';
import Game from '@/engine/models/game/Game';
import GameLevel from '@/engine/models/level/GameLevel';
import GameField from '@/engine/models/game/GameField';

import { getLevelByName } from '@/engine/models/level/Levels';

export default class GameEngine {
  private static readonly cellPointCircle: Array<Point> = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

  private static initGameField(rows: number, columns: number): GameField {
    const gameField: GameField = new GameField(rows, columns);
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        gameField.setCell(
          new Cell({ x: i, y: j }, CellState.CLOSED),
        );
      }
    }
    return gameField;
  }

  private static generateMinesOnField(level: GameLevel, gameField: GameField): void {
    const minesPoints: Array<Point> = new Array<Point>();

    while (minesPoints.length != level.mines) {
      const point: Point = {
        x: Math.floor(Math.random() * level.rows),
        y: Math.floor(Math.random() * level.columns),
      };

      if (!minesPoints.includes(point)) {
        minesPoints.push(point);
        gameField.getCell(point).isMine = true;
      }
    }
  }

  private static getPointsAround(point: Point, rows: number, columns: number): Array<Point> {
    return this.cellPointCircle
      .map((pointAround: Point) => ({
        x: point.x + pointAround.x,
        y: point.y + pointAround.y,
      }))
      .filter((pointAround: Point) => pointAround.x >= 0
        && pointAround.x < rows
        && pointAround.y >= 0
        && pointAround.y < columns);
  }

  private static setMinesAround(gameField: GameField): void {
    for (let i = 0; i < gameField.rows; i += 1) {
      for (let j = 0; j < gameField.columns; j += 1) {
        const cell: Cell = gameField.getCell({ x: i, y: j });

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

  public static newGame(levelName: string): Game {
    const level: GameLevel = getLevelByName(levelName);
    const gameField: GameField = this.initGameField(level.rows, level.columns);

    this.generateMinesOnField(level, gameField);
    this.setMinesAround(gameField);
    return new Game(level, gameField);
  }

  public static openCell(game: Game, point: Point): void {
    const cell: Cell = game.field.getCell(point);
    if (cell.state === CellState.FLAGGED) {
      return;
    }
    if (cell.isMine) {
      this.explodeAndOpedAllCells(game);
    }

    cell.state = CellState.OPENED;
    this.recursiveCellOpening(game, point);
  }

  private static explodeAndOpedAllCells(game: Game): void {
    game.field.fieldArray
      .forEach((fieldRow: Array<Cell>) => {
        fieldRow.forEach((aCell: Cell) => {
          if (aCell.state === CellState.CLOSED) {
            aCell.state = CellState.OPENED;
          }
          if (aCell.isMine) {
            aCell.state = CellState.EXPLODED;
          }
        });
      });
  }

  private static recursiveCellOpening(game: Game, startPoint: Point): void {
    const gameField: GameField = game.field;

    this.getPointsAround(startPoint, gameField.rows, gameField.columns)
      .forEach((pointAround: Point) => {
        const cell: Cell = gameField.getCell(pointAround);
        if (cell.state === CellState.CLOSED && !cell.isMine) {
          cell.state = CellState.OPENED;
        }
        if (cell.minesAround !== 0) {
          return;
        }
        this.recursiveCellOpening(game, cell.point);
      });
  }

  public static flagCell(game: Game, point: Point): void {
    const cell: Cell = game.field.getCell(point);
    if (cell.state === CellState.CLOSED) {
      cell.state = CellState.FLAGGED;
      if (cell.isMine) {
        game.minesFlagged += 1;
      }
    }
  }

  public static unknownCell(game: Game, point: Point): void {
    const cell: Cell = game.field.getCell(point);
    if (cell.state === CellState.FLAGGED) {
      cell.state = CellState.UNKNOWN;
    }
  }

  public static unmarkCell(game: Game, point: Point): void {
    const cell: Cell = game.field.getCell(point);
    cell.state = CellState.CLOSED;
  }

  public static isMinesCovered(game: Game): boolean {
    return game.minesFlagged === game.level.mines;
  }
}
