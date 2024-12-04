import { Todo } from "../types";
import TodoItem from "./TodoItem";

interface ContentProps {
  allTodos: Todo[];
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  selectedList: Todo[]
  setSelectedList: React.Dispatch<React.SetStateAction<Todo[]>>
  listName: string
}

const Content = ({ allTodos, setModalStatus, setSelectedTodo, setAllTodos, selectedList, listName, setSelectedList}: ContentProps) => {

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
            <time>{listName.replace(' done', '')}</time>
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
                allTodos={allTodos}
                setAllTodos={setAllTodos}
                setSelectedList={setSelectedList}
                selectedList={selectedList}
                setModalStatus={setModalStatus}
                setSelectedTodo={setSelectedTodo}
                listName={listName}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Content;
