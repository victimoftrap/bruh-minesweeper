import LevelDifficulty from '@/engine/models/level/LevelDifficulty';
import GameConfiguration from '@/engine/models/level/GameConfiguration';

export const beginner: GameConfiguration = {
  level: LevelDifficulty.Beginner,
  rows: 8,
  columns: 8,
  mines: 10,
};

export const intermediate: GameConfiguration = {
  level: LevelDifficulty.Intermediate,
  rows: 16,
  columns: 16,
  mines: 40,
};

export const expert: GameConfiguration = {
  level: LevelDifficulty.Expert,
  rows: 16,
  columns: 30,
  mines: 99,
};
