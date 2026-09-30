import type { User } from '../types/user';

const currentUser: User = {
  id: '1',
  name: 'Madez',
  role: 'Desarrollador Mobile',
  image: 'https://i.pravatar.cc/300?img=12',
};

const team: User[] = [
  currentUser,
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

export function getCurrentUser(): Readonly<User> {
  return currentUser;
}

export function getTeam(): readonly User[] {
  return team;
}
