export const colors = {
  primary: '#1E3A8A',
  primaryLight: '#3B82F6',
  accent: '#34D399',
  white: '#FFFFFF',
  textLight: '#DBEAFE',
} as const;

export type ColorName = keyof typeof colors;
