import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { ContentService } from '../../../../core/services/content.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';
import { ResourceCard } from '../../../../shared/components/resource-card/resource-card';

@Component({
  selector: 'app-reading-hub',
  standalone: true,
  imports: [NgFor, NgIf, SectionHeading, ResourceCard],
  templateUrl: './reading-hub.html',
  styleUrl: './reading-hub.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingHub {
  private readonly contentService = inject(ContentService);
  private readonly progressService = inject(ProgressService);

  private readonly readingsSignal = signal(this.contentService.getReadings());
  protected readonly selectedTag = signal<string>('todas');

  protected readonly availableTags = computed(() => {
    const readings = this.readingsSignal();
    const allTags = readings.flatMap((reading) => reading.tags.map((tag) => tag.label));

    return ['todas', ...Array.from(new Set(allTags))];
  });

  protected readonly filteredReadings = computed(() => {
    const readings = this.readingsSignal();
    const tag = this.selectedTag();

    if (tag === 'todas') {
      return readings;
    }

    return readings.filter((reading) =>
      reading.tags.some((readingTag) => readingTag.label === tag)
    );
  });

  protected updateTag(tag: string): void {
    this.selectedTag.set(tag);
  }

  protected markReadingFinished(readingId: string, title: string): void {
    this.progressService.markCompleted('reading', { id: readingId, title });
  }
}
