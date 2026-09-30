import ProfileCard from '../components/ProfileCard';
import ScreenLayout from '../components/ScreenLayout';
import StatusBadge from '../components/StatusBadge';
import { getCurrentUser } from '../services/userService';

export default function ProfileScreen() {
  const currentUser = getCurrentUser();

  return (
    <ScreenLayout title="Mi perfil" headerAccessory={<StatusBadge label="Cuenta activa" />}>
      <ProfileCard name={currentUser.name} role={currentUser.role} image={currentUser.image} />
    </ScreenLayout>
  );
}
