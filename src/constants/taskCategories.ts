import type { TaskCategory } from '../types/task';

export const TASK_CATEGORIES: readonly { value: TaskCategory; label: string }[] = [
  { value: 'personal', label: 'Personal' },
  { value: 'work', label: 'Trabajo' },
  { value: 'study', label: 'Estudio' },
];

export const DEFAULT_TASK_CATEGORY: TaskCategory = 'personal';
