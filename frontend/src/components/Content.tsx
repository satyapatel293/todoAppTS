import { Todo } from "../types";
import TodoItem from "./TodoItem";

interface ContentProps {
  allTodos: Todo[];
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Content = ({ allTodos, setModalStatus, setSelectedTodo, setAllTodos}: ContentProps) => {

  const handleAddTodo = (event:React.SyntheticEvent) => {
    event.preventDefault()
    setModalStatus(true)
    setSelectedTodo(null)
  }

  return (
    <div id="items">
      <header>
        <label htmlFor="sidebar_toggle">
          <img src="images/hamburger.png" alt="Toggle Sidebar" />
        </label>
        <dl>
          <dt>
            <time>All Todos</time>
          </dt>
          <dd>{allTodos.length}</dd>
        </dl>
      </header>
      <main>
        <label htmlFor="new_item" onClick={handleAddTodo}>
          <img src="images/plus.png" alt="Add Todo Item" />
          <h2>Add new to do</h2>
        </label>
        <table cellSpacing="0">
          <tbody>
            {allTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                allTodos={allTodos}
                setAllTodos={setAllTodos}
                setModalStatus={setModalStatus}
                setSelectedTodo={setSelectedTodo}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Content;