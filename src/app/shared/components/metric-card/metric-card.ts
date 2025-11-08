import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricCard {
  @Input({ required: true }) value!: string;
  @Input({ required: true }) label!: string;
  @Input() helper?: string;
  @Input() trend?: 'up' | 'down' | 'neutral';
  @Input() trendLabel?: string;
}
