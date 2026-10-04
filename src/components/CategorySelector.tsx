import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TASK_CATEGORIES } from '../constants/taskCategories';
import { colors, fontSizes, radius, spacing } from '../constants/theme';
import type { TaskCategory } from '../types/task';

type CategorySelectorProps = {
  value: TaskCategory;
  onChange: (category: TaskCategory) => void;
};

export default function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoría</Text>
      <View style={styles.options} accessibilityRole="radiogroup">
        {TASK_CATEGORIES.map((category) => {
          const selected = category.value === value;

          return (
            <TouchableOpacity
              key={category.value}
              style={[styles.chip, selected && styles.chipSelected]}
              onPress={() => onChange(category.value)}
              activeOpacity={0.8}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.text,
    fontSize: fontSizes.sm,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.text,
    fontSize: fontSizes.sm,
  },
  chipTextSelected: {
    color: colors.textInverse,
    fontWeight: '700',
  },
});
