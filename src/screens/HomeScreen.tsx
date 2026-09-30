import { StyleSheet, Text, View } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import ScreenLayout from '../components/ScreenLayout';
import { colors, fontSizes, radius, spacing } from '../constants/theme';
import { getTeam } from '../services/userService';

export default function HomeScreen() {
  const team = getTeam();

  return (
    <ScreenLayout title="TaskFlow" subtitle="Mis tareas">
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Todavía no hay tareas cargadas.</Text>
      </View>

      <Text style={styles.sectionTitle}>Equipo</Text>
      {team.map((member) => (
        <ProfileCard key={member.id} name={member.name} role={member.role} image={member.image} />
      ))}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSizes.md,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
});
