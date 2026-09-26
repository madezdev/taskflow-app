export const colors = {
  primary: '#1E3A8A',
  primaryLight: '#3B82F6',
  secondary: '#34D399',
  background: '#F1F5F9',
  surface: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  textLight: '#DBEAFE',
  border: '#E2E8F0',
  white: '#FFFFFF',
  shadow: '#000000',
} as const;

export type ColorName = keyof typeof colors;
