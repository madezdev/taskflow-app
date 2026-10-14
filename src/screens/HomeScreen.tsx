import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useCallback, useEffect, useState } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import EmptyState from '../components/EmptyState';
import ScreenLayout from '../components/ScreenLayout';
import TaskListItem from '../components/TaskListItem';
import { colors, shadows, spacing } from '../constants/theme';
import { useTasks } from '../context/TasksContext';
import { useSlideTransition } from '../hooks/useSlideTransition';
import type { RootTabParamList } from '../navigation/AppNavigator';
import type { Task } from '../types/task';
import TaskDetailScreen from './TaskDetailScreen';

type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;

const keyExtractor = (task: Task) => task.id;

function ListSeparator() {
  return <View style={styles.separator} />;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { tasks, toggleTaskCompleted, removeTask } = useTasks();
  const { enteringStyle, underlayStyle, enter, exit, reset } = useSlideTransition();
  // La selección simula la navegación al detalle hasta que llegue el stack navigator
  // (Módulo 5). Se guarda el id y no una copia para que el detalle siempre muestre los
  // datos actuales tras marcar o eliminar la tarea. La lista sigue montada bajo el detalle
  // animado, así conserva su posición de scroll.
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;

  const handleOpenTask = useCallback(
    (id: string) => {
      setSelectedTaskId(id);
      enter();
    },
    [enter],
  );

  const closeDetail = useCallback(
    (afterClose?: () => void) => {
      exit(() => {
        setSelectedTaskId(null);
        afterClose?.();
      });
    },
    [exit],
  );

  const handleBack = useCallback(() => closeDetail(), [closeDetail]);

  // La tarea se elimina cuando el detalle ya salió, para no desmontarlo a mitad de la animación.
  const handleDeleteTask = useCallback(
    (id: string) => closeDetail(() => removeTask(id)),
    [closeDetail, removeTask],
  );

  // Al salir de la tab se vuelve a la lista al instante; al tocarla de nuevo, con animación,
  // como al hacer pop en un stack real.
  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      reset();
      setSelectedTaskId(null);
    });
    const unsubscribeTabPress = navigation.addListener('tabPress', () => closeDetail());
    return () => {
      unsubscribeBlur();
      unsubscribeTabPress();
    };
  }, [navigation, reset, closeDetail]);

  const renderItem: ListRenderItem<Task> = useCallback(
    ({ item }) => (
      <TaskListItem task={item} onPress={handleOpenTask} onToggleCompleted={toggleTaskCompleted} />
    ),
    [handleOpenTask, toggleTaskCompleted],
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.layer, underlayStyle]}
        pointerEvents={selectedTask ? 'none' : 'auto'}
        importantForAccessibility={selectedTask ? 'no-hide-descendants' : 'auto'}
        accessibilityElementsHidden={Boolean(selectedTask)}
      >
        <ScreenLayout title="TaskFlow" subtitle="Mis tareas" scrollable={false}>
          {tasks.length > 0 ? (
            <FlatList
              data={tasks}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ItemSeparatorComponent={ListSeparator}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <EmptyState
                title="¡No tienes tareas pendientes!"
                message="Empieza por crear una desde la pestaña «Nueva tarea»."
                action={{ label: 'Crear tarea', onPress: () => navigation.navigate('AddTask') }}
              />
            </View>
          )}
        </ScreenLayout>
      </Animated.View>
      {selectedTask ? (
        <Animated.View style={[styles.detailLayer, enteringStyle]}>
          <TaskDetailScreen
            task={selectedTask}
            onBack={handleBack}
            onToggleCompleted={toggleTaskCompleted}
            onDelete={handleDeleteTask}
          />
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  layer: {
    flex: 1,
  },
  detailLayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...shadows.screen,
  },
  listContent: {
    padding: spacing.lg,
  },
  separator: {
    height: spacing.sm,
  },
  emptyContainer: {
    padding: spacing.lg,
  },
});
