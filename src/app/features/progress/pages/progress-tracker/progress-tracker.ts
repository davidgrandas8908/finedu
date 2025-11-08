import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProgressService } from '../../../../core/services/progress.service';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';
import { MetricCard } from '../../../../shared/components/metric-card/metric-card';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink, SectionHeading, MetricCard],
  templateUrl: './progress-tracker.html',
  styleUrl: './progress-tracker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressTracker {
  private readonly progressService = inject(ProgressService);

  protected readonly snapshot = this.progressService.snapshot;

  protected readonly achievements = computed(() =>
    this.snapshot().milestones.filter((milestone) => milestone.unlocked)
  );

  protected readonly pendingMilestones = computed(() =>
    this.snapshot().milestones.filter((milestone) => !milestone.unlocked)
  );

  protected readonly recentActivity = computed(() => this.snapshot().activityLog.slice(0, 8));

  protected resetProgress(): void {
    this.progressService.reset();
  }
}
