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
