import { StyleSheet, Text, View } from 'react-native';
import StatusBadge from '../components/StatusBadge';
import { colors, spacing, fontSizes } from '../theme';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>
      <Text style={styles.subtitle}>Checkpoint 1: Estructura Base</Text>
      <StatusBadge label="Estructura base lista" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  subtitle: {
    color: colors.textLight,
    fontSize: fontSizes.md,
    marginTop: spacing.sm,
  },
});
