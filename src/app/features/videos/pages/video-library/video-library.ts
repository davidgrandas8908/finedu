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
  selector: 'app-video-library',
  standalone: true,
  imports: [NgFor, NgIf, SectionHeading, ResourceCard],
  templateUrl: './video-library.html',
  styleUrl: './video-library.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoLibrary {
  private readonly contentService = inject(ContentService);
  private readonly progressService = inject(ProgressService);

  private readonly videosSignal = signal(this.contentService.getVideos());
  protected readonly selectedFocus = signal<string>('todos');

  protected readonly focusFilters = computed(() => {
    const focuses = Array.from(new Set(this.videosSignal().map((video) => video.focus)));
    return ['todos', ...focuses];
  });

  protected readonly filteredVideos = computed(() => {
    const focus = this.selectedFocus();
    const videos = this.videosSignal();

    if (focus === 'todos') {
      return videos;
    }

    return videos.filter((video) => video.focus === focus);
  });

  protected updateFocus(focus: string): void {
    this.selectedFocus.set(focus);
  }

  protected markVideoWatched(videoId: string, title: string): void {
    this.progressService.markCompleted('video', { id: videoId, title });
  }
}
