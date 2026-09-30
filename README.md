# TaskFlow

Aplicación mobile de gestión de tareas desarrollada con React Native, Expo (Managed Workflow) y TypeScript.

## Checkpoints

- **Checkpoint 1 – Estructura base:** inicialización del proyecto con Expo, TypeScript y herramientas de calidad de código.
- **Checkpoint 2 – Componentes y estilos:** arquitectura de carpetas en `src/`, pantallas `HomeScreen` y `ProfileScreen`, componente reutilizable `ProfileCard` y constantes de diseño centralizadas.

## Estructura del proyecto

```
taskflow-app/
├── App.tsx               # Punto de entrada: monta el navegador de la app
├── index.ts
├── app.json              # Configuración de Expo
├── tsconfig.json         # Configuración de TypeScript
├── assets/               # Íconos y splash de Expo
└── src/
    ├── assets/           # Imágenes y fuentes locales
    │   ├── fonts/
    │   └── images/
    ├── components/       # Componentes reutilizables de UI
    │   ├── ProfileCard.tsx
    │   ├── ScreenHeader.tsx
    │   ├── ScreenLayout.tsx
    │   └── StatusBadge.tsx
    ├── constants/        # Constantes de diseño
    │   ├── colors.ts     # Paleta de colores
    │   └── theme.ts      # Espaciados, tamaños de fuente y radios
    ├── navigation/       # Configuración de navegación
    │   └── AppNavigator.tsx
    ├── screens/          # Pantallas principales
    │   ├── HomeScreen.tsx
    │   └── ProfileScreen.tsx
    ├── services/         # Fuente de datos de usuario (hoy en memoria, a futuro un backend)
    │   └── userService.ts
    └── types/            # Tipos compartidos del dominio
        └── user.ts
```

## Navegación

La app usa un navegador de tabs inferior (`@react-navigation/bottom-tabs`)
definido en `src/navigation/AppNavigator.tsx`, montado desde `App.tsx` dentro
de `NavigationContainer`. Tiene dos tabs:

- **Tareas** (`HomeScreen`)
- **Perfil** (`ProfileScreen`)

Cada pantalla dibuja su propio encabezado con `ScreenLayout`, así que el
encabezado nativo del navegador está deshabilitado (`headerShown: false`).

## Componentes compartidos

`ScreenLayout` y `ScreenHeader` (en `src/components/`) concentran la estructura
común de pantalla: `SafeAreaView`, encabezado con título/subtítulo y el
`ScrollView` de contenido. Los tokens de diseño (colores, espaciados,
tamaños de fuente, radios) viven en `src/constants/`.

## Componente `ProfileCard`

Tarjeta de perfil reutilizable. No contiene datos internos: todo lo recibe por
props, derivadas del tipo compartido `User` (`src/types/user.ts`).

| Prop    | Tipo     | Descripción                |
| ------- | -------- | -------------------------- |
| `name`  | `string` | Nombre del usuario         |
| `role`  | `string` | Rol o puesto               |
| `image` | `string` | URL de la imagen de perfil |

```tsx
<ProfileCard name="Madez" role="Desarrollador Mobile" image="https://i.pravatar.cc/300?img=12" />
```

- `ProfileScreen` la usa con los datos del usuario actual.
- `HomeScreen` la reutiliza con distintos datos para listar al equipo.

Los estilos se definen con `StyleSheet.create` y toman colores y espaciados de `src/constants/`.

## Ejecución en Expo Go

`ProfileScreen` corriendo en un dispositivo Android con Expo Go:

<img src="docs/profile-screen-expo-go.png" alt="ProfileScreen en Expo Go" width="280" />

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

- Formularios para cargar tareas
- Estado global
- Datos del usuario desde Firebase / Firestore
