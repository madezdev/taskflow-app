import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import EmptyState from '../components/EmptyState';
import ScreenLayout from '../components/ScreenLayout';
import TaskListItem from '../components/TaskListItem';
import { spacing } from '../constants/theme';
import { useTasks } from '../context/TasksContext';
import type { RootTabParamList } from '../navigation/AppNavigator';
import type { Task } from '../types/task';

type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;

const keyExtractor = (task: Task) => task.id;

function ListSeparator() {
  return <View style={styles.separator} />;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { tasks, toggleTaskCompleted } = useTasks();

  const renderItem: ListRenderItem<Task> = useCallback(
    ({ item }) => <TaskListItem task={item} onToggleCompleted={toggleTaskCompleted} />,
    [toggleTaskCompleted],
  );

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
