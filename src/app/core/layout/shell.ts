import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Shell {
  protected readonly navigation = [
    { label: 'Inicio', path: '/', exact: true },
    { label: 'Juegos', path: '/juegos', exact: false },
    { label: 'Videos', path: '/videos', exact: false },
    { label: 'Lecturas', path: '/lecturas', exact: false },
    { label: 'Progreso', path: '/progreso', exact: false }
  ];

  protected readonly currentYear = new Date().getFullYear();
}
