import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import EmptyState from '../components/EmptyState';
import ScreenLayout from '../components/ScreenLayout';
import TaskListItem from '../components/TaskListItem';
import { spacing } from '../constants/theme';
import { useTasks } from '../context/TasksContext';
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
  // La selección simula la navegación al detalle hasta que llegue el stack navigator
  // (Módulo 5). Se guarda el id y no una copia para que el detalle siempre muestre los
  // datos actuales tras marcar o eliminar la tarea.
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;

  const handleOpenTask = useCallback((id: string) => setSelectedTaskId(id), []);
  const handleBack = useCallback(() => setSelectedTaskId(null), []);
  const handleDeleteTask = useCallback(
    (id: string) => {
      removeTask(id);
      setSelectedTaskId(null);
    },
    [removeTask],
  );

  // Al salir de la tab o tocarla de nuevo se vuelve a la lista, como en un stack real.
  useEffect(() => {
    const clearSelection = () => setSelectedTaskId(null);
    const unsubscribeBlur = navigation.addListener('blur', clearSelection);
    const unsubscribeTabPress = navigation.addListener('tabPress', clearSelection);
    return () => {
      unsubscribeBlur();
      unsubscribeTabPress();
    };
  }, [navigation]);

  const renderItem: ListRenderItem<Task> = useCallback(
    ({ item }) => (
      <TaskListItem task={item} onPress={handleOpenTask} onToggleCompleted={toggleTaskCompleted} />
    ),
    [handleOpenTask, toggleTaskCompleted],
  );

  if (selectedTask) {
    return (
      <TaskDetailScreen
        task={selectedTask}
        onBack={handleBack}
        onToggleCompleted={toggleTaskCompleted}
        onDelete={handleDeleteTask}
      />
    );
  }

  return (
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
  );
}

const styles = StyleSheet.create({
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
