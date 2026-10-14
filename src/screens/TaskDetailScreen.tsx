import { useEffect } from 'react';
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import ScreenLayout from '../components/ScreenLayout';
import { TASK_CATEGORY_LABELS } from '../constants/taskCategories';
import { colors, fontSizes, radius, shadows, spacing } from '../constants/theme';
import type { Task } from '../types/task';
import { formatDateTime } from '../utils/formatDate';

type TaskDetailScreenProps = {
  task: Task;
  onBack: () => void;
  onToggleCompleted: (id: string) => void;
  onDelete: (id: string) => void;
};

const STATUS_DOT_SIZE = 8;
const DESCRIPTION_LINE_HEIGHT = 22;

export default function TaskDetailScreen({
  task,
  onBack,
  onToggleCompleted,
  onDelete,
}: TaskDetailScreenProps) {
  // Sin stack navigator, el botón atrás de Android cerraría la app en vez de volver a la lista.
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => subscription.remove();
  }, [onBack]);

  function handleDelete() {
    Alert.alert(
      'Eliminar tarea',
      `¿Seguro que quieres eliminar "${task.title}"? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => onDelete(task.id) },
      ],
    );
  }

  return (
    <ScreenLayout title="Detalle de tarea" subtitle="Revisa y gestiona tu tarea" onBack={onBack}>
      <View style={styles.card}>
        <View style={styles.statusPill}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: task.completed ? colors.secondary : colors.primaryLight },
            ]}
          />
          <Text style={styles.statusText}>{task.completed ? 'Completada' : 'Pendiente'}</Text>
        </View>
        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.value}>{TASK_CATEGORY_LABELS[task.category]}</Text>
        <Text style={[styles.label, styles.labelSpaced]}>Creada</Text>
        <Text style={styles.value}>{formatDateTime(task.createdAt)}</Text>
        <Text style={[styles.label, styles.labelSpaced]}>Descripción</Text>
        <Text style={[styles.value, styles.description]}>{task.description}</Text>
      </View>

      <View style={styles.actions}>
        {task.completed ? (
          <ActionButton
            variant="secondary"
            label="Marcar como pendiente"
            icon="arrow-undo-outline"
            onPress={() => onToggleCompleted(task.id)}
          />
        ) : (
          <ActionButton
            label="Marcar como completada"
            icon="checkmark-circle-outline"
            onPress={() => onToggleCompleted(task.id)}
          />
        )}
        <ActionButton
          variant="danger"
          label="Eliminar tarea"
          icon="trash-outline"
          onPress={handleDelete}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    backgroundColor: colors.background,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  statusDot: {
    width: STATUS_DOT_SIZE,
    height: STATUS_DOT_SIZE,
    borderRadius: STATUS_DOT_SIZE / 2,
  },
  statusText: {
    color: colors.text,
    fontSize: fontSizes.xs,
    fontWeight: '600',
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    fontWeight: '600',
  },
  labelSpaced: {
    marginTop: spacing.md,
  },
  value: {
    color: colors.text,
    fontSize: fontSizes.sm,
    marginTop: spacing.xs,
  },
  description: {
    lineHeight: DESCRIPTION_LINE_HEIGHT,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
});
