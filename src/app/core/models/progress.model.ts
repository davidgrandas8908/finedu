export interface ProgressMilestone {
  id: string;
  label: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ActivityLogEntry {
  id: string;
  resourceId: string;
  resourceType: 'game' | 'video' | 'reading';
  title: string;
  completedAt: string;
  notes?: string;
}

export interface LearnerProgressSnapshot {
  gamesCompleted: number;
  videosWatched: number;
  readingsFinished: number;
  streakDays: number;
  lastUpdated: string;
  milestones: ProgressMilestone[];
  activityLog: ActivityLogEntry[];
}

