import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { LearningTag } from '../../../core/models/learning-resource.model';

type ResourceVariant = 'game' | 'video' | 'reading';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './resource-card.html',
  styleUrl: './resource-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceCard {
  @Input({ required: true }) title!: string;
  @Input() description = '';
  @Input() meta?: string;
  @Input() objective?: string;
  @Input() variant: ResourceVariant = 'game';
  @Input() tags: Array<string | LearningTag> = [];
  @Input() actionLabel = 'Explorar';
  @Input() actionLink?: string;
  @Input() disabled = false;

  @Output() action = new EventEmitter<void>();

  protected readonly variantIcon: Record<ResourceVariant, string> = {
    game: '🎮',
    video: '🎬',
    reading: '📖'
  };

  protected get displayedTags(): string[] {
    return this.tags.map((tag) => (typeof tag === 'string' ? tag : tag.label));
  }

  protected onPrimaryAction(): void {
    if (this.disabled) {
      return;
    }

    if (!this.actionLink) {
      this.action.emit();
    }
  }
}
