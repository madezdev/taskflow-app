import { useCallback, useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, useWindowDimensions } from 'react-native';

const TRANSITION_DURATION = 250;
const UNDERLAY_PARALLAX = 0.25;

export function useSlideTransition() {
  // El progreso va de 0 a 1 y no en píxeles, así el ancho se resuelve en la interpolación
  // y la animación sigue bien si la pantalla rota.
  const [progress] = useState(() => new Animated.Value(0));
  const { width } = useWindowDimensions();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  const duration = reduceMotion ? 0 : TRANSITION_DURATION;

  const enteringStyle = {
    transform: [
      { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) },
    ],
  };

  const underlayStyle = {
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -width * UNDERLAY_PARALLAX],
        }),
      },
    ],
  };

  const enter = useCallback(() => {
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
      Animated.timing(progress, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        // Si otra animación interrumpe a esta, no se debe cerrar el detalle dos veces.
        if (finished) onExited();
      });
    },
    [progress, duration],
  );

  const reset = useCallback(() => {
    progress.stopAnimation();
    progress.setValue(0);
  }, [progress]);

  return { enteringStyle, underlayStyle, enter, exit, reset };
}
