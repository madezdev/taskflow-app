# TaskFlow

Aplicación mobile de gestión de tareas desarrollada con React Native, Expo (Managed Workflow) y TypeScript.

Este repositorio corresponde al **Checkpoint 1: Estructura Base**, donde se inicializa el proyecto, se define la arquitectura de carpetas y se configura una pantalla de bienvenida.

## Estructura del proyecto

```
taskflow-app/
├── App.tsx               # Punto de entrada de la app
├── index.ts
├── app.json              # Configuración de Expo
├── tsconfig.json         # Configuración de TypeScript
├── assets/               # Íconos y splash de Expo
└── src/
    ├── assets/           # Imágenes y fuentes locales
    │   ├── fonts/
    │   └── images/
    ├── components/       # Componentes reutilizables de UI
    │   └── StatusBadge.tsx
    ├── screens/          # Pantallas principales
    │   └── WelcomeScreen.tsx
    ├── services/         # Servicios externos (Firebase, APIs)
    └── theme/            # Colores y estilos globales
        ├── colors.ts
        └── index.ts
```

## Requisitos

- Node.js (LTS)
- App Expo Go en el celular, o un emulador Android / simulador iOS

## Ejecución local

```bash
git clone <url-del-repositorio>
cd taskflow-app
npm install
npx expo start
```

Luego escanear el código QR con Expo Go, o presionar `a` (Android) / `i` (iOS) en la terminal para abrir el emulador.

## Scripts disponibles

| Comando                | Descripción                                       |
| ---------------------- | ------------------------------------------------- |
| `npm start`            | Inicia el servidor de desarrollo de Expo          |
| `npm run lint`         | Analiza el código con ESLint                      |
| `npm run lint:fix`     | Corrige automáticamente los problemas de ESLint   |
| `npm run format`       | Formatea el código con Prettier                   |
| `npm run format:check` | Verifica el formato sin modificar archivos        |
| `npm run typecheck`    | Verifica los tipos de TypeScript                  |
| `npm run validate`     | Ejecuta typecheck, lint y verificación de formato |

## Buenas prácticas y calidad de código

- **TypeScript** en modo estricto.
- **ESLint** con la configuración oficial de Expo (`eslint-config-expo`).
- **Prettier** para mantener un formato de código uniforme.
- **EditorConfig** para unificar la configuración del editor.
- **Husky + lint-staged**: antes de cada commit se ejecutan ESLint y Prettier sobre los archivos modificados.

## Próximos pasos

- Pantallas de lista y detalle de tareas
- Formularios y listas dinámicas
- Navegación
- Estado global
- Integración con Firebase
