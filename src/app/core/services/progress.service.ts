import { Injectable, computed, effect, signal } from '@angular/core';

import { LearnerProgressSnapshot } from '../models/progress.model';

type ResourceType = 'game' | 'video' | 'reading';

const STORAGE_KEY = 'finEdu-progress';

const defaultSnapshot: LearnerProgressSnapshot = {
  gamesCompleted: 0,
  videosWatched: 0,
  readingsFinished: 0,
  streakDays: 0,
  lastUpdated: new Date().toISOString(),
  milestones: [
    {
      id: 'primer-logro',
      label: 'Primer paso',
      description: 'Completaste tu primer recurso interactivo.',
      unlocked: false
    },
    {
      id: 'semana-consistente',
      label: 'Semana consistente',
      description: 'Aprendiste por 7 días consecutivos.',
      unlocked: false
    },
    {
      id: 'dominando-las-finanzas',
      label: 'Dominando las finanzas',
      description: 'Alcanzaste 15 actividades completadas.',
      unlocked: false
    }
  ],
  activityLog: []
};

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly snapshotSignal = signal<LearnerProgressSnapshot>(this.restore());

  readonly snapshot = computed(() => this.snapshotSignal());

  constructor() {
    effect(() => {
      this.persist(this.snapshotSignal());
    });
  }

  markCompleted(resourceType: ResourceType, payload: { id: string; title: string }): void {
    this.snapshotSignal.update((state) => {
      const now = new Date().toISOString();
      const updated = structuredClone(state);

      switch (resourceType) {
        case 'game':
          updated.gamesCompleted += 1;
          break;
        case 'video':
          updated.videosWatched += 1;
          break;
        case 'reading':
          updated.readingsFinished += 1;
          break;
      }

      updated.lastUpdated = now;
      updated.activityLog = [
        {
          id: `${resourceType}-${payload.id}-${now}`,
          resourceId: payload.id,
          resourceType,
          title: payload.title,
          completedAt: now
        },
        ...updated.activityLog.slice(0, 9)
      ];

      const totalActivities =
        updated.gamesCompleted + updated.videosWatched + updated.readingsFinished;

      updated.milestones = updated.milestones.map((milestone) => {
        if (milestone.unlocked) {
          return milestone;
        }

        if (milestone.id === 'primer-logro' && totalActivities >= 1) {
          return { ...milestone, unlocked: true, unlockedAt: now };
        }

        if (milestone.id === 'dominando-las-finanzas' && totalActivities >= 15) {
          return { ...milestone, unlocked: true, unlockedAt: now };
        }

        return milestone;
      });

      return updated;
    });
  }

  updateStreak(days: number): void {
    this.snapshotSignal.update((state) => ({
      ...state,
      streakDays: days,
      lastUpdated: new Date().toISOString()
    }));
  }

  reset(): void {
    this.snapshotSignal.set(structuredClone(defaultSnapshot));
  }

  private restore(): LearnerProgressSnapshot {
    if (typeof window === 'undefined') {
      return structuredClone(defaultSnapshot);
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return structuredClone(defaultSnapshot);
    }

    try {
      const parsed = JSON.parse(saved) as LearnerProgressSnapshot;
      return {
        ...structuredClone(defaultSnapshot),
        ...parsed,
        milestones: parsed.milestones ?? defaultSnapshot.milestones,
        activityLog: parsed.activityLog ?? []
      };
    } catch {
      return structuredClone(defaultSnapshot);
    }
  }

  private persist(snapshot: LearnerProgressSnapshot): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }
}

