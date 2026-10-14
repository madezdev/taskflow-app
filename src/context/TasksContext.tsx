import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Task, TaskFormValues } from '../types/task';

type TasksContextValue = {
  tasks: readonly Task[];
  addTask: (values: TaskFormValues) => void;
};

type TasksProviderProps = {
  children: ReactNode;
};

const TasksContext = createContext<TasksContextValue | null>(null);

// Id local temporal: cuando exista el backend (Firebase) serán asignados por él.
function createTaskId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// Estado en memoria compartido entre las tabs hasta que llegue el estado global (Redux).
export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((values: TaskFormValues) => {
    const task: Task = {
      ...values,
      id: createTaskId(),
      createdAt: new Date(),
      completed: false,
    };
    setTasks((current) => [task, ...current]);
  }, []);

  const value = useMemo(() => ({ tasks, addTask }), [tasks, addTask]);

  return <TasksContext value={value}>{children}</TasksContext>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de TasksProvider');
  }
  return context;
}
