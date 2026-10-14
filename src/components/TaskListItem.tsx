import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TASK_CATEGORY_LABELS } from '../constants/taskCategories';
import { colors, fontSizes, radius, shadows, spacing } from '../constants/theme';
import type { Task } from '../types/task';
import { formatShortDate } from '../utils/formatDate';

type TaskListItemProps = {
  task: Task;
  onPress: (id: string) => void;
  onToggleCompleted: (id: string) => void;
};

const CHECKBOX_SIZE = 28;
const CHEVRON_SIZE = 20;

function TaskListItem({ task, onPress, onToggleCompleted }: TaskListItemProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => onToggleCompleted(task.id)}
        hitSlop={spacing.sm}
        activeOpacity={0.8}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        accessibilityLabel={`Marcar "${task.title}" como ${task.completed ? 'pendiente' : 'completada'}`}
      >
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={CHECKBOX_SIZE}
          color={task.completed ? colors.secondary : colors.textMuted}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.content}
        onPress={() => onPress(task.id)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityHint="Abre el detalle de la tarea"
      >
        <View style={styles.info}>
          <Text style={[styles.title, task.completed && styles.titleCompleted]} numberOfLines={1}>
            {task.title}
          </Text>
          <Text style={styles.meta}>
            {TASK_CATEGORY_LABELS[task.category]} · {formatShortDate(task.createdAt)}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={CHEVRON_SIZE} color={colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

export default memo(TaskListItem);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  info: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  titleCompleted: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  meta: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    marginTop: spacing.xs,
  },
});
