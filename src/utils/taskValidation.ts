import type { TaskFormErrors, TaskFormValues } from '../types/task';

export const TITLE_MIN_LENGTH = 5;
export const DESCRIPTION_MIN_LENGTH = 10;

export function validateTaskForm(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {};
  const title = values.title.trim();
  const description = values.description.trim();

  if (!title) {
    errors.title = 'El título es obligatorio.';
  } else if (title.length < TITLE_MIN_LENGTH) {
    errors.title = `El título debe tener al menos ${TITLE_MIN_LENGTH} caracteres.`;
  }

  if (!description) {
    errors.description = 'La descripción es obligatoria.';
  } else if (description.length < DESCRIPTION_MIN_LENGTH) {
    errors.description = `La descripción debe tener al menos ${DESCRIPTION_MIN_LENGTH} caracteres.`;
  }

  return errors;
}
