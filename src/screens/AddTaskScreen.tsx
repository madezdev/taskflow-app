import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useRef } from 'react';
import { Alert, Keyboard, StyleSheet, TextInput, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import CategorySelector from '../components/CategorySelector';
import FormField from '../components/FormField';
import ScreenLayout from '../components/ScreenLayout';
import { spacing } from '../constants/theme';
import { useTasks } from '../context/TasksContext';
import { useTaskForm } from '../hooks/useTaskForm';
import type { RootTabParamList } from '../navigation/AppNavigator';

type AddTaskScreenProps = BottomTabScreenProps<RootTabParamList, 'AddTask'>;

export default function AddTaskScreen({ navigation }: AddTaskScreenProps) {
  const { addTask } = useTasks();
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
    isSubmitting,
    markTouched,
    submit,
    reset,
  } = useTaskForm();

  const isSaveDisabled = hasVisibleErrors || isSubmitting;

  function handleAddTask() {
    const values = submit();
    if (!values) return;

    addTask(values);
    Keyboard.dismiss();
    // El reset se hace al cerrar el aviso: el blur que dispara Keyboard.dismiss() llega
    // de forma asíncrona y, si limpiáramos antes, volvería a marcar el campo como tocado.
    Alert.alert('Éxito', 'La tarea se agregó a tu lista.', [
      { text: 'Crear otra', onPress: reset },
      {
        text: 'Ver tareas',
        onPress: () => {
          reset();
          navigation.navigate('Home');
        },
      },
    ]);
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
      <View style={styles.action}>
        <ActionButton label="Guardar tarea" onPress={handleAddTask} disabled={isSaveDisabled} />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  action: {
    marginTop: spacing.lg,
  },
});
