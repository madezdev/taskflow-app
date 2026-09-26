import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, radius, spacing } from '../constants/theme';

type ProfileCardProps = {
  name: string;
  role: string;
  image: string;
};

const AVATAR_SIZE = 64;

export default function ProfileCard({ name, role, image }: ProfileCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.avatar} accessibilityLabel={`Foto de ${name}`} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.role} numberOfLines={1}>
          {role}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.border,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    color: colors.text,
    fontSize: fontSizes.md,
    fontWeight: '700',
  },
  role: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    marginTop: spacing.xs,
  },
});
