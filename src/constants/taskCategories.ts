import type { TaskCategory } from '../types/task';

export const TASK_CATEGORY_LABELS: Record<TaskCategory, string> = {
  personal: 'Personal',
  work: 'Trabajo',
  study: 'Estudio',
};

export const TASK_CATEGORIES: readonly { value: TaskCategory; label: string }[] = (
  Object.keys(TASK_CATEGORY_LABELS) as TaskCategory[]
).map((value) => ({ value, label: TASK_CATEGORY_LABELS[value] }));

export const DEFAULT_TASK_CATEGORY: TaskCategory = 'personal';
