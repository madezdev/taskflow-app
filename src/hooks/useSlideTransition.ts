import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, useWindowDimensions } from 'react-native';

const TRANSITION_DURATION = 250;
const UNDERLAY_PARALLAX = 0.25;

export function useSlideTransition() {
  // El progreso va de 0 a 1 y no en píxeles, así el ancho se resuelve en la interpolación
  // y la animación sigue bien si la pantalla rota.
  const [progress] = useState(() => new Animated.Value(0));
  const { width } = useWindowDimensions();
  const [reduceMotion, setReduceMotion] = useState(false);
  // Cierres pendientes: cada uno se ejecuta una sola vez cuando el detalle queda oculto, aunque
  // la animación se interrumpa (por ejemplo, una eliminación confirmada no debe perderse).
  const pendingExitRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  const duration = reduceMotion ? 0 : TRANSITION_DURATION;

  const { enteringStyle, underlayStyle } = useMemo(
    () => ({
      enteringStyle: {
        transform: [
          { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) },
        ],
      },
      underlayStyle: {
        transform: [
          {
            translateX: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -width * UNDERLAY_PARALLAX],
            }),
          },
        ],
      },
    }),
    [progress, width],
  );

  const runPendingExit = useCallback(() => {
    const pendingExit = pendingExitRef.current;
    pendingExitRef.current = null;
    pendingExit?.();
  }, []);

  const enter = useCallback(() => {
    pendingExitRef.current = null;
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [progress, duration]);

  const exit = useCallback(
    (onExited: () => void) => {
      const previousExit = pendingExitRef.current;
      pendingExitRef.current = previousExit
        ? () => {
            previousExit();
            onExited();
          }
        : onExited;
      Animated.timing(progress, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        // Si otra animación interrumpe a esta, los cierres quedan a cargo de la que la reemplazó.
        if (finished) runPendingExit();
      });
    },
    [progress, duration, runPendingExit],
  );

  // Oculta el detalle al instante y completa los cierres pendientes.
  const reset = useCallback(() => {
    progress.stopAnimation();
    progress.setValue(0);
    runPendingExit();
  }, [progress, runPendingExit]);

  return { enteringStyle, underlayStyle, enter, exit, reset };
}
