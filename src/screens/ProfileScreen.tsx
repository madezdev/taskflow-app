import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '../components/ProfileCard';
import StatusBadge from '../components/StatusBadge';
import { colors, fontSizes, spacing } from '../constants/theme';

const currentUser = {
  name: 'Madez',
  role: 'Desarrollador Mobile',
  image: 'https://i.pravatar.cc/300?img=12',
};

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi perfil</Text>
        <StatusBadge label="Cuenta activa" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ProfileCard name={currentUser.name} role={currentUser.role} image={currentUser.image} />
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
  content: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});
