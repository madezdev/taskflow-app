export const colors = {
  primary: '#1E3A8A',
  primaryLight: '#3B82F6',
  secondary: '#34D399',
  background: '#F1F5F9',
  surface: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  textInverse: '#FFFFFF',
  textInverseMuted: '#DBEAFE',
  border: '#E2E8F0',
  overlay: 'rgba(255, 255, 255, 0.12)',
  shadow: '#000000',
} as const;

export type ColorName = keyof typeof colors;
