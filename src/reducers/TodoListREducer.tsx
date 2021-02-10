interface actionType {
  id: number;
  type: string;
  payload: string;
  isComplete: boolean;
  isEditing: boolean;
}
let counter = 0;
export default function TodoList(
  state: Array<{
    id: number;
    todoItem: string;
    isComplete: boolean;
    isEditing: boolean;
  }> = [],
  action: actionType
) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: counter++, todoItem: action.payload, isComplete: action.isComplete },
      ];
    case 'UPDATE_TODO':
      const objIndex = state.findIndex((obj) => obj.id === action.id);
      state[objIndex].isComplete = action.isComplete;
      state[objIndex].isEditing = action.isEditing;
      return [...state];

    case 'DELETE_TODO':
      return state.filter((item) => item.id !== action.id);

    default:
      return [...state];
  }
}
