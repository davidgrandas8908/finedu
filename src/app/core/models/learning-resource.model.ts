export type DifficultyLevel = 'principiante' | 'intermedio' | 'avanzado';

export interface LearningTag {
  id: string;
  label: string;
}

export interface LearningGame {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  objective: string;
  difficulty: DifficultyLevel;
  tags: LearningTag[];
  link?: string;
}

export interface LearningVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  focus: string;
  tags: LearningTag[];
}

export interface LearningArticle {
  id: string;
  title: string;
  summary: string;
  readingTime: string;
  focus: string;
  tags: LearningTag[];
  downloadUrl?: string;
}

