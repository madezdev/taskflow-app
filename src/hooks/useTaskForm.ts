import { useRef, useState } from 'react';
import { DEFAULT_TASK_CATEGORY } from '../constants/taskCategories';
import type { Task, TaskCategory, TaskFormErrors, TaskFormField } from '../types/task';
import { validateTaskForm } from '../utils/taskValidation';

const INITIAL_TOUCHED: Record<TaskFormField, boolean> = {
  title: false,
  description: false,
};

export function useTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>(DEFAULT_TASK_CATEGORY);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const allErrors = validateTaskForm({ title, description, category });

  // Para no mostrar errores antes de tiempo, un campo solo muestra su error
  // si el usuario ya salió de él o si intentó guardar.
  const errors: TaskFormErrors = {};
  if (allErrors.title && (touched.title || submitAttempted)) {
    errors.title = allErrors.title;
  }
  if (allErrors.description && (touched.description || submitAttempted)) {
    errors.description = allErrors.description;
  }

  const hasVisibleErrors = Object.keys(errors).length > 0;

  function markTouched(field: TaskFormField) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function submit(): Task | null {
    // Evita registrar la misma tarea dos veces si el usuario toca "Guardar" repetidamente.
    // El ref se lee al instante; el estado solo sirve para deshabilitar el botón en pantalla.
    if (isSubmittingRef.current) return null;

    setSubmitAttempted(true);

    if (Object.keys(allErrors).length > 0) {
      return null;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    return {
      title: title.trim(),
      description: description.trim(),
      category,
      createdAt: new Date(),
    };
  }

  function reset() {
    setTitle('');
    setDescription('');
    setCategory(DEFAULT_TASK_CATEGORY);
    setTouched(INITIAL_TOUCHED);
    setSubmitAttempted(false);
    isSubmittingRef.current = false;
    setIsSubmitting(false);
  }

  return {
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    errors,
    hasVisibleErrors,
    isSubmitting,
    markTouched,
    submit,
    reset,
  };
}
