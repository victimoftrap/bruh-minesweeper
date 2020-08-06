import LevelDifficulty from '@/engine/models/level/LevelDifficulty';

interface GameConfiguration {
  level: LevelDifficulty;
  rows: number;
  columns: number;
  mines: number;
}

export default GameConfiguration;
