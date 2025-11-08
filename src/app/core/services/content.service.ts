import { Injectable, signal } from '@angular/core';

import {
  LearningArticle,
  LearningGame,
  LearningVideo,
  LearningTag
} from '../models/learning-resource.model';

interface HomeHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly commonTags: Record<string, LearningTag> = {
    presupuesto: { id: 'presupuesto', label: 'Presupuesto' },
    ahorro: { id: 'ahorro', label: 'Ahorro' },
    inversion: { id: 'inversion', label: 'Inversión' },
    deudas: { id: 'deudas', label: 'Deudas' },
    familia: { id: 'familia', label: 'Familia' },
    emprendimiento: { id: 'emprendimiento', label: 'Emprendimiento' }
  };

  private readonly gamesSignal = signal<LearningGame[]>([
    {
      id: 'budget-challenge',
      title: 'Reto de presupuesto 50/30/20',
      description:
        'Clasifica gastos reales dentro del modelo 50/30/20 y descubre cómo equilibrar tus finanzas.',
      estimatedTime: '10 minutos',
      objective: 'Dominar la distribución inteligente del ingreso mensual.',
      difficulty: 'principiante',
      tags: [this.commonTags['presupuesto'], this.commonTags['familia']],
      link: '#'
    },
    {
      id: 'savings-simulator',
      title: 'Simulador de ahorro con metas',
      description:
        'Ajusta variables de tiempo y cantidad para visualizar cómo crece tu fondo de emergencia.',
      estimatedTime: '8 minutos',
      objective: 'Planificar metas de ahorro realistas y sostenibles.',
      difficulty: 'intermedio',
      tags: [this.commonTags['ahorro'], this.commonTags['deudas']],
      link: '#'
    },
    {
      id: 'investment-quest',
      title: 'Explorador de inversiones responsables',
      description:
        'Toma decisiones sobre portafolios con diferentes perfiles de riesgo y descubre su impacto.',
      estimatedTime: '12 minutos',
      objective: 'Entender riesgo vs. retorno en instrumentos de inversión.',
      difficulty: 'avanzado',
      tags: [this.commonTags['inversion'], this.commonTags['emprendimiento']],
      link: '#'
    }
  ]);

  private readonly videosSignal = signal<LearningVideo[]>([
    {
      id: 'video-finanzas-casa',
      title: 'Finanzas en casa: hábitos saludables',
      description:
        'Guía práctica para involucrar a toda la familia en la toma de decisiones financieras.',
      url: 'https://www.youtube.com/watch?v=finanzas-casa',
      duration: '7:42',
      focus: 'Gestión del hogar',
      tags: [this.commonTags['familia'], this.commonTags['presupuesto']]
    },
    {
      id: 'video-inversion-simple',
      title: 'Invertir sin miedo: conceptos clave',
      description:
        'Comprende la diferencia entre invertir y especular con ejemplos cercanos.',
      url: 'https://www.youtube.com/watch?v=inversion-simple',
      duration: '9:12',
      focus: 'Introducción a inversiones',
      tags: [this.commonTags['inversion']]
    },
    {
      id: 'video-deudas-control',
      title: 'Controla tus deudas y evita intereses ocultos',
      description:
        'Aprende a priorizar pagos y renegociar pasivos para recuperar estabilidad.',
      url: 'https://www.youtube.com/watch?v=deudas-control',
      duration: '6:25',
      focus: 'Gestión de deudas',
      tags: [this.commonTags['deudas'], this.commonTags['ahorro']]
    }
  ]);

  private readonly readingsSignal = signal<LearningArticle[]>([
    {
      id: 'reading-plan-meta',
      title: 'Construye tu plan financiero personal en 5 pasos',
      summary:
        'Plantilla descargable para mapear ingresos, gastos, metas y riesgos.',
      readingTime: '15 minutos',
      focus: 'Planeación financiera',
      tags: [this.commonTags['presupuesto'], this.commonTags['ahorro']],
      downloadUrl: '#'
    },
    {
      id: 'reading-inflacion',
      title: 'Entender la inflación sin complicaciones',
      summary:
        'Descubre cómo la inflación impacta tu bolsillo y qué estrategias puedes seguir.',
      readingTime: '12 minutos',
      focus: 'Educación económica',
      tags: [this.commonTags['presupuesto'], this.commonTags['inversion']]
    },
    {
      id: 'reading-emprende',
      title: 'Claves financieras para emprender sin descuidar tu estabilidad',
      summary:
        'Checklist para quienes quieren iniciar un proyecto paralelo con orden.',
      readingTime: '18 minutos',
      focus: 'Emprendimiento consciente',
      tags: [this.commonTags['emprendimiento'], this.commonTags['ahorro']]
    }
  ]);

  private readonly highlightsSignal = signal<HomeHighlight[]>([
    {
      id: 'aprende',
      title: 'Aprende a tu ritmo',
      description: 'Rutas guiadas para cada etapa: desde los primeros pasos hasta inversiones conscientes.',
      icon: '📚'
    },
    {
      id: 'juega',
      title: 'Juega y experimenta',
      description: 'Simuladores y retos interactivos que convierten la teoría en práctica.',
      icon: '🎮'
    },
    {
      id: 'crece',
      title: 'Crece con hábitos',
      description: 'Seguimiento inteligente y recordatorios para sostener tus logros.',
      icon: '🌱'
    }
  ]);

  getHomeHighlights(): HomeHighlight[] {
    return this.highlightsSignal();
  }

  getGames(): LearningGame[] {
    return this.gamesSignal();
  }

  getVideos(): LearningVideo[] {
    return this.videosSignal();
  }

  getReadings(): LearningArticle[] {
    return this.readingsSignal();
  }
}

