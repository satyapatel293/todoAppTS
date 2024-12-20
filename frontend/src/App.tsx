import { Todo } from "./types";
import { useState, useEffect } from "react";
import { filterTodosByListName, sortTodos } from "./utils";
import todoServices from "./services/todo";
import Nav from "./components/Nav";
import Content from "./components/Content";
import Modal from "./components/Modal";
import "../public/todo_v2.css";

function App() {
  console.log('render')

  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [listName, setListName] = useState<string>('All Todos')  
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    async function initializeState() {
      const todos = await todoServices.getAllTodos()
      setAllTodos(todos)
    }
    
    initializeState()
  }, []);

  const sortedSelectedList = sortTodos(filterTodosByListName(allTodos, listName))

  return (
    <>
      <Nav 
        allTodos={allTodos}
        listName={listName}
        setListName={setListName}
      />
      <Content
        selectedList={sortedSelectedList}
        listName={listName}
        setAllTodos={setAllTodos}
        setModalStatus={setModalStatus}
        setSelectedTodo={setSelectedTodo}
      />
      { modalStatus &&
        <Modal
          selectedTodo={selectedTodo}
          setAllTodos={setAllTodos}
          setListName={setListName}
          setModalStatus={setModalStatus}
          setSelectedTodo={setSelectedTodo}
        />
      }
    </>
  );
}

export default App;
