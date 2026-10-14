export type TaskCategory = 'personal' | 'work' | 'study';

export type Task = {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  createdAt: Date;
  completed: boolean;
};

export type TaskFormValues = Pick<Task, 'title' | 'description' | 'category'>;

export type TaskFormField = 'title' | 'description';

export type TaskFormErrors = Partial<Record<TaskFormField, string>>;
