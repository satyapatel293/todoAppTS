import { Todo } from "../types";
import TodoItem from "./TodoItem";

interface ContentProps {
  listName: string;
  selectedList: Todo[];
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Content = ({
  listName,
  selectedList,
  setAllTodos,
  setSelectedTodo,
  setModalStatus,
}: ContentProps) => {
  const handleAddTodo = () => {
    setSelectedTodo(null);
    setModalStatus(true);
  };

  return (
    <div id="items">
      <header>
        <label htmlFor="sidebar_toggle">
          <img src="images/hamburger.png" alt="Toggle Sidebar" />
        </label>
        <dl>
          <dt>
            <time>{listName.replace(" done", "")}</time>
          </dt>
          <dd>{selectedList.length}</dd>
        </dl>
      </header>
      <main>
        <label htmlFor="new_item" onClick={handleAddTodo}>
          <img src="images/plus.png" alt="Add Todo Item" />
          <h2>Add new to do</h2>
        </label>
        <table cellSpacing="0">
          <tbody>
            {selectedList.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                setAllTodos={setAllTodos}
                setSelectedTodo={setSelectedTodo}
                setModalStatus={setModalStatus}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Content;
