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

const BACK_ICON_SIZE = 20;

export default function ScreenHeader({ title, subtitle, onBack, children }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
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
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  backText: {
    color: colors.textInverse,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  title: {
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
