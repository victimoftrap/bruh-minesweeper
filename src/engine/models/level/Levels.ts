import GameLevel from '@/engine/models/level/GameLevel';

export type LevelType = 'beginner' | 'intermediate' | 'expert';

export const levels: Record<LevelType, GameLevel> = {
  beginner:
    new GameLevel('Beginner', 8, 8, 10),
  intermediate:
    new GameLevel('Intermediate', 16, 16, 40),
  expert:
    new GameLevel('Expert', 16, 30, 99),
};

export const getLevelByName = (name: string): GameLevel => {
  const lowerName = name.toLowerCase();
  if (lowerName === 'beginner') {
    return levels.beginner;
  }
  if (lowerName === 'intermediate') {
    return levels.intermediate;
  }
  if (lowerName === 'expert') {
    return levels.expert;
  }
  return levels.beginner;
};
