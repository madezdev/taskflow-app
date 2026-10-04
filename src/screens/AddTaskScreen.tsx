import { useRef } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import CategorySelector from '../components/CategorySelector';
import FormField from '../components/FormField';
import ScreenLayout from '../components/ScreenLayout';
import { colors, fontSizes, radius, spacing } from '../constants/theme';
import { useTaskForm } from '../hooks/useTaskForm';

export default function AddTaskScreen() {
  const descriptionRef = useRef<TextInput>(null);
  const {
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    errors,
    hasVisibleErrors,
    markTouched,
    submit,
    reset,
  } = useTaskForm();

  function handleAddTask() {
    const task = submit();
    if (!task) return;

    Keyboard.dismiss();
    // Simula el envío a la API hasta que existan el estado global y el backend
    // eslint-disable-next-line no-console
    console.log('Tarea creada:', task);
    // El reset se hace al cerrar el aviso: el blur que dispara Keyboard.dismiss() llega
    // de forma asíncrona y, si limpiáramos antes, volvería a marcar el campo como tocado.
    Alert.alert('Éxito', 'Tarea capturada localmente', [{ text: 'OK', onPress: reset }]);
  }

  return (
    <ScreenLayout title="Nueva tarea" subtitle="Completa los datos de la tarea">
      <FormField
        label="Título"
        placeholder="Ej: Preparar la presentación"
        value={title}
        onChangeText={setTitle}
        error={errors.title}
        autoCapitalize="sentences"
        autoCorrect
        keyboardType="default"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => descriptionRef.current?.focus()}
        maxLength={60}
        onBlur={() => markTouched('title')}
      />
      <FormField
        ref={descriptionRef}
        label="Descripción"
        placeholder="¿Qué hay que hacer?"
        value={description}
        onChangeText={setDescription}
        error={errors.description}
        multiline
        numberOfLines={4}
        autoCapitalize="sentences"
        maxLength={300}
        onBlur={() => markTouched('description')}
      />
      <CategorySelector value={category} onChange={setCategory} />
      <TouchableOpacity
        style={[styles.button, hasVisibleErrors && styles.buttonDisabled]}
        onPress={handleAddTask}
        disabled={hasVisibleErrors}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityState={{ disabled: hasVisibleErrors }}
      >
        <Text style={styles.buttonText}>Guardar tarea</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: fontSizes.sm,
    fontWeight: '700',
  },
});
