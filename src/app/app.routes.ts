import { Routes } from '@angular/router';

import { Shell } from './core/layout/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home/home').then((m) => m.Home),
        data: { title: 'Inicio' }
      },
      {
        path: 'juegos',
        loadComponent: () =>
          import('./features/games/pages/game-center/game-center').then(
            (m) => m.GameCenter
          ),
        data: { title: 'Juegos Interactivos' }
      },
      {
        path: 'videos',
        loadComponent: () =>
          import('./features/videos/pages/video-library/video-library').then(
            (m) => m.VideoLibrary
          ),
        data: { title: 'Videoteca' }
      },
      {
        path: 'lecturas',
        loadComponent: () =>
          import('./features/readings/pages/reading-hub/reading-hub').then(
            (m) => m.ReadingHub
          ),
        data: { title: 'Lecturas Guiadas' }
      },
      {
        path: 'progreso',
        loadComponent: () =>
          import('./features/progress/pages/progress-tracker/progress-tracker').then(
            (m) => m.ProgressTracker
          ),
        data: { title: 'Mi Progreso' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
