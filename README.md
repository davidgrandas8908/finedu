# FinEdu – Plataforma de Educación Financiera

FinEdu es una aplicación Angular diseñada para guiar a estudiantes, familias y emprendedores en el desarrollo de hábitos financieros saludables. Está estructurada con principios de arquitectura limpia, separando responsabilidades en capas (`core`, `shared`, `features`) y exponiendo módulos funcionales independientes para juegos interactivos, videoteca, lecturas guiadas y seguimiento del progreso personal.

## Contenido principal

- **Inicio**: landing con héroe, destacados y accesos rápidos a cada módulo.
- **Juegos**: simuladores gamificados filtrables por nivel para practicar presupuesto, ahorro e inversión.
- **Videos**: videoteca temática con filtros por foco de aprendizaje y control de “marcar como visto”.
- **Lecturas**: guías descargables etiquetadas por tema y plan semanal sugerido.
- **Progreso**: tablero con métricas, logros, registro de actividad y control de racha. Persiste en `localStorage`.

## Requisitos

- Node.js ≥ 20.x
- Angular CLI 20.1.1 (instalada globalmente)

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm start
```

Luego visita `http://localhost:4200/`. El servidor se reinicia automáticamente al detectar cambios.

### Scripts útiles

| Comando           | Descripción                                       |
| ----------------- | ------------------------------------------------- |
| `npm start`       | Levanta el servidor de desarrollo (`ng serve`).   |
| `npm run build`   | Construye la app (salida en `dist/edu-finanzas`). |
| `npm run test`    | Ejecuta las pruebas unitarias con Karma/Jasmine.  |

## Estructura del proyecto

```
src/
├── app/
│   ├── core/            # Servicios, modelos, layout principal
│   ├── shared/          # Componentes reutilizables (cards, headers)
│   └── features/        # Módulos de dominio (home, juegos, etc.)
├── assets/
└── styles.scss          # Estilos globales
```

## Servicios clave

- `ContentService`: expone datos mockeados (juegos, videos, lecturas, highlights).
- `ProgressService`: gestiona estado del tablero, logros y actividad con señales y persistencia en `localStorage`.

## Personalización

- Añade nuevos recursos extendiendo los modelos en `core/models`.
- Crea secciones adicionales siguiendo el patrón `features/<feature>/pages`.
- Ajusta estilos globales en `src/styles.scss` o por componente (`*.scss`).

## Próximos pasos sugeridos

- Integrar APIs reales para videos o juegos interactivos.
- Sustituir datos mockeados por repositorios/HTTP.
- Implementar autenticación o perfiles múltiples si es necesario.

---

Construido con ❤️ usando Angular 20.1.1. Sugerencias o mejoras son bienvenidas.
