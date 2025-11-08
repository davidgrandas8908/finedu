# Desarrollo y Tecnología de FinEdu

## Propósito del proyecto
FinEdu es una plataforma web educativa creada para acompañar a estudiantes, familias y emprendedores en la construcción de hábitos financieros responsables. El objetivo principal del desarrollo fue ofrecer una experiencia modular y escalable que permita incorporar nuevos contenidos y dinámicas de aprendizaje sin comprometer la mantenibilidad del código.

## Stack tecnológico
- **Framework**: Angular 17 (standalone components y Angular Signals).
- **Lenguajes**: TypeScript, HTML semántico y SCSS modular.
- **Herramientas de desarrollo**: Angular CLI 17/20.x, Node.js 20, npm como gestor de paquetes.
- **Pruebas**: Karma + Jasmine para unit tests generados con el CLI.
- **Despliegue**: Netlify con plugin oficial `@netlify/angular-runtime` y publicación en `dist/edu-finanzas/browser`.

## Principios de arquitectura
- **Capas bien definidas**: `core` (servicios, modelos, layout), `shared` (componentes reutilizables) y `features` (capas funcionales independientes).
- **Standalone Components**: cada página o componente define sus `imports` locales, reduciendo la carga global de módulos.
- **Señales de Angular**: los servicios gestionan estado reactivo sin necesidad de librerías extras.
- **Mock data encapsulado**: los servicios simulan fuentes de datos externas para facilitar el reemplazo por APIs reales.

## Flujo de trabajo
1. Generación de scaffolding con Angular CLI (`ng new`, `ng generate component` y `ng generate service`).
2. Definición de modelos (`core/models`) para tipar recursos y progreso.
3. Implementación de servicios (`ContentService`, `ProgressService`) como única fuente de verdad del dominio.
4. Construcción de componentes y páginas en `features/*` siguiendo un diseño atómico.
5. Estilizado con SCSS por componente y utilidades globales en `src/styles.scss`.
6. Pruebas unitarias básicas para asegurar la integración mínima con el CLI.

## Servicios clave
- `ContentService`: centraliza catálogos de juegos, videos, lecturas y destacados. Expone métodos transformados en señales para proveer datos reactivos a las vistas.
- `ProgressService`: administra métricas, logros y actividad. Persiste en `localStorage` para conservar el progreso individual sin backend.

## Estrategia de UI/UX
- Layout principal en `core/layout/shell` con navegación lateral y cabecera fija.
- Componentes reutilizables (`metric-card`, `resource-card`, `section-heading`) para consistencia visual.
- Diseño responsive con flexbox y grid, priorizando legibilidad y accesibilidad.

## Testing y calidad
- Estructura de pruebas generada por Angular CLI, con escenarios base en cada `*.spec.ts`.
- Compatibilidad con `npm run test` para ejecutar la suite con Karma.
- ESLint integrado al CLI (configuración por defecto) para mantener el estilo de código.

## Construcción y despliegue
- **Build local**: `npm run build` genera artefactos en `dist/edu-finanzas/browser`.
- **Netlify**: configuración declarada en `netlify.toml`:
  ```toml
  [build]
    command = "npm run build"
    publish = "dist/edu-finanzas/browser"

  [[plugins]]
    package = "@netlify/angular-runtime"
  ```
  Esta definición asegura que Netlify ejecute el build de Angular con la versión recomendada del runtime y publique la carpeta correcta para SPA.
- **Rutas SPA**: Netlify maneja el enrutamiento vía plugin, por lo que no se requiere `_redirects` adicional.

## Próximos pasos técnicos
- Integrar un backend (REST/GraphQL) para persistencia real y autenticación.
- Añadir pruebas unitarias y e2e más completas (Cypress o Playwright).
- Configurar CI/CD (GitHub Actions) para automatizar lint, test y despliegues.
- Internacionalización y accesibilidad AA como estándares de producción.

---
Esta documentación resume las decisiones de desarrollo y las tecnologías que sostienen la primera versión productiva de FinEdu.
