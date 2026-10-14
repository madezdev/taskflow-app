import { StyleSheet, Text } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import ScreenLayout from '../components/ScreenLayout';
import StatusBadge from '../components/StatusBadge';
import { colors, fontSizes, spacing } from '../constants/theme';
import { getCurrentUser, getTeam } from '../services/userService';

export default function ProfileScreen() {
  const currentUser = getCurrentUser();
  const team = getTeam();

  return (
    <ScreenLayout title="Mi perfil" headerAccessory={<StatusBadge label="Cuenta activa" />}>
      <ProfileCard name={currentUser.name} role={currentUser.role} image={currentUser.image} />

      <Text style={styles.sectionTitle}>Equipo</Text>
      {team.map((member) => (
        <ProfileCard key={member.id} name={member.name} role={member.role} image={member.image} />
      ))}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.text,
    fontSize: fontSizes.md,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
});
