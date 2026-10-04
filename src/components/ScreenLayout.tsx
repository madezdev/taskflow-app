import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../constants/theme';
import ScreenHeader from './ScreenHeader';

type ScreenLayoutProps = {
  title: string;
  subtitle?: string;
  headerAccessory?: ReactNode;
  children: ReactNode;
};

export default function ScreenLayout({
  title,
  subtitle,
  headerAccessory,
  children,
}: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScreenHeader title={title} subtitle={subtitle}>
        {headerAccessory}
      </ScreenHeader>
      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  keyboardAvoider: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});
