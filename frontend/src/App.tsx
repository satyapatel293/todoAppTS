import { useState, useEffect } from "react";
import todoServices from "./services/todo";
import { Todo } from "./types";
import Nav from "./components/Nav";
import Content from "./components/Content";
import Modal from "./components/Modal";
import "../public/todo_v2.css";
import { sortTodos } from "./utils";

function App() {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [listName, setListName] = useState<string>('All Todos')  
  const [selectedList, setSelectedList] = useState<Todo[]>([])

  useEffect(() => {
    todoServices.getAllTodos().then((todos) => {
      setAllTodos(todos)
      setSelectedList(todos)
    });
  }, []);

  const sortedTodos = sortTodos(selectedList)

  return (
    <>
      <Nav 
        allTodos={allTodos}
        listName={listName}
        setListName={setListName}
        setSelectedList={setSelectedList}
      />
      <Content
        selectedList={sortedTodos}
        listName={listName}
        setModalStatus={setModalStatus}
        setSelectedTodo={setSelectedTodo}
        setAllTodos={setAllTodos}
        setSelectedList={setSelectedList}
      />
      { modalStatus &&
        <Modal
          allTodos={allTodos}
          selectedTodo={selectedTodo}
          setAllTodos={setAllTodos}
          setModalStatus={setModalStatus}
          setSelectedTodo={setSelectedTodo}
          setSelectedList={setSelectedList}
          setListName={setListName}
        />
      }
    </>
  );
}

export default App;
