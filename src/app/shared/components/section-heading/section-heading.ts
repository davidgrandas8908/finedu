import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [NgIf],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeading {
  @Input({ required: true }) title!: string;
  @Input() eyebrow?: string;
  @Input() description?: string;
}
