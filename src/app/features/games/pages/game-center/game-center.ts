import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';

import { DifficultyLevel } from '../../../../core/models/learning-resource.model';
import { ContentService } from '../../../../core/services/content.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';
import { ResourceCard } from '../../../../shared/components/resource-card/resource-card';

@Component({
  selector: 'app-game-center',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe, SectionHeading, ResourceCard],
  templateUrl: './game-center.html',
  styleUrl: './game-center.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCenter {
  private readonly contentService = inject(ContentService);
  private readonly progressService = inject(ProgressService);

  protected readonly difficulties: Array<DifficultyLevel | 'todas'> = [
    'todas',
    'principiante',
    'intermedio',
    'avanzado'
  ];

  private readonly gamesSignal = signal(this.contentService.getGames());
  protected readonly selectedDifficulty = signal<DifficultyLevel | 'todas'>('todas');

  protected readonly filteredGames = computed(() => {
    const games = this.gamesSignal();
    const difficulty = this.selectedDifficulty();

    if (difficulty === 'todas') {
      return games;
    }

    return games.filter((game) => game.difficulty === difficulty);
  });

  protected onDifficultyChange(level: DifficultyLevel | 'todas'): void {
    this.selectedDifficulty.set(level);
  }

  protected markGameCompleted(gameId: string, title: string): void {
    this.progressService.markCompleted('game', { id: gameId, title });
  }
}
