import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '../components/ProfileCard';
import { colors, fontSizes, radius, spacing } from '../constants/theme';

const team = [
  {
    id: '1',
    name: 'Madez',
    role: 'Desarrollador Mobile',
    image: 'https://i.pravatar.cc/300?img=12',
  },
  {
    id: '2',
    name: 'Lucía Fernández',
    role: 'Diseñadora UX/UI',
    image: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: '3',
    name: 'Martín Gómez',
    role: 'Project Manager',
    image: 'https://i.pravatar.cc/300?img=33',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>TaskFlow</Text>
        <Text style={styles.subtitle}>Mis tareas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Todavía no hay tareas cargadas.</Text>
        </View>

        <Text style={styles.sectionTitle}>Equipo</Text>
        {team.map((member) => (
          <ProfileCard key={member.id} name={member.name} role={member.role} image={member.image} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.textLight,
    fontSize: fontSizes.md,
    marginTop: spacing.xs,
  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
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
