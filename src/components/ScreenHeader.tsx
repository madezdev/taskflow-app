import type { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSizes, spacing } from '../constants/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  children?: ReactNode;
};

const BACK_ICON_SIZE = 28;

export default function ScreenHeader({ title, subtitle, onBack, children }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      {/* El botón atrás va en la fila del título y los textos ocupan una sola línea, así todas
          las pantallas tienen la misma altura de encabezado y no salta durante la transición. */}
      <View style={styles.titleRow}>
        {onBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            hitSlop={spacing.sm}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Volver a la lista de tareas"
          >
            <Ionicons name="chevron-back" size={BACK_ICON_SIZE} color={colors.textInverse} />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {subtitle ? (
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.sm,
  },
  title: {
    flexShrink: 1,
    color: colors.textInverse,
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.textInverseMuted,
    fontSize: fontSizes.md,
    marginTop: spacing.xs,
  },
});
