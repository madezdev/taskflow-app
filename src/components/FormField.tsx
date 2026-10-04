import { useState } from 'react';
import type { Ref } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { colors, fontSizes, radius, spacing } from '../constants/theme';

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
  ref?: Ref<TextInput>;
};

export default function FormField({
  label,
  error,
  ref,
  multiline,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error ? colors.danger : isFocused ? colors.primary : colors.border;

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primary}
        accessibilityLabel={label}
        {...inputProps}
        ref={ref}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline, { borderColor }, style]}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
      />
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.text,
    fontSize: fontSizes.sm,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + spacing.xs,
    color: colors.text,
    fontSize: fontSizes.sm,
  },
  multiline: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  error: {
    color: colors.danger,
    fontSize: fontSizes.xs,
    marginTop: spacing.xs,
  },
});
