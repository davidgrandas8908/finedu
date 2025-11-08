import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../../../core/services/content.service';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';
import { ResourceCard } from '../../../../shared/components/resource-card/resource-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, SlicePipe, RouterLink, SectionHeading, ResourceCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private readonly contentService = inject(ContentService);

  protected readonly highlights = this.contentService.getHomeHighlights();
  protected readonly featuredGames = this.contentService.getGames();
  protected readonly featuredVideos = this.contentService.getVideos();
  protected readonly featuredReadings = this.contentService.getReadings();
}
