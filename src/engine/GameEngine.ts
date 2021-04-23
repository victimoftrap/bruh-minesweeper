import Point from '@/engine/models/cell/Point';
import Cell from '@/engine/models/cell/Cell';
import CellState from '@/engine/models/cell/CellState';
import Game from '@/engine/models/game/Game';
import GameField from '@/engine/models/game/GameField';
import GameConfiguration from '@/engine/models/level/GameConfiguration';
import { MinesGeneration } from './models/game/MinesGeneration';

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

  private static firstlyClicked = false;

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
            cell.minesAround += minesAround;
          });
      }
    }
  }

  private static generateMinesOnField(
    level: GameConfiguration, gameField: GameField, skipPoint?: Point,
  ): void {
    const minesPoints: Array<Point> = new Array<Point>();

    let aroundSkip: Array<Point> = new Array<Point>();
    if (skipPoint !== undefined) {
      aroundSkip = this.getPointsAround(skipPoint, level.rows, level.columns);
      aroundSkip.push(skipPoint);
    }

    while (minesPoints.length < level.mines) {
      const point: Point = {
        x: Math.floor(Math.random() * level.rows),
        y: Math.floor(Math.random() * level.columns),
      };

      if (minesPoints.findIndex((e: Point) => e.x === point.x && e.y === point.y) === -1
        && aroundSkip.findIndex((e: Point) => e.x === point.x && e.y === point.y) === -1
      ) {
        minesPoints.push(point);
        gameField.getCell(point).isMine = true;
      }
    }
    this.setMinesAround(gameField);
  }

  public static newGame(levelConfig: GameConfiguration, minesGeneration: MinesGeneration): Game {
    const gameField: GameField = this.initGameField(levelConfig.rows, levelConfig.columns);

    this.firstlyClicked = false;
    if (minesGeneration === 'OnStart') {
      this.generateMinesOnField(levelConfig, gameField);
    }
    return new Game(levelConfig, minesGeneration, gameField);
  }

  public static openCell(game: Game, point: Point): void {
    const cell: Cell = game.field.getCell(point);
    if (cell.state === CellState.FLAGGED) {
      return;
    }
    if (cell.isMine) {
      this.explodeAndOpedAllCells(game);
      game.state = 'LOSE';
      return;
    }

    cell.state = CellState.OPENED;
    if (game.minesGeneration === 'OnFirstClick' && !this.firstlyClicked) {
      this.generateMinesOnField(game.level, game.field, point);
      this.firstlyClicked = true;
    }
    if (cell.minesAround === 0) {
      this.recursiveCellOpening(game, point);
    }
  }

  private static explodeAndOpedAllCells(game: Game): void {
    game.field.fieldArray
      .forEach((fieldRow: Array<Cell>) => {
        fieldRow.forEach((aCell: Cell) => {
          if (aCell.state === CellState.CLOSED) {
            aCell.state = CellState.OPENED;
          }
          if (aCell.state === CellState.FLAGGED && !aCell.isMine) {
            aCell.state = CellState.OPENED;
          }
          if (aCell.isMine && aCell.state !== CellState.FLAGGED) {
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
        if (cell.state !== CellState.CLOSED) {
          return;
        }
        if (cell.isMine) {
          return;
        }
        if (cell.minesAround !== 0) {
          cell.state = CellState.OPENED;
          return;
        }
        cell.state = CellState.OPENED;
        this.recursiveCellOpening(game, cell.point);
      });
  }

  private static openAllCells(game: Game): void {
    game.field.fieldArray
      .forEach((fieldRow: Array<Cell>) => {
        fieldRow.forEach((aCell: Cell) => {
          if (aCell.state === CellState.CLOSED || aCell.state === CellState.UNKNOWN) {
            aCell.state = CellState.OPENED;
          }
        });
      });
  }

  public static cellRightAction(game: Game, point: Point): void {
    const cell: Cell = game.field.getCell(point);
    const cellState: CellState = cell.state;
    if (cellState === CellState.OPENED) {
      return;
    }
    if (cellState === CellState.CLOSED) {
      this.flagCell(game, cell);
      return;
    }
    if (cellState === CellState.FLAGGED) {
      this.unknownCell(game, cell);
      return;
    }
    this.unmarkCell(game, cell);
  }

  private static flagCell(game: Game, cell: Cell): void {
    if (cell.state === CellState.CLOSED) {
      cell.state = CellState.FLAGGED;

      if (cell.isMine) {
        game.minesFlagged += 1;
        if (game.minesFlagged === game.level.mines) {
          game.state = 'WIN';
          this.openAllCells(game);
        }
      }
      game.cellsFlagged += 1;
    }
  }

  private static unknownCell(game: Game, cell: Cell): void {
    if (cell.state === CellState.FLAGGED) {
      cell.state = CellState.UNKNOWN;

      if (cell.isMine) {
        game.minesFlagged -= 1;
      }
      game.cellsFlagged -= 1;
    }
  }

  private static unmarkCell(game: Game, cell: Cell): void {
    cell.state = CellState.CLOSED;
  }

  public static isMinesCovered(game: Game): boolean {
    return game.minesFlagged === game.level.mines;
  }
}
