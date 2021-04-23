import GameConfiguration from '@/engine/models/level/GameConfiguration';
import LevelDifficulty from '@/engine/models/level/LevelDifficulty';

import { beginner, intermediate, expert } from '@/engine/models/level/DefaultLevels';

export const getDifficultyLevelByName = (name: string): GameConfiguration => {
  switch (name.toUpperCase()) {
    case LevelDifficulty.Beginner:
      return beginner;
    case LevelDifficulty.Intermediate:
      return intermediate;
    case LevelDifficulty.Expert:
      return expert;
    case LevelDifficulty.Custom:
      return beginner;
    default:
      return beginner;
  }
};

export const makeCustomLevel = (
  rows: number, columns: number, mines: number,
): GameConfiguration => ({
  level: LevelDifficulty.Custom,
  rows,
  columns,
  mines,
});
