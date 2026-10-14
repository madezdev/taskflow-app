import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../constants/theme';
import ScreenHeader from './ScreenHeader';

type ScreenLayoutProps = {
  title: string;
  subtitle?: string;
  headerAccessory?: ReactNode;
  onBack?: () => void;
  // Con false el contenido maneja su propio scroll (p. ej. una FlatList): anidarla en un
  // ScrollView vertical genera el aviso de VirtualizedLists anidadas.
  scrollable?: boolean;
  children: ReactNode;
};

export default function ScreenLayout({
  title,
  subtitle,
  headerAccessory,
  onBack,
  scrollable = true,
  children,
}: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScreenHeader title={title} subtitle={subtitle} onBack={onBack}>
        {headerAccessory}
      </ScreenHeader>
      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scrollable ? (
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {children}
          </ScrollView>
        ) : (
          <View style={styles.fixedContent}>{children}</View>
        )}
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
  fixedContent: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});
