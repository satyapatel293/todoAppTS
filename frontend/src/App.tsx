import { useState, useEffect } from "react";
import todoServices from "./services/todo";
import { Todo } from "./types";
import Nav from "./components/Nav";
import Content from "./components/Content";
import Modal from "./components/Modal";
import "../public/todo_v2.css";
import { dateSortedTodos, sortTodos } from "./utils";

function App() {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    todoServices.getAllTodos().then((todos) => setAllTodos(todos));
  }, []);

  const sortedTodos = sortTodos(allTodos)

  console.log(dateSortedTodos(allTodos));

  return (
    <>
      <Nav />
      <Content
        allTodos={sortedTodos}
        setModalStatus={setModalStatus}
        setSelectedTodo={setSelectedTodo}
        setAllTodos={setAllTodos}
      />
      {modalStatus ? (
        <Modal
          selectedTodo={selectedTodo}
          allTodos={allTodos}
          setAllTodos={setAllTodos}
          setModalStatus={setModalStatus}
          setSelectedTodo={setSelectedTodo}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
