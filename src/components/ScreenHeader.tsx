import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../constants/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function ScreenHeader({ title, subtitle, children }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
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
