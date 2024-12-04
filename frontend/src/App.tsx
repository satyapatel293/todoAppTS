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
  const [selectedList, setSelectedList] = useState<Todo[]>([])
  const [listName, setListName] = useState<string>('All Todos')  

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
        setSelectedList={setSelectedList}
        listName={listName}
        setListName={setListName}
      />
      <Content
        allTodos={allTodos}
        setModalStatus={setModalStatus}
        setSelectedTodo={setSelectedTodo}
        setAllTodos={setAllTodos}
        selectedList={sortedTodos}
        setSelectedList={setSelectedList}
        listName={listName}
      />
      {modalStatus &&
        <Modal
          selectedTodo={selectedTodo}
          allTodos={allTodos}
          setAllTodos={setAllTodos}
          setModalStatus={setModalStatus}
          setSelectedTodo={setSelectedTodo}
          selectedList={sortedTodos}
          setSelectedList={setSelectedList}
          setListName={setListName}
        />
      }
    </>
  );
}

export default App;
