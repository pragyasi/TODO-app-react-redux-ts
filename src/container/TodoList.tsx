import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  addCompletedAction,
  addTodoAction,
  deleteTodoAction,
} from '../actions/TodoListActions';
import '../styles/TodoList.scss';

type TodoItem = {
  id: number;
  todoItem: string;
  isComplete: boolean;
  isEditing: boolean;
};
interface SelectorType {
  LandingPage: {
    user: string;
  };
  TodoList: Array<TodoItem>;
}

export default function TodoList() {
  const selector = useSelector((state: SelectorType) => state) as SelectorType;
  const todoList: Array<{
    id: number;
    todoItem: string;
    isComplete: boolean;
    isEditing: boolean;
  }> = useSelector((state: SelectorType) => state.TodoList);
  const [todo, createTodo] = useState('');
  const dispatch = useDispatch();

  /**
   * Handler for adding a todo
   */
  const dispatchSetList = () => {
    const add = addTodoAction(todo);
    createTodo('');
    dispatch(add);
  };

  /**
   * Handler for deleting a todo
   * @param id
   * @param item
   */
  const dispatchDeleteTodo = (id: number, item: string) => {
    const remove = deleteTodoAction(id, item);
    dispatch(remove);
  };

  /**
   * Handler for editing a Todo.
   * @param id
   * @param item
   * @param isCompleted
   * @param isEdit
   */
  const dispatchEditTodo = (
    id: number,
    item: string,
    isCompleted: boolean,
    isEdit?: boolean
  ) => {
    const completed = addCompletedAction(id, item, isCompleted, !!isEdit);
    dispatch(completed);
  };

  /**
   * handler for completed todo
   * @param e event
   * @param id todo item id
   * @param item todo string
   */
  const dispatchCompletedTodo = (e: any, id: number, item: string) => {
    const completed = addCompletedAction(id, item, e.target.checked);
    dispatch(completed);
  };

  /**
   * Toggles between edit mode and read only mode
   * @param item
   */
  function getEditor(item: TodoItem): JSX.Element {
    return item.isEditing ? (
      <input
        className="edit-todo"
        autoFocus
        type="text"
        defaultValue={item.todoItem}
        onBlur={(e) => {
          item.todoItem = e.target.value;
          dispatchEditTodo(item.id, item.todoItem, item.isComplete, false);
        }}
        onKeyDown={(e) => editHandleKeyDown(e)}
      />
    ) : (
      <label className="todo-label">{item.todoItem}</label>
    );
  }

  /***********************************************************/
  /*                  Key down handlers                      */
  /***********************************************************/
  
  const createHandleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatchSetList();
    }
  };

  const editHandleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      (e.target as HTMLElement).blur();
    }
  };

  /**
   * Returns the Todo item element
   * @param data
   * @param isComplete
   */
  function getTaskList(data: TodoItem, isComplete: boolean): JSX.Element {
    return (
      <li key={data.todoItem}>
        <input
          className="todo-complete"
          type="checkbox"
          checked={!!isComplete}
          onChange={(e) => dispatchCompletedTodo(e, data.id, data.todoItem)}
        />
        {getEditor(data)}
        <button
          className="edit"
          onClick={(e) =>
            dispatchEditTodo(data.id, data.todoItem, isComplete, true)
          }
        >
          Edit
        </button>
        <button
          className="delete"
          onClick={(e) => dispatchDeleteTodo(data.id, data.todoItem)}
        >
          Delete
        </button>
      </li>
    );
  }

  return (
    <div className="container">
      <h2>Todo List for: {selector.LandingPage.user}</h2>
      <h3 className="add-item-heading">Add item</h3>
      <p>
        <input
          id="new-task"
          type="text"
          placeholder="New Todo"
          value={todo}
          onChange={(e) => createTodo(e.target.value)}
          onKeyDown={(e) => createHandleKeyDown(e)}
        ></input>
        <button
          className="add-task"
          disabled={!todo}
          onClick={() => {
            dispatchSetList();
          }}
        >
          Add
        </button>
      </p>
      <ul id="incomplete-tasks">
        {todoList.map((data) => {
          if (!data.isComplete) {
            return getTaskList(data, false);
          }
          return null;
        })}
      </ul>
      <h3>Completed</h3>
      <ul id="completed-tasks">
        {todoList.map((data) => {
          if (data.isComplete) {
            return getTaskList(data, true);
          }
          return null;
        })}
      </ul>
    </div>
  );
}
