export const addTodoAction = (todo: string) => {
  return {
    type: 'ADD_TODO',
    payload: todo,
    isComplete: false,
    isEditing: false,
  };
};
export const addCompletedAction = (
  id: number,
  todo: string,
  isComplete: boolean,
  isEditing?: boolean
) => {
  return {
    id,
    type: 'UPDATE_TODO',
    payload: todo,
    isComplete,
    isEditing,
  };
};
export const deleteTodoAction = (id: number, todo: string) => {
  return {
    id,
    type: 'DELETE_TODO',
    payload: todo,
    isComplete: false,
  };
};
