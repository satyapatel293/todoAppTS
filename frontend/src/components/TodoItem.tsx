import { Todo } from "../types";
import { parseDueDate } from "../utils";
import todoServices from "../services/todo";

interface TodoProps {
  todo: Todo;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem = ({
  todo,
  setModalStatus,
  setSelectedTodo,
  setAllTodos,
}: TodoProps) => {
  const handleToggleComplete = (id: number) => {
    todoServices
      .toggleCompleteTodo(id)
      .then((updatedTodo) => {
        setAllTodos(allTodos => allTodos.map((todo) => (todo.id === id ? updatedTodo : todo)))
      }
      );
  };
  
  const handleDeleteTodo = (id: number) => {
    todoServices
      .deleteTodo(id)
      .then(() => { 
        setAllTodos(allTodos => allTodos.filter((todo) => todo.id !== id))
      }
    );
  };

  const handleEditTodo = (event: React.SyntheticEvent, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    todoServices.getTodo(id).then((todo) => {
      setModalStatus(true);
      setSelectedTodo(todo);
    });
  };

  return (
    <tr data-id={todo.id}>
      <td className="list_item" onClick={() => handleToggleComplete(todo.id)}>
        <input
          type="checkbox"
          name={`${todo.id}`}
          id={`${todo.id}`}
          checked={todo.completed}
          onChange={(e) => e}
        />
        <span className="check"></span>
        <label
          htmlFor={`${todo.id}`}
          onClick={(event) => handleEditTodo(event, todo.id)}
        >
          {todo.title} - {parseDueDate(todo)}
        </label>
      </td>
      <td
        className="delete"
        onClick={() => handleDeleteTodo(todo.id)}
      >
        <img src="images/trash.png" alt="Delete" />
      </td>
    </tr>
  );
};

export default TodoItem;
